"use client";

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import * as XLSX from 'xlsx';
import Portal from '@/components/Portal';

export default function KebijakanPrioritas() {
  const { data, updateKebijakan } = useData();
  const dbData = data.kebijakanPrioritas || [];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 20;

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    tahun: new Date().getFullYear().toString(),
    kategoriMitra: '',
    mitra: '',
    jenisKerjasama: '',
    pihak1: '',
    noPihak1: '',
    pihak2: '',
    noPihak2: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    status: 'Berlaku',
    fileDokumen: '',
    linkDokumen: ''
  });

  const filteredData = dbData.filter(item => {
    const matchesSearch = !searchQuery || 
      Object.values(item).some(val => val?.toString().toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesYear = filterYear === 'all' || item.tahun === filterYear;
    const matchesCategory = filterCategory === 'all' || item.kategoriMitra === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesYear && matchesCategory && matchesStatus;
  });

  const totalData = filteredData.length;
  const totalPages = Math.ceil(totalData / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterYear('all');
    setFilterCategory('all');
    setFilterStatus('all');
    setPage(1);
  };

  const openModal = (id = null) => {
    if (id) {
      const item = dbData.find(d => d.id === id);
      setEditData(item);
      setFormData({ ...item });
    } else {
      setEditData(null);
      setFormData({
        tahun: new Date().getFullYear().toString(),
        kategoriMitra: '',
        mitra: '',
        jenisKerjasama: '',
        pihak1: 'Biro Perencanaan',
        noPihak1: '',
        pihak2: '',
        noPihak2: '',
        tanggalMulai: '',
        tanggalSelesai: '',
        status: 'Aktif',
        fileDokumen: '',
        linkDokumen: ''
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveForm = (e) => {
    e.preventDefault();
    const newData = editData 
      ? dbData.map(d => d.id === editData.id ? { ...formData } : d)
      : [...dbData, { ...formData, id: Date.now() }];
    
    updateKebijakan(newData);
    closeModal();
  };

  const deleteItem = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      updateKebijakan(dbData.filter(d => d.id !== id));
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dukungan Kebijakan Prioritas");
    XLSX.writeFile(wb, "Kebijakan_Prioritas.xlsx");
  };

  const renderStatusBadge = (status) => {
    const isAktif = status?.toLowerCase() === 'aktif' || status?.toLowerCase() === 'berlaku';
    return (
      <span className={`badge ${isAktif ? 'badge-success' : 'badge-danger'}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
        {status}
      </span>
    );
  };

  return (
    <div className="page-fade-in">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dukungan Kebijakan Prioritas</h1>
          <p style={{ color: 'var(--neutral-500)', margin: 0 }}>Monitor dukungan kebijakan prioritas nasional di lingkungan KKP</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-ghost" onClick={exportToExcel} style={{ background: '#fff', border: '1px solid var(--neutral-200)', boxShadow: 'var(--shadow-sm)' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Excel
          </button>
          <button className="btn btn-primary" onClick={() => openModal()} style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', border: 'none', boxShadow: '0 4px 12px rgba(var(--primary-rgb), 0.3)' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Tambah Data
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '32px', gap: '24px' }}>
        <div className="card fade-in-up" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '20px', boxShadow: 'var(--shadow-md)', animationDelay: '0s' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neutral-500)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Kerja Sama</div>
          <div className="page-title" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '4px' }}>{totalData}</div>
          <div style={{ fontSize: '12px', color: 'var(--neutral-400)' }}>Semua kategori</div>
        </div>
        <div className="card fade-in-up" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '20px', boxShadow: 'var(--shadow-md)', animationDelay: '0.1s' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success-600)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Aktif / Berlaku</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--success-600)', marginBottom: '4px' }}>{dbData.filter(d => d.status?.toLowerCase() === 'aktif' || d.status?.toLowerCase() === 'berlaku').length}</div>
          <div style={{ fontSize: '12px', color: 'var(--success-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span> Status Aktif
          </div>
        </div>
        <div className="card fade-in-up" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '20px', boxShadow: 'var(--shadow-md)', animationDelay: '0.2s' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--danger-600)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Berakhir</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--danger-600)', marginBottom: '4px' }}>{dbData.filter(d => d.status?.toLowerCase() === 'berakhir' || d.status?.toLowerCase() === 'tidak berlaku').length}</div>
          <div style={{ fontSize: '12px', color: 'var(--danger-500)' }}>Perlu tindak lanjut</div>
        </div>
      </div>

      <div className="card" style={{ border: 'none', boxShadow: 'var(--shadow-lg)', borderRadius: '24px', overflow: 'hidden', background: '#fff' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--neutral-100)', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', background: 'linear-gradient(to right, #fff, var(--neutral-50))' }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" className="form-input" placeholder="Cari mitra, jenis kerja sama, atau nomor surat..." style={{ width: '100%', paddingLeft: '48px', borderRadius: '12px', border: '1px solid var(--neutral-200)', height: '48px' }} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <select className="form-select" style={{ minWidth: '150px', height: '48px', borderRadius: '12px' }} value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="all">Semua Tahun</option>
            {[...new Set(dbData.map(d => d.tahun))].sort().reverse().map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select className="form-select" style={{ minWidth: '180px', height: '48px', borderRadius: '12px' }} value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="all">Semua Kategori</option>
            {[...new Set(dbData.map(d => d.kategoriMitra))].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-select" style={{ minWidth: '150px', height: '48px', borderRadius: '12px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">Semua Status</option>
            <option value="Berlaku">Berlaku</option>
            <option value="Tidak Berlaku">Tidak Berlaku</option>
            <option value="Aktif">Aktif</option>
            <option value="Berakhir">Berakhir</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)', borderBottom: '2px solid var(--neutral-100)' }}>
                <th style={{ padding: '16px', textAlign: 'center', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>No</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Tahun</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Kategori</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Mitra</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Jenis</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Pihak 1 (KKP)</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Pihak 2 (Mitra)</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Tgl Mulai</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Tgl Selesai</th>
                <th style={{ padding: '16px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Dokumen</th>
                <th style={{ padding: '16px', textAlign: 'center', color: 'var(--neutral-600)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center', padding: '64px 24px', background: '#fff' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <div style={{ opacity: 0.3 }}>
                        <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      </div>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', color: 'var(--neutral-800)', fontWeight: 700 }}>Data Tidak Ditemukan</h3>
                        <p style={{ margin: 0, color: 'var(--neutral-500)', fontSize: '14px' }}>Coba ubah kata kunci atau filter Anda</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--neutral-100)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '16px', color: 'var(--neutral-500)', fontWeight: 600, textAlign: 'center' }}>{startIndex + i + 1}</td>
                  <td style={{ padding: '16px' }}>{r.tahun || '-'}</td>
                  <td style={{ padding: '16px' }}><span className="badge badge-info">{r.kategoriMitra || '-'}</span></td>
                  <td style={{ padding: '16px' }}><strong style={{ color: 'var(--primary-900)' }}>{r.mitra || '-'}</strong></td>
                  <td style={{ padding: '16px', color: 'var(--neutral-700)' }}>{r.jenisKerjasama || '-'}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-800)' }}>{r.pihak1 || '-'}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>{r.noPihak1 || ''}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-800)' }}>{r.pihak2 || '-'}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>{r.noPihak2 || ''}</div>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--neutral-600)' }}>{r.tanggalMulai || '-'}</td>
                  <td style={{ padding: '16px', color: 'var(--neutral-600)' }}>{r.tanggalSelesai || '-'}</td>
                  <td style={{ padding: '16px' }}>{renderStatusBadge(r.status)}</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    {r.linkDokumen ? <a href={r.linkDokumen} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: '6px 12px', background: 'var(--primary-50)', color: 'var(--primary-700)', borderRadius: '8px', fontWeight: 600 }}>Lihat</a> : '-'}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openModal(r.id)} style={{ color: 'var(--primary-600)' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => deleteItem(r.id)} style={{ color: 'var(--danger-600)' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ background: '#fff', padding: '16px 24px', borderTop: '1px solid var(--neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--neutral-500)', fontSize: '13px' }}>
          <div>Menampilkan {totalData === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + perPage, totalData)} dari {totalData} data</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Sebelumnya</button>
            <span style={{ padding: '6px 12px', borderRadius: '8px', background: 'var(--primary-50)', color: 'var(--primary-700)', fontWeight: 700 }}>{page}</span>
            <button className="btn btn-ghost btn-sm" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>Selanjutnya</button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Portal>
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
            <div className="modal-content" style={{ width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px', padding: 0, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', background: '#fff', position: 'relative' }}>
              <div style={{ padding: '24px 32px 16px 32px', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 10, borderBottom: '1px solid var(--neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--neutral-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-600)' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {editData ? 'Edit Data' : 'Tambah Data'}
                </h3>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  Tutup
                </button>
              </div>
              <form onSubmit={saveForm} style={{ padding: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Kategori Mitra <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.kategoriMitra} onChange={e => setFormData({ ...formData, kategoriMitra: e.target.value })}>
                      <option value="">Pilih Kategori...</option>
                      <option>K/L</option>
                      <option>BUMN</option>
                      <option>Universitas</option>
                      <option>Pemda</option>
                      <option>Swasta</option>
                      <option>Ormas</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Nama Mitra <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <input type="text" className="form-input" required placeholder="Contoh: PT Telkom" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.mitra} onChange={e => setFormData({ ...formData, mitra: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Jenis Kerja Sama <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.jenisKerjasama} onChange={e => setFormData({ ...formData, jenisKerjasama: e.target.value })}>
                      <option value="">Pilih Jenis...</option>
                      <option>Perjanjian Kerja Sama</option>
                      <option>Nota Kesepahaman</option>
                      <option>Kesepakatan Bersama</option>
                      <option>Memorandum Saling Pengertian</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Pihak 1 (KKP) <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="text" className="form-input" required placeholder="Unit Kerja" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.pihak1} onChange={e => setFormData({ ...formData, pihak1: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>No. Pihak 1</label>
                      <input type="text" className="form-input" placeholder="Nomor Surat" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.noPihak1} onChange={e => setFormData({ ...formData, noPihak1: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Pihak 2 (Mitra) <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="text" className="form-input" required placeholder="Mitra" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.pihak2} onChange={e => setFormData({ ...formData, pihak2: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>No. Pihak 2</label>
                      <input type="text" className="form-input" placeholder="Nomor Surat" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.noPihak2} onChange={e => setFormData({ ...formData, noPihak2: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Tahun <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="number" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.tahun} onChange={e => setFormData({ ...formData, tahun: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Tgl Mulai <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="date" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.tanggalMulai} onChange={e => setFormData({ ...formData, tanggalMulai: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Tgl Selesai <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="date" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.tanggalSelesai} onChange={e => setFormData({ ...formData, tanggalSelesai: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Status <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option>Berlaku</option>
                      <option>Tidak Berlaku</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Link Dokumen</label>
                    <input type="url" className="form-input" placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.linkDokumen || ''} onChange={e => setFormData({ ...formData, linkDokumen: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid var(--neutral-100)', paddingTop: '24px' }}>
                  <button type="button" className="btn btn-ghost" onClick={closeModal} style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 600 }}>Batal</button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px', borderRadius: '12px', fontWeight: 700, background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', border: 'none', color: '#fff' }}>
                    {editData ? 'Simpan Perubahan' : 'Tambah Data'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
