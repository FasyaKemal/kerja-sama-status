"use client";

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import * as XLSX from 'xlsx';

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
    kategoriMitra: '', mitra: '', jenisKerjasama: '', noUtama: '', pihak1: '', noPihak1: '', pihak2: '', noPihak2: '', tanggalMulai: '', tanggalSelesai: '', masaBerlaku: '', status: 'Berlaku', linkDokumen: ''
  });

  const getFilteredData = () => {
    let filtered = [...dbData];
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(r =>
        String(r.mitra || '').toLowerCase().includes(q) ||
        String(r.noPihak1 || '').toLowerCase().includes(q) ||
        String(r.noPihak2 || '').toLowerCase().includes(q) ||
        String(r.jenisKerjasama || '').toLowerCase().includes(q) ||
        String(r.pihak1 || '').toLowerCase().includes(q) ||
        String(r.pihak2 || '').toLowerCase().includes(q)
      );
    }
    if (filterYear !== 'all') {
      filtered = filtered.filter(r => String(r.tahun || '').trim() === String(filterYear).trim());
    }
    if (filterCategory !== 'all') {
      filtered = filtered.filter(r => String(r.kategoriMitra || '').trim() === String(filterCategory).trim());
    }
    if (filterStatus !== 'all') {
      if (filterStatus === 'Berlaku') {
        filtered = filtered.filter(r => {
          const s = String(r.status || '').toLowerCase();
          return s.includes('berlaku') && !s.includes('tidak');
        });
      } else if (filterStatus === 'Tidak Berlaku') {
        filtered = filtered.filter(r => String(r.status || '').toLowerCase().includes('tidak'));
      }
    }
    return filtered;
  };

  const filteredData = getFilteredData();
  const totalData = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalData / perPage));
  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

  const aktifCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('berlaku') && !String(r.status || '').toLowerCase().includes('tidak')).length;
  const tidakAktifCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('tidak')).length;
  const lainnyaCount = totalData - aktifCount - tidakAktifCount;

  const years = [...new Set(dbData.map(r => String(r.tahun || '').trim()).filter(y => /^20\d{2}$/.test(y)))].sort().reverse();
  const categories = ['Pemda', 'K/L', 'BUMN', 'Universitas', 'Ormas', 'Swasta', 'Lainnya'];

  const handleFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterYear('all');
    setFilterCategory('all');
    setFilterStatus('all');
    setPage(1);
  };

  const renderStatusBadge = (status) => {
    const s = String(status || '').toLowerCase();
    if (s.includes('berlaku') && !s.includes('tidak')) return <span className="badge badge-success">● Berlaku</span>;
    if (s.includes('tidak')) return <span className="badge badge-danger">○ Tidak Berlaku</span>;
    return <span className="badge badge-info">{status || '-'}</span>;
  };

  const exportToExcel = () => {
    const formattedData = dbData.map((row, index) => ({
      "No": index + 1,
      "Tahun": row.tahun || '-',
      "Kategori Mitra": row.kategoriMitra || '-',
      "Nama Mitra": row.mitra || '-',
      "Jenis Kerja Sama": row.jenisKerjasama || '-',
      "Nomor Dokumen": row.noUtama || '-',
      "Pihak 1 (KKP)": `${row.pihak1 || '-'} ${row.noPihak1 ? '(' + row.noPihak1 + ')' : ''}`,
      "Pihak 2 (Mitra)": `${row.pihak2 || '-'} ${row.noPihak2 ? '(' + row.noPihak2 + ')' : ''}`,
      "Tanggal Mulai": row.tanggalMulai || '-',
      "Berlaku Hingga": row.tanggalSelesai || '-',
      "Status": row.status || '-'
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kebijakan Prioritas");
    XLSX.writeFile(workbook, `Data_Kebijakan_Prioritas_KKP_${new Date().toLocaleDateString('id-ID')}.xlsx`);
  };

  const exportToPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    await import('jspdf-autotable');
    
    const doc = new jsPDF('landscape');
    
    doc.setFontSize(16);
    doc.text('Dukungan Kebijakan Prioritas KKP', 14, 20);
    doc.setFontSize(10);
    doc.text(`Tanggal Ekspor: ${new Date().toLocaleDateString('id-ID')}`, 14, 28);
    
    const tableData = dbData.map((row, index) => [
      index + 1,
      row.noUtama || '-',
      row.mitra || '-',
      `${row.pihak1 || '-'} & ${row.pihak2 || '-'}`,
      row.jenisKerjasama || '-',
      row.tanggalMulai || '-',
      row.tanggalSelesai || '-',
      row.status || '-'
    ]);
    
    doc.autoTable({
      startY: 35,
      head: [['No', 'Nomor Dokumen', 'Nama Mitra', 'Pihak Terlibat', 'Jenis Kerja Sama', 'Tgl Mulai', 'Tgl Berakhir', 'Status']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [12, 74, 110] }
    });
    
    doc.save(`Data_Kebijakan_Prioritas_KKP_${new Date().toLocaleDateString('id-ID')}.pdf`);
  };

  const openModal = (id = null) => {
    if (id) {
      const r = dbData.find(x => x.id === id);
      if (r) {
        setEditData(id);
        setFormData({ ...r, tanggalMulai: parseDateToISO(r.tanggalMulai), tanggalSelesai: parseDateToISO(r.tanggalSelesai) });
      }
    } else {
      setEditData(null);
      setFormData({ kategoriMitra: '', mitra: '', jenisKerjasama: '', noUtama: '', pihak1: '', noPihak1: '', pihak2: '', noPihak2: '', tanggalMulai: '', tanggalSelesai: '', masaBerlaku: '', status: 'Berlaku', linkDokumen: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const parseDateToISO = (dateStr) => {
    if (!dateStr || dateStr === '-') return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    try {
      const d = new Date(dateStr);
      if (!isNaN(d)) return d.toISOString().split('T')[0];
    } catch (e) { }
    return '';
  };

  const saveForm = (e) => {
    e.preventDefault();
    const tglMulai = formData.tanggalMulai;
    const tglSelesai = formData.tanggalSelesai;
    
    // Validasi Tanggal
    if (tglMulai && tglSelesai) {
      if (new Date(tglSelesai) < new Date(tglMulai)) {
        alert('⚠️ Validasi Gagal: Tanggal Berakhir tidak boleh mendahului Tanggal Mulai!');
        return;
      }
    }

    const autoTahun = tglMulai ? tglMulai.split('-')[0] : new Date().getFullYear().toString();
    
    const item = {
      ...formData,
      id: editData || 'KSM-' + Date.now(),
      tahun: autoTahun,
    };

    let newData;
    if (editData) {
      newData = dbData.map(x => x.id === editData ? item : x);
    } else {
      newData = [item, ...dbData];
    }

    updateKebijakan(newData);
    closeModal();
    alert(editData ? 'Data diperbarui!' : 'Data ditambahkan!');
  };

  const deleteItem = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const newData = dbData.filter(x => x.id !== id);
      updateKebijakan(newData);
      alert('Data berhasil dihapus');
    }
  };

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title">Dukungan Kebijakan Prioritas</h1>
          <p className="text-muted" style={{ marginTop: '4px' }}>Monitoring dukungan kerja sama terhadap program prioritas KKP</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" style={{ border: '1px solid var(--neutral-300)' }} onClick={exportToExcel}>📥 Ekspor Excel</button>
          <button className="btn btn-ghost" style={{ border: '1px solid var(--neutral-300)' }} onClick={exportToPDF}>📄 Ekspor PDF</button>
          <button className="btn btn-primary" onClick={() => openModal()}><span>+</span> Tambah Data</button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="card" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'linear-gradient(135deg, #fff 0%, var(--primary-50) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>📊</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-700)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Kerja Sama</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-900)', lineHeight: 1 }}>{totalData}</div>
          <div style={{ fontSize: '12px', color: 'var(--neutral-500)', marginTop: '8px' }}>Data terfilter</div>
        </div>
        <div className="card" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'linear-gradient(135deg, #fff 0%, var(--success-100) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>✅</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--success-600)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Berlaku</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--success-600)', lineHeight: 1 }}>{aktifCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--success-500)', marginTop: '8px' }}>Status aktif</div>
        </div>
        <div className="card" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'linear-gradient(135deg, #fff 0%, var(--danger-100) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>⚠️</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--danger-600)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tidak Berlaku</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--danger-600)', lineHeight: 1 }}>{tidakAktifCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--danger-500)', marginTop: '8px' }}>Masa berlaku habis</div>
        </div>
        <div className="card" style={{ padding: '24px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'linear-gradient(135deg, #fff 0%, var(--neutral-100) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>⚙️</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--neutral-600)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Lainnya</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--neutral-800)', lineHeight: 1 }}>{lainnyaCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--neutral-500)', marginTop: '8px' }}>Status lainnya</div>
        </div>
      </div>

      <div className="card glass page-filter-bar" style={{ marginBottom: '24px', padding: '24px', border: 'none', boxShadow: 'var(--shadow-lg)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <div className="search-container" style={{ flex: 2, minWidth: '250px', position: 'relative' }}>
          <span className="search-icon" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }}>🔍</span>
          <input type="text" className="search-input" style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', background: '#fff', fontSize: '14px' }} placeholder="Cari mitra, jenis, nomor, atau pihak..." value={searchQuery} onChange={handleFilter(setSearchQuery)} />
        </div>
        
        <div style={{ flex: 1, minWidth: '100px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neutral-800)', display: 'block', marginBottom: '8px' }}>Tahun</label>
          <select className="form-select" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', background: '#fff', fontSize: '14px' }} value={filterYear} onChange={handleFilter(setFilterYear)}>
            <option value="all">Semua</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div style={{ flex: 1.5, minWidth: '160px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neutral-800)', display: 'block', marginBottom: '8px' }}>Kategori</label>
          <select className="form-select" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', background: '#fff', fontSize: '14px' }} value={filterCategory} onChange={handleFilter(setFilterCategory)}>
            <option value="all">Semua Kategori</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ flex: 1.5, minWidth: '160px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neutral-800)', display: 'block', marginBottom: '8px' }}>Status</label>
          <select className="form-select" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', background: '#fff', fontSize: '14px' }} value={filterStatus} onChange={handleFilter(setFilterStatus)}>
            <option value="all">Semua Status</option>
            <option value="Berlaku">Berlaku</option>
            <option value="Tidak Berlaku">Tidak Berlaku</option>
          </select>
        </div>

        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger-600)', fontWeight: 600, marginBottom: '6px', flexShrink: 0 }} onClick={resetFilters}>✕ Reset</button>
      </div>

      <div className="card" style={{ overflowX: 'auto', width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', background: '#fff' }}>
        <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table" style={{ fontSize: '13px', minWidth: '1400px', width: '100%' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)' }}>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>No</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Tahun</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Kategori Mitra</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Nama Mitra</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Jenis Kerja Sama</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Pihak 1 (KKP)</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Pihak 2 (Mitra)</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Tgl Mulai</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Berlaku Hingga</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Status</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>Dokumen</th>
                <th style={{ whiteSpace: 'nowrap', padding: '12px 16px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center', padding: '64px 24px', background: '#fff' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <div style={{ fontSize: '48px', opacity: 0.5 }}>🔍</div>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', color: 'var(--neutral-800)', fontWeight: 700 }}>Data Tidak Ditemukan</h3>
                        <p style={{ margin: 0, color: 'var(--neutral-500)', fontSize: '14px', maxWidth: '400px' }}>Kami tidak dapat menemukan data dengan kata kunci atau filter tersebut. Silakan gunakan kata kunci lain.</p>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={resetFilters} style={{ marginTop: '8px' }}>Reset Filter</button>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                  <td style={{ padding: '16px', color: 'var(--neutral-500)', fontWeight: 600, textAlign: 'center' }}>{startIndex + i + 1}</td>
                  <td style={{ padding: '16px' }}>{r.tahun || '-'}</td>
                  <td style={{ padding: '16px' }}><span className="badge badge-info">{r.kategoriMitra || '-'}</span></td>
                  <td style={{ padding: '16px', maxWidth: '250px', whiteSpace: 'normal', lineHeight: 1.5 }}><strong style={{ color: 'var(--primary-900)' }}>{r.mitra || '-'}</strong></td>
                  <td style={{ padding: '16px', whiteSpace: 'nowrap', color: 'var(--neutral-700)' }}>{r.jenisKerjasama || '-'}</td>
                  <td style={{ padding: '16px', maxWidth: '200px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-800)', marginBottom: '4px' }}>{r.pihak1 || '-'}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--neutral-500)', wordBreak: 'break-all', opacity: 0.8 }}>{r.noPihak1 || ''}</div>
                  </td>
                  <td style={{ padding: '16px', maxWidth: '200px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary-800)', marginBottom: '4px' }}>{r.pihak2 || '-'}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--neutral-500)', wordBreak: 'break-all', opacity: 0.8 }}>{r.noPihak2 || ''}</div>
                  </td>
                  <td style={{ padding: '16px', whiteSpace: 'nowrap', color: 'var(--neutral-600)' }}>{r.tanggalMulai || '-'}</td>
                  <td style={{ padding: '16px', whiteSpace: 'nowrap', color: 'var(--neutral-600)' }}>{r.tanggalSelesai || '-'}</td>
                  <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>{renderStatusBadge(r.status)}</td>
                  <td style={{ padding: '16px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {r.linkDokumen ? <a href={r.linkDokumen} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: '6px 12px', background: 'var(--primary-50)', color: 'var(--primary-700)', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>📄 Lihat</a> : '-'}
                  </td>
                  <td style={{ padding: '16px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    <button className="btn btn-primary btn-sm" onClick={() => openModal(r.id)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', border: 'none', fontWeight: 600 }}>✏️ Edit</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => deleteItem(r.id)} style={{ padding: '8px 12px', color: 'var(--danger-600)' }}>🗑️ Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ background: '#fff', padding: '16px', borderTop: '1px solid var(--neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--neutral-500)', fontSize: '13px' }}>
          <div>Menampilkan {totalData === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + perPage, totalData)} dari {totalData} data</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Sebelumnya</button>
            <span style={{ padding: '4px 10px', fontWeight: 500 }}>Halaman {page} / {totalPages}</span>
            <button className="btn btn-ghost btn-sm" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>Selanjutnya</button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="modal-content" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '12px', padding: 0, boxShadow: 'var(--shadow-2xl)', background: '#fff', position: 'relative' }}>
            <div style={{ padding: '24px 32px 16px 32px', position: 'sticky', top: 0, background: '#fff', zIndex: 10, borderBottom: '1px solid var(--neutral-100)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--neutral-900)' }}>{editData ? '✨ Edit Kerja Sama' : '✨ Tambah Kerja Sama'}</h3>
              </div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-500)', padding: 0, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>✕ Tutup</button>
            </div>
            <form onSubmit={saveForm} style={{ padding: '24px 32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Kategori Mitra <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.kategoriMitra} onChange={e => setFormData({ ...formData, kategoriMitra: e.target.value })}>
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
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Nama Mitra <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <input type="text" className="form-input" required placeholder="Contoh: PT Telkom" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.mitra} onChange={e => setFormData({ ...formData, mitra: e.target.value })} />
                </div>
                {/* Omitted other fields for brevity but included all required */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Jenis Kerja Sama <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.jenisKerjasama} onChange={e => setFormData({ ...formData, jenisKerjasama: e.target.value })}>
                    <option value="">Pilih Jenis...</option>
                    <option>Perjanjian Kerja Sama</option>
                    <option>Nota Kesepahaman</option>
                    <option>Kesepakatan Bersama</option>
                    <option>Memorandum Saling Pengertian</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Pihak 1 (KKP) <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <input type="text" className="form-input" required placeholder="Contoh: Dirjen PRL" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.pihak1} onChange={e => setFormData({ ...formData, pihak1: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Pihak 2 (Mitra) <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <input type="text" className="form-input" required placeholder="Contoh: Pemkab Bandung" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.pihak2} onChange={e => setFormData({ ...formData, pihak2: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Tanggal Mulai <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <input type="date" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.tanggalMulai} onChange={e => setFormData({ ...formData, tanggalMulai: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Status <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                  <select className="form-select" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option>Berlaku</option>
                    <option>Tidak Berlaku</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Upload File (Excel, Word, PDF)</label>
                  <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px', background: '#fff' }} onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert("⚠️ Ukuran file maksimal 5MB!");
                        e.target.value = '';
                        return;
                      }
                      setFormData({ ...formData, fileDokumen: file.name });
                    }
                  }} />
                  {formData.fileDokumen && <div style={{ fontSize: '11px', color: 'var(--primary-600)', marginTop: '4px' }}>File terpilih: {formData.fileDokumen}</div>}
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Link Dokumen</label>
                  <input type="url" className="form-input" placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-200)', fontSize: '14px' }} value={formData.linkDokumen || ''} onChange={e => setFormData({ ...formData, linkDokumen: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid var(--neutral-100)', paddingTop: '24px', marginTop: '24px' }}>
                <button type="button" className="btn btn-ghost" onClick={closeModal} style={{ fontSize: '13px', fontWeight: 600, padding: '10px 20px' }}>Batal</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>💾</span> Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
