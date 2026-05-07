const fs = require('fs');
let html = fs.readFileSync('app/index.html', 'utf8');

// Replace any v=\d+ with a new timestamp to force complete cache busting
const timestamp = Date.now();
html = html.replace(/v=\d+/g, 'v=' + timestamp);

fs.writeFileSync('app/index.html', html);
