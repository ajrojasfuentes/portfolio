import { chromium } from '@playwright/test';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  console.log('Navigating to http://localhost:4321...');
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  await browser.close();
})();
