"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header({ toggleMobileMenu }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setDropdownOpen(false); // Close dropdown
    setShowLogoutModal(true);
  };

  const executeLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem('kinerjaku_loggedIn');
    localStorage.removeItem('kinerjaku_user');
    router.push('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-hamburger" onClick={toggleMobileMenu} aria-label="Menu">☰</button>
      </div>
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="user-profile-wrapper">
          <div className="user-profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="user-avatar">A</div>
            <div className="user-info-text">
              <div className="user-name">Admin</div>
              <div className="user-role">Super Admin</div>
            </div>
            <span className="chevron-down">▾</span>
          </div>
          <div id="profile-dropdown" className={`header-dropdown ${dropdownOpen ? 'show' : ''}`}>
            <a href="#"><span className="icon">👤</span> Profil Saya</a>
            <a href="#"><span className="icon">⚙️</span> Pengaturan</a>
            <hr />
            <button onClick={handleLogoutClick} className="w-full text-left" style={{ color: 'var(--red-500)', background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="icon">🚪</span> Keluar
            </button>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
    </header>
  );
}
