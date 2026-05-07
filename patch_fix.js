const fs = require('fs');

let targetFile = 'app/js/pages/kebijakan_prioritas.js';
let content = fs.readFileSync(targetFile, 'utf8');

// I will extract dataKebijakan and move it after daftarDukungan
const dataKebijakanRegex = /const dataKebijakan = \[[\s\S]*?\]\.map\(k => \(\{\.\.\.k, jumlah: daftarDukungan\.filter\(d => d\.kebijakanId === k\.id\)\.length\}\)\);/;
const dataKebijakanMatch = content.match(dataKebijakanRegex);

if (dataKebijakanMatch) {
  content = content.replace(dataKebijakanMatch[0], '');
  // Insert it after daftarDukungan
  const insertPos = content.indexOf('];', content.indexOf('const daftarDukungan')) + 2;
  content = content.slice(0, insertPos) + '\n\n    ' + dataKebijakanMatch[0] + content.slice(insertPos);
  
  fs.writeFileSync(targetFile, content);
  console.log('Fixed initialization order');
} else {
  console.log('Could not find dataKebijakan');
}

