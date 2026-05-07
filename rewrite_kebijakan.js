const fs = require('fs');

const data = fs.readFileSync('/tmp/kebijakan_main.json', 'utf8');

const content = `/* ============================================
   KinerjaKu Next — Dukungan Kebijakan Prioritas
   ============================================ */

const KebijakanPrioritasPage = {
  state: {
    page: 1,
    perPage: 20
  },
  
  data: ${data},

  setPage(p) {
    this.state.page = p;
    App.renderPage();
  },

  render() {
    const totalData = this.data.length;
    const totalPages = Math.ceil(totalData / this.state.perPage);
    const startIndex = (this.state.page - 1) * this.state.perPage;
    const paginatedData = this.data.slice(startIndex, startIndex + this.state.perPage);

    // Hitung statistik untuk cards
    const aktifCount = this.data.filter(d => d.status.toLowerCase().includes('berlaku') && !d.status.toLowerCase().includes('tidak')).length;
    const tidakAktifCount = this.data.filter(d => d.status.toLowerCase().includes('tidak')).length;
    const prosesCount = totalData - aktifCount - tidakAktifCount;

    return \`
      <div class="page-header" style="margin-bottom:24px">
        <h1 class="page-title">Database Kerja Sama Mendukung Kebijakan Ekonomi Biru</h1>
        <p class="text-muted" style="margin-top:4px">Daftar dokumen kerja sama prioritas</p>
      </div>

      <!-- CARD STATISTIK -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:28px">
        <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px;border-top:4px solid var(--blue-500)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <span style="font-size:24px">📄</span>
            <span class="badge" style="background:var(--blue-100);color:var(--blue-700);font-size:14px;font-weight:700;padding:4px 10px">\${totalData}</span>
          </div>
          <div style="font-size:13px;font-weight:600;color:var(--neutral-700);line-height:1.4">Total Dokumen</div>
        </div>
        <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px;border-top:4px solid var(--emerald-500)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <span style="font-size:24px">✅</span>
            <span class="badge" style="background:var(--emerald-100);color:var(--emerald-700);font-size:14px;font-weight:700;padding:4px 10px">\${aktifCount}</span>
          </div>
          <div style="font-size:13px;font-weight:600;color:var(--neutral-700);line-height:1.4">Status Berlaku</div>
        </div>
        <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px;border-top:4px solid var(--rose-500)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <span style="font-size:24px">❌</span>
            <span class="badge" style="background:var(--rose-100);color:var(--rose-700);font-size:14px;font-weight:700;padding:4px 10px">\${tidakAktifCount}</span>
          </div>
          <div style="font-size:13px;font-weight:600;color:var(--neutral-700);line-height:1.4">Status Tidak Berlaku</div>
        </div>
        <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px;border-top:4px solid var(--amber-500)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <span style="font-size:24px">⏳</span>
            <span class="badge" style="background:var(--amber-100);color:var(--amber-700);font-size:14px;font-weight:700;padding:4px 10px">\${prosesCount}</span>
          </div>
          <div style="font-size:13px;font-weight:600;color:var(--neutral-700);line-height:1.4">Status Lainnya</div>
        </div>
      </div>

      <!-- FILTER & TABEL -->
      <div class="card" style="overflow-x:auto; max-height: 600px;">
        <table class="table">
          <thead style="position: sticky; top: 0; background: #f8fafc; z-index: 10;">
            <tr>
              <th>No</th>
              <th>Tahun</th>
              <th>Kategori Mitra</th>
              <th>Nama Mitra</th>
              <th>Jenis Kerja Sama</th>
              <th>Pihak 1</th>
              <th>Pihak 2</th>
              <th>Tgl Mulai</th>
              <th>Berlaku Hingga</th>
              <th>Status</th>
              <th>Dokumen</th>
            </tr>
          </thead>
          <tbody>
            \${paginatedData.length === 0 ? '<tr><td colspan="11" style="text-align:center;padding:24px">Tidak ada data ditemukan</td></tr>' : 
            paginatedData.map((r, i) => \`
              <tr>
                <td>\${startIndex + i + 1}</td>
                <td>\${r.tahun || '-'}</td>
                <td><span class="badge" style="background:#e0f2fe;color:#0369a1">\${r.kategoriMitra || '-'}</span></td>
                <td style="max-width: 200px; white-space: normal;"><strong>\${r.mitra || '-'}</strong></td>
                <td>\${r.jenisKerjasama || '-'}</td>
                <td style="max-width: 150px; white-space: normal;"><div style="font-weight:600;font-size:0.75rem">\${r.pihak1 || '-'}</div><div style="font-size:0.7rem;color:#64748b;margin-top:2px">\${r.noPihak1 || ''}</div></td>
                <td style="max-width: 150px; white-space: normal;"><div style="font-weight:600;font-size:0.75rem">\${r.pihak2 || '-'}</div><div style="font-size:0.7rem;color:#64748b;margin-top:2px">\${r.noPihak2 || ''}</div></td>
                <td style="white-space: nowrap;">\${r.tanggalMulai || '-'}</td>
                <td style="white-space: nowrap;">\${r.tanggalSelesai || '-'}</td>
                <td>
                  \${r.status.toLowerCase().includes('berlaku') && !r.status.toLowerCase().includes('tidak') ? '<span class="badge" style="background:#dcfce7;color:#166534">Berlaku</span>' : 
                    r.status.toLowerCase().includes('tidak') ? '<span class="badge" style="background:#ffe4e6;color:#e11d48">Tidak Berlaku</span>' : 
                    '<span class="badge" style="background:#f1f5f9;color:#475569">\${r.status || '-'}</span>'}
                </td>
                <td>
                  \${r.linkDokumen && r.linkDokumen.startsWith('http') ? \`<a href="\${r.linkDokumen}" target="_blank" class="btn btn-ghost btn-sm" style="padding:4px">📄 Lihat</a>\` : '-'}
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
        
        <!-- PAGINATION -->
        <div style="position: sticky; bottom: 0; background: #fff; padding:16px;border-top:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;color:var(--neutral-500);font-size:13px">
          <div>Menampilkan \${totalData === 0 ? 0 : startIndex + 1} - \${Math.min(startIndex + this.state.perPage, totalData)} dari \${totalData} data</div>
          <div style="display:flex;gap:4px">
            <button class="btn btn-ghost btn-sm" \${this.state.page === 1 ? 'disabled' : ''} onclick="KebijakanPrioritasPage.setPage(\${this.state.page - 1})">Sebelumnya</button>
            <span style="padding: 4px 10px; font-weight: 500;">Halaman \${this.state.page} / \${totalPages}</span>
            <button class="btn btn-ghost btn-sm" \${this.state.page === totalPages ? 'disabled' : ''} onclick="KebijakanPrioritasPage.setPage(\${this.state.page + 1})">Selanjutnya</button>
          </div>
        </div>
      </div>
    \`;
  }
};
`;

fs.writeFileSync('app/js/pages/kebijakan_prioritas.js', content);
console.log('Rewritten kebijakan_prioritas.js');
