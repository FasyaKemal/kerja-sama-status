const { execSync } = require('child_process');
execSync('npm install puppeteer --no-save > /dev/null 2>&1');
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', request => console.log('REQ FAILED:', request.url(), request.failure().errorText));
  
  console.log("Navigating...");
  await page.goto('http://127.0.0.1:3001');
  
  // Wait a bit
  await page.waitForTimeout(2000);
  
  const html = await page.content();
  console.log("HTML Length:", html.length);
  
  await browser.close();
})();
