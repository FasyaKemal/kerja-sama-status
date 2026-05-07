/* ============================================
   KinerjaKu Next — Progress Penyusunan Dokumen
   ============================================ */

const ProgressDokumenPage = {
  render() {
    const timelineSteps = [
      'Surat Usulan Penyusunan/Perpanjangan Kerja Sama',
      'Disposisi Pimpinan',
      'Pembahasan Penyusunan Naskah Kerja Sama (3 hari)',
      'Surat ke Mitra terkait hasil pembahasan (1 hari)',
      'Menerima Masukan Kerja Sama dari Mitra',
      'Memo Roren Rokum hasil masukan dari mitra (1 hari)',
      'Memo Rokum Roren finalisasi',
      'Memo Roren Sekjen persetujuan paraf (2 hari)',
      'Memo Sekjen MKP penandatanganan (1 hari)',
      'Penandatanganan'
    ];

    const daftarProgress = [
      { id: '1', no: '01/PKS/2026', judul: 'Kerja Sama Pengawasan Laut', mitra: 'Kementerian Pertahanan', step: 8, update: '12 Mei 2026', progress: 80, status: 'Memo Roren Sekjen' },
      { id: '2', no: '02/NK/2026', judul: 'Pengembangan SDM Kelautan', mitra: 'Universitas Indonesia', step: 4, update: '10 Mei 2026', progress: 40, status: 'Surat ke Mitra' },
      { id: '3', no: '03/MoU/2026', judul: 'Riset Biodiversitas Maritim', mitra: 'BRIN', step: 10, update: '05 Mei 2026', progress: 100, status: 'Selesai' },
      { id: '4', no: '04/KB/2026', judul: 'Pemberdayaan Nelayan Lokal', mitra: 'Pemda Maluku', step: 2, update: '15 Mei 2026', progress: 20, status: 'Disposisi Pimpinan' }
    ];

    return `
      <div class="page-header" style="margin-bottom:24px">
        <h1 class="page-title">Progress Penyusunan Dokumen Kerja Sama</h1>
        <p class="text-muted" style="margin-top:4px">Monitoring tahapan penyusunan, paraf, dan penandatanganan dokumen kerja sama</p>
      </div>

      <!-- TRACKER / STEPPER EXPLANATION -->
      <div class="card" style="margin-bottom:28px">
        <div class="card-header"><h3 class="card-title">⏳ Alur Tahapan Penyusunan</h3></div>
        <div class="card-body" style="padding:24px">
          <div style="display:flex;flex-wrap:wrap;gap:16px;position:relative">
            ${timelineSteps.map((step, index) => `
              <div style="flex:1;min-width:120px;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;z-index:1">
                <div style="width:32px;height:32px;border-radius:50%;background:${index === 9 ? 'var(--green-500)' : 'var(--primary-500)'};color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;margin-bottom:12px;font-size:13px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
                  ${index + 1}
                </div>
                <div style="font-size:11px;font-weight:600;color:var(--neutral-700);line-height:1.4">${step}</div>
              </div>
            `).join('')}
            <!-- Connecting Line -->
            <div style="position:absolute;top:16px;left:40px;right:40px;height:2px;background:var(--neutral-200);z-index:0"></div>
          </div>
          <div style="margin-top:16px;font-size:12px;color:var(--neutral-500);text-align:right">
            * Semua timeline dibuatkan untuk upload dokumen
          </div>
        </div>
      </div>

      <!-- FILTER & TABEL -->
      <div class="card">
        <div style="padding:16px;border-bottom:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <h3 style="margin:0;font-size:15px;font-weight:600">Daftar Dokumen Tahun Berjalan</h3>
          <div style="display:flex;gap:12px">
            <div class="search-bar" style="margin-bottom:0;min-width:250px">
              <span class="search-bar-icon">🏢</span>
              <input type="text" placeholder="Cari Mitra..." />
            </div>
            <select class="form-select" style="width:120px">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nomor Dokumen</th>
              <th>Judul Dokumen</th>
              <th>Mitra</th>
              <th>Tahapan Saat Ini</th>
              <th>Tanggal Update</th>
              <th style="width:150px">Progress</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${daftarProgress.map((r, i) => {
              let color = 'primary';
              if (r.progress === 100) color = 'green';
              else if (r.progress < 30) color = 'orange';

              return `
              <tr>
                <td>${i + 1}</td>
                <td><strong>${r.no}</strong></td>
                <td>${r.judul}</td>
                <td>${r.mitra}</td>
                <td><span class="badge" style="background:#f1f5f9;color:#334155">Tahap ${r.step}: ${timelineSteps[r.step-1]}</span></td>
                <td style="color:var(--neutral-500);font-size:13px">${r.update}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="flex:1;height:6px;background:var(--neutral-200);border-radius:3px;overflow:hidden">
                      <div style="height:100%;width:${r.progress}%;background:var(--${color}-500)"></div>
                    </div>
                    <span style="font-size:12px;font-weight:600;color:var(--${color}-600)">${r.progress}%</span>
                  </div>
                </td>
                <td><span style="font-size:12px;font-weight:600;color:var(--${color}-600)">${r.status}</span></td>
                <td>
                  <button class="btn btn-ghost btn-sm" style="color:var(--primary-600)">Update</button>
                </td>
              </tr>
            `}).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
};
