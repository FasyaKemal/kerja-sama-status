"use client";
import { useEffect, useRef } from 'react';

/**
 * Reusable Pagination component dengan nomor halaman dan elipsis
 */
export default function Pagination({ page, totalPages, totalData, perPage, onPageChange }) {
  const startIndex = (page - 1) * perPage;

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (page <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = page - 1; i <= page + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase = {
    minWidth: '36px', height: '36px', borderRadius: '8px',
    border: '1px solid #e2e8f0', background: '#fff',
    color: '#475569', fontWeight: 600, fontSize: '13px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.15s'
  };
  const btnActive = { ...btnBase, background: '#0f172a', color: '#fff', border: '1px solid #0f172a', fontWeight: 700 };
  const btnDisabled = { ...btnBase, opacity: 0.4, cursor: 'not-allowed' };

  return (
    <div style={{ background: '#fff', padding: '14px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
      <div style={{ color: '#64748b', fontSize: '13px' }}>
        Menampilkan{' '}
        <strong style={{ color: '#0f172a' }}>{totalData === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + perPage, totalData)}</strong>
        {' '}dari <strong style={{ color: '#0f172a' }}>{totalData}</strong> data
      </div>
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            style={page === 1 ? btnDisabled : btnBase}
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Halaman sebelumnya"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {getPages().map((p, i) =>
            p === '...'
              ? <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: '#94a3b8', fontSize: '13px' }}>…</span>
              : <button
                  key={p}
                  style={p === page ? btnActive : btnBase}
                  onClick={() => onPageChange(p)}
                  aria-label={`Halaman ${p}`}
                  aria-current={p === page ? 'page' : undefined}
                  onMouseOver={e => { if (p !== page) { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; } }}
                  onMouseOut={e => { if (p !== page) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; } }}
                >
                  {p}
                </button>
          )}

          <button
            style={page === totalPages ? btnDisabled : btnBase}
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Halaman berikutnya"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
