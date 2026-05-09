"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
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
    <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <img src="/logo-kkp.png" alt="Logo KKP" style={{ width: '40px', height: 'auto', marginRight: '8px' }} />
          </div>
          <div>
            <div className="sidebar-brand-text">Database Kerja Sama</div>
            <div className="sidebar-brand-sub">Biro Perencanaan KKP</div>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Menu Utama</div>
        {menuItems.map(item => {
          const isActive = pathname === item.id || (pathname === '/' && item.id === '/dashboard');
          return (
            <Link key={item.id} href={item.id} className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="sidebar-item-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogoutClick} className="sidebar-item w-full text-left bg-transparent border-none cursor-pointer">
          <span className="sidebar-item-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></span>
          <span className="sidebar-item-label">Keluar</span>
        </button>
      </div>
      <div className="sidebar-wave"></div>

      {showLogoutModal && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-content" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '32px 24px', background: '#fff', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚪</div>
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
