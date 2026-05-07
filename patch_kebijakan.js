const fs = require('fs');

const data = fs.readFileSync('/tmp/kebijakan_parsed.json', 'utf8');
let targetFile = 'app/js/pages/kebijakan_prioritas.js';
let content = fs.readFileSync(targetFile, 'utf8');

// Replace the daftarDukungan variable initialization
content = content.replace(
  /const daftarDukungan = \[[\s\S]*?\];/,
  `const daftarDukungan = ${data};`
);

// We should also recalculate dataKebijakan based on the new data
content = content.replace(
  /const dataKebijakan = \[[\s\S]*?\];/,
  `const dataKebijakan = [
      { id: 1, judul: 'Perluasan Kawasan Konservasi Laut', icon: '🌊', color: 'blue' },
      { id: 2, judul: 'Penangkapan Ikan Terukur Berbasis Kuota', icon: '🐟', color: 'indigo' },
      { id: 3, judul: 'Pengembangan Perikanan Budidaya Berkelanjutan', icon: '🦐', color: 'teal' },
      { id: 4, judul: 'Pengawasan dan Pengendalian Wilayah Pesisir dan Pulau-Pulau Kecil', icon: '🏝️', color: 'cyan' },
      { id: 5, judul: 'Pengelolaan Sampah Laut dan Rehabilitasi Pesisir', icon: '♻️', color: 'emerald' },
      { id: 6, judul: 'Lainnya', icon: '📎', color: 'slate' }
    ].map(k => ({...k, jumlah: daftarDukungan.filter(d => d.kebijakanId === k.id).length}));`
);

// Replace button for PDF link
content = content.replace(
  /<button class="btn btn-ghost btn-sm" style="padding:4px">📄 PDF<\/button>/,
  `\${r.linkDokumen ? '<a href="'+r.linkDokumen+'" target="_blank" class="btn btn-ghost btn-sm" style="padding:4px">📄 Dokumen</a>' : '-'}`
);

fs.writeFileSync(targetFile, content);
console.log('Patched kebijakan_prioritas.js');
