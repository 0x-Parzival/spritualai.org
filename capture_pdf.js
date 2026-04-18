const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // High-res desktop viewport
  const width = 1920;
  const height = 1080;
  await page.setViewport({ width, height });

  try {
    console.log('Navigating to homepage...');
    await page.goto('http://localhost:3001', { 
      waitUntil: 'domcontentloaded', 
      timeout: 120000 
    });

    // Wait for initial load
    await new Promise(r => setTimeout(r, 3000));

    console.log('Scrolling to trigger animations...');
    // We need to scroll to the bottom to trigger all Framer Motion 'whileInView' and scroll transforms
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const scrollStep = height; 
    let currentScroll = 0;

    while (currentScroll < totalHeight) {
      await page.evaluate((step) => window.scrollBy(0, step), scrollStep);
      currentScroll += scrollStep;
      await new Promise(r => setTimeout(r, 500)); // Wait for animations
    }

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1000));

    console.log('Capturing paginated PDF segments...');
    const pdfPath = path.join('/home/parzival/Downloads', 'spiritualai_homepage_segments.pdf');
    
    // Using page.pdf with A4 format will naturally paginate the 1500vh page into "screenshots" per page
    await page.pdf({
      path: pdfPath,
      width: '1920px',
      height: '1080px', // Force each "page" to be exactly one viewport height
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      displayHeaderFooter: false,
      preferCSSPageSize: false
    });

    console.log(`Paginated PDF saved to: ${pdfPath}`);
  } catch (error) {
    console.error('Error capturing PDF segments:', error);
  } finally {
    await browser.close();
  }
})();
