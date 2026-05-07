const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('app/index.html', 'utf8');

const dom = new JSDOM(html, { 
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://127.0.0.1:3001/'
});

dom.window.localStorage.setItem('kinerjaku_loggedIn', 'true');
dom.window.localStorage.setItem('kinerjaku_page', 'dashboard');

dom.window.addEventListener('error', (event) => {
  console.error('JSDOM ERROR:', event.error.message);
});

setTimeout(() => {
  console.log('App HTML length:', dom.window.document.getElementById('app').innerHTML.length);
}, 2000);
