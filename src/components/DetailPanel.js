"use client";

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

export default function DetailPanel({ item, onClose }) {
  if (!item) return null;

  const status = statusStyles[hitungStatus(item)];
  const diff = sisaHari(item.tanggalSelesai);

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

  return (
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
            className="no-print"
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
              {item.linkDokumen && (
                <a
                  href={item.linkDokumen}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    width: '100%', padding: '14px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '14px',
                    boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Lihat Dokumen Asli
                </a>
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
  );
}
