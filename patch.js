const fs = require('fs');
let html = fs.readFileSync('app/index.html', 'utf8');

// Add a global error handler before other scripts
const errorHandler = `
  <script>
    window.addEventListener('error', function(e) {
      document.body.innerHTML += '<div style="color:red;padding:20px;z-index:9999;position:relative;background:white;"><h2>Error!</h2><pre>' + e.error.stack + '</pre></div>';
    });
  </script>
`;

html = html.replace('<div id="app"></div>', errorHandler + '\n  <div id="app"></div>');
html = html.replace('v=9', 'v=10').replace('v=9', 'v=10').replace('v=9', 'v=10').replace('v=9', 'v=10').replace('v=9', 'v=10').replace('v=9', 'v=10').replace('v=9', 'v=10').replace('v=9', 'v=10').replace('v=9', 'v=10');
// global replace for v=9 to v=10
html = html.replace(/v=9/g, 'v=10');

fs.writeFileSync('app/index.html', html);
