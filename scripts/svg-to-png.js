/**
 * SVG to PNG Converter
 * Converts static/og-image.svg to static/og-image.png
 *
 * This script uses browser automation to convert the SVG to PNG.
 * It requires either Puppeteer or Playwright to be installed.
 *
 * Usage:
 *   bun install puppeteer
 *   node scripts/svg-to-png.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertSvgToPng() {
  try {
    // Read SVG file
    const svgPath = join(__dirname, '../static/og-image.svg');
    const pngPath = join(__dirname, '../static/og-image.png');
    const svgContent = readFileSync(svgPath, 'utf-8');

    // Try to use Puppeteer if available
    let puppeteer;
    try {
      puppeteer = await import('puppeteer');
    } catch (e) {
      console.error('❌ Puppeteer not found. Please install it:');
      console.error('   bun add -d puppeteer');
      console.error('\nAlternatively, you can convert manually using:');
      console.error('   • Online: https://cloudconvert.com/svg-to-png');
      console.error('   • Figma: Import SVG and export as PNG (1200x630)');
      process.exit(1);
    }

    console.log('🚀 Starting SVG to PNG conversion...');

    // Launch browser
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to exact dimensions
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

    // Create an HTML page with the SVG
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; }
            body { width: 1200px; height: 630px; overflow: hidden; }
            svg { display: block; }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 }
    });

    await browser.close();

    // Save PNG
    writeFileSync(pngPath, screenshot);

    console.log('✅ Successfully converted SVG to PNG!');
    console.log(`   Output: ${pngPath}`);
    console.log('   Dimensions: 1200x630px');

  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

convertSvgToPng();
