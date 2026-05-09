"use client";

import { useState } from 'react';
import { useData } from '@/context/DataContext';

export default function ProgressDokumen() {
  const { data, updateProgress } = useData();
  const progressData = data.progressDokumen || [];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('Semua');

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const [formData, setFormData] = useState({
    no: '', judul: '', mitra: '', step: 1, tahun: '2026', linkDokumen: '', fileDokumen: null
  });

  const timelineSteps = [
    "Identifikasi & Inisiasi",
    "Penyusunan Draft (Naskah)",
    "Pembahasan Internal KKP",
    "Pembahasan dengan Mitra",
    "Finalisasi Draft",
    "Harmonisasi & Clearance",
    "Proses Paraf",
    "Penandatanganan Dokumen"
  ];

  const getFilteredData = () => {
    let filtered = [...progressData];
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(r =>
        (r.mitra && r.mitra.toLowerCase().includes(q)) || 
        (r.judul && r.judul.toLowerCase().includes(q)) || 
        (r.no && r.no.toLowerCase().includes(q))
      );
    }
    if (filterYear !== 'Semua') {
      filtered = filtered.filter(r => String(r.tahun || '').trim() === String(filterYear).trim());
    }
    return filtered;
  };

  const filteredData = getFilteredData();

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleYearChange = (e) => setFilterYear(e.target.value);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterYear('Semua');
  };

  const openModal = (id = null) => {
    if (id) {
      const r = progressData.find(x => x.id === id);
      if (r) {
        setEditData(id);
        setFormData({ ...r });
      }
    } else {
      setEditData(null);
      setFormData({ no: '', judul: '', mitra: '', step: 1, tahun: '2026', linkDokumen: '', fileDokumen: null });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveForm = (e) => {
    e.preventDefault();
    
    const step = parseInt(formData.step);
    const progress = Math.round((step / timelineSteps.length) * 100);
    const status = step === timelineSteps.length ? 'Selesai' : timelineSteps[step-1];
    const date = new Date();
    const update = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const item = {
      ...formData,
      id: editData || 'PROG-' + Date.now(),
      step,
      progress,
      status,
      update
    };

    let newData;
    if (editData) {
      newData = progressData.map(x => x.id === editData ? item : x);
    } else {
      newData = [item, ...progressData];
    }

    updateProgress(newData);
    closeModal();
    alert(editData ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
  };

  const deleteItem = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data monitoring ini?')) {
      const newData = progressData.filter(x => x.id !== id);
      updateProgress(newData);
      alert('Data berhasil dihapus');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("⚠️ Ukuran file maksimal 5MB!");
        e.target.value = '';
        return;
      }
      setFormData({ ...formData, fileDokumen: file });
    }
  };

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease-out' }}>
      <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title">Progress Penyusunan Dokumen Kerja Sama</h1>
          <p className="text-muted" style={{ marginTop: '4px' }}>Monitoring tahapan penyusunan, paraf, dan penandatanganan dokumen kerja sama</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <span>+</span> Tambah Dokumen
        </button>
      </div>

      <div className="card glass-morphism animate-fade-in" style={{ marginBottom: '28px' }}>
        <div className="card-header"><h3 className="card-title">⏳ Alur Tahapan Penyusunan</h3></div>
        <div className="card-body" style={{ padding: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '16px', position: 'relative', minWidth: '1000px' }}>
            {timelineSteps.map((step, index) => (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '12px', fontSize: '14px', boxShadow: '0 4px 10px rgba(var(--primary-rgb), 0.3)' }}>
                  {index + 1}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--neutral-700)', lineHeight: 1.4 }}>{step}</div>
              </div>
            ))}
            <div style={{ position: 'absolute', top: '18px', left: '40px', right: '40px', height: '2px', background: 'var(--neutral-200)', zIndex: 0 }}></div>
          </div>
        </div>
      </div>

      <div className="card glass-morphism animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--neutral-800)' }}>Daftar Dokumen Monitoring</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ marginBottom: 0, minWidth: '280px', position: 'relative' }}>
              <span className="search-bar-icon" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
              <input type="text" placeholder="Cari Mitra, Judul, atau Nomor..." onChange={handleSearch} value={searchQuery} style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }} />
            </div>
            <select className="form-select" style={{ width: '140px', padding: '10px', borderRadius: 'var(--radius-md)' }} onChange={handleYearChange} value={filterYear}>
              <option value="Semua">Semua Tahun</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
        
        <div id="progress-table-container">
          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ background: 'var(--neutral-50)' }}>
                  <th style={{ padding: '16px', width: '60px', textAlign: 'center', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NO</th>
                  <th style={{ padding: '16px', width: '220px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NOMOR & JUDUL</th>
                  <th style={{ padding: '16px', width: '200px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MITRA</th>
                  <th style={{ padding: '16px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TAHAPAN SAAT INI</th>
                  <th style={{ padding: '16px', width: '140px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>UPDATE TERAKHIR</th>
                  <th style={{ padding: '16px', width: '140px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROGRESS</th>
                  <th style={{ padding: '16px', width: '160px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                  <th style={{ padding: '16px', width: '100px', textAlign: 'right', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '64px 24px', background: '#fff' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div style={{ fontSize: '48px', opacity: 0.5 }}>🔍</div>
                        <div>
                          <h3 style={{ margin: '0 0 8px 0', color: 'var(--neutral-800)', fontWeight: 700 }}>Data Tidak Ditemukan</h3>
                          <p style={{ margin: 0, color: 'var(--neutral-500)', fontSize: '14px', maxWidth: '400px' }}>Kami tidak dapat menemukan data dengan kata kunci atau filter tersebut.</p>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={resetFilters} style={{ marginTop: '8px' }}>Reset Filter</button>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.map((r, i) => {
                  let color = 'primary';
                  if (r.progress === 100) color = 'green';
                  else if (r.progress < 30) color = 'orange';

                  return (
                    <tr key={r.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                      <td style={{ padding: '20px 16px', textAlign: 'center', verticalAlign: 'middle', color: 'var(--neutral-500)', fontWeight: 600 }}>{i + 1}</td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle' }}>
                        <div style={{ fontWeight: 700, color: 'var(--primary-900)', marginBottom: '4px', fontSize: '14px' }}>{r.no}</div>
                        <div style={{ fontSize: '12px', color: 'var(--neutral-500)', lineHeight: 1.5, fontWeight: 500 }}>{r.judul}</div>
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle' }}>
                        <div style={{ fontWeight: 700, color: 'var(--neutral-800)', fontSize: '14px' }}>{r.mitra}</div>
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle' }}>
                        <div style={{ color: `var(--${color}-700)`, fontWeight: 800, fontSize: '11px', lineHeight: 1.5, maxWidth: '250px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          TAHAP {r.step}: {timelineSteps[r.step-1]}
                        </div>
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle', color: 'var(--neutral-600)', fontSize: '13px', fontWeight: 500 }}>
                        {r.update}
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ flex: 1, height: '10px', background: 'var(--neutral-100)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--neutral-200)' }}>
                            <div style={{ height: '100%', width: `${r.progress}%`, background: `var(--${color}-500)` }}></div>
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: `var(--${color}-700)`, minWidth: '40px' }}>{r.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--neutral-700)', lineHeight: 1.4, maxWidth: '140px' }}>
                          {r.status}
                        </div>
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button className="btn btn-ghost btn-sm" style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }} onClick={() => openModal(r.id)} title="Edit Data">✏️</button>
                          <button className="btn btn-ghost btn-sm" style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: 'var(--red-500)' }} onClick={() => deleteItem(r.id)} title="Hapus Data">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="modal-content" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '12px', padding: 0, boxShadow: 'var(--shadow-2xl)', background: '#fff', position: 'relative' }}>
            <div style={{ padding: '24px 32px 16px 32px', position: 'sticky', top: 0, background: '#fff', zIndex: 10, borderBottom: '1px solid var(--neutral-100)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--neutral-900)' }}>{editData ? '✨ Update Progress Dokumen' : '✨ Tambah Monitoring Dokumen'}</h3>
              </div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-500)', padding: 0, marginTop: '12px' }}>✕ Tutup</button>
            </div>
            <form onSubmit={saveForm} style={{ padding: '24px 32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Nomor Dokumen <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <input type="text" className="form-input" required placeholder="Contoh: 01/PKS/2026" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.no} onChange={e => setFormData({ ...formData, no: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Judul Dokumen Kerja Sama <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <input type="text" className="form-input" required placeholder="Masukkan judul lengkap..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.judul} onChange={e => setFormData({ ...formData, judul: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Mitra <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <input type="text" className="form-input" required placeholder="Nama instansi mitra" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.mitra} onChange={e => setFormData({ ...formData, mitra: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Tahun <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.tahun} onChange={e => setFormData({ ...formData, tahun: e.target.value })}>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Tahapan Saat Ini <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.step} onChange={e => setFormData({ ...formData, step: e.target.value })}>
                    {timelineSteps.map((s, i) => (
                      <option key={i} value={i + 1}>Tahap {i + 1}: {s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Link Dokumen (G-Drive / Cloud)</label>
                  <input type="url" className="form-input" placeholder="https://drive.google.com/..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.linkDokumen} onChange={e => setFormData({ ...formData, linkDokumen: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Upload Dokumen Kerja Sama (Opsional)</label>
                  <div style={{ border: '2px dashed var(--neutral-300)', borderRadius: '8px', padding: '24px', textAlign: 'center', background: 'var(--neutral-50)', cursor: 'pointer' }} onClick={() => document.getElementById('file-upload').click()}>
                    {formData.fileDokumen ? (
                      <div>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--success-600)', marginBottom: '4px' }}>{formData.fileDokumen.name || 'Dokumen Terpilih'}</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📄</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: '4px' }}>Klik untuk upload</div>
                      </div>
                    )}
                    <input type="file" id="file-upload" accept=".pdf,.doc,.docx,.xls,.xlsx" style={{ display: 'none' }} onChange={handleFileUpload} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid var(--neutral-100)', paddingTop: '24px', marginTop: '24px' }}>
                <button type="button" className="btn btn-ghost" onClick={closeModal} style={{ fontSize: '13px', fontWeight: 600, padding: '10px 20px' }}>Batal</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}>
                  💾 Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
