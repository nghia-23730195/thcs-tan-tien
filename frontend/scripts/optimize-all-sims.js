const fs = require('fs');
const path = require('path');

const files = [
  'geometric-optics-basics.html',
  'circuit-construction-kit-dc-virtual-lab.html',
  'density.html',
  'balancing-act.html',
  'masses-and-springs-basics.html',
  'waves-intro.html'
];

const dir = path.join(__dirname, '..', 'public', 'sims');

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  let html = fs.readFileSync(filePath, 'utf8');
  const originalSize = html.length;

  // 1. Remove Cloudflare analytics beacon
  html = html.replace(/<script[^>]*cloudflareinsights[^>]*><\/script>/gi, '');

  // 2. Disable Google Tag Manager
  html = html.replace(/t\.src=`https:\/\/www\.googletagmanager\.com[^`]*`/g, 't.src=""');

  // 3. Optimize strings
  const strPrefix = 'window.phet.chipper.strings = ';
  const strIdx = html.indexOf(strPrefix);
  if (strIdx !== -1) {
    const jsonStart = strIdx + strPrefix.length;
    let semi = html.indexOf('};\n', jsonStart);
    if (semi === -1) semi = html.indexOf('};<', jsonStart);
    if (semi === -1) semi = html.indexOf('};', jsonStart);
    if (semi !== -1) {
      try {
        const rawJson = html.substring(jsonStart, semi + 1);
        const parsed = JSON.parse(rawJson);
        const filtered = {};
        if (parsed.en) filtered.en = parsed.en;
        if (parsed.vi) filtered.vi = parsed.vi;
        const newJson = JSON.stringify(filtered);
        html = html.substring(0, jsonStart) + newJson + html.substring(semi + 1);
      } catch(e) {
        console.warn(`[${file}] strings optimization skipped: ${e.message}`);
      }
    }
  }

  // 4. Optimize localeData
  const locPrefix = 'window.phet.chipper.localeData = ';
  const locIdx = html.indexOf(locPrefix);
  if (locIdx !== -1) {
    const jsonStart = locIdx + locPrefix.length;
    let semi = html.indexOf('};\n', jsonStart);
    if (semi === -1) semi = html.indexOf('};<', jsonStart);
    if (semi === -1) semi = html.indexOf('};', jsonStart);
    if (semi !== -1) {
      try {
        const rawJson = html.substring(jsonStart, semi + 1);
        const parsed = JSON.parse(rawJson);
        const filtered = {};
        if (parsed.en) filtered.en = parsed.en;
        if (parsed.vi) filtered.vi = parsed.vi;
        const newJson = JSON.stringify(filtered);
        html = html.substring(0, jsonStart) + newJson + html.substring(semi + 1);
      } catch(e) {
        console.warn(`[${file}] localeData optimization skipped: ${e.message}`);
      }
    }
  }

  // 5. Fast fade-out on dispose
  html = html.replace(/transition:\s*opacity\s*0\.35s\s*ease;/g, 'transition: opacity 0.15s ease;');
  html = html.replace(/setTimeout\(function\(\)\s*\{\s*if\s*\(el\s*&&\s*el\.parentNode\)\s*el\.parentNode\.removeChild\(el\);\s*\},\s*350\);/g, 'if (el && el.parentNode) el.parentNode.removeChild(el);');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`[${file}] ${(originalSize/1024/1024).toFixed(2)} MB -> ${(html.length/1024/1024).toFixed(2)} MB (saved ${((originalSize - html.length)/1024/1024).toFixed(2)} MB)`);
}
