"use client";

import { useEffect } from 'react';
import Portal from '@/components/Portal';

export default function ConfirmDialog({ show, title, message, onConfirm, onCancel }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCancel?.(); };
    if (show) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [show, onCancel]);

  if (!show) return null;

  return (
    <Portal>
      <style>{`
        @keyframes confirmFadeIn {
          from { opacity: 0; transform: scale(0.92) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        .confirm-box {
          animation: confirmFadeIn 0.22s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
        }
      `}</style>
      <div
        onClick={onCancel}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(6px)',
          zIndex: 9998,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <div
          className="confirm-box"
          onClick={e => e.stopPropagation()}
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '32px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 25px 60px -12px rgba(0,0,0,0.25)',
            textAlign: 'center'
          }}
        >
          {/* Warning icon */}
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
            border: '2px solid #fecaca',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>

          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
            {title || 'Konfirmasi Hapus'}
          </h3>
          <p style={{ margin: '0 0 28px 0', fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
            {message || 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.'}
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1, padding: '11px 20px', borderRadius: '12px',
                border: '1.5px solid #e2e8f0', background: '#fff',
                color: '#475569', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseOut={e => e.currentTarget.style.background = '#fff'}
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1, padding: '11px 20px', borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239,68,68,0.35)',
                transition: 'opacity 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
