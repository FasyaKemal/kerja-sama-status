/**
 * Shared date formatting utility — digunakan di seluruh aplikasi
 * agar format tanggal konsisten di semua halaman.
 */

/**
 * Parse tanggal dari beberapa format yang dipakai di data:
 * - ISO date dari input type="date": YYYY-MM-DD
 * - Slash date: D/M/YYYY atau M/D/YYYY (data historis campur)
 *
 * Catatan: Untuk format slash yang ambigu (mis. 11/10/2017),
 * kita default ke D/M/YYYY karena konteks aplikasi Indonesia.
 *
 * @param {string|Date} d
 * @returns {Date|null}
 */
export function parseDate(d) {
  if (!d || d === '-') return null;
  if (d instanceof Date) return isNaN(d) ? null : d;
  if (typeof d !== 'string') return null;

  const raw = d.trim();
  if (!raw) return null;

  // ISO: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, day] = raw.split('-').map((x) => parseInt(x, 10));
    const dt = new Date(y, m - 1, day);
    return isNaN(dt) ? null : dt;
  }

  // Slash: D/M/YYYY or M/D/YYYY
  const slash = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slash) {
    const a = parseInt(slash[1], 10);
    const b = parseInt(slash[2], 10);
    let y = parseInt(slash[3], 10);
    if (y < 100) y += 2000;

    let day;
    let month;

    if (a > 12) {
      day = a; month = b;
    } else if (b > 12) {
      month = a; day = b;
    } else {
      // ambiguous: default D/M/YYYY
      day = a; month = b;
    }

    const dt = new Date(y, month - 1, day);
    return isNaN(dt) ? null : dt;
  }

  // Fallback: try native parsing (best-effort)
  const dt = new Date(raw);
  return isNaN(dt) ? null : dt;
}

/**
 * Format tanggal ke "12 Mei 2026"
 * @param {string|Date} d - raw date string atau Date object
 * @returns {string}
 */
export function formatDate(d) {
  if (!d || d === '-') return '-';
  const parsed = parseDate(d);
  if (!parsed) return typeof d === 'string' ? d : '-';
  return parsed.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Format tanggal ke "12 Mei 2026" atau fallback ke nilai asli
 * @param {string} d
 * @returns {string}
 */
export function formatDateShort(d) {
  if (!d || d === '-') return '-';
  const parsed = parseDate(d);
  if (!parsed) return typeof d === 'string' ? d : '-';
  return parsed.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Hitung sisa hari dari hari ini ke tanggal tertentu
 * @param {string} tanggalSelesai
 * @returns {number|null}
 */
export function sisaHari(tanggalSelesai) {
  if (!tanggalSelesai || tanggalSelesai === '-') return null;
  const end = parseDate(tanggalSelesai);
  if (!end) return null;
  const diff = (end - new Date()) / (1000 * 60 * 60 * 24);
  return Math.ceil(diff);
}

/**
 * Hitung status dokumen berdasarkan tanggal selesai
 * @param {Object} item - object dengan field tanggalSelesai
 * @returns {'Berlaku'|'Akan Berakhir'|'Tidak Berlaku'}
 */
export function hitungStatus(item) {
  if (!item.tanggalSelesai || item.tanggalSelesai === '-') return 'Berlaku';
  const diff = sisaHari(item.tanggalSelesai);
  if (diff <= 0) return 'Tidak Berlaku';
  if (diff <= 90) return 'Akan Berakhir';
  return 'Berlaku';
}
