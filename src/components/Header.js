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
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className="hamburger-btn"
          onClick={handleHamburgerClick}
          aria-label="Toggle navigation menu"
          aria-expanded="false"
          title="Buka/tutup menu navigasi"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="22" 
            height="22" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="4" y1="10.5" x2="20" y2="10.5"></line>\n            <line x1="4" y1="14" x2="20" y2="14"></line>\n            <line x1="4" y1="17.5" x2="20" y2="17.5"></line>\n          </svg>\n        </button>\n      </div>\n      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>\n        <div className=\"header-date\">\n          <svg \n            viewBox=\"0 0 24 24\" \n            width=\"18\" \n            height=\"18\" \n            fill=\"none\" \n            stroke=\"currentColor\" \n            strokeWidth=\"2\" \n            strokeLinecap=\"round\" \n            strokeLinejoin=\"round\"\n            aria-hidden=\"true\"\n          >\n            <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n            <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line>\n            <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line>\n            <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>\n          </svg>\n          <time dateTime={new Date().toISOString().split('T')[0]}>\n            {currentDate}\n          </time>\n        </div>\n      </div>\n    </header>\n  );
}
