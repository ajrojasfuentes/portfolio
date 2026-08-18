import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  await page.goto('http://localhost:4321', { waitUntil: 'networkidle0' });
  
  // Wait for 10 seconds to let the typing finish and see the error
  await new Promise(r => setTimeout(r, 10000));
  
  await browser.close();
})();
