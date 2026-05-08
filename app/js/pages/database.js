/* ============================================
   KinerjaKu Next — Database Monitoring
   ============================================ */

const DatabasePage = {
  state: {
    page: 1,
    perPage: 20,
    searchQuery: '',
    filterYear: 'all',
    filterCategory: 'all',
    filterStatus: 'all'
  },

  getFilteredData() {
    let data = MockData.databaseKerjaSama || [];
    const { searchQuery, filterYear, filterCategory, filterStatus } = this.state;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(r =>
        (r.mitra || '').toLowerCase().includes(q) ||
        (r.noPihak1 || '').toLowerCase().includes(q) ||
        (r.noPihak2 || '').toLowerCase().includes(q) ||
        (r.jenisKerjasama || '').toLowerCase().includes(q)
      );
    }
    if (filterYear !== 'all') data = data.filter(r => r.tahun === filterYear);
    if (filterCategory !== 'all') data = data.filter(r => r.kategoriMitra === filterCategory);
    if (filterStatus === 'Berlaku') data = data.filter(r => String(r.status || '').toLowerCase().includes('berlaku') && !String(r.status || '').toLowerCase().includes('tidak'));
    else if (filterStatus === 'Tidak Berlaku') data = data.filter(r => String(r.status || '').toLowerCase().includes('tidak'));
    return data;
  },

  renderStatusBadge(status) {
    const s = String(status || '').toLowerCase();
    if (s.includes('berlaku') && !s.includes('tidak')) return `<span class="badge badge-success">● Berlaku</span>`;
    if (s.includes('tidak')) return `<span class="badge badge-danger">○ Tidak Berlaku</span>`;
    return `<span class="badge badge-info">${status || '-'}</span>`;
  },

  render() {
    const allData = MockData.databaseKerjaSama || [];
    const years = [...new Set(allData.map(r => r.tahun))].filter(Boolean).sort().reverse();
    const categories = [...new Set(allData.map(r => r.kategoriMitra))].filter(Boolean).sort();

    const filteredData = this.getFilteredData();
    const totalData = filteredData.length;
    const totalPages = Math.max(1, Math.ceil(totalData / this.state.perPage));
    if (this.state.page > totalPages) this.state.page = 1;
    const startIndex = (this.state.page - 1) * this.state.perPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + this.state.perPage);

    const berlakuCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('berlaku') && !String(r.status || '').toLowerCase().includes('tidak')).length;
    const tidakBerlakuCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('tidak')).length;
    const lainnya = totalData - berlakuCount - tidakBerlakuCount;

    return `
      <div style="margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div>
          <h1 class="page-title">Database Monitoring Kerja Sama</h1>
          <p class="text-muted" style="margin-top:4px">Daftar seluruh dokumen kerja sama KKP yang telah terdata</p>
        </div>
        <div style="display:flex;gap:12px">
          <button class="btn btn-ghost" style="border:1px solid var(--neutral-300)" onclick="DatabasePage.exportData()">📥 Ekspor Excel</button>
          <button class="btn btn-primary" onclick="DatabasePage.openModal(null)">+ Tambah Data</button>
        </div>
      </div>

      <!-- FILTER BAR -->
      <div class="card" style="padding:16px 20px;margin-bottom:24px;display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap;">
        <div style="flex:1;min-width:200px;">
          <label style="font-size:12px;font-weight:700;color:var(--primary-900);display:block;margin-bottom:6px;">Cari</label>
          <div class="search-bar" style="margin-bottom:0;">
            <span class="search-bar-icon">🔍</span>
            <input type="text" placeholder="Cari mitra, nomor, jenis..." oninput="DatabasePage.handleFilter('searchQuery',this.value)" value="${this.state.searchQuery}" />
          </div>
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--primary-900);display:block;margin-bottom:6px;">Tahun</label>
          <select class="form-select" style="padding:10px 12px;min-width:100px;" onchange="DatabasePage.handleFilter('filterYear',this.value)">
            <option value="all">Semua</option>
            ${years.map(y => `<option value="${y}" ${this.state.filterYear === y ? 'selected' : ''}>${y}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--primary-900);display:block;margin-bottom:6px;">Kategori</label>
          <select class="form-select" style="padding:10px 12px;min-width:150px;" onchange="DatabasePage.handleFilter('filterCategory',this.value)">
            <option value="all">Semua Kategori</option>
            ${categories.map(c => `<option value="${c}" ${this.state.filterCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--primary-900);display:block;margin-bottom:6px;">Status</label>
          <select class="form-select" style="padding:10px 12px;min-width:150px;" onchange="DatabasePage.handleFilter('filterStatus',this.value)">
            <option value="all">Semua Status</option>
            <option value="Berlaku" ${this.state.filterStatus === 'Berlaku' ? 'selected' : ''}>Berlaku</option>
            <option value="Tidak Berlaku" ${this.state.filterStatus === 'Tidak Berlaku' ? 'selected' : ''}>Tidak Berlaku</option>
          </select>
        </div>
        <button class="btn btn-ghost btn-sm" style="color:var(--danger-600);font-weight:600;" onclick="DatabasePage.resetFilters()">✕ Reset</button>
      </div>

      <!-- STAT CARDS -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:32px">
        <div class="card fade-in" style="padding:24px;border:none;box-shadow:var(--shadow-md);background:linear-gradient(135deg,#fff 0%,var(--primary-50) 100%);position:relative;overflow:hidden;">
          <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.05;">📊</div>
          <div style="font-size:13px;font-weight:700;color:var(--primary-700);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Total Kerja Sama</div>
          <div style="font-size:32px;font-weight:800;color:var(--primary-900);line-height:1">${totalData}</div>
          <div style="font-size:12px;color:var(--neutral-500);margin-top:8px">Data terfilter</div>
        </div>
        <div class="card fade-in" style="padding:24px;border:none;box-shadow:var(--shadow-md);background:linear-gradient(135deg,#fff 0%,var(--success-100) 100%);position:relative;overflow:hidden;">
          <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.05;">✅</div>
          <div style="font-size:13px;font-weight:700;color:var(--success-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Berlaku</div>
          <div style="font-size:32px;font-weight:800;color:var(--success-600);line-height:1">${berlakuCount}</div>
          <div style="font-size:12px;color:var(--success-500);margin-top:8px">Status aktif</div>
        </div>
        <div class="card fade-in" style="padding:24px;border:none;box-shadow:var(--shadow-md);background:linear-gradient(135deg,#fff 0%,var(--danger-100) 100%);position:relative;overflow:hidden;">
          <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.05;">⚠️</div>
          <div style="font-size:13px;font-weight:700;color:var(--danger-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Tidak Berlaku</div>
          <div style="font-size:32px;font-weight:800;color:var(--danger-600);line-height:1">${tidakBerlakuCount}</div>
          <div style="font-size:12px;color:var(--danger-500);margin-top:8px">Masa berlaku habis</div>
        </div>
        <div class="card fade-in" style="padding:24px;border:none;box-shadow:var(--shadow-md);background:linear-gradient(135deg,#fff 0%,var(--neutral-100) 100%);position:relative;overflow:hidden;">
          <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.05;">⚙️</div>
          <div style="font-size:13px;font-weight:700;color:var(--neutral-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Lainnya</div>
          <div style="font-size:32px;font-weight:800;color:var(--neutral-800);line-height:1">${lainnya}</div>
          <div style="font-size:12px;color:var(--neutral-500);margin-top:8px">Status lainnya</div>
        </div>
      </div>

      <!-- DATA TABLE -->
      <div class="card" style="overflow-x:auto;width:100%;border-radius:var(--radius-md);">
        <table class="table" style="font-size:13px;min-width:1400px;width:100%;">
          <thead>
            <tr style="background:var(--neutral-50);">
              <th style="white-space:nowrap;padding:12px 16px;">No</th>
              <th style="white-space:nowrap;padding:12px 16px;">Tahun</th>
              <th style="white-space:nowrap;padding:12px 16px;">Kategori Mitra</th>
              <th style="white-space:nowrap;padding:12px 16px;">Nama Mitra</th>
              <th style="white-space:nowrap;padding:12px 16px;">Jenis Kerja Sama</th>
              <th style="white-space:nowrap;padding:12px 16px;">Pihak 1 (KKP)</th>
              <th style="white-space:nowrap;padding:12px 16px;">Pihak 2 (Mitra)</th>
              <th style="white-space:nowrap;padding:12px 16px;">Tgl Mulai</th>
              <th style="white-space:nowrap;padding:12px 16px;">Berlaku Hingga</th>
              <th style="white-space:nowrap;padding:12px 16px;">Status</th>
              <th style="white-space:nowrap;padding:12px 16px;">Dokumen</th>
              <th style="white-space:nowrap;padding:12px 16px;text-align:center;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedData.length === 0
              ? '<tr><td colspan="12" style="text-align:center;padding:48px;color:var(--neutral-400)">Tidak ada data ditemukan</td></tr>'
              : paginatedData.map((r, i) => `
              <tr style="background:#fff;transition:all 0.2s;border-bottom:1px solid var(--neutral-100);" onmouseover="this.style.background='var(--primary-50)'" onmouseout="this.style.background='#fff'">
                <td style="padding:16px;color:var(--neutral-500);font-weight:600;">${startIndex + i + 1}</td>
                <td style="padding:16px;">${r.tahun || '-'}</td>
                <td style="padding:16px;"><span class="badge badge-info">${r.kategoriMitra || '-'}</span></td>
                <td style="padding:16px;max-width:250px;white-space:normal;line-height:1.5;"><strong style="color:var(--primary-900);">${r.mitra || '-'}</strong></td>
                <td style="padding:16px;white-space:nowrap;color:var(--neutral-700);">${r.jenisKerjasama || '-'}</td>
                <td style="padding:16px;max-width:180px;white-space:normal;line-height:1.4;">
                  <div style="font-weight:700;font-size:0.8rem;color:var(--primary-800);margin-bottom:4px">${r.pihak1 || '-'}</div>
                  <div style="font-size:0.7rem;color:var(--neutral-500);word-break:break-all;opacity:0.8">${r.noPihak1 || ''}</div>
                </td>
                <td style="padding:16px;max-width:180px;white-space:normal;line-height:1.4;">
                  <div style="font-weight:700;font-size:0.8rem;color:var(--primary-800);margin-bottom:4px">${r.pihak2 || '-'}</div>
                  <div style="font-size:0.7rem;color:var(--neutral-500);word-break:break-all;opacity:0.8">${r.noPihak2 || ''}</div>
                </td>
                <td style="padding:16px;white-space:nowrap;color:var(--neutral-600);">${r.tanggalMulai || '-'}</td>
                <td style="padding:16px;white-space:nowrap;color:var(--neutral-600);">${r.tanggalSelesai || '-'}</td>
                <td style="padding:16px;white-space:nowrap;">${this.renderStatusBadge(r.status)}</td>
                <td style="padding:16px;white-space:nowrap;">
                  ${r.linkDokumen ? `<a href="${r.linkDokumen}" target="_blank" class="btn btn-ghost btn-sm" style="padding:6px 12px;background:var(--primary-50);color:var(--primary-700);border-radius:var(--radius-md);font-weight:600;">📄 Lihat</a>` : '-'}
                </td>
                <td style="padding:16px;white-space:nowrap;text-align:center;">
                  <button class="btn btn-primary btn-sm" onclick="DatabasePage.openModal('${r.id}')" style="padding:8px 16px;border-radius:var(--radius-md);background:linear-gradient(135deg,var(--primary-600),var(--primary-800));border:none;font-weight:600;">✏️ Edit</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
        <!-- PAGINATION -->
        <div style="background:#fff;padding:16px;border-top:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;color:var(--neutral-500);font-size:13px">
          <div>Menampilkan ${totalData === 0 ? 0 : startIndex + 1}–${Math.min(startIndex + this.state.perPage, totalData)} dari ${totalData} data</div>
          <div style="display:flex;gap:4px">
            <button class="btn btn-ghost btn-sm" ${this.state.page <= 1 ? 'disabled' : ''} onclick="DatabasePage.setPage(${this.state.page - 1})">Sebelumnya</button>
            <span style="padding:4px 10px;font-weight:500;">Halaman ${this.state.page} / ${totalPages}</span>
            <button class="btn btn-ghost btn-sm" ${this.state.page >= totalPages ? 'disabled' : ''} onclick="DatabasePage.setPage(${this.state.page + 1})">Selanjutnya</button>
          </div>
        </div>
      </div>

      <!-- MODAL -->
      <div id="dbModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;align-items:center;justify-content:center;padding:20px;">
        <div style="background:#fff;border-radius:16px;width:100%;max-width:760px;max-height:92vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,0.3);">
          <div style="padding:24px 28px;border-bottom:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#fff;z-index:1;">
            <h2 id="dbModalTitle" style="font-size:18px;font-weight:700;color:var(--primary-900);margin:0;">Tambah Data Kerja Sama</h2>
            <button onclick="DatabasePage.closeModal()" style="background:var(--neutral-100);border:none;border-radius:8px;padding:8px 14px;cursor:pointer;font-size:18px;line-height:1;color:var(--neutral-600);">✕</button>
          </div>
          <div style="padding:28px;">
            <form id="dbForm" onsubmit="DatabasePage.saveForm(event)">
              <input type="hidden" id="dbFormId" />
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">

                <!-- Kategori Mitra -->
                <div class="form-group">
                  <label class="form-label">Kategori Mitra <span style="color:var(--danger-500)">*</span></label>
                  <select class="form-select" id="dbKategori" required style="width:100%;">
                    <option value="">Pilih Kategori...</option>
                    <option>K/L</option>
                    <option>BUMN</option>
                    <option>Pemda</option>
                    <option>Universitas</option>
                    <option>Ormas</option>
                    <option>Swasta</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <!-- Nama Mitra -->
                <div class="form-group">
                  <label class="form-label">Nama Mitra <span style="color:var(--danger-500)">*</span></label>
                  <input type="text" class="form-input" id="dbMitra" placeholder="Contoh: PT Telkom" required />
                </div>

                <!-- Jenis Kerja Sama -->
                <div class="form-group">
                  <label class="form-label">Jenis Kerja Sama <span style="color:var(--danger-500)">*</span></label>
                  <select class="form-select" id="dbJenis" required style="width:100%;">
                    <option value="">Pilih Jenis...</option>
                    <option>Perjanjian Kerja Sama</option>
                    <option>Nota Kesepahaman</option>
                    <option>Kesepakatan Bersama</option>
                    <option>Nota Kesepakatan</option>
                    <option>Memorandum Saling Pengertian</option>
                  </select>
                </div>

                <!-- Nomor Dokumen -->
                <div class="form-group">
                  <label class="form-label">Nomor Dokumen</label>
                  <input type="text" class="form-input" id="dbNomorDokumen" placeholder="Nomor Dokumen" />
                </div>

                <!-- Pihak 1 KKP -->
                <div class="form-group">
                  <label class="form-label">Pihak 1 (KKP) <span style="color:var(--danger-500)">*</span></label>
                  <input type="text" class="form-input" id="dbPihak1" placeholder="Contoh: Dirjen PRL" required />
                </div>

                <!-- Nomor Pihak 1 -->
                <div class="form-group">
                  <label class="form-label">Nomor Pihak 1 <span style="color:var(--danger-500)">*</span></label>
                  <input type="text" class="form-input" id="dbNoPihak1" placeholder="Contoh: xx/xxx/xx/xx/2026" required />
                </div>

                <!-- Pihak 2 Mitra -->
                <div class="form-group">
                  <label class="form-label">Pihak 2 (Mitra) <span style="color:var(--danger-500)">*</span></label>
                  <input type="text" class="form-input" id="dbPihak2" placeholder="Contoh: Pemkab Bandung" required />
                </div>

                <!-- Nomor Pihak 2 -->
                <div class="form-group">
                  <label class="form-label">Nomor Pihak 2 <span style="color:var(--danger-500)">*</span></label>
                  <input type="text" class="form-input" id="dbNoPihak2" placeholder="Contoh: xx/xxx/xx/xx/2026" required />
                </div>

                <!-- Tanggal Mulai -->
                <div class="form-group">
                  <label class="form-label">Tanggal Mulai <span style="color:var(--danger-500)">*</span></label>
                  <input type="date" class="form-input" id="dbTglMulai" required />
                </div>

                <!-- Berlaku Hingga -->
                <div class="form-group">
                  <label class="form-label">Berlaku Hingga <span style="color:var(--danger-500)">*</span></label>
                  <input type="date" class="form-input" id="dbTglSelesai" required />
                </div>

                <!-- Masa Berlaku -->
                <div class="form-group">
                  <label class="form-label">Masa Berlaku</label>
                  <input type="text" class="form-input" id="dbMasa" placeholder="Contoh: 5 Tahun" />
                </div>

                <!-- Status -->
                <div class="form-group">
                  <label class="form-label">Status <span style="color:var(--danger-500)">*</span></label>
                  <select class="form-select" id="dbStatus" required style="width:100%;">
                    <option value="">-- Pilih --</option>
                    <option selected>Berlaku</option>
                    <option>Tidak Berlaku</option>
                    <option>Proses</option>
                  </select>
                </div>

                <!-- Tahun (hidden, auto-detected) -->
                <input type="hidden" id="dbTahun" value="" />

              </div>

              <!-- File Upload -->
              <div class="form-group" style="margin-top:20px;">
                <label class="form-label">Import File Dokumen Pendukung (Opsional)</label>
                <div onclick="document.getElementById('dbFileInput').click()" style="border:2px dashed var(--neutral-300);border-radius:12px;padding:32px 20px;text-align:center;cursor:pointer;transition:border-color 0.2s,background 0.2s;" onmouseover="this.style.borderColor='var(--primary-400)';this.style.background='var(--primary-50)'" onmouseout="this.style.borderColor='var(--neutral-300)';this.style.background='#fff'">
                  <div style="font-size:40px;margin-bottom:12px;">📄</div>
                  <div style="color:var(--primary-600);font-weight:600;font-size:15px;margin-bottom:4px;">Klik untuk memilih file</div>
                  <div style="color:var(--neutral-400);font-size:13px;">Mendukung file Excel, PDF, dan Word (Maksimal 10MB)</div>
                  <input type="file" id="dbFileInput" accept=".pdf,.xlsx,.xls,.doc,.docx" style="display:none;" onchange="DatabasePage.handleFileSelect(this)" />
                </div>
                <div id="dbFileName" style="margin-top:8px;font-size:13px;color:var(--neutral-600);"></div>
              </div>

              <!-- Link Dokumen -->
              <div class="form-group" style="margin-top:8px;">
                <label class="form-label">Link Dokumen Web (Jika Ada)</label>
                <input type="url" class="form-input" id="dbLink" placeholder="https://..." style="width:100%;" />
              </div>

              <!-- Actions -->
              <div style="display:flex;justify-content:flex-end;align-items:center;gap:16px;margin-top:28px;padding-top:20px;border-top:1px solid var(--neutral-200);">
                <button type="button" style="background:none;border:none;cursor:pointer;font-size:15px;color:var(--neutral-600);font-weight:500;" onclick="DatabasePage.closeModal()">Batal</button>
                <button type="submit" style="background:#1a1a2e;color:#fff;border:none;border-radius:10px;padding:12px 28px;font-weight:700;font-size:15px;cursor:pointer;display:flex;align-items:center;gap:8px;">
                  💾 Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  handleFilter(key, value) {
    this.state[key] = value;
    this.state.page = 1;
    App.renderPage();
  },

  resetFilters() {
    this.state = { ...this.state, searchQuery: '', filterYear: 'all', filterCategory: 'all', filterStatus: 'all', page: 1 };
    App.renderPage();
  },

  setPage(p) {
    this.state.page = p;
    App.renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openModal(id) {
    const modal = document.getElementById('dbModal');
    if (!modal) return;
    document.getElementById('dbModalTitle').textContent = id ? 'Edit Data Kerja Sama' : 'Tambah Data Kerja Sama';
    document.getElementById('dbFormId').value = id || '';
    const fileNameDiv = document.getElementById('dbFileName');
    if (fileNameDiv) fileNameDiv.textContent = '';
    
    if (id) {
      const r = (MockData.databaseKerjaSama || []).find(x => x.id === id);
      if (r) {
        document.getElementById('dbKategori').value = r.kategoriMitra || '';
        document.getElementById('dbMitra').value = r.mitra || '';
        document.getElementById('dbJenis').value = r.jenisKerjasama || '';
        document.getElementById('dbNomorDokumen').value = r.no || r.noPihak1 || '';
        document.getElementById('dbPihak1').value = r.pihak1 || '';
        document.getElementById('dbNoPihak1').value = r.noPihak1 || '';
        document.getElementById('dbPihak2').value = r.pihak2 || '';
        document.getElementById('dbNoPihak2').value = r.noPihak2 || '';
        document.getElementById('dbMasa').value = r.masaBerlaku || '';
        document.getElementById('dbStatus').value = r.status || 'Berlaku';
        document.getElementById('dbTglMulai').value = r.tanggalMulai || '';
        document.getElementById('dbTglSelesai').value = r.tanggalSelesai || '';
        document.getElementById('dbLink').value = r.linkDokumen || '';
      }
    } else {
      document.getElementById('dbForm').reset();
      document.getElementById('dbStatus').value = 'Berlaku';
    }
    modal.style.display = 'flex';
  },

  closeModal() {
    const modal = document.getElementById('dbModal');
    if (modal) modal.style.display = 'none';
  },

  handleFileSelect(input) {
    const file = input.files[0];
    const div = document.getElementById('dbFileName');
    if (file && div) {
      div.innerHTML = `✅ <strong>${file.name}</strong> dipilih`;
    }
  },

  saveForm(e) {
    e.preventDefault();
    const id = document.getElementById('dbFormId').value;
    const tglMulai = document.getElementById('dbTglMulai').value;
    
    // Auto-detect tahun dari tanggal mulai
    let autoTahun = new Date().getFullYear().toString();
    if (tglMulai) {
      const dateParts = tglMulai.split('-');
      if (dateParts[0]) autoTahun = dateParts[0];
    }

    const item = {
      id: id || 'KSM-NEW-' + Date.now(),
      tahun: autoTahun,
      kategoriMitra: document.getElementById('dbKategori').value,
      mitra: document.getElementById('dbMitra').value,
      jenisKerjasama: document.getElementById('dbJenis').value,
      no: document.getElementById('dbNomorDokumen').value,
      pihak1: document.getElementById('dbPihak1').value,
      noPihak1: document.getElementById('dbNoPihak1').value,
      pihak2: document.getElementById('dbPihak2').value,
      noPihak2: document.getElementById('dbNoPihak2').value,
      masaBerlaku: document.getElementById('dbMasa').value,
      status: document.getElementById('dbStatus').value,
      tanggalMulai: tglMulai,
      tanggalSelesai: document.getElementById('dbTglSelesai').value,
      linkDokumen: document.getElementById('dbLink').value,
    };

    if (!MockData.databaseKerjaSama) MockData.databaseKerjaSama = [];
    if (id) {
      const idx = MockData.databaseKerjaSama.findIndex(x => x.id === id);
      if (idx !== -1) MockData.databaseKerjaSama[idx] = item;
    } else {
      MockData.databaseKerjaSama.unshift(item);
    }

    this.closeModal();
    App.showToast(id ? 'Data diperbarui!' : 'Data ditambahkan!', 'success');
    this.state.page = 1;
    App.renderPage();
  },

  exportData() {
    App.showToast('Menyiapkan data ekspor...', 'info');
    if (typeof XLSX !== 'undefined') {
      const worksheet = XLSX.utils.json_to_sheet(MockData.databaseKerjaSama || []);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Database Monitoring');
      XLSX.writeFile(workbook, 'Database_Kerjasama_KKP.xlsx');
    } else {
      alert('Library XLSX tidak dimuat.');
    }
  }
};
