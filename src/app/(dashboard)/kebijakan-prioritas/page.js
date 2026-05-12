"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useData } from '@/context/DataContext';
import * as XLSX from 'xlsx';
import Portal from '@/components/Portal';
import SuccessPopup from '@/components/SuccessPopup';
import { formatDateShort, hitungStatus, sisaHari } from '@/lib/formatDate';
import ConfirmDialog from '@/components/ConfirmDialog';
import toast from 'react-hot-toast';
import { buildErrorMap, compareIsoDates, isBlank, isValidUrl, validateIsoDate } from '@/lib/validation';

function subscribeLocation(cb) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('popstate', cb);
  return () => window.removeEventListener('popstate', cb);
}

function getLocationSnapshot() {
  if (typeof window === 'undefined') return '';
  return window.location.search || '';
}

export default function KebijakanPrioritas() {
  const search = useSyncExternalStore(subscribeLocation, getLocationSnapshot, () => '');
  const editId = useMemo(() => {
    if (!search) return null;
    try {
      return new URLSearchParams(search).get('edit');
    } catch {
      return null;
    }
  }, [search]);
  const shouldCreateNew = useMemo(() => {
    if (!search) return false;
    try {
      return new URLSearchParams(search).get('new') === '1';
    } catch {
      return false;
    }
  }, [search]);
  const initialFilters = useMemo(() => {
    if (!search) return { year: null, category: null, status: null };
    try {
      const p = new URLSearchParams(search);
      return {
        year: p.get('year'),
        category: p.get('category'),
        status: p.get('status'),
      };
    } catch {
      return { year: null, category: null, status: null };
    }
  }, [search]);
  const { data, updateKebijakan } = useData();
  const dbData = data.kebijakanPrioritas || [];

  useEffect(() => {
    // Initialize from Excel if localStorage hasn't been set yet.
    if (typeof window === 'undefined') return;
    let shouldInitFromExcel = true;
    try {
      const raw = localStorage.getItem('kp_prioritas_persistent');
      if (raw) {
        const parsed = JSON.parse(raw);
        // If there is meaningful saved data, keep it.
        if (Array.isArray(parsed) && parsed.length > 0) shouldInitFromExcel = false;
      }
    } catch {
      // If corrupted, re-init from Excel.
      shouldInitFromExcel = true;
    }
    if (!shouldInitFromExcel) return;

    const excelCandidates = [
      // URL-safe (space encoded)
      '/Database_KEB_Ruang%20Lingkup.xlsx',
      // fallback (some servers may still accept raw space)
      '/Database_KEB_Ruang Lingkup.xlsx',
    ];
    const toIsoDate = (v) => {
      if (v == null || v === '') return '';
      // Excel date serial
      if (typeof v === 'number' && Number.isFinite(v)) {
        const dc = XLSX.SSF.parse_date_code(v);
        if (!dc) return '';
        const pad = (n) => String(n).padStart(2, '0');
        return `${dc.y}-${pad(dc.m)}-${pad(dc.d)}`;
      }
      const s = String(v).trim();
      // Common formats: DD/MM/YYYY or D/M/YYYY
      const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
      if (m) {
        const d = parseInt(m[1], 10);
        const mo = parseInt(m[2], 10);
        let y = parseInt(m[3], 10);
        if (y < 100) y += 2000;
        const pad = (n) => String(n).padStart(2, '0');
        return `${y}-${pad(mo)}-${pad(d)}`;
      }
      // ISO already
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
      // Fall back: try Date
      const dt = new Date(s);
      if (Number.isNaN(dt.getTime())) return '';
      const pad = (n) => String(n).padStart(2, '0');
      return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
    };

    const load = async () => {
      try {
        let lastErr = null;
        let buf = null;
        for (const url of excelCandidates) {
          try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            buf = await res.arrayBuffer();
            lastErr = null;
            break;
          } catch (e) {
            lastErr = e;
          }
        }
        if (!buf) throw new Error(`Gagal memuat file Excel. (${String(lastErr || '')})`);

        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (!rows || rows.length < 2) throw new Error('Excel kosong.');
        // Some sheets have an empty first row; find the real header row.
        const headerRowIdx = rows.findIndex((r) => {
          if (!Array.isArray(r)) return false;
          const cells = r.map((c) => String(c || '').trim().toLowerCase());
          return cells.includes('no') && cells.includes('tahun');
        });
        if (headerRowIdx < 0) throw new Error('Header kolom tidak ditemukan di Excel.');

        const header = rows[headerRowIdx].map((h) => String(h || '').trim());
        const idx = (name) => header.findIndex((h) => h.toLowerCase() === String(name).toLowerCase());

        const iNo = idx('No');
        const iTahun = idx('Tahun');
        const iKategori = idx('Kategori Mitra');
        const iMitra = idx('Mitra Kerja Sama');
        const iJenis = idx('Jenis Kerja Sama');
        const iP1 = idx('Penandatangan KKP/Pihak 1');
        const iP2 = idx('Penandatangan Mitra/Pihak 2');
        const iMulai = idx('Mulai');
        const iHingga = idx('Berlaku Hingga');
        const iStatus = idx('Status');
        const iRuang = idx('Ruang Lingkup (dengan Kode KEB)');
        const iUrl = idx('URL Dokumen');
        const iLink = idx('Link Dokumen');

        const parsed = rows.slice(headerRowIdx + 1).map((r, rowIdx) => {
          const no = iNo >= 0 ? r[iNo] : rowIdx + 1;
          const tahun = iTahun >= 0 ? String(r[iTahun] || '').trim() : '';
          const kategoriMitra = iKategori >= 0 ? String(r[iKategori] || '').trim() : '';
          const mitra = iMitra >= 0 ? String(r[iMitra] || '').trim() : '';
          const jenisKerjasama = iJenis >= 0 ? String(r[iJenis] || '').trim() : '';
          const pihak1 = iP1 >= 0 ? String(r[iP1] || '').trim() : '';
          const pihak2 = iP2 >= 0 ? String(r[iP2] || '').trim() : '';
          const tanggalMulai = iMulai >= 0 ? toIsoDate(r[iMulai]) : '';
          const tanggalSelesai = iHingga >= 0 ? toIsoDate(r[iHingga]) : '';
          const status = iStatus >= 0 ? String(r[iStatus] || '').trim() : '';
          const ruangLingkup = iRuang >= 0 ? String(r[iRuang] || '').trim() : '';
          const linkDokumen = (iUrl >= 0 ? String(r[iUrl] || '').trim() : '') || (iLink >= 0 ? String(r[iLink] || '').trim() : '');
          return {
            id: `KP-EXCEL-${String(no || rowIdx + 1).toString().replace(/\s+/g, '')}`,
            no,
            tahun,
            kategoriMitra,
            mitra,
            jenisKerjasama,
            pihak1,
            pihak2,
            tanggalMulai,
            tanggalSelesai,
            status,
            linkDokumen,
            ruangLingkup,
          };
        }).filter((x) => x && (x.mitra || x.jenisKerjasama || x.ruangLingkup));

        updateKebijakan(parsed);
      } catch (e) {
        console.error('Gagal inisialisasi dari Excel:', e);
        try {
          toast.error('Gagal memuat database dari Excel. Pastikan file Excel ada di folder public.');
        } catch {}
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState(initialFilters.year || 'all');
  const [filterCategory, setFilterCategory] = useState(initialFilters.category || 'all');
  const [filterStatus, setFilterStatus] = useState(initialFilters.status || 'all');
  const [page, setPage] = useState(1);
  const perPage = 20;

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [ruangModalOpen, setRuangModalOpen] = useState(false);
  const [ruangModalTitle, setRuangModalTitle] = useState('');
  const [ruangModalValue, setRuangModalValue] = useState('');
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
    status: '', // Automatically calculated
    fileDokumenName: '',
    fileDokumenDataUrl: '',
    linkDokumen: '',
    ruangLingkup: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const maxBytes = 1024 * 1024; // 1MB
    if (file.size > maxBytes) {
      toast.error('Ukuran file maksimal 1MB (untuk penyimpanan lokal).');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      setFormData((prev) => ({
        ...prev,
        fileDokumenName: file.name,
        fileDokumenDataUrl: dataUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

  const normalizeDatesAndYear = (draft) => {
    const tanggalMulai = String(draft.tanggalMulai || '').trim();
    const tanggalSelesai = String(draft.tanggalSelesai || '').trim();
    const yearMatch = tanggalMulai.match(/(\d{4})$/);
    const tahun = yearMatch ? yearMatch[1] : draft.tahun;
    return { ...draft, tanggalMulai, tanggalSelesai, tahun };
  };

  const filteredData = dbData.filter(item => {
    const matchesSearch = !searchQuery || 
      Object.values(item).some(val => val?.toString().toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesYear = filterYear === 'all' || item.tahun === filterYear;
    const matchesCategory = filterCategory === 'all' || item.kategoriMitra === filterCategory;
    const itemStatus = hitungStatus(item);

    let matchesStatus = filterStatus === 'all' || itemStatus === filterStatus;
    
    if (filterStatus === 'Tidak Berlaku') {
      matchesStatus = itemStatus === 'Tidak Berlaku';
    } else if (filterStatus === 'Akan Berakhir') {
      matchesStatus = itemStatus === 'Akan Berakhir';
    } else if (filterStatus === 'Berlaku') {
      matchesStatus = itemStatus === 'Berlaku';
    }
    
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
      const item = dbData.find(d => String(d.id) === String(id));
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
        fileDokumenName: '',
        fileDokumenDataUrl: '',
        linkDokumen: '',
        ruangLingkup: ''
      });
    }
    setFormErrors({});
    setModalOpen(true);
  };

  useEffect(() => {
    if (!editId) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    openModal(editId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  useEffect(() => {
    if (!shouldCreateNew) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    openModal(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCreateNew]);

  const closeModal = () => setModalOpen(false);

  const validateForm = (draft) => {
    const startVal = validateIsoDate(draft.tanggalMulai);
    const endVal = validateIsoDate(draft.tanggalSelesai);

    const nextErrors = buildErrorMap([
      ['kategoriMitra', isBlank(draft.kategoriMitra) ? 'Wajib dipilih.' : ''],
      ['mitra', isBlank(draft.mitra) ? 'Wajib diisi.' : ''],
      ['jenisKerjasama', isBlank(draft.jenisKerjasama) ? 'Wajib dipilih.' : ''],
      ['pihak1', isBlank(draft.pihak1) ? 'Wajib diisi.' : ''],
      ['pihak2', isBlank(draft.pihak2) ? 'Wajib diisi.' : ''],
      ['tanggalMulai', startVal.ok ? '' : startVal.message],
      ['tanggalSelesai', endVal.ok ? '' : endVal.message],
      ['linkDokumen', isValidUrl(draft.linkDokumen) ? '' : 'Link tidak valid.'],
      ['fileDokumenDataUrl', isBlank(draft.fileDokumenDataUrl) ? 'Wajib upload dokumen.' : ''],
      ['ruangLingkup', isBlank(draft.ruangLingkup) ? 'Wajib diisi.' : ''],
    ]);

    const diff = compareIsoDates(draft.tanggalSelesai, draft.tanggalMulai);
    if (diff !== null && diff < 0) nextErrors.tanggalSelesai = 'Tanggal selesai harus setelah tanggal mulai.';

    const sig = `${String(draft.mitra || '').trim().toLowerCase()}|${String(draft.jenisKerjasama || '').trim().toLowerCase()}|${String(draft.tanggalMulai || '').trim()}`;
    const dup = dbData.some((x) => {
      if (editData && String(x.id) === String(editData.id)) return false;
      const xsig = `${String(x.mitra || '').trim().toLowerCase()}|${String(x.jenisKerjasama || '').trim().toLowerCase()}|${String(x.tanggalMulai || '').trim()}`;
      return xsig === sig;
    });
    if (dup) nextErrors.mitra = 'Data mirip sudah ada (cek Mitra/Jenis/Tgl Mulai).';

    return nextErrors;
  };

  const saveForm = (e) => {
    e.preventDefault();
    const isEdit = !!editData;
    const payload = normalizeDatesAndYear(formData);
    const errs = validateForm(payload);
    setFormErrors(errs);
    if (Object.keys(errs).length) {
      toast.error('Periksa kembali form yang belum valid.');
      return;
    }
    const newData = isEdit
      ? dbData.map(d => d.id === editData.id ? { ...payload } : d)
      : [...dbData, { ...payload, id: Date.now() }];
    
    updateKebijakan(newData);
    closeModal();
    setSuccessMessage(isEdit ? 'Berhasil Diperbarui!' : 'Berhasil Ditambahkan!');
    setShowSuccess(true);
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId == null) return;
    updateKebijakan(dbData.filter(d => d.id !== pendingDeleteId));
    setConfirmDeleteOpen(false);
    setPendingDeleteId(null);
    setSuccessMessage('Berhasil Dihapus!');
    setShowSuccess(true);
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setPendingDeleteId(null);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dukungan Kebijakan Prioritas");
    XLSX.writeFile(wb, "Kebijakan_Prioritas.xlsx");
  };

  const renderStatusBadge = (item) => {
    const displayStatus = hitungStatus(item);
    const badgeClass =
      displayStatus === 'Tidak Berlaku'
        ? 'badge-danger'
        : displayStatus === 'Akan Berakhir'
          ? 'badge-warning'
          : 'badge-success';

    return (
      <span className={`badge ${badgeClass}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content', textTransform: 'uppercase', fontSize: '10px', fontWeight: 700 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
        {displayStatus}
      </span>
    );
  };

  return (
    <div className="page-fade-in">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-400) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dukungan Kebijakan Prioritas</h1>

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
          <div className="page-title" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '4px', background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-400) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{totalData}</div>

          <div style={{ fontSize: '12px', color: 'var(--neutral-400)' }}>Semua kategori</div>
        </div>
        <div className="card fade-in-up" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '20px', boxShadow: 'var(--shadow-md)', animationDelay: '0.1s' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success-600)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status Berlaku</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--success-600)', marginBottom: '4px' }}>
            {dbData.filter(item => {
              const diff = sisaHari(item.tanggalSelesai);
              return diff === null ? true : diff > 0;
            }).length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--success-500)' }}>Sedang berjalan</div>
        </div>
        <div className="card fade-in-up" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '20px', boxShadow: 'var(--shadow-md)', animationDelay: '0.2s' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--danger-600)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tidak Berlaku</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--danger-600)', marginBottom: '4px' }}>
            {dbData.filter(item => {
              const diff = sisaHari(item.tanggalSelesai);
              return diff !== null && diff <= 0;
            }).length}
          </div>
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
            <option value="Akan Berakhir">Akan Berakhir</option>
          </select>
        </div>

        <div className="lg-only" style={{ overflowX: 'auto' }}>
          <table className="table-modern" style={{ width: '100%', minWidth: '1400px' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)', borderBottom: '2px solid var(--neutral-100)' }}>
                <th style={{ padding: '14px 12px', width: '64px', textAlign: 'center', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>No</th>
                <th style={{ padding: '14px 12px', width: '90px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Tahun</th>
                <th style={{ padding: '14px 12px', width: '110px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Kategori</th>
                <th style={{ padding: '14px 12px', width: '260px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Mitra</th>
                <th style={{ padding: '14px 12px', width: '180px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Jenis</th>
                <th style={{ padding: '14px 12px', width: '200px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Pihak 1 (KKP)</th>
                <th style={{ padding: '14px 12px', width: '200px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Pihak 2 (Mitra)</th>
                <th style={{ padding: '14px 12px', width: '120px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Tanggal Mulai</th>
                <th style={{ padding: '14px 12px', width: '120px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Tanggal Selesai</th>
                <th style={{ padding: '14px 12px', width: '120px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '14px 12px', width: '110px', textAlign: 'center', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Dokumen</th>
                <th style={{ padding: '14px 12px', width: '170px', textAlign: 'left', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Ruang Lingkup</th>
                <th style={{ padding: '14px 12px', width: '110px', textAlign: 'center', color: 'var(--neutral-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="13" style={{ textAlign: 'center', padding: '64px 24px', background: '#fff' }}>
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
                  <td style={{ padding: '14px 12px', color: 'var(--neutral-500)', fontWeight: 700, textAlign: 'center' }}>{startIndex + i + 1}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--neutral-700)', fontWeight: 700 }}>{r.tahun || '-'}</td>
                  <td style={{ padding: '14px 12px' }}><span className="badge badge-info">{r.kategoriMitra || '-'}</span></td>
                  <td style={{ padding: '14px 12px' }}><strong style={{ color: 'var(--primary-900)' }}>{r.mitra || '-'}</strong></td>
                  <td style={{ padding: '14px 12px', color: 'var(--neutral-700)' }}>{r.jenisKerjasama || '-'}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--neutral-800)', fontWeight: 700 }}>{r.pihak1 || '-'}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--neutral-800)', fontWeight: 700 }}>{r.pihak2 || '-'}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--neutral-600)', whiteSpace: 'nowrap' }}>{formatDateShort(r.tanggalMulai)}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--neutral-600)', whiteSpace: 'nowrap' }}>{formatDateShort(r.tanggalSelesai)}</td>
                  <td style={{ padding: '14px 12px' }}>{renderStatusBadge(r)}</td>
                  <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                    {r.linkDokumen ? <a href={r.linkDokumen} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: '6px 12px', background: 'var(--primary-50)', color: 'var(--primary-700)', borderRadius: '8px', fontWeight: 600 }}>Lihat</a> : '-'}
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '8px 10px',
                        borderRadius: '10px',
                        background: 'var(--neutral-100)',
                        border: '1px solid var(--neutral-200)',
                        fontWeight: 800,
                        color: 'var(--neutral-700)',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => {
                        setRuangModalTitle(r.mitra || 'Ruang Lingkup');
                        setRuangModalValue(r.ruangLingkup || '-');
                        setRuangModalOpen(true);
                      }}
                    >
                      Lihat Ruang Lingkup
                    </button>
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openModal(r.id)} style={{ color: 'var(--primary-600)' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => requestDelete(r.id)} style={{ color: 'var(--danger-600)' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="data-cards sm-only" style={{ marginTop: '16px', padding: '0 4px' }}>
          {paginatedData.length === 0 ? (
            <div className="data-card" style={{ textAlign: 'center', padding: '18px' }}>
              <div className="data-card-title">Data Tidak Ditemukan</div>
              <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--neutral-600)' }}>Coba ubah kata kunci atau filter.</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: '12px' }} onClick={() => openModal()}>
                Tambah Data
              </button>
            </div>
          ) : (
            paginatedData.map((r, i) => (
              <div key={r.id || i} className="data-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 0 }}>
                    <div className="data-card-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.mitra || '-'}</div>
                    <div className="data-card-meta">
                      <span className="badge badge-info" style={{ fontSize: '10px' }}>{r.kategoriMitra || '-'}</span>
                      <span style={{ color: 'var(--neutral-600)' }}>{formatDateShort(r.tanggalMulai)} - {formatDateShort(r.tanggalSelesai)}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ padding: '8px 10px', borderRadius: '10px', background: 'var(--primary-700)', border: 'none' }} onClick={() => openModal(r.id)}>
                    Detail
                  </button>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--neutral-700)' }}>{r.jenisKerjasama || '-'}</div>
                  <div>{renderStatusBadge(r)}</div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      background: 'var(--neutral-100)',
                      border: '1px solid var(--neutral-200)',
                      fontWeight: 800,
                      color: 'var(--neutral-800)',
                      width: '100%'
                    }}
                    onClick={() => {
                      setRuangModalTitle(r.mitra || 'Ruang Lingkup');
                      setRuangModalValue(r.ruangLingkup || '-');
                      setRuangModalOpen(true);
                    }}
                  >
                    Lihat Ruang Lingkup
                  </button>
                </div>
              </div>
            ))
          )}
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
                    {formErrors.kategoriMitra && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.kategoriMitra}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Nama Mitra <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <input type="text" className="form-input" required placeholder="Contoh: PT Telkom" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.mitra} onChange={e => setFormData({ ...formData, mitra: e.target.value })} />
                    {formErrors.mitra && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.mitra}</div>}
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
                    {formErrors.jenisKerjasama && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.jenisKerjasama}</div>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Pihak 1 (KKP) <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="text" className="form-input" required placeholder="Unit Kerja" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.pihak1} onChange={e => setFormData({ ...formData, pihak1: e.target.value })} />
                      {formErrors.pihak1 && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.pihak1}</div>}
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
                      {formErrors.pihak2 && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.pihak2}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>No. Pihak 2</label>
                      <input type="text" className="form-input" placeholder="Nomor Surat" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.noPihak2} onChange={e => setFormData({ ...formData, noPihak2: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Tgl Mulai <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="date" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.tanggalMulai} onChange={e => setFormData({ ...formData, tanggalMulai: e.target.value })} />
                      {formErrors.tanggalMulai && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.tanggalMulai}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Tgl Selesai <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                      <input type="date" className="form-input" required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.tanggalSelesai} onChange={e => setFormData({ ...formData, tanggalSelesai: e.target.value })} />
                      {formErrors.tanggalSelesai && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.tanggalSelesai}</div>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Upload Dokumen <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <input type="file" required accept=".pdf,.doc,.docx,.xls,.xlsx" className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} onChange={handleFileUpload} />
                    {formData.fileDokumenName ? (
                      <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--neutral-600)' }}>
                        File terpilih: <strong>{formData.fileDokumenName}</strong>
                      </div>
                    ) : null}
                    {formErrors.fileDokumenDataUrl && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.fileDokumenDataUrl}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Link Dokumen <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <input type="url" required className="form-input" placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)' }} value={formData.linkDokumen || ''} onChange={e => setFormData({ ...formData, linkDokumen: e.target.value })} />
                    {formErrors.linkDokumen && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.linkDokumen}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>Ruang Lingkup <span style={{ color: 'var(--danger-500)' }}>*</span></label>
                    <textarea
                      className="form-input"
                      required
                      rows={4}
                      placeholder="Tuliskan ruang lingkup kerja sama..."
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--neutral-200)', resize: 'vertical' }}
                      value={formData.ruangLingkup || ''}
                      onChange={e => setFormData({ ...formData, ruangLingkup: e.target.value })}
                    />
                    {formErrors.ruangLingkup && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--danger-600)', fontWeight: 600 }}>{formErrors.ruangLingkup}</div>}
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

      {ruangModalOpen && (
        <Portal>
          <div
            className="modal-overlay"
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setRuangModalOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '680px', maxHeight: '85vh', overflow: 'auto', background: '#fff', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
              role="dialog"
              aria-modal="true"
              aria-label="Ruang lingkup"
            >
              <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ruang Lingkup</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--neutral-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ruangModalTitle}</div>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setRuangModalOpen(false)}
                  aria-label="Tutup"
                  style={{ border: '1px solid var(--neutral-200)', borderRadius: '12px' }}
                >
                  Tutup
                </button>
              </div>
              <div style={{ padding: '18px 22px' }}>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'var(--neutral-800)', fontSize: '14px' }}>
                  {ruangModalValue || '-'}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
      <ConfirmDialog
        show={confirmDeleteOpen}
        title="Konfirmasi Hapus"
        message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <SuccessPopup show={showSuccess} message={successMessage} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
