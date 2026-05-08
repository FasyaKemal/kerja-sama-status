/* ============================================
   KinerjaKu Next — Progress Penyusunan Dokumen
   ============================================ */

const ProgressDokumenPage = {
  searchQuery: '',
  filterYear: '2026',

  render() {
    const timelineSteps = MockData.timelineSteps;
    let data = MockData.progressDokumen;

    // Apply Filters
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      data = data.filter(r => 
        r.mitra.toLowerCase().includes(q) || 
        r.judul.toLowerCase().includes(q) || 
        r.no.toLowerCase().includes(q)
      );
    }

    if (this.filterYear && this.filterYear !== 'Semua') {
      data = data.filter(r => r.tahun === this.filterYear);
    }

    return `
      <div class="page-header" style="margin-bottom:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h1 class="page-title">Progress Penyusunan Dokumen Kerja Sama</h1>
          <p class="text-muted" style="margin-top:4px">Monitoring tahapan penyusunan, paraf, dan penandatanganan dokumen kerja sama</p>
        </div>
        <button class="btn btn-primary" onclick="ProgressDokumenPage.openForm()">
          <span>+</span> Tambah Dokumen
        </button>
      </div>

      <!-- TRACKER / STEPPER EXPLANATION -->
      <div class="card glass-morphism animate-fade-in" style="margin-bottom:28px">
        <div class="card-header"><h3 class="card-title">⏳ Alur Tahapan Penyusunan</h3></div>
        <div class="card-body" style="padding:24px; overflow-x: auto;">
          <div style="display:flex; gap:16px; position:relative; min-width: 1000px;">
            ${timelineSteps.map((step, index) => `
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; position:relative; z-index:1">
                <div style="width:36px; height:36px; border-radius:50%; background: var(--primary-500); color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; margin-bottom:12px; font-size:14px; box-shadow:0 4px 10px rgba(var(--primary-rgb), 0.3)">
                  ${index + 1}
                </div>
                <div style="font-size:11px; font-weight:600; color:var(--neutral-700); line-height:1.4">${step}</div>
              </div>
            `).join('')}
            <!-- Connecting Line -->
            <div style="position:absolute; top:18px; left:40px; right:40px; height:2px; background:var(--neutral-200); z-index:0"></div>
          </div>
        </div>
      </div>

      <!-- FILTER & TABEL -->
      <div class="card glass-morphism animate-fade-in" style="animation-delay: 0.1s">
        <div style="padding:20px; border-bottom:1px solid var(--neutral-200); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px">
          <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--neutral-800)">Daftar Dokumen Monitoring</h3>
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <div class="search-bar" style="margin-bottom:0; min-width:280px">
              <span class="search-bar-icon">🔍</span>
              <input type="text" placeholder="Cari Mitra, Judul, atau Nomor..." oninput="ProgressDokumenPage.handleSearch(this.value)" value="${this.searchQuery}" />
            </div>
            <select class="form-select" style="width:140px" onchange="ProgressDokumenPage.handleYearChange(this.value)">
              <option value="Semua" ${this.filterYear === 'Semua' ? 'selected' : ''}>Semua Tahun</option>
              <option value="2026" ${this.filterYear === '2026' ? 'selected' : ''}>2026</option>
              <option value="2025" ${this.filterYear === '2025' ? 'selected' : ''}>2025</option>
              <option value="2024" ${this.filterYear === '2024' ? 'selected' : ''}>2024</option>
            </select>
          </div>
        </div>
        
        <div class="table-responsive" style="overflow-x: auto;">
          <table class="table" style="width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
              <tr style="background: var(--neutral-50);">
                <th style="padding: 16px; width: 60px; text-align: center; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">NO</th>
                <th style="padding: 16px; width: 220px; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">NOMOR & JUDUL</th>
                <th style="padding: 16px; width: 200px; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">MITRA</th>
                <th style="padding: 16px; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">TAHAPAN SAAT INI</th>
                <th style="padding: 16px; width: 140px; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">UPDATE TERAKHIR</th>
                <th style="padding: 16px; width: 140px; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">PROGRESS</th>
                <th style="padding: 16px; width: 160px; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">STATUS</th>
                <th style="padding: 16px; width: 100px; text-align: right; color: var(--neutral-600); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">AKSI</th>
              </tr>
            </thead>
            <tbody>
              ${data.length === 0 ? `<tr><td colspan="8" style="text-align:center; padding:40px; color:var(--neutral-500)">Data tidak ditemukan.</td></tr>` : ''}
              ${data.map((r, i) => {
                let color = 'primary';
                let bgLight = 'var(--primary-50)';
                if (r.progress === 100) { color = 'green'; bgLight = 'var(--success-50)'; }
                else if (r.progress < 30) { color = 'orange'; bgLight = 'var(--warning-50)'; }

                return `
                <tr class="table-row-hover">
                  <td style="padding: 20px 16px; text-align: center; vertical-align: middle; color: var(--neutral-500); font-weight: 600;">${i + 1}</td>
                  <td style="padding: 20px 16px; vertical-align: middle;">
                    <div style="font-weight:700; color:var(--primary-900); margin-bottom:4px; font-size: 14px;">${r.no}</div>
                    <div style="font-size:12px; color:var(--neutral-500); line-height: 1.5; font-weight: 500;">${r.judul}</div>
                  </td>
                  <td style="padding: 20px 16px; vertical-align: middle;">
                    <div style="font-weight:700; color: var(--neutral-800); font-size: 14px;">${r.mitra}</div>
                  </td>
                  <td style="padding: 20px 16px; vertical-align: middle;">
                    <div class="badge" style="background:${bgLight}; color:var(--${color}-700); padding:8px 12px; font-weight:700; font-size: 11px; border: 1px solid var(--${color}-100); border-radius: 99px; display: inline-block; white-space: normal; line-height: 1.4; max-width: 250px;">
                      TAHAP ${r.step}: ${timelineSteps[r.step-1]}
                    </div>
                  </td>
                  <td style="padding: 20px 16px; vertical-align: middle; color:var(--neutral-600); font-size:13px; font-weight: 500;">
                    ${r.update}
                  </td>
                  <td style="padding: 20px 16px; vertical-align: middle;">
                    <div style="display:flex; align-items:center; gap:12px">
                      <div style="flex:1; height:10px; background:var(--neutral-100); border-radius:10px; overflow:hidden; border: 1px solid var(--neutral-200);">
                        <div style="height:100%; width:${r.progress}%; background: var(--${color}-500); box-shadow: 0 0 10px rgba(var(--${color}-rgb), 0.3)"></div>
                      </div>
                      <span style="font-size:13px; font-weight:800; color:var(--${color}-700); min-width: 40px;">${r.progress}%</span>
                    </div>
                  </td>
                  <td style="padding: 20px 16px; vertical-align: middle;">
                    <div style="font-size:12px; font-weight:600; color:var(--neutral-700); line-height: 1.4; max-width: 140px;">
                      ${r.status}
                    </div>
                  </td>
                  <td style="padding: 20px 16px; vertical-align: middle; text-align: right;">
                    <div style="display:flex; gap:6px; justify-content: flex-end;">
                      <button class="btn btn-ghost btn-sm" style="background: var(--neutral-50); border: 1px solid var(--neutral-200);" onclick="ProgressDokumenPage.openForm('${r.id}')" title="Edit Data">✏️</button>
                      <button class="btn btn-ghost btn-sm" style="background: #fff5f5; border: 1px solid #fed7d7; color:var(--red-500)" onclick="ProgressDokumenPage.deleteItem('${r.id}')" title="Hapus Data">🗑️</button>
                    </div>
                  </td>
                </tr>
              `}).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  handleSearch(val) {
    this.searchQuery = val;
    App.renderPage();
  },

  handleYearChange(val) {
    this.filterYear = val;
    App.renderPage();
  },

  openForm(id = null) {
    const isEdit = !!id;
    const item = isEdit ? MockData.progressDokumen.find(d => d.id === id) : {
      no: '', judul: '', mitra: '', step: 1, tahun: '2026'
    };

    const timelineSteps = MockData.timelineSteps;

    const content = `
      <form id="form-progress" class="form-grid">
        <input type="hidden" id="field-id" value="${id || ''}">
        <div class="form-group" style="grid-column: span 2">
          <label class="form-label">Nomor Dokumen</label>
          <input type="text" id="field-no" class="form-input" value="${item.no}" placeholder="Contoh: 01/PKS/2026">
        </div>
        <div class="form-group" style="grid-column: span 2">
          <label class="form-label">Judul Dokumen Kerja Sama</label>
          <input type="text" id="field-judul" class="form-input" value="${item.judul}" placeholder="Masukkan judul lengkap...">
        </div>
        <div class="form-group">
          <label class="form-label">Mitra</label>
          <input type="text" id="field-mitra" class="form-input" value="${item.mitra}" placeholder="Nama instansi mitra">
        </div>
        <div class="form-group">
          <label class="form-label">Tahun</label>
          <select id="field-tahun" class="form-select">
            <option value="2026" ${item.tahun === '2026' ? 'selected' : ''}>2026</option>
            <option value="2025" ${item.tahun === '2025' ? 'selected' : ''}>2025</option>
            <option value="2024" ${item.tahun === '2024' ? 'selected' : ''}>2024</option>
          </select>
        </div>
        <div class="form-group" style="grid-column: span 2">
          <label class="form-label">Tahapan Saat Ini</label>
          <select id="field-step" class="form-select">
            ${timelineSteps.map((s, i) => `
              <option value="${i + 1}" ${item.step == i + 1 ? 'selected' : ''}>Tahap ${i + 1}: ${s}</option>
            `).join('')}
          </select>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="ProgressDokumenPage.saveForm()">Simpan Data</button>
    `;

    document.getElementById('modal-container').innerHTML = UI.modal(isEdit ? 'Update Progress Dokumen' : 'Tambah Monitoring Dokumen', content, footer);
  },

  saveForm() {
    const id = document.getElementById('field-id').value;
    const no = document.getElementById('field-no').value;
    const judul = document.getElementById('field-judul').value;
    const mitra = document.getElementById('field-mitra').value;
    const step = parseInt(document.getElementById('field-step').value);
    const tahun = document.getElementById('field-tahun').value;

    if (!no || !judul || !mitra) {
      alert('Mohon lengkapi data yang wajib diisi.');
      return;
    }

    const progress = Math.round((step / MockData.timelineSteps.length) * 100);
    const status = step === MockData.timelineSteps.length ? 'Selesai' : MockData.timelineSteps[step-1];
    const date = new Date();
    const update = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    if (id) {
      // Update
      const index = MockData.progressDokumen.findIndex(d => d.id === id);
      if (index !== -1) {
        MockData.progressDokumen[index] = { ...MockData.progressDokumen[index], no, judul, mitra, step, progress, status, update, tahun };
      }
    } else {
      // Create
      const newId = (Date.now()).toString();
      MockData.progressDokumen.unshift({ id: newId, no, judul, mitra, step, progress, status, update, tahun });
    }

    App.closeModal();
    this.saveToStorage();
    App.showToast(id ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
    App.renderPage();
  },

  saveToStorage() {
    localStorage.setItem('progress_dokumen_persistent', JSON.stringify(MockData.progressDokumen));
  },

  deleteItem(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data monitoring ini?')) {
      MockData.progressDokumen = MockData.progressDokumen.filter(d => d.id !== id);
      this.saveToStorage();
      App.showToast('Data berhasil dihapus', 'info');
      App.renderPage();
    }
  }
};
