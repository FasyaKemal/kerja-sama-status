"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className={`app-layout ${mobileMenuOpen ? 'mobile-menu-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-hover-zone" id="sidebar-hover-zone"></div>
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Header toggleMobileMenu={toggleMobileMenu} />
      <div className="main-content page-fade-in" id="main-content" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>
        {children}
      </div>
      {mobileMenuOpen && (
        <div className="sidebar-overlay" style={{ display: 'block', opacity: 1, pointerEvents: 'auto' }} onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </div>
  );
}
