"use client";

import { useEffect, useMemo, useState } from 'react';
import Portal from '@/components/Portal';

function Chip({ label, onClear }) {
  return (
    <span className="filter-chip">
      <span className="filter-chip-label">{label}</span>
      <button type="button" className="filter-chip-x" aria-label={`Hapus filter: ${label}`} onClick={onClear}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </span>
  );
}

/**
 * Filter bar yang konsisten:
 * - Desktop: sticky di atas konten
 * - Mobile: tombol "Filter" membuka bottom-sheet
 * - Menampilkan chip filter aktif
 */
export default function FilterBar({
  summary,
  chips = [],
  onReset,
  actions,
  children,
}) {
  const [open, setOpen] = useState(false);

  // Close on escape for a11y
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const hasActive = useMemo(() => chips.some((c) => !!c?.label), [chips]);

  return (
    <>
      <div className="filterbar sticky-desktop">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-summary">{summary}</div>
            {hasActive && (
              <div className="filterbar-chips" aria-label="Filter aktif">
                {chips.filter(Boolean).map((c) => (
                  <Chip key={c.key || c.label} label={c.label} onClear={c.onClear} />
                ))}
              </div>
            )}
          </div>

          <div className="filterbar-right">
            {actions}
            <button
              type="button"
              className="btn btn-ghost filterbar-btn sm-only"
              onClick={() => setOpen(true)}
              aria-label="Buka filter"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
              </svg>
              Filter
            </button>
            {onReset && (
              <button type="button" className="btn btn-ghost filterbar-btn" onClick={onReset}>
                Reset Filter
              </button>
            )}
          </div>
        </div>

        <div className="filterbar-controls lg-only">
          {children}
        </div>
      </div>

      {open && (
        <Portal>
          <div className="filtersheet-overlay" onClick={() => setOpen(false)} role="button" tabIndex={0} aria-label="Tutup filter" />
          <div className="filtersheet" role="dialog" aria-modal="true" aria-label="Filter">
            <div className="filtersheet-handle" />
            <div className="filtersheet-header">
              <div>
                <div className="filtersheet-title">Filter</div>
                <div className="filtersheet-subtitle">{summary}</div>
              </div>
              <button className="btn btn-ghost filterbar-btn" onClick={() => setOpen(false)} aria-label="Tutup filter">
                Tutup
              </button>
            </div>
            <div className="filtersheet-body">
              {children}
            </div>
            <div className="filtersheet-footer">
              {onReset && (
                <button className="btn btn-ghost" onClick={onReset} style={{ flex: 1 }}>
                  Reset
                </button>
              )}
              <button className="btn btn-primary" onClick={() => setOpen(false)} style={{ flex: 1 }}>
                Terapkan
              </button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

