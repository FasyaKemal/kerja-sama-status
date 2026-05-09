/* ============================================
   KinerjaKu Next — Application Shell & Router
   Sidebar v2: Hierarchical Submenus
   ============================================ */

const App = {
  isLoggedIn: localStorage.getItem('kinerjaku_loggedIn') === 'true',
  currentPage: 'login',
  currentSub: null,        // active submenu id
  expandedMenus: {},       // track which parent menus are expanded
  showNotifPanel: false,
  mobileMenuOpen: false,
  sidebarCollapsed: false,
  activeUnitFilter: 'all',
  prevPage: null,

  /* ── Menu Structure ─────────────────────────── */
  menuItems: [
    { id: 'dashboard', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>', label: 'Monev Dashboard' },
    { id: 'database_kerja_sama', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>', label: 'Database Kerja Sama' },
    { id: 'kebijakan_prioritas', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>', label: 'Dukungan Kebijakan Prioritas' },
    { id: 'progress_dokumen', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>', label: 'Progress Penyusunan Dokumen' },
  ],

  /* ── RBAC: role → visible menu ids ──────────── */
  rbacRules: {
    admin_pusat: null,
    unit_level0: ['dashboard', 'database_kerja_sama', 'update_data', 'kebijakan_prioritas', 'progress_dokumen'],
    unit_level1: ['dashboard', 'database_kerja_sama', 'update_data', 'kebijakan_prioritas', 'progress_dokumen'],
    unit_level2: ['dashboard', 'database_kerja_sama', 'update_data', 'kebijakan_prioritas', 'progress_dokumen'],
    unit_level3: ['dashboard', 'database_kerja_sama', 'update_data', 'kebijakan_prioritas', 'progress_dokumen'],
    auditor: ['dashboard', 'database_kerja_sama', 'kebijakan_prioritas', 'progress_dokumen'],
    tamu: ['dashboard', 'database_kerja_sama', 'kebijakan_prioritas', 'progress_dokumen'],
  },

  /* ── Page renderers ─────────────────────────── */
  pages: {
    dashboard: { renderer: () => DashboardPage.render(), breadcrumb: ['Monev Dashboard'] },
    database_kerja_sama: { renderer: () => DatabasePage.render(), breadcrumb: ['Database Monitoring'] },
    update_data: { renderer: () => UpdateDataPage.render(), breadcrumb: ['Update Data Monitoring'] },
    kebijakan_prioritas: { renderer: () => KebijakanPrioritasPage.render(), breadcrumb: ['Dukungan Kebijakan Prioritas'] },
    progress_dokumen: { renderer: () => ProgressDokumenPage.render(), breadcrumb: ['Progress Penyusunan Dokumen'] },
    pengukuran: { renderer: () => PengukuranPage.render(), breadcrumb: ['Pengukuran Kinerja'] },
  },

  /* ── Helpers ───────────────────────────────── */
  isMenuVisible(menuId) {
    const allowed = this.rbacRules[MockData.currentUser.roleId];
    if (!allowed) return true; // null = see all
    return allowed.includes(menuId);
  },

  getParentId(subId) {
    for (const item of this.menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.id === subId) return item.id;
        }
      }
    }
    return null;
  },

  isReadOnlyRole() {
    const role = MockData.currentUser?.roleId;
    return ['auditor', 'tamu'].includes(role);
  },

  isParentActive(parentId) {
    return this.currentPage.startsWith(parentId + '_') || this.currentPage === parentId;
  },

  /* ── Navigation ────────────────────────────── */
  init() {
    console.log('Initializing App...');
    
    // Load Persistent Data
    const loadPersistence = (key, target) => {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          MockData[target] = JSON.parse(saved);
          console.log(`Persistent data loaded for ${target}:`, MockData[target].length, 'records');
        } catch (e) { console.error(`Error loading ${key}:`, e); }
      }
    };

    loadPersistence('db_kerja_sama_persistent', 'databaseKerjaSama');
    loadPersistence('kp_prioritas_persistent', 'kebijakanPrioritas');
    loadPersistence('progress_dokumen_persistent', 'progressDokumen');

    // Restore user session from localStorage
    if (this.isLoggedIn) {
      const savedUser = localStorage.getItem('kinerjaku_user');
      if (savedUser) {
        Object.assign(MockData.currentUser, JSON.parse(savedUser));
      }
      
      // Setup Hash Routing
      window.addEventListener('hashchange', () => this.handleHashChange());
      this.handleHashChange(true);
    } else {
      this.renderPage();
    }
  },

  handleHashChange(initial = false) {
    let hash = window.location.hash.replace(/^#\/?/, '') || 'dashboard';
    if (!this.pages[hash]) hash = 'dashboard';
    
    this.currentPage = hash;
    localStorage.setItem('kinerjaku_page', hash);
    this.showNotifPanel = false;
    this.mobileMenuOpen = false;
    
    const parentId = this.getParentId(hash);
    if (parentId) {
      this.expandedMenus[parentId] = true;
    }
    
    if (!initial) this.showProgressBar();
    this.renderPage();
    if (!initial) window.scrollTo(0, 0);
  },

  navigate(pageId) {
    const newHash = '#/' + pageId;
    if (window.location.hash === newHash) return;
    window.location.hash = newHash;
  },

  showProgressBar() {
    let bar = document.getElementById('page-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'page-progress-bar';
      bar.className = 'page-progress-bar';
      document.body.appendChild(bar);
    }
    bar.classList.remove('done');
    bar.style.width = '0%';
    void bar.offsetWidth; // force reflow
    bar.style.width = '70%';
    setTimeout(function () {
      bar.style.width = '100%';
      setTimeout(function () {
        bar.classList.add('done');
      }, 200);
    }, 150);
  },

  toggleMenu(menuId) {
    this.expandedMenus[menuId] = !this.expandedMenus[menuId];
    // Re-render only the sidebar, not the entire page
    const sidebarEl = document.querySelector('.sidebar');
    if (sidebarEl) {
      const wasPeek = sidebarEl.classList.contains('sidebar-peek');
      sidebarEl.outerHTML = this.renderSidebar();
      // Restore peek state if it was active
      if (wasPeek) {
        const newSidebar = document.querySelector('.sidebar');
        if (newSidebar) newSidebar.classList.add('sidebar-peek');
      }
      // Re-setup hover listeners since DOM changed
      this.setupSidebarHover();
    } else {
      this.renderPage();
    }
  },

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.syncShellState();
  },

  toggleSidebar() {
    if (window.innerWidth <= 1024) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.syncShellState();
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      this.syncShellState();
    }
  },

  syncShellState() {
    const layout = document.querySelector('.app-layout');
    if (layout) {
      layout.classList.toggle('mobile-menu-open', this.mobileMenuOpen);
      layout.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
      
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.toggle('mobile-open', this.mobileMenuOpen);
      }
    }
    
    let overlay = document.querySelector('.sidebar-overlay');
    if (this.mobileMenuOpen) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.onclick = () => App.toggleMobileMenu();
        const layoutContainer = document.querySelector('.app-layout') || document.body;
        layoutContainer.appendChild(overlay);
      }
      overlay.style.display = 'block';
      setTimeout(() => { overlay.style.opacity = '1'; overlay.style.pointerEvents = 'auto'; }, 10);
    } else {
      if (overlay) {
        overlay.style.opacity = '0'; 
        overlay.style.pointerEvents = 'none';
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
      }
    }
  },

  /* ── Render orchestrator ───────────────────── */
  renderPage() {
    const app = document.getElementById('app');
    if (!this.isLoggedIn) {
      app.innerHTML = LoginPage.render();
      return;
    }

    // Auto-expand parent of current page
    const parentId = this.getParentId(this.currentPage);
    if (parentId) this.expandedMenus[parentId] = true;

    const page = this.pages[this.currentPage] || this.pages.dashboard;
    const breadcrumbItems = page.breadcrumb || ['Dashboard'];

    // Check if shell exists to avoid full re-render
    const existingLayout = document.querySelector('.app-layout');
    
    // Store focused element ID to restore it later
    const activeId = document.activeElement ? document.activeElement.id : null;
    const selectionStart = document.activeElement ? document.activeElement.selectionStart : null;
    const selectionEnd = document.activeElement ? document.activeElement.selectionEnd : null;

    if (existingLayout && this.currentPage === this.prevPage) {
      // Only update content area if we're on the same page (e.g. filtering)
      const mc = document.getElementById('main-content');
      if (mc) {
        mc.innerHTML = page.renderer();
      }
    } else {
      // Full render for page navigation or first load
      app.innerHTML = `
        <div class="app-layout ${this.mobileMenuOpen ? 'mobile-menu-open' : ''} ${this.sidebarCollapsed ? 'sidebar-collapsed' : ''}">
          <div class="sidebar-hover-zone" id="sidebar-hover-zone"></div>
          ${this.renderSidebar()}
          ${this.renderHeader()}
          <div class="main-content page-fade-in is-loading" id="main-content" onclick="if(App.mobileMenuOpen){App.toggleMobileMenu();}">
            ${page.renderer()}
          </div>
        </div>
        <div id="modal-container"></div>

        ${this.showNotifPanel ? this.renderNotifPanel() : ''}
      `;
    }

    this.prevPage = this.currentPage;

    // Restore focus if element still exists
    if (activeId) {
      const el = document.getElementById(activeId);
      if (el) {
        el.focus();
        if (selectionStart !== null && selectionEnd !== null) {
          el.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }

    // Remove loading class after a brief moment to create a transition skeleton effect
    setTimeout(() => {
      const mc = document.getElementById('main-content');
      if (mc) mc.classList.remove('is-loading');
      // Call afterRender hook for any page that supports it
      const pageMap = {
        dashboard: typeof DashboardPage !== 'undefined' ? DashboardPage : null,
        database_kerja_sama: typeof DatabasePage !== 'undefined' ? DatabasePage : null,
        kebijakan_prioritas: typeof KebijakanPrioritasPage !== 'undefined' ? KebijakanPrioritasPage : null,
        progress_dokumen: typeof ProgressDokumenPage !== 'undefined' ? ProgressDokumenPage : null,
      };
      const activePageObj = pageMap[this.currentPage];
      if (activePageObj && typeof activePageObj.afterRender === 'function') {
        activePageObj.afterRender();
      }
    }, 100);

    // Setup sidebar auto-reveal on hover
    this.setupSidebarHover();
  },

  /* ── Sidebar Auto-Reveal ─────────────────── */
  setupSidebarHover() {
    const zone = document.getElementById('sidebar-hover-zone');
    const sidebar = document.querySelector('.sidebar');
    if (!zone || !sidebar) return;

    let hideTimeout = null;

    const showSidebar = () => {
      if (!this.sidebarCollapsed) return;
      clearTimeout(hideTimeout);
      sidebar.classList.add('sidebar-peek');
    };

    const hideSidebar = () => {
      hideTimeout = setTimeout(() => {
        sidebar.classList.remove('sidebar-peek');
      }, 300);
    };

    zone.addEventListener('mouseenter', showSidebar);
    sidebar.addEventListener('mouseenter', () => {
      if (!this.sidebarCollapsed) return;
      clearTimeout(hideTimeout);
      sidebar.classList.add('sidebar-peek');
    });
    sidebar.addEventListener('mouseleave', hideSidebar);
    zone.addEventListener('mouseleave', hideSidebar);
  },

  /* ── Header ────────────────────────────────── */
  renderHeader() {
    const today = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('id-ID', dateOptions);
    
    return `
      <header class="header">
        <div class="header-left">
          <button class="header-hamburger" onclick="App.toggleSidebar()" aria-label="Menu">☰</button>
        </div>
        <div class="header-right" style="display: flex; align-items: center; gap: 16px;">
          <div class="user-profile-wrapper">
            <div class="user-profile-btn" onclick="App.toggleProfile()">
              <div class="user-avatar">${(MockData.currentUser?.fullName || 'A').charAt(0)}</div>
              <div class="user-info-text">
                <div class="user-name">${MockData.currentUser?.fullName || 'Admin'}</div>
                <div class="user-role">${MockData.currentUser?.role || 'Super Admin'}</div>
              </div>
              <span class="chevron-down">▾</span>
            </div>
            <div id="profile-dropdown" class="header-dropdown">
              <a href="#" onclick="App.showProfile()"><span class="icon">👤</span> Profil Saya</a>
              <a href="#" onclick="App.showSettings()"><span class="icon">⚙️</span> Pengaturan</a>
              <hr>
              <a href="#" onclick="App.logout()" style="color: var(--red-500)"><span class="icon">🚪</span> Keluar</a>
            </div>
          </div>
        </div>
      </header>`;
  },

  /* ── Header Actions ────────────────────────── */
  handleGlobalSearch(query) {
    console.log('Global search for:', query);
    
    if (this.currentPage === 'database_kerja_sama' && typeof DatabasePage !== 'undefined') {
      DatabasePage.handleFilter('searchQuery', query);
      // Sync local search input if it exists
      const localSearch = document.getElementById('db-search');
      if (localSearch) localSearch.value = query;
    } else if (this.currentPage === 'kebijakan_prioritas' && typeof KebijakanPrioritasPage !== 'undefined') {
      KebijakanPrioritasPage.handleSearch(query);
      const localSearch = document.getElementById('kp-search');
      if (localSearch) localSearch.value = query;
    } else {
      // If on other pages, take them to database_kerja_sama with that search query
      if (typeof DatabasePage !== 'undefined') {
        DatabasePage.state.searchQuery = query;
        this.navigate('database_kerja_sama');
        
        // After navigation, ensure the local search bar reflects the query
        setTimeout(() => {
          const localSearch = document.getElementById('db-search');
          if (localSearch) localSearch.value = query;
        }, 100);
      }
    }
  },

  toggleProfile() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
  },

  /* ── Sidebar ───────────────────────────────── */
  renderSidebar() {
    const renderItem = (item) => {
      if (!this.isMenuVisible(item.id)) return '';
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = !!this.expandedMenus[item.id];
      const isActive = this.currentPage === item.id;
      const isParentOfActive = hasChildren && this.isParentActive(item.id);

      if (hasChildren) {
        // Filter children by RBAC
        const visibleChildren = item.children.filter(c => this.isMenuVisible(c.id));
        if (visibleChildren.length === 0) return ''; // no visible children → hide parent too

        return `
          <div class="sidebar-menu-group ${isExpanded ? 'expanded' : ''} ${isParentOfActive ? 'parent-active' : ''}">
            <a class="sidebar-item sidebar-parent ${isParentOfActive ? 'active' : ''}"
               onclick="App.toggleMenu('${item.id}')">
              <span class="sidebar-item-icon">${item.icon}</span>
              <span class="sidebar-item-label">${item.label}</span>
              <span class="sidebar-chevron">${isExpanded ? '▾' : '▸'}</span>
            </a>
            <div class="sidebar-submenu ${isExpanded ? 'open' : ''}">
              ${visibleChildren.map(child => {
          const subActive = this.currentPage === child.id;
          return `
                  <a class="sidebar-subitem ${subActive ? 'active' : ''}"
                     onclick="App.navigate('${child.id}')">
                    <span class="sidebar-subitem-bullet"></span>
                    <span class="sidebar-subitem-label">${child.label}</span>
                  </a>`;
        }).join('')}
            </div>
          </div>`;
      } else {
        return `
          <a class="sidebar-item ${isActive ? 'active' : ''}"
             onclick="App.navigate('${item.id}')">
            <span class="sidebar-item-icon">${item.icon}</span>
            <span class="sidebar-item-label">${item.labelFull || item.label}</span>
          </a>`;
      }
    };

    return `
      <aside class="sidebar ${this.mobileMenuOpen ? 'mobile-open' : ''}">
        <div class="sidebar-header">
          <div class="sidebar-brand">
            <div class="sidebar-brand-icon"><img src="assets/logo-kkp.png" alt="Logo KKP" style="height:48px;object-fit:contain"></div>
            <div>
              <div class="sidebar-brand-text">Database Kerja Sama</div>
              <div class="sidebar-brand-sub">Biro Perencanaan KKP</div>
            </div>
          </div>
        </div>
        <nav class="sidebar-nav">
          <div class="sidebar-section-label">Menu Utama</div>
          ${this.menuItems.map(renderItem).join('')}
        </nav>
        <div class="sidebar-footer">
          <a class="sidebar-item" onclick="App.logout()">
            <span class="sidebar-item-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></span>
            <span class="sidebar-item-label">Keluar</span>
          </a>
        </div>
        <div class="sidebar-wave"></div>
      </aside>`;
  },

  /* ── Topbar ────────────────────────────────── */
  // Breadcrumb label → first page ID mapping
  breadcrumbMap: {
    'Dashboard Kerja Sama': 'dashboard',
    'Database Kerja Sama': 'database_kerja_sama',
    'Update Data Kerja Sama': 'update_data',
    'Dukungan Kebijakan Prioritas': 'kebijakan_prioritas',
    'Progress Penyusunan Dokumen': 'progress_dokumen',
  },

  // Topbar removed to match new UI

  /* ── Notifications ─────────────────────────── */
  renderNotifPanel() {
    const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(MockData.currentUser.roleId) || MockData.currentUser.unitId === 'unit-007';
    const userUnit = MockData.currentUser.unitId;

    // Filter notifications: Show if reviewer, or if it targets this user's unit, or if it's a system-wide notification (no targetUnitId)
    const notifications = MockData.notifications.filter(n =>
      isReviewer || !n.targetUnitId || n.targetUnitId === userUnit
    );
    const unread = notifications.filter(n => n.unread).length;
    const typeIcons = { submit: '📨', review: '📋', overdue: '⚠️', approved: '✅', delayed: '🕐', info: 'ℹ️' };
    const items = notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="App.markNotifRead('${n.id}')">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span style="font-size:1.25rem;flex-shrink:0;margin-top:2px">${typeIcons[n.type] || '🔔'}</span>
          <div style="flex:1;min-width:0">
            <div class="notif-item-title">${n.title}</div>
            <div style="font-size:0.8125rem;color:var(--neutral-600);margin:4px 0">${n.message}</div>
            <div class="notif-item-time" style="font-size:0.75rem;color:var(--neutral-500)">
              ${n.createdAt ? `${MockData.formatDateTime(n.createdAt)} • ${MockData.timeAgo(n.createdAt)}` : (n.time || '-')}
            </div>
          </div>
          ${n.unread ? '<span style="width:8px;height:8px;border-radius:50%;background:var(--primary-500);flex-shrink:0;margin-top:6px"></span>' : ''}
        </div>
      </div>`).join('');

    return `
      <div class="notif-panel" id="notif-panel">
        <div style="padding:var(--space-md) var(--space-lg);border-bottom:1px solid var(--neutral-300);display:flex;align-items:center;justify-content:space-between">
          <h3 style="margin:0">🔔 Notifikasi ${unread > 0 ? '<span style="font-size:12px;background:var(--primary-500);color:#fff;padding:2px 8px;border-radius:12px;margin-left:6px">' + unread + ' baru</span>' : ''}</h3>
          <button class="btn btn-ghost btn-sm" onclick="App.toggleNotif()">✕</button>
        </div>
        ${unread > 0 ? '<div style="padding:8px 16px;border-bottom:1px solid var(--neutral-200);text-align:right"><button class="btn btn-ghost btn-sm" onclick="App.markAllRead()" style="font-size:12px;color:var(--primary-500)">✓ Tandai semua dibaca</button></div>' : ''}
        ${items}
        <div style="padding:12px 16px;border-top:1px solid var(--neutral-200);text-align:center">
          <button class="btn btn-ghost btn-sm" onclick="App.toggleNotif();App.navigate('informasi_log')" style="font-size:12px;color:var(--primary-500)">📋 Lihat Log Aktivitas</button>
        </div>
      </div>`;
  },

  markNotifRead(id) {
    const n = MockData.notifications.find(n => n.id === id);
    let route = null;
    if (n) {
      n.unread = false;
      MockData.saveNotifications();
      // Route based on notification type
      if (n.type === 'submit') route = 'pengukuran_verifikasi';
      else if (n.type === 'review') route = 'pelaporan';
      else if (n.type === 'overdue') route = 'evaluasi_rekomendasi';
      else if (n.type === 'approved') route = 'pengukuran_capaian';
      else if (n.type === 'delayed') route = 'perencanaan_rencana_aksi';
      else if (n.type === 'info') route = 'informasi_log';
    }
    const panel = document.getElementById('notif-panel');
    if (panel) { panel.remove(); }
    this.showNotifPanel = false;

    // Update header badge
    const badge = document.querySelector('.header-notif .badge-count');
    const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(MockData.currentUser.roleId) || MockData.currentUser.unitId === 'unit-007';
    const userUnit = MockData.currentUser.unitId;
    const unread = MockData.notifications.filter(n => n.unread && (isReviewer || !n.targetUnitId || n.targetUnitId === userUnit)).length;
    if (badge) { badge.textContent = unread > 0 ? unread : ''; if (unread === 0) badge.style.display = 'none'; }

    // Navigate if there is a route
    if (route) {
      this.navigate(route);
    }
  },

  markAllRead() {
    MockData.notifications.forEach(n => n.unread = false);
    MockData.saveNotifications();
    const panel = document.getElementById('notif-panel');
    if (panel) { panel.remove(); }
    const container = document.createElement('div');
    container.innerHTML = this.renderNotifPanel();
    document.body.appendChild(container.firstElementChild);
    const badge = document.querySelector('.header-notif .badge-count');
    if (badge) { badge.style.display = 'none'; }
  },

  toggleNotif() {
    this.showNotifPanel = !this.showNotifPanel;
    const panel = document.getElementById('notif-panel');
    if (panel) {
      panel.remove();
      this.showNotifPanel = false;
    } else {
      const container = document.createElement('div');
      container.innerHTML = this.renderNotifPanel();
      document.body.appendChild(container.firstElementChild);
      this.showNotifPanel = true;
    }
  },

  /* ── Toast Notifications ── */
  showToast(message, type = 'success', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '🔔'}</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  closeModal() {
    const mc = document.getElementById('modal-container');
    if (mc) mc.innerHTML = '';
  },

  showProfile() {
    const u = MockData.currentUser;
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    const content = `
      <div style="text-align:center;padding:var(--space-xl)">
        <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--primary-600),var(--primary-900));color:#fff;font-size:2rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-md)">${(u.fullName||'A').charAt(0)}</div>
        <h3 style="margin:0 0 4px;color:var(--primary-900)">${u.fullName || 'Pengguna'}</h3>
        <div style="font-size:13px;color:var(--neutral-500);margin-bottom:var(--space-md)">${u.role || '-'}</div>
        <div style="text-align:left;background:var(--neutral-50);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px;font-size:13px">
          <div><span style="color:var(--neutral-500);font-weight:600">NIP:</span> <span style="margin-left:8px">${u.nip || '-'}</span></div>
          <div><span style="color:var(--neutral-500);font-weight:600">Email:</span> <span style="margin-left:8px">${u.email || '-'}</span></div>
          <div><span style="color:var(--neutral-500);font-weight:600">Unit:</span> <span style="margin-left:8px">${u.unitName || '-'}</span></div>
        </div>
      </div>`;
    const footer = `<button class="btn btn-primary" onclick="App.closeModal()">Tutup</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Profil Pengguna', content, footer);
  },

  showSettings() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    const content = `
      <div style="padding:var(--space-md)">
        <p style="color:var(--neutral-600);font-size:14px;margin-bottom:var(--space-lg)">Pengaturan sistem akan tersedia pada pembaruan berikutnya.</p>
        <div style="background:var(--neutral-50);border-radius:12px;padding:16px">
          <div style="font-weight:700;margin-bottom:8px;color:var(--primary-900)">🔐 Keamanan Akun</div>
          <p style="font-size:13px;color:var(--neutral-600);margin:0">Untuk mengubah password, silakan hubungi Administrator sistem.</p>
        </div>
      </div>`;
    const footer = `<button class="btn btn-primary" onclick="App.closeModal()">Tutup</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Pengaturan', content, footer);
  },

  logout() {
    // Show confirmation modal
    const content = '<div style="text-align:center;padding:var(--space-xl)">'
      + '<div style="font-size:4rem;margin-bottom:var(--space-md)">🚪</div>'
      + '<h2 style="color:#334155;margin-bottom:var(--space-sm)">Keluar dari Sistem?</h2>'
      + '<p class="text-muted">Anda akan keluar dari akun <strong>' + (MockData.currentUser.fullName || '').split(',')[0] + '</strong>.</p>'
      + '<p style="font-size:13px;color:#94a3b8;margin-top:8px">Sesi Anda akan diakhiri dan Anda harus login kembali.</p>'
      + '</div>';
    const footer = '<button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>'
      + '<button class="btn" style="background:#dc2626;color:#fff;border:none" onclick="App.confirmLogout()">🚪 Ya, Keluar</button>';
    document.getElementById('modal-container').innerHTML = UI.modal('Konfirmasi Logout', content, footer);
  },

  confirmLogout() {
    this.isLoggedIn = false;
    this.currentPage = 'login';
    this.expandedMenus = {};
    localStorage.removeItem('kinerjaku_loggedIn');
    localStorage.removeItem('kinerjaku_user');
    this.closeModal();
    this.renderPage();
  }
};

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => App.init());
