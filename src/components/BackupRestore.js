"use client";
import { useState, useRef } from 'react';
import Portal from '@/components/Portal';

/**
 * Komponen Backup & Restore data JSON.
 * Menampilkan tombol Export dan Import di header dashboard.
 */
export default function BackupRestore({ data, onRestore }) {
  const [showModal, setShowModal] = useState(false);
  const [importError, setImportError] = useState('');
  const [importPreview, setImportPreview] = useState(null);
  const [importRaw, setImportRaw] = useState(null);
  const fileRef = useRef(null);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `backup_kinerjaku_${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = (e) => {
    setImportError('');
    setImportPreview(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      setImportError('File harus berformat .json');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.databaseKerjaSama && !parsed.kebijakanPrioritas && !parsed.progressDokumen) {
          setImportError('Format file tidak valid. Pastikan file berasal dari ekspor Kinerjaku.');
          return;
        }
        setImportRaw(parsed);
        setImportPreview({
          kerjasamaCount: (parsed.databaseKerjaSama || []).length,
          kebijakanCount: (parsed.kebijakanPrioritas || []).length,
          progressCount: (parsed.progressDokumen || []).length,
        });
      } catch {
        setImportError('File tidak valid. Pastikan file JSON tidak rusak.');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!importRaw) return;
    onRestore(importRaw);
    setShowModal(false);
    setImportPreview(null);
    setImportRaw(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={exportData}
          title="Ekspor semua data ke file JSON"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', borderRadius: '10px',
            background: '#fff', border: '1px solid #e2e8f0',
            color: '#475569', fontWeight: 700, fontSize: '12px',
            cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            transition: 'all 0.15s'
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Backup
        </button>
        <button
          onClick={() => setShowModal(true)}
          title="Pulihkan data dari file backup JSON"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', borderRadius: '10px',
            background: '#fff', border: '1px solid #e2e8f0',
            color: '#475569', fontWeight: 700, fontSize: '12px',
            cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            transition: 'all 0.15s'
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Restore
        </button>
      </div>

      {showModal && (
        <Portal>
          <div
            onClick={() => { setShowModal(false); setImportPreview(null); setImportError(''); setImportRaw(null); }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', zIndex: 9990, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '460px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Restore Data</div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Pulihkan Data dari Backup</h3>
                <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                  Unggah file backup <code style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' }}>.json</code> yang dihasilkan dari fitur Backup. <strong>Data saat ini akan ditimpa.</strong>
                </p>
              </div>

              <div
                style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '28px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', marginBottom: '16px' }}
                onClick={() => fileRef.current?.click()}
              >
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 12px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>Klik untuk pilih file backup</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Format: .json</div>
                <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFile} />
              </div>

              {importError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', color: '#dc2626', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
                  ⚠️ {importError}
                </div>
              )}

              {importPreview && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', marginBottom: '10px' }}>✅ File valid — Preview data yang akan dipulihkan:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    {[
                      ['Database Kerja Sama', importPreview.kerjasamaCount],
                      ['Kebijakan Prioritas', importPreview.kebijakanCount],
                      ['Progress Dokumen', importPreview.progressCount],
                    ].map(([label, count]) => (
                      <div key={label} style={{ background: '#fff', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>{count}</div>
                        <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', marginTop: '2px' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => { setShowModal(false); setImportPreview(null); setImportError(''); setImportRaw(null); }}
                  style={{ padding: '10px 20px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#fff', color: '#475569', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importRaw}
                  style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: importRaw ? 'linear-gradient(135deg, #0f172a, #1e3a5f)' : '#e2e8f0', color: importRaw ? '#fff' : '#94a3b8', fontWeight: 700, fontSize: '14px', cursor: importRaw ? 'pointer' : 'not-allowed' }}
                >
                  Pulihkan Data
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
