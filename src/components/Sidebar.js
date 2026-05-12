import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const defaultUserData = {
  fullName: 'admin',
  role: 'Administrator'
};

function subscribeUserData(callback) {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener('storage', callback);
  window.addEventListener('profileUpdated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('profileUpdated', callback);
  };
}

function getUserSnapshot() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('kinerjaku_user') || '';
}

function parseUserData(userJson) {
  if (!userJson) return defaultUserData;
  try {
    const parsed = JSON.parse(userJson);
    return {
      fullName: parsed.fullName || defaultUserData.fullName,
      role: parsed.role || defaultUserData.role
    };
  } catch (e) {
    console.error("Gagal memuat profil");
    return defaultUserData;
  }
}

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed }) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Avoid hydration mismatch: first render (server + client hydration) uses defaultUserData.
  // After hydration, this store causes a re-render with localStorage values.
  const userJson = useSyncExternalStore(subscribeUserData, getUserSnapshot, () => '');
  const userData = useMemo(() => parseUserData(userJson), [userJson]);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    if (!profileDropdownOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setProfileDropdownOpen(false);
    };
    const onPointerDown = (e) => {
      const menuEl = profileMenuRef.current;
      const buttonEl = profileButtonRef.current;
      if (!menuEl || !buttonEl) return;
      if (menuEl.contains(e.target) || buttonEl.contains(e.target)) return;
      setProfileDropdownOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [profileDropdownOpen]);

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setProfileDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const executeLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem('kinerjaku_loggedIn');
    localStorage.removeItem('kinerjaku_user');
    router.push('/login');
  };

  const menuItems = [
    { id: '/dashboard', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>, label: 'Monev Dashboard' },
    { id: '/database-kerja-sama', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>, label: 'Database Kerja Sama' },
    { id: '/kebijakan-prioritas', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>, label: 'Dukungan Kebijakan Prioritas' },
    { id: '/progress-dokumen', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>, label: 'Progress Penyusunan Dokumen' },
  ];

  return (
    <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!sidebarCollapsed && (
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <Image src="/logo-kkp.png" alt="Logo KKP" width={40} height={40} style={{ height: 'auto', marginRight: '8px' }} priority />
            </div>
            <div>
              <div className="sidebar-brand-text">Database Kerja Sama</div>
              <div className="sidebar-brand-sub">Biro Perencanaan KKP</div>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Image src="/logo-kkp.png" alt="Logo KKP" width={32} height={32} style={{ height: 'auto' }} priority />
          </div>
        )}
      </div>
      <nav className="sidebar-nav">
        {!sidebarCollapsed && <div className="sidebar-section-label">Menu Utama</div>}
        {menuItems.map(item => {
          const isActive = pathname === item.id || (pathname === '/' && item.id === '/dashboard');
          return (
            <Link key={item.id} href={item.id} className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              <span className="sidebar-item-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="sidebar-item-label">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className="sidebar-footer" style={{ padding: '16px', position: 'relative', marginTop: 'auto' }}>
        {profileDropdownOpen && (
          <div ref={profileMenuRef} role="menu" style={{ position: 'absolute', bottom: '100%', left: '0', right: '0', marginBottom: '8px', background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', zIndex: 100 }}>
            <button role="menuitem" onClick={() => { setProfileDropdownOpen(false); router.push('/profil'); }} aria-label="Buka halaman profil pengguna" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.15s ease' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Profile</span>
            </button>
            <button role="menuitem" onClick={handleLogoutClick} aria-label="Keluar dari aplikasi" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Logout</span>
            </button>
          </div>
        )}
        <button ref={profileButtonRef} onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} aria-label={profileDropdownOpen ? 'Tutup menu profil' : 'Buka menu profil'} aria-expanded={profileDropdownOpen} aria-haspopup="true" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', background: 'transparent', borderRadius: '0', cursor: 'pointer', border: 'none', transition: 'background 0.2s', width: '100%', textAlign: 'left' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#00bcd4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, fontSize: '16px' }} aria-label={`Avatar ${userData.fullName}`}>{userData.fullName.substring(0, 1).toUpperCase()}</div>
          {!sidebarCollapsed && (
            <>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userData.fullName}</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userData.role}</div>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: profileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </>
          )}
        </button>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-content" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '32px 24px', background: '#fff', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 800, color: 'var(--neutral-900)' }}>Konfirmasi Keluar</h3>
            <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: 'var(--neutral-600)', lineHeight: '1.5' }}>Apakah Anda yakin ingin keluar dari aplikasi?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button className="btn btn-ghost" onClick={() => setShowLogoutModal(false)} style={{ padding: '12px 24px', fontWeight: 600, fontSize: '14px', borderRadius: '10px' }}>Batal</button>
              <button className="btn btn-primary" onClick={executeLogout} style={{ padding: '12px 24px', background: 'var(--danger-600)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px' }}>Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
