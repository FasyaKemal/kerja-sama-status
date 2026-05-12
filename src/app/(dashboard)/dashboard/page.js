"use client";

import { useMemo, useState, useEffect, useRef } from 'react';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { hitungStatus, sisaHari, formatDateShort } from '@/lib/formatDate';

export default function Dashboard() {
  const router = useRouter();
  const { data, isLoading } = useData();
  const [filterTahun, setFilterTahun] = useState('all');
  const [filterKategori, setFilterKategori] = useState('all');
  const [dismissAlert, setDismissAlert] = useState(false);
  const chartRefs = useRef({});
  const goToDatabase = () => router.push('/database-kerja-sama');

  const db = useMemo(() => data.databaseKerjaSama ?? [], [data.databaseKerjaSama]);
  const kp = useMemo(() => data.kebijakanPrioritas ?? [], [data.kebijakanPrioritas]);

  const rawAllData = useMemo(() => {
    return [...db, ...kp];
  }, [db, kp]);

  const allData = useMemo(() => {
    let merged = rawAllData;
    if (filterTahun !== 'all') {
      merged = merged.filter(r => String(r.tahun || '').trim() === filterTahun);
    }
    if (filterKategori !== 'all') {
      merged = merged.filter(r => r.kategoriMitra === filterKategori);
    }
    return merged;
  }, [rawAllData, filterTahun, filterKategori]);

  const availableYears = [...new Set(allData.map(r => String(r.tahun || '').trim()).filter(y => /^20\d{2}$/.test(y)))].sort().reverse();
  const availableKategoris = [...new Set(allData.map(r => r.kategoriMitra).filter(Boolean))].sort();

  const totalMitra = new Set(allData.map(r => r.mitra)).size;
  const totalDokumen = allData.length;
  
  const statusCounts = allData.reduce((acc, item) => {
    const s = hitungStatus(item);
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, { 'Berlaku': 0, 'Tidak Berlaku': 0, 'Akan Berakhir': 0 });

  const berlakuCount = statusCounts['Berlaku'] + statusCounts['Akan Berakhir']; // Still active
  const pureBerlakuCount = statusCounts['Berlaku'];
  const akanBerakhirCount = statusCounts['Akan Berakhir'];
  const tidakBerlakuCount = statusCounts['Tidak Berlaku'];

  const urgentCount = allData.filter(r => {
    const diff = sisaHari(r.tanggalSelesai);
    return diff !== null && diff > 0 && diff <= 30;
  }).length;

  const nearingExpiry = allData.filter(r => {
    const diff = sisaHari(r.tanggalSelesai);
    return diff !== null && diff > 0 && diff <= 120;
  }).sort((a,b) => new Date(a.tanggalSelesai) - new Date(b.tanggalSelesai)).slice(0, 5);

  useEffect(() => {
    import('chart.js/auto').then((ChartModule) => {
      const Chart = ChartModule.default;
      const upsert = (key, ctx, cfg) => {
        if (!ctx) return;
        const existing = chartRefs.current[key];
        if (!existing) {
          chartRefs.current[key] = new Chart(ctx, cfg);
          return;
        }
        existing.config.type = cfg.type;
        existing.data.labels = cfg.data.labels;
        existing.data.datasets = cfg.data.datasets;
        existing.options = cfg.options;
        existing.update();
      };

      // Bar Chart (Trend)
      const yearCounts = {};
      allData.forEach(r => {
        const y = String(r.tahun || '').trim();
        if (/^20\d{2}$/.test(y)) yearCounts[y] = (yearCounts[y] || 0) + 1;
      });
      const trendLabels = Object.keys(yearCounts).sort();
      const trendData = trendLabels.map(y => yearCounts[y]);

      const trendCtx = document.getElementById('trendChart');
      if (trendCtx) {
        upsert('trend', trendCtx, {
          type: 'bar',
          data: {
            labels: trendLabels.length ? trendLabels : ['-'],
            datasets: [{
              label: 'Jumlah Dokumen',
              data: trendData.length ? trendData : [0],
              backgroundColor: (context) => {
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                if (!chartArea) return '#0ea5e9';
                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, '#0ea5e9');
                gradient.addColorStop(1, '#0C4A6E');
                return gradient;
              },
              hoverBackgroundColor: '#075985',
              borderRadius: 6,
              maxBarThickness: 48
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (e, activeEls) => {
              if (activeEls.length > 0) {
                const idx = activeEls[0].index;
                setFilterTahun(trendLabels[idx]);
              }
            },
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { borderDash: [4, 4], color: '#f1f5f9' }, ticks: { stepSize: 1 } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // Donut Chart
      const catCounts = {};
      allData.forEach(r => {
        const c = r.kategoriMitra || 'Lainnya';
        catCounts[c] = (catCounts[c] || 0) + 1;
      });
      const catLabels = Object.keys(catCounts);
      const catData = catLabels.map(c => catCounts[c]);
      
      const isMobile = window.innerWidth < 768;
      
      const donutCtx = document.getElementById('donutChart');
      if (donutCtx) {
        upsert('donut', donutCtx, {
          type: 'doughnut',
          data: {
            labels: catLabels.length ? catLabels : ['Belum ada data'],
            datasets: [{
              data: catData.length ? catData : [1],
              backgroundColor: catData.length ? [
                '#4338ca', // Indigo 700
                '#10b981', // Emerald 500
                '#f59e0b', // Amber 500
                '#f43f5e', // Rose 500
                '#8b5cf6', // Violet 500
                '#06b6d4', // Cyan 500
                '#64748b', // Slate 500
                '#ec4899'  // Pink 500
              ] : ['#e2e8f0'],
              borderWidth: 0,
              hoverOffset: 12
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: { 
              legend: { 
                position: isMobile ? 'bottom' : 'right', 
                labels: { 
                  usePointStyle: true, 
                  padding: isMobile ? 12 : 20, 
                  font: { size: 11, weight: '600' },
                  color: '#475569'
                } 
              } 
            }
          }
        });
      }

      // Status Polar
      const polarLabels = ['Berlaku', 'Tidak Berlaku', 'Akan Berakhir'];
      const polarData = [pureBerlakuCount, tidakBerlakuCount, akanBerakhirCount];

      const polarCtx = document.getElementById('statusPolarChart');
      if (polarCtx) {
        upsert('polar', polarCtx, {
          type: 'polarArea',
          data: {
            labels: Object.keys(statusCounts),
            datasets: [{
              data: polarData,
              backgroundColor: [
                'rgba(16, 185, 129, 0.8)', // Success
                'rgba(239, 68, 68, 0.8)',  // Danger
                'rgba(245, 158, 11, 0.8)'  // Warning
              ],
              borderColor: '#fff',
              borderWidth: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
              legend: { 
                position: isMobile ? 'bottom' : 'right', 
                labels: { usePointStyle: true, font: { size: 10 } } 
              } 
            },
            scales: { r: { ticks: { display: false } } }
          }
        });
      }

      // Top Mitra
      const mitraCounts = {};
      allData.forEach(r => { if (r.mitra) mitraCounts[r.mitra] = (mitraCounts[r.mitra] || 0) + 1; });
      const sortedMitra = Object.entries(mitraCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

      const topMitraCtx = document.getElementById('topMitraChart');
      if (topMitraCtx) {
        upsert('topMitra', topMitraCtx, {
          type: 'bar',
          data: {
            labels: sortedMitra.map(m => m[0].length > 20 ? m[0].substring(0, 20) + '...' : m[0]),
            datasets: [{
              label: 'Jumlah Kerja Sama',
              data: sortedMitra.map(m => m[1]),
              backgroundColor: (context) => {
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                if (!chartArea) return '#0284c7';
                const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                gradient.addColorStop(0, '#38bdf8');
                gradient.addColorStop(1, '#0284c7');
                return gradient;
              },
              borderRadius: 6,
              maxBarThickness: 30
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true, grid: { display: false }, ticks: { stepSize: 1 } }, y: { grid: { display: false }, ticks: { font: { size: 11 } } } }
          }
        });
      }
    });

    const currentCharts = chartRefs.current;
    return () => {
      Object.values(currentCharts).forEach(chart => chart && chart.destroy());
    };
  }, [allData, akanBerakhirCount, pureBerlakuCount, statusCounts, tidakBerlakuCount]);

  const exportReport = () => {
    import('html2pdf.js').then((html2pdfModule) => {
      const html2pdf = html2pdfModule.default;
      const element = document.getElementById('main-content');
      html2pdf().set({
        margin: [10, 10],
        filename: 'Laporan_Dashboard_Kerjasama_KKP.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      }).from(element).save();
    });
  };

  return (
    <div className="page-fade-in">
      <div className="page-header" style={{ marginBottom: 'clamp(16px, 5vw, 24px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
          <h1 className="page-title" style={{ margin: 0, fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 800 }}>Monev Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span style={{ color: 'var(--neutral-500)', fontSize: 'clamp(12px, 3vw, 14px)' }}>Monitoring Database Kerja Sama</span>
            <span style={{ color: 'var(--neutral-300)' }}>•</span>
            <span style={{ color: 'var(--primary-600)', fontSize: '12px', fontWeight: 700 }}>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end', width: '100%' }}>
          <button className="btn btn-ghost" style={{ border: '1px solid var(--neutral-300)', display: 'flex', alignItems: 'center', gap: '8px', flex: '0 1 auto', minHeight: '40px' }} onClick={exportReport}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span style={{ whiteSpace: 'nowrap' }}>Ekspor Laporan</span>
          </button>
          <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '0 1 auto' }}>
            <span style={{ fontSize: 'clamp(11px, 2vw, 13px)', fontWeight: 600, color: 'var(--neutral-700)', whiteSpace: 'nowrap' }}>Filter Tahun:</span>
            <select className="form-select" style={{ padding: '8px 12px', fontSize: 'clamp(11px, 2vw, 13px)', minWidth: '120px' }} onChange={(e) => setFilterTahun(e.target.value)} value={filterTahun}>
              <option value="all">Semua Tahun</option>
              {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '0 1 auto' }}>
            <span style={{ fontSize: 'clamp(11px, 2vw, 13px)', fontWeight: 600, color: 'var(--neutral-700)', whiteSpace: 'nowrap' }}>Kategori:</span>
            <select className="form-select" style={{ padding: '8px 12px', fontSize: 'clamp(11px, 2vw, 13px)', minWidth: '140px' }} onChange={(e) => setFilterKategori(e.target.value)} value={filterKategori}>
              <option value="all">Semua Kategori</option>
              {availableKategoris.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>
      </div>

      {urgentCount > 0 && !dismissAlert && (
        <div style={{ marginBottom: '24px', padding: '16px 20px', background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)', border: '1px solid #fecaca', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 12px rgba(239,68,68,0.1)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#b91c1c', fontSize: '14px', marginBottom: '2px' }}>Perhatian! Terdapat {urgentCount} dokumen yang akan berakhir dalam 30 hari</div>
            <div style={{ fontSize: '12px', color: '#dc2626' }}>Segera lakukan peninjauan untuk proses perpanjangan kerja sama.</div>
          </div>
          <button onClick={() => setDismissAlert(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: '4px', display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}

      <div className="dashboard-stats-grid" style={{ marginBottom: 'clamp(24px, 5vw, 32px)', gap: '24px' }}>
        {/* Card 1: Total Mitra */}
        <div className="card fade-in-up" style={{ 
          padding: '24px', 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
          color: '#fff', 
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)', 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: '20px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          animationDelay: '0s'
        }}>
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.15, color: '#38bdf8' }}>
            <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line></svg>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Total Mitra</div>
            <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '4px', letterSpacing: '-0.02em' }}>{totalMitra}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Entitas unik terdaftar</div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}></div>
        </div>

        {/* Card 2: Total Dokumen */}
        <div className="card fade-in-up" style={{ 
          padding: '24px', 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: '20px',
          animationDelay: '0.1s'
        }}>
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.1, color: 'var(--primary-600)' }}>
            <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neutral-500)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Total Dokumen</div>
            <div className="page-title" style={{ fontSize: '36px', fontWeight: 800, marginBottom: '4px', letterSpacing: '-0.02em' }}>{totalDokumen}</div>
            <div style={{ fontSize: '12px', color: 'var(--neutral-400)', fontWeight: 500 }}>NK, PKS, dan MSP</div>
          </div>
        </div>

        {/* Card 3: Status Berlaku */}
        <div className="card fade-in-up"
          role="button"
          tabIndex={0}
          onClick={goToDatabase}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToDatabase(); }}
          style={{ 
          padding: '24px', 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: '20px',
          animationDelay: '0.2s',
          cursor: 'pointer'
        }}>
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.1, color: 'var(--success-600)' }}>
            <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neutral-500)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Status Berlaku</div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--success-600)', marginBottom: '4px', letterSpacing: '-0.02em' }}>{berlakuCount}</div>
            <div style={{ fontSize: '12px', color: 'var(--success-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success-500)', display: 'inline-block' }}></span>
              Sedang berjalan
            </div>
          </div>
        </div>

        {/* Card 4: Tidak Berlaku */}
        <div className="card fade-in-up"
          role="button"
          tabIndex={0}
          onClick={goToDatabase}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToDatabase(); }}
          style={{ 
          padding: '24px', 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: '20px',
          animationDelay: '0.25s',
          cursor: 'pointer'
        }}>
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.08, color: 'var(--danger-600)' }}>
            <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neutral-500)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Tidak Berlaku</div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--danger-600)', marginBottom: '4px', letterSpacing: '-0.02em' }}>{tidakBerlakuCount}</div>
            <div style={{ fontSize: '12px', color: 'var(--danger-500)', fontWeight: 500 }}>Sudah berakhir</div>
          </div>
        </div>

        {/* Card 5: Akan Berakhir */}
        <div className="card fade-in-up"
          role="button"
          tabIndex={0}
          onClick={goToDatabase}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToDatabase(); }}
          style={{ 
          padding: '24px', 
          background: 'linear-gradient(135deg, #fffcf0 0%, #fef9c3 100%)',
          border: '1px solid #fde047',
          boxShadow: '0 10px 25px -5px rgba(234,179,8,0.15)', 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: '20px',
          animationDelay: '0.3s',
          cursor: 'pointer'
        }}>
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.1, color: 'var(--warning-600)' }}>
            <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--warning-700)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Akan Berakhir</div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--warning-600)', marginBottom: '4px', letterSpacing: '-0.02em' }}>{akanBerakhirCount}</div>
            <div style={{ fontSize: '12px', color: 'var(--warning-700)', fontWeight: 500 }}>Dalam 90 hari ke depan</div>
          </div>
        </div>
      </div>
      <div className="dashboard-charts-grid" style={{ marginBottom: 'clamp(20px, 5vw, 32px)' }}>
        <div className="card fade-in" style={{ padding: 'clamp(16px, 4vw, 24px)', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(16px, 4vw, 24px)', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              Tren Pertumbuhan Kerja Sama
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--primary-600)', background: 'var(--primary-50)', padding: '4px 10px', borderRadius: '20px', fontWeight: 700, whiteSpace: 'nowrap' }}>Data Historis</span>
          </div>
          <div style={{ position: 'relative', minHeight: '250px', width: '100%', height: 'auto' }}>
            <canvas id="trendChart" style={{ maxHeight: '320px' }}></canvas>
          </div>
        </div>
        <div className="card fade-in" style={{ padding: 'clamp(16px, 4vw, 24px)', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ margin: '0 0 clamp(16px, 4vw, 24px) 0', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line></svg>
            Distribusi Kategori Mitra
          </h3>
          <div style={{ position: 'relative', minHeight: '250px', width: '100%', display: 'flex', justifyContent: 'center', height: 'auto' }}>
            <canvas id="donutChart" style={{ maxHeight: '320px' }}></canvas>
          </div>
        </div>
      </div>

      <div className="dashboard-charts-grid-equal" style={{ marginBottom: 'clamp(20px, 5vw, 32px)' }}>
        <div className="card fade-in" style={{ padding: 'clamp(16px, 4vw, 24px)', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ margin: '0 0 clamp(16px, 4vw, 24px) 0', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            Status & Jenis Kerja Sama
          </h3>
          <div style={{ position: 'relative', minHeight: '240px', width: '100%', height: 'auto' }}>
            <canvas id="statusPolarChart" style={{ maxHeight: '300px' }}></canvas>
          </div>
        </div>
        <div className="card fade-in" style={{ padding: 'clamp(16px, 4vw, 24px)', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ margin: '0 0 clamp(16px, 4vw, 24px) 0', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55-.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            Top 5 Mitra Teraktif
          </h3>
          <div style={{ position: 'relative', minHeight: '240px', width: '100%', height: 'auto' }}>
            <canvas id="topMitraChart" style={{ maxHeight: '300px' }}></canvas>
          </div>
        </div>
      </div>

      <div className="dashboard-charts-grid" style={{ marginBottom: 'clamp(20px, 5vw, 32px)' }}>
        <div className="card fade-in" style={{ padding: 'clamp(16px, 4vw, 24px)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(12px, 3vw, 16px)', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, flex: 1 }}>
              Dokumen Mendekati Akhir
            </h3>
            <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }} onClick={() => router.push('/database-kerja-sama')}>
              Lihat Semua
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
          {nearingExpiry.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'clamp(24px, 5vw, 40px) 20px', background: 'var(--neutral-50)', borderRadius: '12px', marginTop: '16px' }}>
              <div style={{ opacity: 0.5, marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--success-700)', fontWeight: 700 }}>Semua Terkendali!</h4>
              <p style={{ color: 'var(--neutral-600)', fontSize: 'clamp(12px, 2vw, 14px)', margin: 0 }}>Tidak ada dokumen kerja sama yang mendekati masa kedaluwarsa dalam 4 bulan ke depan.</p>
            </div>
          ) : (
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', marginTop: '16px' }}>
              <table className="table" style={{ fontSize: 'clamp(11px, 2vw, 13px)', width: '100%', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: 'var(--neutral-50)' }}>
                    <th style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(10px, 2vw, 11px)' }}>Nama Mitra</th>
                    <th style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(10px, 2vw, 11px)' }}>Kategori</th>
                    <th style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(10px, 2vw, 11px)' }}>Jenis Kerja Sama</th>
                    <th style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(10px, 2vw, 11px)' }}>Masa Berlaku</th>
                    <th style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(10px, 2vw, 11px)' }}>Sisa Hari</th>
                    <th style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(10px, 2vw, 11px)' }}>Status</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: 'clamp(10px, 2vw, 11px)' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {nearingExpiry.map((r, i) => {
                    const diff = Math.ceil((new Date(r.tanggalSelesai) - new Date()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                        <td style={{ padding: '12px 10px', fontSize: 'clamp(11px, 2vw, 13px)' }}><strong>{r.mitra}</strong></td>
                        <td style={{ padding: '12px 10px', fontSize: 'clamp(11px, 2vw, 13px)' }}>
                          <span className="badge badge-info" style={{ fontSize: '10px' }}>{r.kategoriMitra || '-'}</span>
                        </td>
                        <td style={{ padding: '12px 10px', fontSize: 'clamp(11px, 2vw, 13px)' }}>{r.jenisKerjasama || '-'}</td>
                        <td style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(11px, 2vw, 13px)' }}>
                          {formatDateShort(r.tanggalSelesai)}
                        </td>
                        <td style={{ padding: '12px 10px', fontSize: 'clamp(11px, 2vw, 13px)' }}><span style={{ fontWeight: 700, color: diff <= 30 ? 'var(--danger-600)' : 'var(--warning-600)' }}>{diff} Hari</span></td>
                        <td style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontSize: 'clamp(11px, 2vw, 13px)' }}>
                          <span className={`badge badge-${diff <= 30 ? 'danger' : 'warning'}`} style={{ fontSize: 'clamp(9px, 1.5vw, 10px)' }}>Akan Berakhir</span>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                          <button className="btn btn-primary btn-sm" style={{ fontSize: 'clamp(10px, 2vw, 11px)', padding: '6px 10px', borderRadius: 'var(--radius-md)', background: 'var(--primary-700)', border: 'none', whiteSpace: 'nowrap' }} onClick={() => router.push('/database-kerja-sama')}>Perbarui Data</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card fade-in" style={{ padding: 'clamp(16px, 4vw, 24px)' }}>
          <h3 style={{ margin: '0 0 clamp(12px, 3vw, 20px) 0', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, color: 'var(--primary-900)' }}>
            Progress Penyusunan
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 16px)' }}>
            {!data.progressDokumen || data.progressDokumen.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 20px', background: 'var(--neutral-50)', borderRadius: '12px' }}>
                <p style={{ margin: 0, color: 'var(--neutral-500)', fontSize: '13px' }}>Belum ada data progress penyusunan dokumen.</p>
              </div>
            ) : (
              data.progressDokumen.slice(0, 4).map((p, i) => {
                const color = p.progress >= 80 ? 'success' : p.progress >= 40 ? 'primary' : 'warning';
                const colorHex = p.progress >= 80 ? '#10b981' : p.progress >= 40 ? '#3b82f6' : '#f59e0b';
                const timelineSteps = [
                  'Surat Penyusunan/Perpanjangan','Disposisi','Pembahasan Naskah (3H)','Surat ke Mitra (1H)',
                  'Masukan dari Mitra (3H)','Memo Rokum Roren - Masukan (1H)','Memo Rokum Roren - Final (3H)',
                  'Memo Roren Sekjen (2H)','Memo Sekjen MKP (1H)','Penandatanganan Final'
                ];
                const stepLabel = p.step && timelineSteps[p.step - 1] ? timelineSteps[p.step - 1] : `Tahap ${p.step}`;
                return (
                  <div key={i} style={{ padding: 'clamp(10px, 2vw, 14px)', background: 'var(--neutral-50)', borderRadius: '12px', border: '1px solid var(--neutral-100)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: 'clamp(12px, 2vw, 13px)', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%', whiteSpace: 'nowrap' }}>{p.mitra}</span>
                      <span style={{ fontSize: 'clamp(11px, 2vw, 12px)', fontWeight: 800, color: colorHex, whiteSpace: 'nowrap' }}>{p.progress}%</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--neutral-500)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.judul || 'Dokumen Kerja Sama'}
                    </div>
                    <div style={{ height: '8px', background: 'var(--neutral-200)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${p.progress}%`, background: `linear-gradient(90deg, ${colorHex}99, ${colorHex})`, borderRadius: '4px', transition: 'width 1s ease-out' }}></div>
                    </div>
                    <div style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: 'var(--neutral-500)', marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ background: 'var(--neutral-200)', padding: '2px 8px', borderRadius: '20px', fontWeight: 600, fontSize: '10px' }}>Tahap {p.step}: {stepLabel}</span>
                      <span>{p.update}</span>
                    </div>
                  </div>
                );
              })
            )}
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }} onClick={() => router.push('/progress-dokumen')}>
              Lihat Semua Progress
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
