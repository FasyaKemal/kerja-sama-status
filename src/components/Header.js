"use client";

import { useState, useEffect } from 'react';

export default function Header({ toggleMobileMenu, toggleSidebar }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    setCurrentDate(`${day}, ${date} ${month} ${year}`);
  }, []);

  const handleHamburgerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Only toggle sidebar for desktop (wide screens)
    // Mobile menu toggle is handled separately or by screen width
    if (window.innerWidth > 992) {
      if (toggleSidebar) toggleSidebar();
    } else {
      if (toggleMobileMenu) toggleMobileMenu();
    }
  };

  return (
    <div style={{
      gridArea: 'header',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: '#ffffff',
      height: '64px',
      borderBottom: '1px solid #e2e8f0',
      position: 'relative',
      zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={handleHamburgerClick}
          aria-label="Menu"
          style={{
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '12px',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#334155',
            cursor: 'pointer',
            padding: 0,
            margin: 0,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="4" y1="10.5" x2="20" y2="10.5"></line>
            <line x1="4" y1="14" x2="20" y2="14"></line>
            <line x1="4" y1="17.5" x2="20" y2="17.5"></line>
          </svg>
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', fontWeight: 500 }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          {currentDate}
        </div>
      </div>
    </div>
  );
}
