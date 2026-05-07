/* ============================================
   KinerjaKu Next — Database Kerja Sama
   ============================================ */

const DatabasePage = {
  state: {
    search: '',
    tahun: '',
    kategori: '',
    jenis: '',
    status: '',
    page: 1,
    perPage: 20
  },

  openForm(id = null) {
    let data = {
      kategoriMitra: '',
      mitra: '',
      jenisKerjasama: '',
      pihak1: '',
      noPihak1: '',
      pihak2: '',
      masaBerlaku: '',
      tanggalMulai: '',
      tanggalSelesai: '',
      status: 'Berlaku',
      id: ''
    };

    if (id) {
      data = MockData.databaseKerjaSama.find(d => d.id === id) || data;
    }

    const content = `
      <form id="form-kerjasama" style="display:flex; flex-direction:column; gap:16px;" onsubmit="event.preventDefault(); DatabasePage.saveForm();">
        <input type="hidden" name="id" value="${data.id || ''}" />
        <div class="grid-2">
          ${UI.formGroup('Kategori Mitra', UI.formSelect('kategoriMitra', ['K/L', 'Pemda', 'Universitas', 'Swasta', 'BUMN', 'ORMAS', 'Lainnya'], data.kategoriMitra || 'K/L'), '', true)}
          ${UI.formGroup('Nama Mitra', UI.formInput('mitra', 'Contoh: PT Telkom', data.mitra), '', true)}
        </div>
        <div class="grid-2">
          ${UI.formGroup('Jenis Kerja Sama', UI.formSelect('jenisKerjasama', ['Perjanjian Kerja Sama', 'Nota Kesepahaman', 'Kesepakatan Bersama', 'Kontrak Kerja', 'Lainnya'], data.jenisKerjasama || 'Perjanjian Kerja Sama'), '', true)}
          ${UI.formGroup('Nomor', UI.formInput('noPihak1', 'Nomor Dokumen', data.noPihak1 || data.noPihak2), '', false)}
        </div>
        <div class="grid-2">
          ${UI.formGroup('Unit Sign', UI.formInput('pihak1', 'Contoh: Dirjen PRL', data.pihak1), '', true)}
          ${UI.formGroup('Jabatan Sign', UI.formInput('pihak2', 'Contoh: Direktur Utama', data.pihak2), '', true)}
        </div>
        <div class="grid-2">
          ${UI.formGroup('Tanggal Mulai', '<input type="date" name="tanggalMulai" class="form-input" value="' + (data.tanggalMulai ? this.formatDateForInput(data.tanggalMulai) : '') + '" required />', '', true)}
          ${UI.formGroup('Berlaku Hingga', '<input type="date" name="tanggalSelesai" class="form-input" value="' + (data.tanggalSelesai ? this.formatDateForInput(data.tanggalSelesai) : '') + '" required />', '', true)}
        </div>
        <div class="grid-2">
          ${UI.formGroup('Masa Berlaku', UI.formInput('masaBerlaku', 'Contoh: 5 Tahun', data.masaBerlaku || ''), '', false)}
          ${UI.formGroup('Status', UI.formSelect('status', ['Berlaku', 'Tidak Berlaku'], data.status), '', true)}
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="DatabasePage.saveForm()">💾 Simpan Data</button>
    `;

    document.getElementById('modal-container').innerHTML = UI.modal(id ? 'Edit Data Kerja Sama' : 'Tambah Data Kerja Sama', content, footer, 'lg');
  },

  formatDateForInput(dateStr) {
    if(!dateStr || dateStr.trim() === '') return '';
    // Handle mm/dd/yyyy or yyyy-mm-dd
    if (dateStr.includes('-')) return dateStr;
    const parts = dateStr.split('/');
    if(parts.length === 3) {
      return `${parts[2]}-${parts[0].padStart(2,'0')}-${parts[1].padStart(2,'0')}`;
    }
    return '';
  },

  formatDateForSave(dateStr) {
    if(!dateStr) return '';
    const parts = dateStr.split('-');
    if(parts.length === 3) {
      return `${parseInt(parts[1])}/${parseInt(parts[2])}/${parts[0]}`;
    }
    return dateStr;
  },

  saveForm() {
    const form = document.getElementById('form-kerjasama');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    const tahunMulai = formData.get('tanggalMulai') ? formData.get('tanggalMulai').split('-')[0] : new Date().getFullYear().toString();

    const payload = {
      kategoriMitra: formData.get('kategoriMitra'),
      mitra: formData.get('mitra'),
      jenisKerjasama: formData.get('jenisKerjasama'),
      pihak1: formData.get('pihak1'),
      noPihak1: formData.get('noPihak1'),
      pihak2: formData.get('pihak2'),
      masaBerlaku: formData.get('masaBerlaku'),
      tanggalMulai: this.formatDateForSave(formData.get('tanggalMulai')),
      tanggalSelesai: this.formatDateForSave(formData.get('tanggalSelesai')),
      status: formData.get('status'),
      tahun: tahunMulai
    };

    if (id) {
      const idx = MockData.databaseKerjaSama.findIndex(d => d.id === id);
      if (idx > -1) {
        MockData.databaseKerjaSama[idx] = { ...MockData.databaseKerjaSama[idx], ...payload };
      }
    } else {
      payload.id = 'kjs-' + Date.now();
      MockData.databaseKerjaSama.unshift(payload);
    }

    App.closeModal();
    UI.toast('success', id ? 'Data berhasil diperbarui!' : 'Data baru berhasil ditambahkan!');
    App.renderPage();
  },

  updateFilter(key, value) {
    this.state[key] = value;
    this.state.page = 1;
    App.renderPage();
  },

  resetFilter() {
    this.state = { search: '', tahun: '', kategori: '', jenis: '', status: '', page: 1, perPage: 20 };
    App.renderPage();
  },

  setPage(p) {
    this.state.page = p;
    App.renderPage();
  },

  render() {
    let data = MockData.databaseKerjaSama || [];

    // Filter by Search
    if (this.state.search) {
      const q = this.state.search.toLowerCase();
      data = data.filter(r => 
        (r.mitra || '').toLowerCase().includes(q) || 
        (r.noPihak1 || '').toLowerCase().includes(q) ||
        (r.noPihak2 || '').toLowerCase().includes(q)
      );
    }

    // Filter by Tahun
    if (this.state.tahun) {
      data = data.filter(r => r.tahun === this.state.tahun);
    }

    // Filter by Kategori Mitra
    if (this.state.kategori) {
      data = data.filter(r => r.kategoriMitra === this.state.kategori);
    }

    // Filter by Jenis
    if (this.state.jenis) {
      data = data.filter(r => r.jenisKerjasama === this.state.jenis);
    }

    // Filter by Status
    if (this.state.status) {
      data = data.filter(r => {
        if (this.state.status === 'Berlaku') return r.status === 'Berlaku' || r.status === 'Aktif';
        if (this.state.status === 'Tidak Berlaku') return r.status === 'Tidak Berlaku' || r.status === 'Berakhir';
        return r.status === this.state.status;
      });
    }

    // Pagination
    const totalData = data.length;
    const totalPages = Math.ceil(totalData / this.state.perPage) || 1;
    if (this.state.page > totalPages) this.state.page = totalPages;
    
    const startIndex = (this.state.page - 1) * this.state.perPage;
    const paginatedData = data.slice(startIndex, startIndex + this.state.perPage);

    const getStatusBadge = (status) => {
      let color = 'gray';
      if (status === 'Berlaku' || status === 'Aktif') color = 'green';
      else if (status === 'Akan Berakhir' || status === 'Proses Peninjauan') color = 'orange';
      else if (status === 'Tidak Berlaku' || status === 'Berakhir') color = 'red';
      
      const styles = {
        green: 'background:#dcfce7;color:#166534',
        orange: 'background:#fef3c7;color:#b45309',
        red: 'background:#fee2e2;color:#b91c1c',
        gray: 'background:#f1f5f9;color:#475569'
      };
      
      return `<span class="badge" style="${styles[color]}">${status}</span>`;
    };

    return `
      <div class="page-header" style="margin-bottom:24px; display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <h1 class="page-title">Database Kerja Sama</h1>
          <p class="text-muted" style="margin-top:4px">Daftar seluruh dokumen kerja sama Kementerian Kelautan dan Perikanan</p>
        </div>
        <button class="btn btn-primary" onclick="DatabasePage.openForm()">+ Tambah Data</button>
      </div>

      <!-- FILTER SECTION -->
      <div class="card" style="padding:16px;margin-bottom:24px">
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <div class="search-bar" style="flex:1;min-width:250px;margin-bottom:0">
            <span class="search-bar-icon">🔍</span>
            <input type="text" placeholder="Cari Dokumen / Nama Mitra..." 
                   value="${this.state.search}" 
                   onkeyup="if(event.key === 'Enter') DatabasePage.updateFilter('search', this.value)" 
                   onblur="DatabasePage.updateFilter('search', this.value)" />
          </div>
          <select class="form-select" style="width:120px" onchange="DatabasePage.updateFilter('tahun', this.value)">
            <option value="">Semua Tahun</option>
            ${Array.from({length: 10}, (_, i) => 2026 - i).map(y => `<option value="${y}" ${this.state.tahun == y ? 'selected' : ''}>${y}</option>`).join('')}
          </select>
          <select class="form-select" style="width:150px" onchange="DatabasePage.updateFilter('kategori', this.value)">
            <option value="">Kategori Mitra</option>
            <option value="K/L" ${this.state.kategori === 'K/L' ? 'selected' : ''}>K/L</option>
            <option value="BUMN" ${this.state.kategori === 'BUMN' ? 'selected' : ''}>BUMN</option>
            <option value="Universitas" ${this.state.kategori === 'Universitas' ? 'selected' : ''}>Universitas</option>
            <option value="Pemda" ${this.state.kategori === 'Pemda' ? 'selected' : ''}>Pemda</option>
            <option value="Ormas" ${this.state.kategori === 'Ormas' ? 'selected' : ''}>Ormas</option>
            <option value="Swasta" ${this.state.kategori === 'Swasta' ? 'selected' : ''}>Swasta</option>
          </select>
          <select class="form-select" style="width:160px" onchange="DatabasePage.updateFilter('jenis', this.value)">
            <option value="">Jenis Kerja Sama</option>
            <option value="Nota Kesepahaman" ${this.state.jenis === 'Nota Kesepahaman' ? 'selected' : ''}>Nota Kesepahaman</option>
            <option value="Perjanjian Kerja Sama" ${this.state.jenis === 'Perjanjian Kerja Sama' ? 'selected' : ''}>Perjanjian Kerja Sama</option>
            <option value="Kesepakatan Bersama" ${this.state.jenis === 'Kesepakatan Bersama' ? 'selected' : ''}>Kesepakatan Bersama</option>
          </select>
          <select class="form-select" style="width:120px" onchange="DatabasePage.updateFilter('status', this.value)">
            <option value="">Status</option>
            <option value="Berlaku" ${this.state.status === 'Berlaku' ? 'selected' : ''}>Berlaku</option>
            <option value="Tidak Berlaku" ${this.state.status === 'Tidak Berlaku' ? 'selected' : ''}>Tidak Berlaku</option>
          </select>
          <button class="btn btn-ghost" style="padding:8px 12px" onclick="DatabasePage.resetFilter()">Reset</button>
        </div>
      </div>

      <!-- MAIN TABLE -->
      <div class="card" style="overflow-x:auto; max-height: 600px;">
        <table class="table">
          <thead style="position: sticky; top: 0; background: #f8fafc; z-index: 10;">
            <tr>
              <th>No</th>
              <th>Tahun</th>
              <th>Nama Mitra</th>
              <th>Kategori Mitra</th>
              <th>Jenis Kerja Sama</th>
              <th>Pihak 1 (KKP)</th>
              <th>Pihak 2 (Mitra)</th>
              <th>Tanggal Mulai</th>
              <th>Berlaku Hingga</th>
              <th>Status</th>
              <th>Dokumen</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedData.length === 0 ? '<tr><td colspan="11" style="text-align:center;padding:24px">Tidak ada data ditemukan</td></tr>' : 
            paginatedData.map((r, i) => `
              <tr>
                <td>${startIndex + i + 1}</td>
                <td>${r.tahun}</td>
                <td style="max-width: 250px; white-space: normal;"><strong>${r.mitra}</strong></td>
                <td><span class="badge" style="background:#e0f2fe;color:#0369a1">${r.kategoriMitra || '-'}</span></td>
                <td>${r.jenisKerjasama}</td>
                <td style="max-width: 150px; white-space: normal;"><div style="font-weight:600;font-size:0.75rem">${r.pihak1 || '-'}</div><div style="font-size:0.7rem;color:#64748b;margin-top:2px">${r.noPihak1 || ''}</div></td>
                <td style="max-width: 150px; white-space: normal;"><div style="font-weight:600;font-size:0.75rem">${r.pihak2 || '-'}</div><div style="font-size:0.7rem;color:#64748b;margin-top:2px">${r.noPihak2 || ''}</div></td>
                <td style="white-space: nowrap;">${r.tanggalMulai}</td>
                <td style="white-space: nowrap;">${r.tanggalSelesai}</td>
                <td>${getStatusBadge(r.status)}</td>
                <td>
                  <div style="display:flex; gap:4px">
                    ${r.linkDokumen && r.linkDokumen.startsWith('http') ? `<a href="${r.linkDokumen}" target="_blank" class="btn btn-ghost btn-sm" style="padding:4px">📄 Lihat</a>` : ''}
                    <button class="btn btn-ghost btn-sm" style="padding:4px; color: var(--primary-600);" onclick="DatabasePage.openForm('${r.id}')">✏️ Edit</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <!-- PAGINATION -->
        <div style="position: sticky; bottom: 0; background: #fff; padding:16px;border-top:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;color:var(--neutral-500);font-size:13px">
          <div>Menampilkan ${totalData === 0 ? 0 : startIndex + 1} - ${Math.min(startIndex + this.state.perPage, totalData)} dari ${totalData} data</div>
          <div style="display:flex;gap:4px">
            <button class="btn btn-ghost btn-sm" ${this.state.page === 1 ? 'disabled' : ''} onclick="DatabasePage.setPage(${this.state.page - 1})">Sebelumnya</button>
            <span style="padding: 4px 10px; font-weight: 500;">Halaman ${this.state.page} / ${totalPages}</span>
            <button class="btn btn-ghost btn-sm" ${this.state.page === totalPages ? 'disabled' : ''} onclick="DatabasePage.setPage(${this.state.page + 1})">Selanjutnya</button>
          </div>
        </div>
      </div>
    `;
  }
};
