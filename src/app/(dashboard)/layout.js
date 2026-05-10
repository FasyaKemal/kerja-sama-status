"use client";

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`app-layout ${mobileMenuOpen ? 'mobile-menu-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-hover-zone" id="sidebar-hover-zone"></div>
      <Sidebar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        sidebarCollapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />
      <Header toggleMobileMenu={toggleMobileMenu} toggleSidebar={toggleSidebar} />
      <div className="main-content page-fade-in" id="main-content" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>
        {children}
      </div>
      {isMobile && mobileMenuOpen && (
        <div 
          className="sidebar-overlay" 
          style={{ 
            display: 'block', 
            opacity: 1, 
            pointerEvents: 'auto',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 90
          }} 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
