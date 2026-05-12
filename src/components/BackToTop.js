"use client";
import { useEffect, useRef } from 'react';

/**
 * Komponen tombol "Kembali ke Atas" yang muncul saat user scroll > 300px.
 */
export default function BackToTop() {
  const btnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (btnRef.current) {
        btnRef.current.style.opacity = window.scrollY > 300 ? '1' : '0';
        btnRef.current.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 800;
        }
        .back-to-top-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        @media print {
          .back-to-top-btn { display: none !important; }
        }
      `}</style>
      <button
        ref={btnRef}
        className="back-to-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
        title="Kembali ke atas"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </>
  );
}
