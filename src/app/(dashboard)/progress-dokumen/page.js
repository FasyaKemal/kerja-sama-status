"use client";

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import SuccessPopup from '@/components/SuccessPopup';
import ConfirmDialog from '@/components/ConfirmDialog';
import { formatDate } from '@/lib/formatDate';
import toast from 'react-hot-toast';


export default function ProgressDokumen() {
  const { data, updateProgress } = useData();
  const progressData = data.progressDokumen || [];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('Semua');

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    no: '', judul: '', mitra: '', step: 1, tahun: '2026', tanggalMulai: '', tanggalSelesai: '', linkDokumen: '', fileDokumen: null
  });


  const timelineSteps = [
    "Surat Penyusunan/Perpanjangan Kerja Sama",
    "Disposisi",
    "Pembahasan Penyusunan Naskah Kerja Sama (3 Hari)",
    "Surat ke Mitra terkait Hasil Pembahasan (1 Hari)",
    "Menerima Masukkan Kerja Sama dari Mitra (3 Hari)",
    "Memo Rokum Roren (Hasil Masukkan dari Mitra) (1 Hari)",
    "Memo Rokum Roren (Finalisasi) (3 Hari)",
    "Memo Roren Sekjen (Persetujuan Paraf) (2 Hari)",
    "Memo Sekjen MKP (Penandatanganan) (1 Hari)",
    "Penandatanganan Final"
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
      setFormData({ no: '', judul: '', mitra: '', step: 1, tahun: '2026', tanggalMulai: '', tanggalSelesai: '', linkDokumen: '', fileDokumen: null });

    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveForm = (e) => {
    e.preventDefault();
    
    const step = parseInt(formData.step);
    const progress = Math.round((step / timelineSteps.length) * 100);
    const status = step === timelineSteps.length ? 'Selesai' : timelineSteps[step-1];
    const update = formatDate(new Date());


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
    setSuccessMessage(editData ? 'Berhasil Diperbarui!' : 'Berhasil Ditambahkan!');
    setShowSuccess(true);
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    const newData = progressData.filter(x => x.id !== pendingDeleteId);
    updateProgress(newData);
    setConfirmDeleteOpen(false);
    setPendingDeleteId(null);
    setSuccessMessage('Berhasil Dihapus!');
    setShowSuccess(true);
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setPendingDeleteId(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB.');
        e.target.value = '';
        return;
        }
        setFormData({ ...formData, fileDokumen: file });
      }
  };

  return (
    <div className="page-fade-in">
      <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-400) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Progress Penyusunan Dokumen Kerja Sama</h1>

          <p className="text-muted" style={{ marginTop: '4px' }}>Monitoring tahapan penyusunan, paraf, dan penandatanganan dokumen kerja sama</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <span>+</span> Tambah Dokumen
        </button>
      </div>

      <div className="card glass-morphism animate-fade-in" style={{ marginBottom: '28px' }}>
        <div className="card-header"><h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Alur Tahapan Penyusunan
        </h3></div>
        <div className="card-body" style={{ padding: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '16px', position: 'relative', minWidth: '1000px' }}>
            {timelineSteps.map((step, index) => {
              const stepNumber = index + 1;
              const count = progressData.filter(r => parseInt(r.step) === stepNumber).length;
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  {/* Badge notif */}
                  <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 10px rgba(var(--primary-rgb), 0.3)' }}>
                      {stepNumber}
                    </div>
                    {count > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-10px',
                        background: '#ef4444',
                        color: '#fff',
                        borderRadius: '50%',
                        minWidth: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '0 4px',
                        border: '2px solid #fff',
                        boxShadow: '0 2px 6px rgba(239,68,68,0.4)',
                        lineHeight: 1,
                        zIndex: 2
                      }}>
                        {count}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--neutral-700)', lineHeight: 1.4 }}>{step}</div>
                </div>
              );
            })}
            <div style={{ position: 'absolute', top: '18px', left: '40px', right: '40px', height: '2px', background: 'var(--neutral-200)', zIndex: 0 }}></div>
          </div>
        </div>

      </div>

      <div className="card glass-morphism animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--neutral-800)' }}>Daftar Dokumen Monitoring</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ marginBottom: 0, minWidth: '280px', position: 'relative' }}>
              <span className="search-bar-icon" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
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
                  <th style={{ padding: '16px', width: '180px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MITRA</th>
                  <th style={{ padding: '16px', width: '110px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TGL MULAI</th>
                  <th style={{ padding: '16px', width: '110px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TGL SELESAI</th>
                  <th style={{ padding: '16px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TAHAPAN SAAT INI</th>
                  <th style={{ padding: '16px', width: '110px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>UPDATE</th>
                  <th style={{ padding: '16px', width: '120px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROGRESS</th>
                  <th style={{ padding: '16px', width: '120px', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                  <th style={{ padding: '16px', width: '80px', textAlign: 'right', color: 'var(--neutral-600)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AKSI</th>

                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '64px 24px', background: '#fff' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div style={{ opacity: 0.5 }}>
                          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
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
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle', color: 'var(--neutral-800)', fontSize: '13px', fontWeight: 600 }}>
                        {formatDate(r.tanggalMulai)}
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle', color: 'var(--neutral-800)', fontSize: '13px', fontWeight: 600 }}>
                        {formatDate(r.tanggalSelesai)}
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle' }}>
                        <div style={{ color: `var(--${color}-700)`, fontWeight: 800, fontSize: '11px', lineHeight: 1.5, maxWidth: '250px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          TAHAP {r.step}: {timelineSteps[r.step-1]}
                        </div>
                      </td>
                      <td style={{ padding: '20px 16px', verticalAlign: 'middle', color: 'var(--neutral-600)', fontSize: '12px', fontWeight: 500 }}>
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
                          <button className="btn btn-ghost btn-sm" style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => openModal(r.id)} title="Edit Data">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button className="btn btn-ghost btn-sm" style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: 'var(--red-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => requestDelete(r.id)} title="Hapus Data">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
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
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--neutral-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-600)' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {editData ? 'Update Progress Dokumen' : 'Tambah Monitoring Dokumen'}
                </h3>
              </div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-500)', padding: 0, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Tutup
              </button>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Tgl Mulai <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <input type="date" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.tanggalMulai} onChange={e => setFormData({ ...formData, tanggalMulai: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Tgl Selesai <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <input type="date" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.tanggalSelesai} onChange={e => setFormData({ ...formData, tanggalSelesai: e.target.value })} />
                  </div>
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
                        <div style={{ marginBottom: '12px', color: 'var(--success-500)' }}>
                          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--success-600)', marginBottom: '4px' }}>{formData.fileDokumen.name || 'Dokumen Terpilih'}</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ marginBottom: '12px', color: 'var(--neutral-400)' }}>
                          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: '4px' }}>Klik untuk upload</div>
                      </div>
                    )}
                    <input type="file" id="file-upload" accept=".pdf,.doc,.docx,.xls,.xlsx" style={{ display: 'none' }} onChange={handleFileUpload} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid var(--neutral-100)', paddingTop: '24px', marginTop: '24px' }}>
                <button type="button" className="btn btn-ghost" onClick={closeModal} style={{ fontSize: '13px', fontWeight: 600, padding: '10px 20px' }}>Batal</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDialog
        show={confirmDeleteOpen}
        title="Konfirmasi Hapus"
        message="Apakah Anda yakin ingin menghapus data monitoring ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <SuccessPopup show={showSuccess} message={successMessage} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
