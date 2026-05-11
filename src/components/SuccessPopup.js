"use client";

import { useEffect } from 'react';

export default function SuccessPopup({ show, message = 'Berhasil Ditambahkan!', onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes checkDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes circleDraw {
          to { stroke-dashoffset: 0; }
        }
        .success-popup-box {
          animation: popupFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .success-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: circleDraw 0.5s ease-out 0.1s forwards;
        }
        .success-check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: checkDraw 0.4s ease-out 0.55s forwards;
        }
      `}</style>

      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'overlayFadeIn 0.2s ease forwards'
        }}
      >
        <div
          className="success-popup-box"
          onClick={e => e.stopPropagation()}
          style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '48px 56px',
            textAlign: 'center',
            boxShadow: '0 25px 60px -12px rgba(0,0,0,0.3)',
            minWidth: '280px',
            maxWidth: '360px'
          }}
        >
          {/* Animated checkmark SVG */}
          <svg
            viewBox="0 0 52 52"
            width="80"
            height="80"
            style={{ display: 'block', margin: '0 auto 24px auto' }}
          >
            <circle
              className="success-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />
            <path
              className="success-check"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27 l8 8 l16 -16"
            />
          </svg>

          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            {message}
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
            Data Anda telah tersimpan.
          </div>
        </div>
      </div>
    </>
  );
}
