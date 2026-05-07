/* ============================================
   KinerjaKu Next — Dashboard Kerja Sama
   ============================================ */

const DashboardPage = {
  render() {
    const db = MockData.databaseKerjaSama || [];
    
    let summaryAktif = 0;
    let summaryBerakhir = 0;
    let summaryDokumen = db.length;
    let uniqueMitra = new Set();
    
    const kategoriCount = {};
    const jenisCount = {};
    const today = new Date();
    
    let dokumenAkanBerakhir = [];

    db.forEach(row => {
      // Aktif
      if (row.status === 'Berlaku' || row.status === 'Aktif') summaryAktif++;
      
      // Mitra unique
      if (row.mitra) uniqueMitra.add(row.mitra);
      
      // Kategori
      const kat = row.kategoriMitra || 'Lainnya';
      kategoriCount[kat] = (kategoriCount[kat] || 0) + 1;
      
      // Jenis
      const jen = row.jenisKerjasama || 'Lainnya';
      jenisCount[jen] = (jenisCount[jen] || 0) + 1;
      
      // Akan berakhir check (if status is Berlaku and dates are close)
      if (row.status === 'Berlaku' || row.status === 'Aktif') {
        const endDate = new Date(row.tanggalSelesai);
        if (!isNaN(endDate)) {
          const diffTime = endDate - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays >= 0 && diffDays <= 90) { // less than 3 months
            summaryBerakhir++;
            dokumenAkanBerakhir.push({
              id: row.id,
              no: row.noPihak1 || row.noPihak2 || '-',
              judul: row.jenisKerjasama,
              mitra: row.mitra,
              sisa_waktu: diffDays + ' Hari',
              status: 'Akan Berakhir'
            });
          }
        }
      }
    });

    const summaryMitra = uniqueMitra.size;

    const colorsMitra = ['#0C4A6E', '#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];
    const dataMitra = Object.keys(kategoriCount).map((k, i) => ({
      label: k,
      value: kategoriCount[k],
      color: colorsMitra[i % colorsMitra.length]
    })).sort((a,b) => b.value - a.value);

    const colorsJenis = ['#16a34a', '#059669', '#d97706', '#b45309', '#2563eb', '#9333ea'];
    const dataJenis = Object.keys(jenisCount).map((k, i) => ({
      label: k,
      value: jenisCount[k],
      color: colorsJenis[i % colorsJenis.length]
    })).sort((a,b) => b.value - a.value);

    // Limit dokumenAkanBerakhir to top 5
    dokumenAkanBerakhir = dokumenAkanBerakhir.sort((a,b) => parseInt(a.sisa_waktu) - parseInt(b.sisa_waktu)).slice(0, 5);

    return `
      <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;">
        <div>
          <h1 class="page-title" style="color: var(--primary-600);">Dashboard Monitoring</h1>
          <p class="text-muted" style="margin-top:4px">Ringkasan Status Kerja Sama — Tahun 2026</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <select class="form-select" style="padding: 6px 16px; font-weight: 600; border-radius: 999px; background: white; border: 1px solid var(--neutral-300);">
            <option>2026</option>
          </select>
          <select class="form-select" style="padding: 6px 16px; font-weight: 600; border-radius: 999px; background: white; border: 1px solid var(--neutral-300);">
            <option>Semua Kategori</option>
          </select>
          <select class="form-select" style="padding: 6px 16px; font-weight: 600; border-radius: 999px; background: white; border: 1px solid var(--neutral-300);">
            <option>Semua Status</option>
          </select>
        </div>
      </div>

      <!-- ══════ 1. DATABASE KERJA SAMA (Summary) ══════ -->
      <div class="summary-cards" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        ${UI.summaryCard('📍', summaryMitra, 'TOTAL MITRA', 'blue')}
        ${UI.summaryCard('🧩', summaryDokumen, 'DOKUMEN BERJALAN', 'green')}
        ${UI.summaryCard('📈', summaryAktif, 'KERJA SAMA AKTIF', 'orange')}
        ${UI.summaryCard('📊', summaryBerakhir, 'AKAN BERAKHIR', 'teal')}
      </div>

      <!-- ══════ CHARTS: Mitra & Jenis ══════ -->
      <div class="card" style="margin-top:24px; padding: 24px; border-radius: 16px; border: 1px solid var(--neutral-200); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
          <h3 class="card-title" style="display: flex; align-items: center; gap: 8px; font-weight: 800; color: var(--primary-600); font-size: 1.125rem;">
            <span style="color: var(--primary-400);">🗺️</span> Peta Infografis Kerja Sama
          </h3>
        </div>
        <div class="grid-2" style="gap: 32px;">
          <div>
            <h4 style="font-size: 0.875rem; color: var(--neutral-500); margin-bottom: 16px; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 0.5px;">Berdasarkan Kategori Mitra</h4>
            <div style="display:flex;justify-content:center;">
              ${UI.donutChart(dataMitra, 180)}
            </div>
          </div>
          <div>
            <h4 style="font-size: 0.875rem; color: var(--neutral-500); margin-bottom: 16px; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 0.5px;">Jenis Kerja Sama</h4>
            ${UI.barChart(dataJenis, 50)}
          </div>
        </div>
      </div>

      <!-- ══════ SEARCH DOKUMEN & MITRA ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">🔍</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Pencarian Cepat</h2>
      </div>
      <div class="card" style="padding:16px">
        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
          <div class="search-bar" style="flex:1;min-width:300px">
            <span class="search-bar-icon">📄</span>
            <input type="text" placeholder="Cari Dokumen berdasarkan Nama/Nomor Dokumen..." />
          </div>
          <div class="search-bar" style="flex:1;min-width:300px">
            <span class="search-bar-icon">🏢</span>
            <input type="text" placeholder="Cari Mitra berdasarkan Kementerian/Lembaga/Universitas/Pemda/Ormas..." />
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-primary">🔍 Cari</button>
            <button class="btn btn-ghost">Reset</button>
          </div>
        </div>
      </div>

      <!-- ══════ DOKUMEN AKAN BERAKHIR ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">⚠️</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Dokumen Paling Dekat Masa Berakhirnya</h2>
      </div>
      <div class="card">
        ${UI.table([
          { label: 'No Dokumen', key: 'no' },
          { label: 'Judul Kerja Sama', key: 'judul' },
          { label: 'Mitra', key: 'mitra' },
          { label: 'Sisa Waktu', render: r => `<span style="color:#d97706;font-weight:600">${r.sisa_waktu}</span>` },
          { label: 'Status', render: r => `<span class="badge" style="background:#fef3c7;color:#d97706">${r.status}</span>` }
        ], dokumenAkanBerakhir)}
      </div>
    `;
  },



  afterRender() {
    // Keep it empty as we rely on pure CSS and SVG charts (Donut/Bar from UI components)
    // No Chart.js needed right now.
  }
};
