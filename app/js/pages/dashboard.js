/* ============================================
   KinerjaKu Next — Dashboard Kerja Sama
   ============================================ */

const DashboardPage = {
  state: {
    filterTahun: 'all',
  },

  handleFilter(key, value) {
    this.state[key] = value;
    App.renderPage();
  },

  render() {
    const db = MockData.databaseKerjaSama || [];
    const kp = KebijakanPrioritasPage?.data || [];
    let allData = [...db, ...kp];

    // Filter By Tahun
    if (this.state.filterTahun !== 'all') {
      allData = allData.filter(r => String(r.tahun || '').trim() === this.state.filterTahun);
    }

    // Extracted years for the filter dropdown
    const availableYears = [...new Set([...db, ...kp].map(r => String(r.tahun || '').trim()).filter(y => /^20\d{2}$/.test(y)))].sort().reverse();
    
    // Stats Calculations
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

    // Documents Nearing Expiry
    const nearingExpiry = allData.filter(r => {
      if (!r.tanggalSelesai || r.tanggalSelesai === '-') return false;
      const end = new Date(r.tanggalSelesai);
      const diff = (end - new Date()) / (1000 * 60 * 60 * 24);
      return diff > 0 && diff <= 120; // 4 months
    }).sort((a,b) => new Date(a.tanggalSelesai) - new Date(b.tanggalSelesai)).slice(0, 5);

    // Empty state logic
    let tableHTML = '';
    if (nearingExpiry.length === 0) {
      tableHTML = `
        <div style="text-align:center;padding:40px 20px;background:var(--neutral-50);border-radius:12px;margin-top:16px;">
          <div style="font-size:48px;margin-bottom:16px;">✨</div>
          <h4 style="margin:0 0 8px 0;color:var(--success-700);font-weight:700">Semua Terkendali!</h4>
          <p style="color:var(--neutral-600);font-size:14px;margin:0">Tidak ada dokumen kerja sama yang mendekati masa kedaluwarsa dalam 4 bulan ke depan.</p>
        </div>
      `;
    } else {
      tableHTML = `
        <table class="table" style="font-size:13px;width:100%;margin-top:16px;">
          <thead>
            <tr style="background:var(--neutral-50)">
              <th style="padding:12px 16px">Nama Mitra</th>
              <th style="padding:12px 16px">Jenis Kerja Sama</th>
              <th style="padding:12px 16px">Masa Berlaku</th>
              <th style="padding:12px 16px">Sisa Hari</th>
              <th style="padding:12px 16px">Status</th>
              <th style="padding:12px 16px;text-align:right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${nearingExpiry.map(r => {
              const diff = Math.ceil((new Date(r.tanggalSelesai) - new Date()) / (1000 * 60 * 60 * 24));
              const statusBadge = diff <= 30 
                ? '<span class="badge badge-danger">● Segera Berakhir</span>'
                : '<span class="badge badge-warning">● Akan Berakhir</span>';
              
              return `
                <tr class="fade-in" style="border-bottom: 1px solid var(--neutral-100); transition: background 0.2s;" onmouseover="this.style.background='var(--primary-50)'" onmouseout="this.style.background='#fff'">
                  <td style="padding:16px"><strong>${r.mitra}</strong></td>
                  <td style="padding:16px">${r.jenisKerjasama || '-'}</td>
                  <td style="padding:16px;white-space:nowrap">${r.tanggalSelesai}</td>
                  <td style="padding:16px"><span style="font-weight:700;color:${diff <= 30 ? 'var(--danger-600)' : 'var(--warning-600)'}">${diff} Hari</span></td>
                  <td style="padding:16px">${statusBadge}</td>
                  <td style="padding:16px;text-align:right">
                    <button class="btn btn-primary btn-sm" style="font-size:11px;padding:6px 12px; border-radius:var(--radius-md); background:var(--primary-700); border:none;" onclick="App.navigate('update_data')">Perbarui Data</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    }

    return `
      <div class="page-header" style="margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
        <div>
          <h1 class="page-title">Monev Dashboard</h1>
          <p class="text-muted" style="margin-top:4px">Monitoring dan Evaluasi Kampung Nelayan Merah Putih</p>
        </div>
        <div style="display:flex;gap:12px;align-items:center">
          <button class="btn btn-ghost" style="border:1px solid var(--neutral-300)" onclick="DashboardPage.exportReport()">📄 Ekspor Laporan</button>
          <div class="filter-group">
            <span class="filter-label" style="font-size:13px">Filter Tahun:</span>
            <select class="form-select" onchange="DashboardPage.handleFilter('filterTahun', this.value)" style="min-width:140px;padding:8px 12px;font-size:13px">
              <option value="all">Semua Tahun</option>
              ${availableYears.map(y => `<option value="${y}" ${this.state.filterTahun === y ? 'selected' : ''}>${y}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- SUMMARY CARDS -->
      <div class="dashboard-stats-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:32px">
        <div class="card fade-in" style="padding:24px;background:linear-gradient(135deg, var(--primary-900) 0%, #082235 100%);color:#fff;border:none;box-shadow:var(--shadow-lg);position:relative;overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.1;">🏢</div>
          <div style="font-size:13px;font-weight:600;opacity:0.7;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.1em">Total Mitra</div>
          <div style="font-size:32px;font-weight:800">${totalMitra}</div>
          <div style="font-size:11px;opacity:0.6;margin-top:8px">Entitas unik terdaftar</div>
        </div>
        <div class="card fade-in" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--primary-50) 100%); animation-delay: 0.1s; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">📄</div>
          <div style="font-size:13px;font-weight:600;color:var(--neutral-500);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.1em">Total Dokumen</div>
          <div style="font-size:32px;font-weight:800;color:var(--primary-900)">${totalDokumen}</div>
          <div style="font-size:11px;color:var(--neutral-400);margin-top:8px">NK, PKS, dan MSP</div>
        </div>
        <div class="card fade-in" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--success-100) 100%); animation-delay: 0.2s; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">✅</div>
          <div style="font-size:13px;font-weight:600;color:var(--neutral-500);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.1em">Status Aktif</div>
          <div style="font-size:32px;font-weight:800;color:var(--success-600)">${aktifCount}</div>
          <div style="font-size:11px;color:var(--success-500);margin-top:8px">Sedang berjalan</div>
        </div>
        <div class="card fade-in" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--warning-100) 100%); animation-delay: 0.3s; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">🕒</div>
          <div style="font-size:13px;font-weight:600;color:var(--neutral-500);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.1em">Akan Berakhir</div>
          <div style="font-size:32px;font-weight:800;color:var(--warning-600)">${akanBerakhirCount}</div>
          <div style="font-size:11px;color:var(--warning-500);margin-top:8px">Dalam 90 hari ke depan</div>
        </div>
      </div>

      <!-- TREND & DISTRIBUTION -->
      <div class="dashboard-charts-grid" style="display:grid;grid-template-columns:3fr 2fr;gap:24px;margin-bottom:32px">
        <div class="card fade-in" style="padding:24px; border:none; box-shadow:var(--shadow-md); animation-delay:0.4s;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
            <h3 style="margin:0;font-size:16px;font-weight:700;color:var(--primary-900)">Tren Pertumbuhan Kerja Sama</h3>
            <span style="font-size:12px;color:var(--neutral-500);background:var(--neutral-100);padding:4px 8px;border-radius:4px">Data per Tahun</span>
          </div>
          <div style="position:relative;height:280px;width:100%">
            <canvas id="trendChart"></canvas>
          </div>
        </div>
 
        <div class="card fade-in" style="padding:24px; border:none; box-shadow:var(--shadow-md); animation-delay:0.5s;">
          <h3 style="margin:0 0 24px 0;font-size:16px;font-weight:700;color:var(--primary-900)">Distribusi Kategori Mitra</h3>
          <div style="position:relative;height:280px;width:100%;display:flex;justify-content:center">
            <canvas id="donutChart"></canvas>
          </div>
        </div>
      </div>

      <!-- EXPIRY ALERTS & PROGRESS SUMMARY -->
      <div class="dashboard-charts-grid" style="display:grid;grid-template-columns:3fr 2fr;gap:24px;margin-bottom:32px">
        <!-- Expiry Alerts -->
        <div class="card fade-in" style="padding:24px;overflow-x:auto; animation-delay:0.6s;">
          <div style="display:flex;justify-content:space-between;align-items:center;min-width:400px;margin-bottom:16px">
            <h3 style="margin:0;font-size:16px;font-weight:700">⚠️ Dokumen Mendekati Akhir</h3>
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('kebijakan_prioritas')">Lihat Semua ➔</button>
          </div>
          ${tableHTML}
        </div>

        <!-- Ongoing Progress Summary -->
        <div class="card fade-in" style="padding:24px; animation-delay:0.7s;">
          <h3 style="margin:0 0 20px 0;font-size:16px;font-weight:700;color:var(--primary-900)">📈 Progress Penyusunan</h3>
          <div style="display:flex;flex-direction:column;gap:16px">
            ${(MockData.progressDokumen || []).slice(0, 4).map(p => {
              let color = p.progress >= 80 ? 'success' : p.progress >= 40 ? 'primary' : 'warning';
              return `
                <div style="padding:12px; background:var(--neutral-50); border-radius:12px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                    <span style="font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px">${p.mitra}</span>
                    <span style="font-size:12px;font-weight:600;color:var(--${color}-600)">${p.progress}%</span>
                  </div>
                  <div style="height:6px;background:var(--neutral-200);border-radius:3px;overflow:hidden">
                    <div style="height:100%;width:${p.progress}%;background:var(--${color}-500)"></div>
                  </div>
                  <div style="font-size:11px;color:var(--neutral-500);margin-top:6px;display:flex;justify-content:space-between">
                    <span>Tahap ${p.step}</span>
                    <span>${p.update}</span>
                  </div>
                </div>
              `;
            }).join('')}
            <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:8px" onclick="App.navigate('progress_dokumen')">Lihat Semua Progress ➔</button>
          </div>
        </div>
      </div>
    `;
  },

  afterRender() {
    const db = MockData.databaseKerjaSama || [];
    const kp = KebijakanPrioritasPage?.data || [];
    let allData = [...db, ...kp];

    if (this.state.filterTahun !== 'all') {
      allData = allData.filter(r => String(r.tahun || '').trim() === this.state.filterTahun);
    }

    // Trend Analysis Data
    const yearCounts = {};
    allData.forEach(r => {
      const y = String(r.tahun || '').trim();
      if (/^20\d{2}$/.test(y)) {
        yearCounts[y] = (yearCounts[y] || 0) + 1;
      }
    });
    const trendLabels = Object.keys(yearCounts).sort();
    const trendData = trendLabels.map(y => yearCounts[y]);

    // Donut Chart Data
    const catCounts = {};
    allData.forEach(r => {
      const c = r.kategoriMitra || 'Lainnya';
      catCounts[c] = (catCounts[c] || 0) + 1;
    });
    const catLabels = Object.keys(catCounts);
    const catData = catLabels.map(c => catCounts[c]);
    const catColors = ['#0C4A6E', '#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];

    if (typeof Chart !== 'undefined') {
      // Bar Chart
      const trendCtx = document.getElementById('trendChart');
      if (trendCtx) {
        new Chart(trendCtx, {
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
                const year = trendLabels[idx];
                this.handleFilter('filterTahun', year);
              }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleFont: { size: 13, family: "'Plus Jakarta Sans', sans-serif" },
                bodyFont: { size: 14, family: "'Plus Jakarta Sans', sans-serif", weight: 'bold' },
                padding: 12,
                cornerRadius: 8,
                displayColors: false
              }
            },
            scales: {
              y: { beginAtZero: true, grid: { borderDash: [4, 4], color: '#f1f5f9' }, ticks: { stepSize: 1, precision: 0 } },
              x: { grid: { display: false } }
            },
            animation: { duration: 800, easing: 'easeOutQuart' }
          }
        });
      }

      // Donut Chart
      const donutCtx = document.getElementById('donutChart');
      if (donutCtx) {
        new Chart(donutCtx, {
          type: 'doughnut',
          data: {
            labels: catLabels.length ? catLabels : ['Belum ada data'],
            datasets: [{
              data: catData.length ? catData : [1],
              backgroundColor: catData.length ? catColors : ['#e2e8f0'],
              borderWidth: 2,
              borderColor: '#ffffff',
              hoverOffset: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            onClick: (e, activeEls) => {
              if (activeEls.length > 0) {
                const idx = activeEls[0].index;
                const cat = catLabels[idx];
                App.showToast(`Memfilter kategori: ${cat}`, 'info');
              }
            },
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  usePointStyle: true,
                  padding: 16,
                  font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }
                }
              },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                padding: 12,
                cornerRadius: 8,
              }
            },
            animation: { duration: 1000, easing: 'easeOutBounce' }
          }
        });
      }
    }
  },

  exportReport() {
    App.showToast('Menyiapkan ekspor PDF...', 'info');
    if (typeof html2pdf !== 'undefined') {
      const element = document.getElementById('app-content');
      const opt = {
        margin: 10,
        filename: 'Laporan_Monev_KNMP.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };
      html2pdf().set(opt).from(element).save();
    } else {
      alert('Library html2pdf tidak tersedia.');
    }
  }
};
