"use client";

import { useEffect, useRef } from 'react';
import Portal from '@/components/Portal';
import { formatDate, hitungStatus, sisaHari } from '@/lib/formatDate';

const statusStyles = {
  'Berlaku': { label: 'Berlaku', color: '#10b981', bg: '#ecfdf5' },
  'Tidak Berlaku': { label: 'Tidak Berlaku', color: '#ef4444', bg: '#fef2f2' },
  'Akan Berakhir': { label: 'Akan Berakhir', color: '#f59e0b', bg: '#fffbeb' },
};

function Row({ label, value, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      {children || <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{value || '-'}</span>}
    </div>
  );
}

export default function DetailPanel({ item, onClose, onUpdate }) {
  const closeBtnRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    lastActiveRef.current = document.activeElement;
    // Defer focus until after paint.
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [item, onClose]);

  useEffect(() => {
    return () => {
      const el = lastActiveRef.current;
      if (el && typeof el.focus === 'function') el.focus();
    };
  }, []);

  const onOverlayKeyDown = (e) => {
    if (e.key === 'Escape') onClose?.();
  };

  const status = item ? statusStyles[hitungStatus(item)] : statusStyles['Berlaku'];
  const diff = item ? sisaHari(item.tanggalSelesai) : null;

  const exportPDF = () => {
    import('html2pdf.js').then(html2pdfModule => {
      const html2pdf = html2pdfModule.default;
      const element = document.getElementById('printable-detail-panel');
      const opt = {
        margin: 10,
        filename: `Detail_Kerjasama_${item.mitra || 'Dokumen'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    });
  };

  const openAttachment = () => {
    if (!item?.fileDokumenDataUrl) return;
    // DataURL can be opened directly in a new tab
    try {
      window.open(item.fileDokumenDataUrl, '_blank', 'noopener,noreferrer');
    } catch {}
  };

  const copyLink = async () => {
    const link = item?.linkDokumen;
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // fallback
      try {
        const ta = document.createElement('textarea');
        ta.value = link;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {}
    }
  };

  const estimateBytesFromDataUrl = (dataUrl) => {
    if (!dataUrl || typeof dataUrl !== 'string') return 0;
    const i = dataUrl.indexOf(',');
    if (i < 0) return 0;
    const b64 = dataUrl.slice(i + 1);
    // Base64 size approximation
    const padding = (b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0);
    return Math.max(0, Math.floor((b64.length * 3) / 4) - padding);
  };

  const prettyBytes = (n) => {
    if (!n) return '-';
    if (n < 1024) return `${n} B`;
    const kb = n / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    item ? (
    <Portal>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .drawer-container {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .drawer-overlay {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @media print {
          .no-print { display: none !important; }
          .drawer-overlay { display: none !important; }
          .drawer-container { position: static !important; width: 100% !important; max-width: 100% !important; box-shadow: none !important; }
        }
      `}</style>
      
      <div
        className="drawer-overlay no-print"
        onClick={onClose}
        onKeyDown={onOverlayKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Tutup panel detail"
        style={{ 
          position: 'fixed', inset: 0, 
          background: 'rgba(15,23,42,0.4)', 
          backdropFilter: 'blur(4px)', 
          zIndex: 10000 
        }}
      />
      
      <div
        className="drawer-container"
        id="printable-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Detail surat kerja sama"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, 
          width: '100%', maxWidth: '480px',
          background: '#fff', zIndex: 10001,
          boxShadow: '-10px 0 50px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Modern Header */}
        <div style={{
          padding: '32px 28px 24px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
          color: '#fff', position: 'relative', flexShrink: 0
        }}>
          <button
            onClick={onClose}
            ref={closeBtnRef}
            className="no-print"
            aria-label="Tutup panel detail"
            style={{ 
              position: 'absolute', top: '24px', right: '20px',
              background: 'rgba(255,255,255,0.1)', border: 'none', 
              borderRadius: '12px', padding: '10px', cursor: 'pointer', 
              color: '#fff', display: 'flex', alignItems: 'center'
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
            Detail Informasi
          </div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, lineHeight: 1.3 }}>{item.mitra || '-'}</h2>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#94a3b8', lineHeight: 1.4 }}>{item.judul || item.jenisKerjasama || '-'}</p>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800,
              background: status.bg, color: status.color, textTransform: 'uppercase'
            }}>
              {status.label}
            </span>
            {diff !== null && (
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                {diff > 0 ? `Sisa ${diff} hari` : 'Sudah berakhir'}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 40px' }}>
          <div style={{ display: 'grid', gap: '4px' }}>
            <Row label="Tahun" value={item.tahun} />
            <Row label="Kategori Mitra">
              <span style={{ 
                fontSize: '12px', fontWeight: 700, padding: '5px 14px', 
                borderRadius: '10px', background: '#eff6ff', color: '#2563eb',
                border: '1px solid #dbeafe', display: 'inline-block', width: 'fit-content'
              }}>
                {item.kategoriMitra || '-'}
              </span>
            </Row>
            
            <div style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Para Pihak</span>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', marginBottom: '6px' }}>PIHAK 1 (KKP)</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.pihak1 || '-'}</div>
                  {item.noPihak1 && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{item.noPihak1}</div>}
                </div>
                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', marginBottom: '6px' }}>PIHAK 2 (MITRA)</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.pihak2 || '-'}</div>
                  {item.noPihak2 && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{item.noPihak2}</div>}
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Periode Kontrak</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: '#16a34a', marginBottom: '4px' }}>TANGGAL MULAI</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#14532d' }}>{formatDate(item.tanggalMulai)}</div>
                </div>
                <div style={{ background: diff !== null && diff <= 90 ? '#fef2f2' : '#f0fdf4', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: diff !== null && diff <= 90 ? '#ef4444' : '#16a34a', marginBottom: '4px' }}>TANGGAL SELESAI</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: diff !== null && diff <= 90 ? '#7f1d1d' : '#14532d' }}>{formatDate(item.tanggalSelesai)}</div>
                </div>
              </div>
            </div>

            <div className="no-print" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {onUpdate && (
                <button
                  onClick={onUpdate}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    width: '100%', padding: '14px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: '#fff', border: 'none', fontWeight: 800, fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 10px 22px -8px rgba(15, 23, 42, 0.45)',
                    transition: 'opacity 0.15s'
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                  </svg>
                  Perbarui Data
                </button>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={copyLink}
                  disabled={!item.linkDokumen}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '12px', borderRadius: '14px',
                    background: item.linkDokumen ? '#fff' : '#f1f5f9',
                    border: '1px solid var(--neutral-300)',
                    color: item.linkDokumen ? 'var(--neutral-800)' : 'var(--neutral-500)',
                    fontWeight: 800, fontSize: '13px',
                    cursor: item.linkDokumen ? 'pointer' : 'not-allowed'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Salin Link
                </button>

                <a
                  href={item.linkDokumen || '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!item.linkDokumen}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '12px', borderRadius: '14px',
                    background: item.linkDokumen ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#e2e8f0',
                    color: item.linkDokumen ? '#fff' : '#94a3b8',
                    textDecoration: 'none', fontWeight: 800, fontSize: '13px',
                    pointerEvents: item.linkDokumen ? 'auto' : 'none'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Buka Dokumen
                </a>
              </div>

              {(item.fileDokumenDataUrl || item.fileDokumenName) && (
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '14px', background: '#f8fafc' }}>
                  <div style={{ fontSize: '10px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Lampiran</div>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.fileDokumenName || 'Dokumen'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        {item.fileDokumenDataUrl ? prettyBytes(estimateBytesFromDataUrl(item.fileDokumenDataUrl)) : '-'}
                      </div>
                    </div>
                    <button
                      onClick={openAttachment}
                      disabled={!item.fileDokumenDataUrl}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 12px', borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        background: item.fileDokumenDataUrl ? '#fff' : '#e2e8f0',
                        color: item.fileDokumenDataUrl ? '#0f172a' : '#94a3b8',
                        fontWeight: 900, fontSize: '12px',
                        cursor: item.fileDokumenDataUrl ? 'pointer' : 'not-allowed',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      Lihat
                    </button>
                  </div>
                </div>
              )}
              
              <button
                onClick={exportPDF}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  width: '100%', padding: '14px', borderRadius: '14px',
                  background: '#fff', border: '1px solid var(--neutral-300)',
                  color: 'var(--neutral-700)', fontWeight: 700, fontSize: '14px',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'var(--neutral-50)'; e.currentTarget.style.borderColor = 'var(--neutral-400)'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--neutral-300)'; }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Ekspor Ringkasan PDF
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="no-print" style={{ padding: '20px 28px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>ID: {item.id || '-'}</span>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', color: '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Tutup Panel</button>
        </div>
      </div>
    </Portal>
    ) : null
  );
}
