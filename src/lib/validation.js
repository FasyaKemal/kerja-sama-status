/**
 * Small validation helpers shared across forms.
 */

export function isBlank(v) {
  return v == null || String(v).trim() === '';
}

export function isValidUrl(v) {
  if (isBlank(v)) return false;
  try {
    new URL(String(v));
    return true;
  } catch {
    return false;
  }
}

export function validateIsoDate(v) {
  if (isBlank(v)) return { ok: false, message: 'Wajib diisi.' };
  const s = String(v).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return { ok: false, message: 'Format tanggal tidak valid.' };
  const [y, m, d] = s.split('-').map((x) => parseInt(x, 10));
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return { ok: false, message: 'Tanggal tidak valid.' };
  return { ok: true, message: '' };
}

export function compareIsoDates(a, b) {
  // returns a - b in days (rough), or null if invalid
  const va = validateIsoDate(a);
  const vb = validateIsoDate(b);
  if (!va.ok || !vb.ok) return null;
  const da = new Date(a);
  const db = new Date(b);
  return Math.round((da - db) / (1000 * 60 * 60 * 24));
}

export function buildErrorMap(pairs) {
  const out = {};
  for (const [k, msg] of pairs) {
    if (msg) out[k] = msg;
  }
  return out;
}
