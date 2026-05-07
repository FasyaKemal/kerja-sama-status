const fs = require('fs');
const text = fs.readFileSync('/tmp/kebijakan.csv', 'utf8');

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
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
let jsonOutput = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVRow(lines[i]);
  if (!row[1] || row[1] === '') continue; // Skip empty rows

  jsonOutput.push({
    tahun: row[0],
    kategoriMitra: row[1],
    mitra: row[2],
    jenisKerjasama: row[3],
    pihak1: row[4],
    noPihak1: row[5],
    pihak2: row[6],
    noPihak2: row[7],
    masaBerlaku: row[8],
    tanggalMulai: row[9],
    tanggalSelesai: row[10],
    status: row[11],
    linkDokumen: row[12]
  });
}

fs.writeFileSync('/tmp/kebijakan_main.json', JSON.stringify(jsonOutput, null, 2));
console.log("Parsed", jsonOutput.length, "rows");
