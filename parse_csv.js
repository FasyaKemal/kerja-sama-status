const fs = require('fs');
const text = fs.readFileSync('/tmp/kebijakan_prioritas.csv', 'utf8');

// Basic CSV parser to handle quotes
function parseCSVRow(str) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '"' && str[i+1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
const headers = parseCSVRow(lines[0]);

let jsonOutput = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVRow(lines[i]);
  if (!row[2]) continue; // Skip empty
  
  // TAHUN,MITRA,MITRA KERJA SAMA,JENIS KERJASAMA,SIGN,NOMOR,SIGN,NOMOR,MASA BERLAKU,MULAI,BERLAKU HINGGA,STATUS,DOKUMEN,RUANG LINGKUP,KEBIJAKAN EKONOMI BIRU
  // Map 'KEBIJAKAN EKONOMI BIRU' values (1-5) to actual names
  let kebijakanName = '';
  const val = parseInt(row[14]);
  if (val === 1) kebijakanName = 'Perluasan Kawasan Konservasi Laut';
  else if (val === 2) kebijakanName = 'Penangkapan Ikan Terukur Berbasis Kuota';
  else if (val === 3) kebijakanName = 'Pengembangan Perikanan Budidaya Berkelanjutan';
  else if (val === 4) kebijakanName = 'Pengawasan dan Pengendalian Wilayah Pesisir dan Pulau-Pulau Kecil';
  else if (val === 5) kebijakanName = 'Pengelolaan Sampah Laut dan Rehabilitasi Pesisir';
  else kebijakanName = 'Lainnya';

  let status = row[11];
  if (status.includes('Berlaku') && !status.includes('Tidak')) {
     status = 'Aktif';
  } else if (status.includes('Tidak')) {
     status = 'Tidak Aktif';
  } else {
     status = 'Draft';
  }

  jsonOutput.push({
    judul: row[3] + ' dengan ' + row[2], // Jenis Kerja Sama + Mitra Kerja Sama
    mitra: row[2],
    ruang_lingkup: row[13],
    kebijakan: kebijakanName,
    kebijakanId: val,
    status: status,
    linkDokumen: row[12]
  });
}

fs.writeFileSync('/tmp/kebijakan_parsed.json', JSON.stringify(jsonOutput, null, 2));
console.log("Parsed", jsonOutput.length, "rows");
