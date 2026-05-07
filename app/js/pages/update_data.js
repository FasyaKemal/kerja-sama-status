/* ============================================
   KinerjaKu Next — Update Data Kerja Sama
   ============================================ */

const UpdateDataPage = {
  render() {
    return `
      <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
          <h1 class="page-title">Update Data Kerja Sama</h1>
          <p class="text-muted" style="margin-top:4px">Tambahkan, ubah, dan kelola data kerja sama</p>
        </div>
        <div>
          <button class="btn btn-primary" style="display:flex;align-items:center;gap:6px">
            <span>➕</span> Tambah Data Kerja Sama
          </button>
        </div>
      </div>

      <!-- FORM UPLOAD -->
      <div class="card" style="padding:24px;max-width:900px;margin:0 auto">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--neutral-200);color:#1e293b">Form Input Data Kerja Sama</h3>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
          <div class="form-group">
            <label class="form-label">Nomor Dokumen</label>
            <input type="text" class="form-input" placeholder="Contoh: 01/PKS/2026" />
          </div>
          
          <div class="form-group">
            <label class="form-label">Nama Mitra</label>
            <input type="text" class="form-input" placeholder="Masukkan nama instansi mitra..." />
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Judul Kerja Sama</label>
            <input type="text" class="form-input" placeholder="Masukkan judul dokumen kerja sama..." />
          </div>
          
          <div class="form-group">
            <label class="form-label">Kategori Mitra</label>
            <select class="form-select">
              <option disabled selected>Pilih Kategori Mitra</option>
              <option>Kementerian</option>
              <option>Lembaga</option>
              <option>Universitas</option>
              <option>Pemda</option>
              <option>Ormas</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Jenis Kerja Sama</label>
            <select class="form-select">
              <option disabled selected>Pilih Jenis Kerja Sama</option>
              <option>Nota Kesepahaman</option>
              <option>Nota Kesepakatan</option>
              <option>Kesepakatan Bersama</option>
              <option>Kesepahaman Bersama</option>
              <option>Perjanjian Kerja Sama</option>
              <option>Memorandum Saling Pengertian</option>
            </select>
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Unit Kerja Penanggung Jawab</label>
            <select class="form-select">
              <option disabled selected>Pilih Unit Kerja</option>
              <option>Biro Perencanaan</option>
              <option>Ditjen Perikanan Tangkap</option>
              <option>Ditjen Perikanan Budi Daya</option>
              <option>Ditjen Pengelolaan Kelautan dan Ruang Laut</option>
              <option>Ditjen Pengawasan SDKP</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Tanggal Mulai</label>
            <input type="date" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label">Tanggal Berakhir</label>
            <input type="date" class="form-input" />
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Ruang Lingkup</label>
            <textarea class="form-input" rows="3" placeholder="Deskripsikan ruang lingkup kerja sama..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-select">
              <option>Aktif</option>
              <option>Draft</option>
            </select>
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Upload Dokumen PDF</label>
            <div style="border:2px dashed var(--neutral-300);border-radius:8px;padding:32px;text-align:center;background:#f8fafc;cursor:pointer">
              <div style="font-size:24px;margin-bottom:8px">📄</div>
              <div style="font-weight:500;color:var(--primary-600);margin-bottom:4px">Klik untuk upload atau drag and drop</div>
              <div style="font-size:12px;color:var(--neutral-500)">Format PDF (Maks. 10MB)</div>
            </div>
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Keterangan Tambahan</label>
            <textarea class="form-input" rows="2" placeholder="Catatan tambahan (opsional)"></textarea>
          </div>
        </div>
        
        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:24px;padding-top:20px;border-top:1px solid var(--neutral-200)">
          <button class="btn btn-ghost" onclick="UI.toast('info', 'Form telah direset')">Reset Form</button>
          <button class="btn btn-primary" onclick="UI.toast('success', 'Data berhasil disimpan!')">💾 Simpan Data</button>
        </div>
      </div>
    `;
  }
};
