"use client";

import { useState, useEffect, useRef } from 'react';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const { data, isLoading } = useData();
  const [filterTahun, setFilterTahun] = useState('all');
  const chartRefs = useRef({});

  const db = data.databaseKerjaSama || [];
  const kp = data.kebijakanPrioritas || [];
  let allData = [...db, ...kp];

  const availableYears = [...new Set(allData.map(r => String(r.tahun || '').trim()).filter(y => /^20\d{2}$/.test(y)))].sort().reverse();

  if (filterTahun !== 'all') {
    allData = allData.filter(r => String(r.tahun || '').trim() === filterTahun);
  }

  const totalMitra = new Set(allData.map(r => r.mitra)).size;
  const totalDokumen = allData.length;
  const aktifCount = allData.filter(r => r.status && r.status.toLowerCase().includes('berlaku') && !r.status.toLowerCase().includes('tidak')).length;
  const akanBerakhirCount = allData.filter(r => {
    if (!r.tanggalSelesai || r.tanggalSelesai === '-') return false;
    const end = new Date(r.tanggalSelesai);
    if (isNaN(end)) return false;
    const diff = (end - new Date()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 90;
  }).length;

  const nearingExpiry = allData.filter(r => {
    if (!r.tanggalSelesai || r.tanggalSelesai === '-') return false;
    const end = new Date(r.tanggalSelesai);
    const diff = (end - new Date()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 120;
  }).sort((a,b) => new Date(a.tanggalSelesai) - new Date(b.tanggalSelesai)).slice(0, 5);

  useEffect(() => {
    import('chart.js/auto').then((ChartModule) => {
      const Chart = ChartModule.default;
      
      Object.values(chartRefs.current).forEach(chart => chart && chart.destroy());

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
        chartRefs.current.trend = new Chart(trendCtx, {
          type: 'bar',
          data: {
            labels: trendLabels.length ? trendLabels : ['-'],
            datasets: [{
              label: 'Jumlah Dokumen',
              data: trendData.length ? trendData : [0],
              backgroundColor: '#0ea5e9',
              hoverBackgroundColor: '#0284c7',
              borderRadius: 4,
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
      
      const donutCtx = document.getElementById('donutChart');
      if (donutCtx) {
        chartRefs.current.donut = new Chart(donutCtx, {
          type: 'doughnut',
          data: {
            labels: catLabels.length ? catLabels : ['Belum ada data'],
            datasets: [{
              data: catData.length ? catData : [1],
              backgroundColor: catData.length ? ['#0C4A6E', '#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'] : ['#e2e8f0'],
              borderWidth: 2,
              borderColor: '#ffffff',
              hoverOffset: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: { legend: { position: 'right', labels: { usePointStyle: true, padding: 16, font: { size: 11 } } } }
          }
        });
      }

      // Status Polar
      const statusCounts = { 'Berlaku': 0, 'Tidak Berlaku': 0, 'Lainnya': 0 };
      allData.forEach(r => {
        const s = String(r.status || '').toLowerCase();
        if (s.includes('berlaku') && !s.includes('tidak')) statusCounts['Berlaku']++;
        else if (s.includes('tidak')) statusCounts['Tidak Berlaku']++;
        else statusCounts['Lainnya']++;
      });

      const polarCtx = document.getElementById('statusPolarChart');
      if (polarCtx) {
        chartRefs.current.polar = new Chart(polarCtx, {
          type: 'polarArea',
          data: {
            labels: Object.keys(statusCounts),
            datasets: [{
              data: Object.values(statusCounts),
              backgroundColor: ['rgba(16, 185, 129, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(100, 116, 139, 0.7)'],
              borderColor: '#fff',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { usePointStyle: true, font: { size: 11 } } } },
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
        chartRefs.current.topMitra = new Chart(topMitraCtx, {
          type: 'bar',
          data: {
            labels: sortedMitra.map(m => m[0].length > 20 ? m[0].substring(0, 20) + '...' : m[0]),
            datasets: [{
              label: 'Jumlah Kerja Sama',
              data: sortedMitra.map(m => m[1]),
              backgroundColor: 'rgba(2, 132, 199, 0.8)',
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

    return () => {
      Object.values(chartRefs.current).forEach(chart => chart && chart.destroy());
    };
  }, [allData]);

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
    <div id="main-content" style={{ padding: '24px', animation: 'fadeIn 0.3s ease-out' }}>
      <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: 'var(--neutral-900)' }}>Monev Dashboard</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--neutral-500)', fontSize: '14px' }}>Monitoring Database Kerja Sama</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn btn-ghost" style={{ border: '1px solid var(--neutral-300)' }} onClick={exportReport}>📄 Ekspor Laporan</button>
          <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)' }}>Filter Tahun:</span>
            <select className="form-select" style={{ minWidth: '140px', padding: '8px 12px', fontSize: '13px' }} onChange={(e) => setFilterTahun(e.target.value)} value={filterTahun}>
              <option value="all">Semua Tahun</option>
              {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-stats-grid" style={{ marginBottom: '32px' }}>
        <div className="card fade-in" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--primary-900) 0%, #082235 100%)', color: '#fff', border: 'none', boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.1 }}>🏢</div>
          <div style={{ fontSize: '13px', fontWeight: 600, opacity: 0.7, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Mitra</div>
          <div style={{ fontSize: '32px', fontWeight: 800 }}>{totalMitra}</div>
          <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '8px' }}>Entitas unik terdaftar</div>
        </div>
        <div className="card fade-in" style={{ padding: '24px', background: 'linear-gradient(135deg, #fff 0%, var(--primary-50) 100%)', border: '1px solid var(--neutral-100)', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>📄</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--neutral-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Dokumen</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-900)' }}>{totalDokumen}</div>
          <div style={{ fontSize: '11px', color: 'var(--neutral-400)', marginTop: '8px' }}>NK, PKS, dan MSP</div>
        </div>
        <div className="card fade-in" style={{ padding: '24px', background: 'linear-gradient(135deg, #fff 0%, var(--success-50) 100%)', border: '1px solid var(--neutral-100)', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>✅</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--neutral-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status Aktif</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--success-600)' }}>{aktifCount}</div>
          <div style={{ fontSize: '11px', color: 'var(--success-500)', marginTop: '8px' }}>Sedang berjalan</div>
        </div>
        <div className="card fade-in" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'linear-gradient(135deg, #fff 0%, var(--warning-100) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>🕒</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--neutral-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Akan Berakhir</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--warning-600)' }}>{akanBerakhirCount}</div>
          <div style={{ fontSize: '11px', color: 'var(--warning-500)', marginTop: '8px' }}>Dalam 90 hari ke depan</div>
        </div>
      </div>

      <div className="dashboard-charts-grid" style={{ marginBottom: '32px' }}>
        <div className="card fade-in" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--primary-900)' }}>📈 Tren Pertumbuhan Kerja Sama</h3>
            <span style={{ fontSize: '11px', color: 'var(--primary-600)', background: 'var(--primary-50)', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>Data Historis</span>
          </div>
          <div style={{ position: 'relative', height: '320px', width: '100%' }}>
            <canvas id="trendChart"></canvas>
          </div>
        </div>
        <div className="card fade-in" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 700, color: 'var(--primary-900)' }}>🏢 Distribusi Kategori Mitra</h3>
          <div style={{ position: 'relative', height: '320px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <canvas id="donutChart"></canvas>
          </div>
        </div>
      </div>

      <div className="dashboard-charts-grid-equal" style={{ marginBottom: '32px' }}>
        <div className="card fade-in" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 700, color: 'var(--primary-900)' }}>📊 Status & Jenis Kerja Sama</h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <canvas id="statusPolarChart"></canvas>
          </div>
        </div>
        <div className="card fade-in" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 700, color: 'var(--primary-900)' }}>🏆 Top 5 Mitra Teraktif</h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <canvas id="topMitraChart"></canvas>
          </div>
        </div>
      </div>

      <div className="dashboard-charts-grid" style={{ marginBottom: '32px' }}>
        <div className="card fade-in" style={{ padding: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '400px', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>⚠️ Dokumen Mendekati Akhir</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => router.push('/kebijakan-prioritas')}>Lihat Semua ➔</button>
          </div>
          {nearingExpiry.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--neutral-50)', borderRadius: '12px', marginTop: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--success-700)', fontWeight: 700 }}>Semua Terkendali!</h4>
              <p style={{ color: 'var(--neutral-600)', fontSize: '14px', margin: 0 }}>Tidak ada dokumen kerja sama yang mendekati masa kedaluwarsa dalam 4 bulan ke depan.</p>
            </div>
          ) : (
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
              <table className="table" style={{ fontSize: '13px', width: '100%', minWidth: '700px', marginTop: '16px' }}>
                <thead>
                  <tr style={{ background: 'var(--neutral-50)' }}>
                    <th style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Nama Mitra</th>
                    <th style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Jenis Kerja Sama</th>
                    <th style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Masa Berlaku</th>
                    <th style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Sisa Hari</th>
                    <th style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {nearingExpiry.map((r, i) => {
                    const diff = Math.ceil((new Date(r.tanggalSelesai) - new Date()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                        <td style={{ padding: '16px' }}><strong>{r.mitra}</strong></td>
                        <td style={{ padding: '16px' }}>{r.jenisKerjasama || '-'}</td>
                        <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>{r.tanggalSelesai}</td>
                        <td style={{ padding: '16px' }}><span style={{ fontWeight: 700, color: diff <= 30 ? 'var(--danger-600)' : 'var(--warning-600)' }}>{diff} Hari</span></td>
                        <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                          <span className={`badge badge-${diff <= 30 ? 'danger' : 'warning'}`}>● {diff <= 30 ? 'Segera Berakhir' : 'Akan Berakhir'}</span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button className="btn btn-primary btn-sm" style={{ fontSize: '11px', padding: '6px 12px', borderRadius: 'var(--radius-md)', background: 'var(--primary-700)', border: 'none', whiteSpace: 'nowrap' }} onClick={() => router.push('/database-kerja-sama')}>Perbarui Data</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card fade-in" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 700, color: 'var(--primary-900)' }}>📈 Progress Penyusunan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(data.progressDokumen || []).slice(0, 4).map((p, i) => {
              let color = p.progress >= 80 ? 'success' : p.progress >= 40 ? 'primary' : 'warning';
              return (
                <div key={i} style={{ padding: '12px', background: 'var(--neutral-50)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{p.mitra}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: `var(--${color}-600)` }}>{p.progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--neutral-200)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.progress}%`, background: `var(--${color}-500)` }}></div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--neutral-500)', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tahap {p.step}</span>
                    <span>{p.update}</span>
                  </div>
                </div>
              );
            })}
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '8px' }} onClick={() => router.push('/progress-dokumen')}>Lihat Semua Progress ➔</button>
          </div>
        </div>
      </div>
    </div>
  );
}
