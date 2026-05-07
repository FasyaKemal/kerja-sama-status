const fs = require('fs');

let content = fs.readFileSync('app/js/pages/kebijakan_prioritas.js', 'utf8');

// 1. Add formatDateForInput and formatDatesForSave helpers
const helpers = `
  formatDateForInput(dateStr) {
    if (!dateStr || dateStr === '-') return '';
    try {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        let m = parts[0].padStart(2, '0');
        let d = parts[1].padStart(2, '0');
        let y = parts[2];
        if (y.length === 2) y = '20' + y;
        return \`\${y}-\${m}-\${d}\`;
      }
    } catch(e) {}
    return dateStr;
  },

  formatDateForSave(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return \`\${d.getMonth() + 1}/\${d.getDate()}/\${d.getFullYear()}\`;
      }
    } catch(e) {}
    return dateStr;
  },
`;

// 2. Add openForm, closeForm, and saveForm
const formMethods = `
  openForm(index = -1) {
    const isEdit = index !== -1;
    let r = {};
    if (isEdit) {
      r = this.data[index];
    }

    const modalHtml = \`
      <div id="kpModal" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div class="card" style="width:100%;max-width:800px;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;">
          <div style="padding:20px;border-bottom:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#fff;z-index:10;">
            <h3 style="margin:0;font-size:18px;font-weight:600">\${isEdit ? '✏️ Edit Kerja Sama' : '✨ Tambah Kerja Sama'}</h3>
            <button class="btn btn-ghost btn-sm" onclick="KebijakanPrioritasPage.closeForm()">✕ Tutup</button>
          </div>
          
          <form id="kpForm" onsubmit="event.preventDefault(); KebijakanPrioritasPage.saveForm(\${index});" style="padding:24px;display:flex;flex-direction:column;gap:20px;">
            
            <!-- Row 1 -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Kategori Mitra</label>
                <select class="form-select" id="inpKategori" required>
                  <option value="">Pilih Kategori...</option>
                  <option value="Pemda" \${r.kategoriMitra==='Pemda'?'selected':''}>Pemda</option>
                  <option value="K/L" \${r.kategoriMitra==='K/L'?'selected':''}>K/L</option>
                  <option value="BUMN" \${r.kategoriMitra==='BUMN'?'selected':''}>BUMN</option>
                  <option value="Universitas" \${r.kategoriMitra==='Universitas'?'selected':''}>Universitas</option>
                  <option value="Ormas" \${r.kategoriMitra==='Ormas'?'selected':''}>Ormas</option>
                  <option value="Swasta" \${r.kategoriMitra==='Swasta'?'selected':''}>Swasta</option>
                  <option value="Lainnya" \${r.kategoriMitra==='Lainnya'?'selected':''}>Lainnya</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Nama Mitra</label>
                <input type="text" class="form-input" id="inpMitra" value="\${r.mitra || ''}" required>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="form-group">
              <label class="form-label">Jenis Kerja Sama</label>
              <input type="text" class="form-input" id="inpJenis" value="\${r.jenisKerjasama || ''}" required>
            </div>

            <!-- Row 3: Unit Sign / Jabatan Sign -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Unit Sign (Pihak 1)</label>
                <input type="text" class="form-input" id="inpUnitSign" value="\${r.pihak1 || ''}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Jabatan Sign (Pihak 2)</label>
                <input type="text" class="form-input" id="inpJabatanSign" value="\${r.pihak2 || ''}" required>
              </div>
            </div>

            <!-- Row 4: Nomor -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Nomor (Pihak 1)</label>
                <input type="text" class="form-input" id="inpNo1" value="\${r.noPihak1 || ''}">
              </div>
              <div class="form-group">
                <label class="form-label">Nomor (Pihak 2)</label>
                <input type="text" class="form-input" id="inpNo2" value="\${r.noPihak2 || ''}">
              </div>
            </div>

            <!-- Row 5: Dates -->
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Masa Berlaku (Tahun)</label>
                <input type="number" class="form-input" id="inpMasa" value="\${r.masaBerlaku || ''}">
              </div>
              <div class="form-group">
                <label class="form-label">Tanggal Mulai</label>
                <input type="date" class="form-input" id="inpMulai" value="\${this.formatDateForInput(r.tanggalMulai)}">
              </div>
              <div class="form-group">
                <label class="form-label">Berlaku Hingga</label>
                <input type="date" class="form-input" id="inpHingga" value="\${this.formatDateForInput(r.tanggalSelesai)}">
              </div>
            </div>

            <!-- Row 6: Status & URL -->
            <div style="display:grid;grid-template-columns:1fr 2fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Status</label>
                <select class="form-select" id="inpStatus" required>
                  <option value="Berlaku" \${r.status==='Berlaku'?'selected':''}>Berlaku</option>
                  <option value="Tidak Berlaku" \${r.status==='Tidak Berlaku'?'selected':''}>Tidak Berlaku</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Link Dokumen</label>
                <input type="url" class="form-input" id="inpDokumen" value="\${r.linkDokumen || ''}">
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:12px;padding-top:20px;border-top:1px solid var(--neutral-200);">
              <button type="button" class="btn btn-ghost" onclick="KebijakanPrioritasPage.closeForm()">Batal</button>
              <button type="submit" class="btn btn-primary" style="background:var(--blue-600);color:#fff">\${isEdit ? 'Simpan Perubahan' : 'Tambah Data'}</button>
            </div>
          </form>
        </div>
      </div>
    \`;

    const div = document.createElement('div');
    div.id = 'kpModalContainer';
    div.innerHTML = modalHtml;
    document.body.appendChild(div);
  },

  closeForm() {
    const el = document.getElementById('kpModalContainer');
    if (el) el.remove();
  },

  saveForm(index) {
    const newData = {
      kategoriMitra: document.getElementById('inpKategori').value,
      mitra: document.getElementById('inpMitra').value,
      jenisKerjasama: document.getElementById('inpJenis').value,
      pihak1: document.getElementById('inpUnitSign').value,
      pihak2: document.getElementById('inpJabatanSign').value,
      noPihak1: document.getElementById('inpNo1').value,
      noPihak2: document.getElementById('inpNo2').value,
      masaBerlaku: document.getElementById('inpMasa').value,
      tanggalMulai: this.formatDateForSave(document.getElementById('inpMulai').value),
      tanggalSelesai: this.formatDateForSave(document.getElementById('inpHingga').value),
      status: document.getElementById('inpStatus').value,
      linkDokumen: document.getElementById('inpDokumen').value,
      tahun: new Date().getFullYear().toString()
    };

    if (index === -1) {
      this.data.unshift(newData); // Tambah di atas
    } else {
      newData.tahun = this.data[index].tahun; // keep original year
      this.data[index] = newData;
    }

    this.closeForm();
    App.renderPage();
  },
`;

