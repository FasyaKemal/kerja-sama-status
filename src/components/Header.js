"use client";

function getCurrentDateLabel() {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const now = new Date();

  return {
    label: `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
    iso: now.toISOString().split('T')[0],
  };
}

export default function Header({ toggleMobileMenu, toggleSidebar }) {
  const currentDate = getCurrentDateLabel();

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
            <line x1="4" y1="10.5" x2="20" y2="10.5"></line>
            <line x1="4" y1="14" x2="20" y2="14"></line>
            <line x1="4" y1="17.5" x2="20" y2="17.5"></line>
          </svg>
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="header-date">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <time dateTime={currentDate.iso}>
            {currentDate.label}
          </time>
        </div>
      </div>
    </header>
  );
}
