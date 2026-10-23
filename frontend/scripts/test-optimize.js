const fs = require('fs');

let html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');
const originalSize = html.length;

// 1. Remove Cloudflare script
html = html.replace(/<script[^>]*cloudflareinsights[^>]*><\/script>/gi, '');

// 2. Disable Google Tag Manager
html = html.replace(/t\.src=`https:\/\/www\.googletagmanager\.com[^`]*`/g, 't.src=""');

// 3. Filter window.phet.chipper.strings to only 'en' and 'vi'
const strPrefix = 'window.phet.chipper.strings = ';
const strIdx = html.indexOf(strPrefix);
if (strIdx !== -1) {
  const jsonStart = strIdx + strPrefix.length;
  // find the closing script tag
  const scriptEnd = html.indexOf(';</script>', jsonStart);
  if (scriptEnd !== -1) {
    const rawJson = html.substring(jsonStart, scriptEnd);
    try {
      const parsed = JSON.parse(rawJson);
      const filtered = {};
      if (parsed.en) filtered.en = parsed.en;
      if (parsed.vi) filtered.vi = parsed.vi;
      const newJson = JSON.stringify(filtered);
      html = html.substring(0, jsonStart) + newJson + html.substring(scriptEnd);
      console.log('Optimized strings successfully!');
    } catch(e) {
      console.error('Failed to parse strings JSON:', e.message);
    }
  }
}

// 4. Instant splash dispose (remove setTimeout delays)
html = html.replace(/setTimeout\(function\(\)\s*\{\s*if\s*\(el\s*&&\s*el\.parentNode\)\s*el\.parentNode\.removeChild\(el\);\s*\},\s*350\);/g, 'if (el && el.parentNode) el.parentNode.removeChild(el);');
html = html.replace(/transition:\s*opacity\s*0\.35s\s*ease;/g, 'transition: opacity 0.15s ease;');

console.log('Original size:', (originalSize / 1024 / 1024).toFixed(2), 'MB');
console.log('New size:', (html.length / 1024 / 1024).toFixed(2), 'MB');
console.log('Saved size:', ((originalSize - html.length) / 1024 / 1024).toFixed(2), 'MB');

fs.writeFileSync('frontend/public/sims/geometric-optics-basics.html', html, 'utf8');