// Insert the methods into the object
content = content.replace('setPage(p) {', helpers + '\n' + formMethods + '\n  setPage(p) {');

// 3. Update the header to include the "Tambah" button
content = content.replace(
  '<h1 class="page-title">Database Kerja Sama Mendukung Kebijakan Ekonomi Biru</h1>',
  \`<div style="display:flex;justify-content:space-between;align-items:center;">
          <h1 class="page-title">Database Kerja Sama Mendukung Kebijakan Ekonomi Biru</h1>
          <button class="btn btn-primary" style="background:var(--blue-600);color:#fff;" onclick="KebijakanPrioritasPage.openForm()">+ Tambah Data</button>
        </div>\`
);

// 4. Update the table header to include "Aksi"
content = content.replace('<th>Dokumen</th>', '<th>Dokumen</th>\n              <th>Aksi</th>');

// 5. Update the table body to include Edit button
content = content.replace(
  /<td>\s*\$\{r\.linkDokumen[\s\S]*?<\/td>/,
  `$&
                <td style="white-space:nowrap">
                  <button class="btn btn-ghost btn-sm" onclick="KebijakanPrioritasPage.openForm(\${startIndex + i})" style="padding:4px 8px; color: var(--blue-600); font-weight: 500;">✏️ Edit</button>
                </td>`
);

fs.writeFileSync('app/js/pages/kebijakan_prioritas.js', content);
console.log('Patched CRUD');
