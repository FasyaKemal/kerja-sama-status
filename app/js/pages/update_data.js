/* ============================================
   KinerjaKu Next — Update Data Kerja Sama
   ============================================ */

const UpdateDataPage = {
  render() {
    const editId = window.currentEditId;
    const isEdit = !!editId;
    const item = isEdit ? MockData.databaseKerjaSama.find(d => d.id === editId) : {
      no: '', mitra: '', judul: '', kategoriMitra: '', jenisKerjasama: '', unitKerja: '', tanggalMulai: '', tanggalSelesai: '', ruangLingkup: '', status: 'Berlaku', keterangan: ''
    };

    return `
      <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
          <h1 class="page-title">${isEdit ? 'Ubah' : 'Tambah'} Data Kerja Sama</h1>
          <p class="text-muted" style="margin-top:4px">Kelola detail dokumen kerja sama secara akurat</p>
        </div>
        <button class="btn btn-ghost" onclick="UpdateDataPage.cancel()">Kembali</button>
      </div>

      <div class="card glass-morphism animate-fade-in" style="padding:32px; max-width:1000px; margin:0 auto">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:24px; padding-bottom:12px; border-bottom:1px solid var(--neutral-200); color:var(--primary-900)">
          Formulir Informasi Dokumen
        </h3>
        
        <form id="main-data-form" class="form-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:24px">
          <input type="hidden" id="f-id" value="${editId || ''}">
          
          <div class="form-group">
            <label class="form-label">Nomor Dokumen <span style="color:red">*</span></label>
            <input type="text" id="f-no" class="form-input" placeholder="Contoh: 01/PKS/2026" value="${item.no || ''}" required />
          </div>
          
          <div class="form-group">
            <label class="form-label">Nama Mitra <span style="color:red">*</span></label>
            <input type="text" id="f-mitra" class="form-input" placeholder="Masukkan nama instansi mitra..." value="${item.mitra || ''}" required />
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Judul Kerja Sama <span style="color:red">*</span></label>
            <input type="text" id="f-judul" class="form-input" placeholder="Masukkan judul dokumen kerja sama..." value="${item.judul || ''}" required />
          </div>
          
          <div class="form-group">
            <label class="form-label">Kategori Mitra</label>
            <select id="f-kategori" class="form-select">
              <option value="" disabled ${!item.kategoriMitra ? 'selected' : ''}>Pilih Kategori Mitra</option>
              ${['Kementerian', 'Lembaga', 'Universitas', 'Pemda', 'Ormas', 'Internasional', 'Swasta'].map(opt => 
                `<option value="${opt}" ${item.kategoriMitra === opt ? 'selected' : ''}>${opt}</option>`
              ).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Jenis Kerja Sama</label>
            <select id="f-jenis" class="form-select">
              <option value="" disabled ${!item.jenisKerjasama ? 'selected' : ''}>Pilih Jenis Kerja Sama</option>
              ${['Nota Kesepahaman', 'Nota Kesepakatan', 'Kesepakatan Bersama', 'Perjanjian Kerja Sama', 'Memorandum Saling Pengertian'].map(opt => 
                `<option value="${opt}" ${item.jenisKerjasama === opt ? 'selected' : ''}>${opt}</option>`
              ).join('')}
            </select>
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Unit Kerja Penanggung Jawab</label>
            <select id="f-unit" class="form-select">
              <option value="" disabled ${!item.unitKerja ? 'selected' : ''}>Pilih Unit Kerja</option>
              ${['Biro Perencanaan', 'Ditjen Perikanan Tangkap', 'Ditjen Perikanan Budi Daya', 'Ditjen PKRL', 'Ditjen Pengawasan SDKP', 'Sekretariat Jenderal'].map(opt => 
                `<option value="${opt}" ${item.unitKerja === opt ? 'selected' : ''}>${opt}</option>`
              ).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Tanggal Mulai</label>
            <input type="date" id="f-tgl-mulai" class="form-input" value="${this.formatDateForInput(item.tanggalMulai)}" />
          </div>

          <div class="form-group">
            <label class="form-label">Tanggal Berakhir</label>
            <input type="date" id="f-tgl-selesai" class="form-input" value="${this.formatDateForInput(item.tanggalSelesai)}" />
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Ruang Lingkup</label>
            <textarea id="f-lingkup" class="form-input" rows="3" placeholder="Deskripsikan ruang lingkup kerja sama...">${item.ruangLingkup || ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <select id="f-status" class="form-select">
              <option value="Berlaku" ${item.status === 'Berlaku' ? 'selected' : ''}>Aktif / Berlaku</option>
              <option value="Tidak Berlaku" ${item.status === 'Tidak Berlaku' ? 'selected' : ''}>Tidak Berlaku</option>
              <option value="Draft" ${item.status === 'Draft' ? 'selected' : ''}>Draft</option>
            </select>
          </div>

          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Upload Dokumen (PDF)</label>
            <div id="dropzone-area" style="border:2px dashed var(--neutral-300); border-radius:12px; padding:32px; text-align:center; background:var(--neutral-50); cursor:pointer; transition: all 0.3s ease;">
              <div style="font-size:32px; margin-bottom:12px">📁</div>
              <div style="font-weight:700; color:var(--primary-700); margin-bottom:4px">Klik untuk unggah atau seret file ke sini</div>
              <div style="font-size:12px; color:var(--neutral-500)">Format PDF (Maks. 10MB)</div>
            </div>
            <div id="file-list" style="margin-top:12px"></div>
          </div>
        </form>
        
        <div style="display:flex; justify-content:flex-end; gap:16px; margin-top:32px; padding-top:24px; border-top:1px solid var(--neutral-200)">
          <button class="btn btn-ghost" onclick="UpdateDataPage.cancel()">Batal</button>
          <button class="btn btn-primary" style="padding: 12px 32px" onclick="UpdateDataPage.save()">
            ${isEdit ? '💾 Perbarui Data' : '➕ Simpan Data Baru'}
          </button>
        </div>
      </div>
    `;
  },

  formatDateForInput(dateStr) {
    if (!dateStr || dateStr === '-') return '';
    // If it's already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    // Attempt to parse common formats if needed, or just return empty
    try {
      const d = new Date(dateStr);
      if (isNaN(d)) return '';
      return d.toISOString().split('T')[0];
    } catch(e) { return ''; }
  },

  cancel() {
    window.currentEditId = null;
    App.navigate('database_kerja_sama');
  },

  save() {
    const id = document.getElementById('f-id').value;
    const no = document.getElementById('f-no').value;
    const mitra = document.getElementById('f-mitra').value;
    const judul = document.getElementById('f-judul').value;

    if (!no || !mitra || !judul) {
      App.showToast('Mohon lengkapi kolom wajib (*)', 'error');
      return;
    }

    const tglSelesai = document.getElementById('f-tgl-selesai').value;
    const year = tglSelesai ? tglSelesai.split('-')[0] : new Date().getFullYear().toString();

    const payload = {
      id: id || 'KSM-' + Math.floor(Math.random() * 10000),
      no,
      mitra,
      judul,
      kategoriMitra: document.getElementById('f-kategori').value,
      jenisKerjasama: document.getElementById('f-jenis').value,
      unitKerja: document.getElementById('f-unit').value,
      tanggalMulai: document.getElementById('f-tgl-mulai').value || '-',
      tanggalSelesai: tglSelesai || '-',
      ruangLingkup: document.getElementById('f-lingkup').value,
      status: document.getElementById('f-status').value,
      tahun: year
    };

    if (id) {
      const idx = MockData.databaseKerjaSama.findIndex(d => d.id === id);
      if (idx !== -1) MockData.databaseKerjaSama[idx] = payload;
    } else {
      MockData.databaseKerjaSama.unshift(payload);
    }

    App.showToast(id ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan', 'success');
    this.cancel();
  }
};
