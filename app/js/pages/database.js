/* ============================================
   KinerjaKu Next — Database Monitoring
   ============================================ */

const DatabasePage = {
  state: {
    page: 1,
    perPage: 20,
    searchQuery: '',
    filterYear: 'all',
    filterCategory: 'all',
    filterStatus: 'all'
  },

  getFilteredData() {
    let data = MockData.databaseKerjaSama || [];
    const { searchQuery, filterYear, filterCategory, filterStatus } = this.state;
    
    // Search logic
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      data = data.filter(r =>
        String(r.mitra || '').toLowerCase().includes(q) ||
        String(r.noPihak1 || '').toLowerCase().includes(q) ||
        String(r.noPihak2 || '').toLowerCase().includes(q) ||
        String(r.jenisKerjasama || '').toLowerCase().includes(q) ||
        String(r.pihak1 || '').toLowerCase().includes(q) ||
        String(r.pihak2 || '').toLowerCase().includes(q)
      );
    }
    
    // Year filter (handling types and spaces)
    if (filterYear !== 'all') {
      data = data.filter(r => String(r.tahun || '').trim() === String(filterYear).trim());
    }
    
    // Category filter
    if (filterCategory !== 'all') {
      data = data.filter(r => String(r.kategoriMitra || '').trim() === String(filterCategory).trim());
    }
    
    // Status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'Berlaku') {
        data = data.filter(r => {
          const s = String(r.status || '').toLowerCase();
          return s.includes('berlaku') && !s.includes('tidak');
        });
      } else if (filterStatus === 'Tidak Berlaku') {
        data = data.filter(r => String(r.status || '').toLowerCase().includes('tidak'));
      }
    }
    
    return data;
  },

  renderStatusBadge(status) {
    const s = String(status || '').toLowerCase();
    if (s.includes('berlaku') && !s.includes('tidak')) return `<span class="badge badge-success">● Berlaku</span>`;
    if (s.includes('tidak')) return `<span class="badge badge-danger">○ Tidak Berlaku</span>`;
    return `<span class="badge badge-info">${status || '-'}</span>`;
  },

  handleFilter(key, val) {
    this.state[key] = val;
    this.state.page = 1;
    
    if (key === 'searchQuery') {
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.updateUI();
      }, 300);
    } else {
      this.updateUI();
    }
  },

  resetFilters() {
    this.state = {
      ...this.state,
      searchQuery: '',
      filterYear: 'all',
      filterCategory: 'all',
      filterStatus: 'all',
      page: 1
    };
    // Sync input values back to DOM
    const s = document.getElementById('db-search'); if(s) s.value = '';
    const y = document.getElementById('db-filter-year'); if(y) y.value = 'all';
    const c = document.getElementById('db-filter-cat'); if(c) c.value = 'all';
    const st = document.getElementById('db-filter-status'); if(st) st.value = 'all';
    
    this.updateUI();
  },

  setPage(p) {
    this.state.page = p;
    this.updateUI();
  },

  afterRender() {
    this.updateUI();
  },

  updateUI() {
    const statsContainer = document.getElementById('db-stats-container');
    const tableContainer = document.getElementById('db-table-container');
    if (!statsContainer || !tableContainer) return;

    if (this.renderTimeout) clearTimeout(this.renderTimeout);

    // Show Skeleton Loader
    tableContainer.innerHTML = this.renderSkeleton();

    this.renderTimeout = setTimeout(() => {
      const filteredData = this.getFilteredData();
      const totalData = filteredData.length;
      const totalPages = Math.max(1, Math.ceil(totalData / this.state.perPage));
      const startIndex = (this.state.page - 1) * this.state.perPage;
      const paginatedData = filteredData.slice(startIndex, startIndex + this.state.perPage);

    const aktifCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('berlaku') && !String(r.status || '').toLowerCase().includes('tidak')).length;
    const tidakAktifCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('tidak')).length;
    const lainnyaCount = totalData - aktifCount - tidakAktifCount;

    statsContainer.innerHTML = `
        <!-- CARD STATISTIK -->
        <div class="stats-grid" style="margin-bottom:32px">
          <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--primary-50) 100%); position:relative; overflow:hidden;">
            <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">📊</div>
            <div style="font-size:13px;font-weight:700;color:var(--primary-700);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Total Kerja Sama</div>
            <div style="font-size:32px;font-weight:800;color:var(--primary-900);line-height:1">${totalData}</div>
            <div style="font-size:12px;color:var(--neutral-500);margin-top:8px">Data terfilter</div>
          </div>
          <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--success-100) 100%); position:relative; overflow:hidden;">
            <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">✅</div>
            <div style="font-size:13px;font-weight:700;color:var(--success-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Berlaku</div>
            <div style="font-size:32px;font-weight:800;color:var(--success-600);line-height:1">${aktifCount}</div>
            <div style="font-size:12px;color:var(--success-500);margin-top:8px">Status aktif</div>
          </div>
          <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--danger-100) 100%); position:relative; overflow:hidden;">
            <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">⚠️</div>
            <div style="font-size:13px;font-weight:700;color:var(--danger-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Tidak Berlaku</div>
            <div style="font-size:32px;font-weight:800;color:var(--danger-600);line-height:1">${tidakAktifCount}</div>
            <div style="font-size:12px;color:var(--danger-500);margin-top:8px">Masa berlaku habis</div>
          </div>
          <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--neutral-100) 100%); position:relative; overflow:hidden;">
            <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">⚙️</div>
            <div style="font-size:13px;font-weight:700;color:var(--neutral-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Lainnya</div>
            <div style="font-size:32px;font-weight:800;color:var(--neutral-800);line-height:1">${lainnyaCount}</div>
            <div style="font-size:12px;color:var(--neutral-500);margin-top:8px">Status lainnya</div>
          </div>
        </div>
    `;

    tableContainer.innerHTML = `
        <!-- DATA TABLE -->
        <div class="card" style="overflow-x:auto; width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-md); background:#fff;">
          <table class="table" style="font-size:13px; min-width: 1400px; width: 100%;">
            <thead>
              <tr style="background: var(--neutral-50);">
                <th style="white-space:nowrap; padding: 12px 16px;">No</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Tahun</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Kategori Mitra</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Nama Mitra</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Jenis Kerja Sama</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Pihak 1 (KKP)</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Pihak 2 (Mitra)</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Tgl Mulai</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Berlaku Hingga</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Status</th>
                <th style="white-space:nowrap; padding: 12px 16px;">Dokumen</th>
                <th style="white-space:nowrap; padding: 12px 16px; text-align:center;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${paginatedData.length === 0 ? this.renderEmptyState() :
        paginatedData.map((r, i) => `
                <tr style="background: #fff; transition: all 0.2s; border-bottom: 1px solid var(--neutral-100);" onmouseover="this.style.background='var(--primary-50)'" onmouseout="this.style.background='#fff'">
                  <td style="padding: 16px; color:var(--neutral-500); font-weight:600; text-align:center;">${startIndex + i + 1}</td>
                  <td style="padding: 16px;">${r.tahun || '-'}</td>
                  <td style="padding: 16px;"><span class="badge badge-info">${r.kategoriMitra || '-'}</span></td>
                  <td style="padding: 16px; max-width: 250px; white-space: normal; line-height: 1.5;"><strong style="color:var(--primary-900);">${r.mitra || '-'}</strong></td>
                  <td style="padding: 16px; white-space:nowrap; color:var(--neutral-700);">${r.jenisKerjasama || '-'}</td>
                  <td style="padding: 16px; max-width: 200px; white-space: normal; line-height: 1.4;">
                    <div style="font-weight:700;font-size:0.8rem;color:var(--primary-800);margin-bottom:4px">${r.pihak1 || '-'}</div>
                    <div style="font-size:0.7rem;color:var(--neutral-500);word-break:break-all;opacity:0.8">${r.noPihak1 || ''}</div>
                  </td>
                  <td style="padding: 16px; max-width: 200px; white-space: normal; line-height: 1.4;">
                    <div style="font-weight:700;font-size:0.8rem;color:var(--primary-800);margin-bottom:4px">${r.pihak2 || '-'}</div>
                    <div style="font-size:0.7rem;color:var(--neutral-500);word-break:break-all;opacity:0.8">${r.noPihak2 || ''}</div>
                  </td>
                  <td style="padding: 16px; white-space: nowrap; color:var(--neutral-600);">${r.tanggalMulai || '-'}</td>
                  <td style="padding: 16px; white-space: nowrap; color:var(--neutral-600);">${r.tanggalSelesai || '-'}</td>
                  <td style="padding: 16px; white-space: nowrap;">
                    ${this.renderStatusBadge(r.status)}
                  </td>
                  <td style="padding: 16px; white-space: nowrap; text-align:center;">
                    ${r.linkDokumen ? `<a href="${r.linkDokumen}" target="_blank" class="btn btn-ghost btn-sm" style="padding:6px 12px; background:var(--primary-50); color:var(--primary-700); border-radius:var(--radius-md); font-weight:600;">📄 Lihat</a>` : '-'}
                  </td>
                  <td style="padding: 16px; white-space:nowrap; text-align:center;">
                    <button class="btn btn-primary btn-sm" onclick="DatabasePage.openModal('${r.id}')" style="padding:8px 12px; border-radius: var(--radius-md); background:linear-gradient(135deg, var(--primary-600), var(--primary-800)); border:none; font-weight:600;">✏️ Edit</button>
                    <button class="btn btn-ghost btn-sm" onclick="DatabasePage.deleteItem('${r.id}')" style="padding:8px 12px; color:var(--danger-600);">🗑️ Hapus</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <!-- PAGINATION -->
          <div style="background: #fff; padding:16px;border-top:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;color:var(--neutral-500);font-size:13px">
            <div>Menampilkan ${totalData === 0 ? 0 : startIndex + 1} - ${Math.min(startIndex + this.state.perPage, totalData)} dari ${totalData} data</div>
            <div style="display:flex;gap:4px">
              <button class="btn btn-ghost btn-sm" ${this.state.page === 1 ? 'disabled' : ''} onclick="DatabasePage.setPage(${this.state.page - 1})">Sebelumnya</button>
              <span style="padding: 4px 10px; font-weight: 500;">Halaman ${this.state.page} / ${totalPages}</span>
              <button class="btn btn-ghost btn-sm" ${this.state.page === totalPages || totalPages === 0 ? 'disabled' : ''} onclick="DatabasePage.setPage(${this.state.page + 1})">Selanjutnya</button>
            </div>
          </div>
        </div>
    `;
    }, 400); // Premium Loading Delay
  },

  renderSkeleton() {
    const rows = Array(5).fill(`
      <tr style="border-bottom: 1px solid var(--neutral-100);">
        ${Array(12).fill('<td style="padding: 16px;"><div class="skeleton-box" style="height:20px; width:100%; border-radius:4px;"></div></td>').join('')}
      </tr>
    `).join('');
    return `
      <div class="card" style="overflow-x:auto; width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-md); background:#fff;">
        <table class="table" style="font-size:13px; min-width: 1400px; width: 100%;">
          <thead>
            <tr style="background: var(--neutral-50);">
              ${Array(12).fill('<th style="padding: 12px 16px;"><div class="skeleton-box" style="height:16px; width:80%; border-radius:4px;"></div></th>').join('')}
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  },

  renderEmptyState() {
    return `
      <tr>
        <td colspan="12" style="text-align:center; padding: 64px 24px; background: #fff;">
          <div style="display:flex; flex-direction:column; align-items:center; gap: 16px;">
            <div style="font-size: 48px; opacity: 0.5;">🔍</div>
            <div>
              <h3 style="margin:0 0 8px 0; color:var(--neutral-800); font-weight:700;">Data Tidak Ditemukan</h3>
              <p style="margin:0; color:var(--neutral-500); font-size:14px; max-width:400px;">Kami tidak dapat menemukan data dengan kata kunci atau filter tersebut. Silakan gunakan kata kunci lain.</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="DatabasePage.state.searchQuery=''; DatabasePage.state.filterYear='all'; DatabasePage.state.filterMitra='all'; DatabasePage.state.filterStatus='all'; document.getElementById('db-search').value=''; document.getElementById('db-filter-year').value='all'; document.getElementById('db-filter-mitra').value='all'; document.getElementById('db-filter-status').value='all'; DatabasePage.updateUI();" style="margin-top: 8px;">Reset Filter</button>
          </div>
        </td>
      </tr>
    `;
  },

  render() {
    const allData = MockData.databaseKerjaSama || [];
    const years = [...new Set(allData.map(r => String(r.tahun || '').trim()).filter(y => /^20\d{2}$/.test(y)))].sort().reverse();
    const categories = ['Pemda', 'K/L', 'BUMN', 'Universitas', 'Ormas', 'Swasta', 'Lainnya'];

    return `
      <div style="padding: 24px; animation: fadeIn 0.3s ease-out;">
        <!-- HEADER -->
        <div style="margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
          <div>
            <h1 class="page-title">Database Monitoring Kerja Sama</h1>
            <p class="text-muted" style="margin-top:4px">Database seluruh dokumen kerja sama KKP yang telah terdata</p>
          </div>
          <div style="display:flex;gap:12px">
            <button class="btn btn-ghost" style="border:1px solid var(--neutral-300)" onclick="DatabasePage.exportToExcel()">📥 Ekspor Excel</button>
            <button class="btn btn-primary" style="background:var(--primary-600);color:#fff;" onclick="DatabasePage.openModal(null)">+ Tambah Data</button>
          </div>
        </div>

        <!-- RINGKASAN DATA (STATS) -->
        <div id="db-stats-container">
          <!-- Stats cards load here -->
        </div>

        <!-- FILTER & SEARCH BAR -->
        <div class="card glass page-filter-bar" style="margin-bottom:24px;padding:24px;border:none;box-shadow:var(--shadow-lg);background:rgba(255,255,255,0.9);backdrop-filter:blur(10px);">
          <div class="search-container" style="flex:2;min-width:250px;">
            <span class="search-icon" style="position:absolute;left:15px;top:50%;transform:translateY(-50%);color:var(--neutral-400);">🔍</span>
            <input type="text" id="db-search" class="search-input" style="width:100%;padding:12px 12px 12px 45px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" placeholder="Cari mitra, jenis, nomor, atau pihak..." value="${this.state.searchQuery}" oninput="DatabasePage.handleFilter('searchQuery', this.value)" onkeydown="if(event.key==='Enter') event.preventDefault()">
          </div>
          
          <div style="flex:1;min-width:100px;">
            <label style="font-size:12px;font-weight:700;color:var(--neutral-800);display:block;margin-bottom:8px;">Tahun</label>
            <select id="db-filter-year" class="form-select" style="width:100%;padding:12px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" onchange="DatabasePage.handleFilter('filterYear', this.value)">
              <option value="all">Semua</option>
              ${years.map(y => `<option value="${y}" ${this.state.filterYear === y ? 'selected' : ''}>${y}</option>`).join('')}
            </select>
          </div>

          <div style="flex:1.5;min-width:160px;">
            <label style="font-size:12px;font-weight:700;color:var(--neutral-800);display:block;margin-bottom:8px;">Kategori</label>
            <select id="db-filter-cat" class="form-select" style="width:100%;padding:12px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" onchange="DatabasePage.handleFilter('filterCategory', this.value)">
              <option value="all">Semua Kategori</option>
              ${categories.map(c => `<option value="${c}" ${this.state.filterCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>

          <div style="flex:1.5;min-width:160px;">
            <label style="font-size:12px;font-weight:700;color:var(--neutral-800);display:block;margin-bottom:8px;">Status</label>
            <select id="db-filter-status" class="form-select" style="width:100%;padding:12px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" onchange="DatabasePage.handleFilter('filterStatus', this.value)">
              <option value="all">Semua Status</option>
              <option value="Berlaku" ${this.state.filterStatus === 'Berlaku' ? 'selected' : ''}>Berlaku</option>
              <option value="Tidak Berlaku" ${this.state.filterStatus === 'Tidak Berlaku' ? 'selected' : ''}>Tidak Berlaku</option>
            </select>
          </div>

          <button class="btn btn-ghost btn-sm" style="color:var(--danger-600);font-weight:600;margin-bottom:6px;flex-shrink:0;" onclick="DatabasePage.resetFilters()">✕ Reset</button>
        </div>

        <div id="db-table-container">
          <!-- Table load here -->
        </div>
      </div>
      ${this.renderModal()}
    `;
  },

  renderModal() {
    return `
      <div id="dbModal" class="modal-overlay" style="display:none; align-items:center; justify-content:center; z-index:1100;">
        <div class="modal-content" style="width:100%; max-width:600px; max-height:90vh; overflow-y:auto; border-radius:12px; padding:0; box-shadow:var(--shadow-2xl); background:#fff; position:relative;">
          
          <div style="padding:24px 32px 16px 32px; position:sticky; top:0; background:#fff; z-index:10; border-bottom:1px solid var(--neutral-100);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 id="dbModalTitle" style="margin:0; font-size:18px; font-weight:700; color:var(--neutral-900);">✨ Tambah Kerja Sama</h3>
            </div>
            <button onclick="DatabasePage.closeModal()" style="background:none; border:none; cursor:pointer; font-size:13px; font-weight:600; color:var(--neutral-500); padding:0; margin-top:12px; display:flex; align-items:center; gap:4px;">✕ Tutup</button>
          </div>

          <form id="dbForm" novalidate onsubmit="DatabasePage.saveForm(event)" style="padding:24px 32px;">
            <input type="hidden" id="dbFormId" />
            
            <div style="display:flex; flex-direction:column; gap:20px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Kategori Mitra <span style="color:var(--danger-500)">*</span></label>
                <select class="form-select" id="dbKategori" required style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;">
                  <option value="">Pilih Kategori...</option>
                  <option>K/L</option>
                  <option>BUMN</option>
                  <option>Universitas</option>
                  <option>Pemda</option>
                  <option>Swasta</option>
                  <option>Ormas</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Nama Mitra <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="dbMitra" required placeholder="Contoh: PT Telkom" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Jenis Kerja Sama <span style="color:var(--danger-500)">*</span></label>
                <select class="form-select" id="dbJenis" required style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;">
                  <option value="">Pilih Jenis...</option>
                  <option>Perjanjian Kerja Sama</option>
                  <option>Nota Kesepahaman</option>
                  <option>Kesepakatan Bersama</option>
                  <option>Memorandum Saling Pengertian</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Nomor Dokumen</label>
                <input type="text" class="form-input" id="dbNoUtama" placeholder="Nomor Dokumen" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>
              
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Pihak 1 (KKP) <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="dbPihak1" required placeholder="Contoh: Dirjen PRL" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Nomor Pihak 1 <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="dbNoPihak1" required placeholder="Contoh: xx/xxx/xx/xx/2026" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Pihak 2 (Mitra) <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="dbPihak2" required placeholder="Contoh: Pemkab Bandung" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Nomor Pihak 2 <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="dbNoPihak2" required placeholder="Contoh: xx/xxx/xx/xx/2026" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Tanggal Mulai <span style="color:var(--danger-500)">*</span></label>
                <input type="date" class="form-input" id="dbTglMulai" required style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Berlaku Hingga <span style="color:var(--danger-500)">*</span></label>
                <input type="date" class="form-input" id="dbTglSelesai" required style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Masa Berlaku</label>
                <input type="text" class="form-input" id="dbMasaBerlaku" placeholder="Contoh: 5 Tahun" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Status <span style="color:var(--danger-500)">*</span></label>
                <select class="form-select" id="dbStatus" required style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;">
                  <option>Berlaku</option>
                  <option>Tidak Berlaku</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px; color:var(--neutral-700);">Import File Dokumen Pendukung (Opsional)</label>
                <div id="dbFileWrapper" style="border:2px dashed var(--neutral-300); border-radius:8px; padding:24px; text-align:center; cursor:pointer; transition: all 0.2s; background:var(--neutral-50);" onclick="document.getElementById('dbFileInput').click()">
                  <div id="dbFileContent">
                    <div style="font-size:24px; margin-bottom:8px; color:var(--neutral-400);">📄</div>
                    <div style="font-size:13px; font-weight:600; color:var(--primary-700); margin-bottom:4px;">Klik untuk memilih file</div>
                    <div style="font-size:11px; color:var(--neutral-400);">Mendukung file Excel, PDF, dan Word (Maksimal 10MB)</div>
                  </div>
                  <input type="file" id="dbFileInput" accept=".pdf,.doc,.docx,.xls,.xlsx" style="display:none;" onchange="DatabasePage.handleFileUpload(this)" />
                </div>
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:12px; font-weight:700; margin-bottom:8px;">Link Dokumen Web (Jika Ada)</label>
                <input type="url" class="form-input" id="dbLink" placeholder="https://..." style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--neutral-200); font-size:14px;" />
              </div>
            </div>
            
            <div style="display:flex; justify-content:flex-end; gap:16px; border-top:1px solid var(--neutral-100); padding-top:24px; margin-top:24px;">
              <button type="button" class="btn btn-ghost" onclick="DatabasePage.closeModal()" style="font-size:13px; font-weight:600; padding:10px 20px;">Batal</button>
              <button type="submit" class="btn btn-primary" style="padding:10px 24px; font-size:13px; font-weight:600; background:#0f172a; border:none; border-radius:8px; color:#fff; display:flex; align-items:center; gap:8px;">
                <span style="font-size:14px;">💾</span> Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  openModal(id) {
    const modal = document.getElementById('dbModal');
    if (!modal) return;
    document.getElementById('dbModalTitle').innerHTML = id ? '✨ Edit Kerja Sama' : '✨ Tambah Kerja Sama';
    document.getElementById('dbFormId').value = id || '';
    
    if (id) {
      const r = (MockData.databaseKerjaSama || []).find(x => x.id === id);
      if (r) {
        document.getElementById('dbKategori').value = r.kategoriMitra || '';
        document.getElementById('dbMitra').value = r.mitra || '';
        document.getElementById('dbJenis').value = r.jenisKerjasama || '';
        document.getElementById('dbNoUtama').value = r.noUtama || '';
        document.getElementById('dbPihak1').value = r.pihak1 || '';
        document.getElementById('dbNoPihak1').value = r.noPihak1 || '';
        document.getElementById('dbPihak2').value = r.pihak2 || '';
        document.getElementById('dbNoPihak2').value = r.noPihak2 || '';
        document.getElementById('dbTglMulai').value = this.parseDateToISO(r.tanggalMulai);
        document.getElementById('dbTglSelesai').value = this.parseDateToISO(r.tanggalSelesai);
        document.getElementById('dbMasaBerlaku').value = r.masaBerlaku || '';
        document.getElementById('dbStatus').value = r.status || 'Berlaku';
        document.getElementById('dbLink').value = r.linkDokumen || '';
      }
    } else {
      document.getElementById('dbForm').reset();
    }
    modal.style.display = 'flex';
  },

  closeModal() {
    const modal = document.getElementById('dbModal');
    if (modal) modal.style.display = 'none';
  },

  // Convert various date formats (M/D/YYYY, DD/MM/YYYY, etc.) → YYYY-MM-DD for <input type="date">
  parseDateToISO(dateStr) {
    if (!dateStr || dateStr === '-') return '';
    // Already in YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    // Try native parsing (handles M/D/YYYY, MM/DD/YYYY etc.)
    try {
      const d = new Date(dateStr);
      if (!isNaN(d)) return d.toISOString().split('T')[0];
    } catch (e) { }
    return '';
  },

  saveForm(e) {
    e.preventDefault();

    // Inline Validation
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

    const requiredFields = [
      { id: 'dbMitra', msg: 'Nama mitra wajib diisi' },
      { id: 'dbKategori', msg: 'Kategori mitra wajib dipilih' },
      { id: 'dbJenis', msg: 'Jenis kerja sama wajib diisi' },
      { id: 'dbTglMulai', msg: 'Tanggal mulai wajib diisi' },
      { id: 'dbTglSelesai', msg: 'Tanggal selesai wajib diisi' },
      { id: 'dbStatus', msg: 'Status wajib dipilih' }
    ];

    let isValid = true;
    requiredFields.forEach(field => {
      const el = document.getElementById(field.id);
      if (el && !el.value.trim()) {
        el.classList.add('is-invalid');
        const err = document.createElement('div');
        err.className = 'invalid-feedback';
        err.innerText = field.msg;
        el.parentNode.appendChild(err);
        isValid = false;
      }
    });

    if (!isValid) return;

    const id = document.getElementById('dbFormId').value;
    const tglMulai = document.getElementById('dbTglMulai').value;
    const autoTahun = tglMulai ? tglMulai.split('-')[0] : new Date().getFullYear().toString();

    const item = {
      id: id || 'KSM-' + Date.now(),
      tahun: autoTahun,
      kategoriMitra: document.getElementById('dbKategori').value,
      mitra: document.getElementById('dbMitra').value,
      jenisKerjasama: document.getElementById('dbJenis').value,
      noUtama: document.getElementById('dbNoUtama').value,
      pihak1: document.getElementById('dbPihak1').value,
      noPihak1: document.getElementById('dbNoPihak1').value,
      pihak2: document.getElementById('dbPihak2').value,
      noPihak2: document.getElementById('dbNoPihak2').value,
      tanggalMulai: tglMulai,
      tanggalSelesai: document.getElementById('dbTglSelesai').value,
      masaBerlaku: document.getElementById('dbMasaBerlaku').value,
      status: document.getElementById('dbStatus').value,
      linkDokumen: document.getElementById('dbLink').value,
    };

    if (!MockData.databaseKerjaSama) MockData.databaseKerjaSama = [];
    if (id) {
      const idx = MockData.databaseKerjaSama.findIndex(x => x.id === id);
      if (idx !== -1) MockData.databaseKerjaSama[idx] = item;
    } else {
      MockData.databaseKerjaSama.unshift(item);
    }

    this.saveToStorage();
    this.closeModal();
    App.showToast(id ? 'Data diperbarui!' : 'Data ditambahkan!', 'success');
    App.renderPage();
  },

  handleFileUpload(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran file maksimal 10MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentUploadedFile = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: e.target.result
        };
        const content = document.getElementById('dbFileContent');
        const wrapper = document.getElementById('dbFileWrapper');
        if (content && wrapper) {
            content.innerHTML = `
              <div style="font-size: 32px; margin-bottom: 12px;">✅</div>
              <div style="font-size: 14px; font-weight: 600; color: var(--success-600); margin-bottom: 4px;">${file.name}</div>
              <div style="font-size: 12px; color: var(--neutral-500);">Data telah dikonversi ke Base64 dan siap disimpan lokal.</div>
            `;
            wrapper.style.borderColor = 'var(--success-500)';
            wrapper.style.background = 'var(--success-50)';
        }
      };
      reader.readAsDataURL(file);
    }
  },

  deleteItem(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const idx = MockData.databaseKerjaSama.findIndex(x => x.id === id);
      if (idx !== -1) {
        MockData.databaseKerjaSama.splice(idx, 1);
        this.saveToStorage();
        App.showToast('Data berhasil dihapus', 'success');
        App.renderPage();
      }
    }
  },

  saveToStorage() {
    localStorage.setItem('db_kerja_sama_persistent', JSON.stringify(MockData.databaseKerjaSama));
  },

  exportToExcel() {
    if (typeof XLSX !== 'undefined') {
      const worksheet = XLSX.utils.json_to_sheet(MockData.databaseKerjaSama);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Database");
      XLSX.writeFile(workbook, `Database_Kerjasama_${new Date().toLocaleDateString()}.xlsx`);
    } else {
      App.showToast('Library Excel belum dimuat', 'error');
    }
  }
};
