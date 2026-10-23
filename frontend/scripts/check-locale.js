const fs = require('fs');

const html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');
const locPrefix = 'window.phet.chipper.localeData = ';
const locIdx = html.indexOf(locPrefix);
if (locIdx !== -1) {
  const jsonStart = locIdx + locPrefix.length;
  let semi = html.indexOf('};\n', jsonStart);
  if (semi === -1) semi = html.indexOf('};', jsonStart);
  const rawJson = html.substring(jsonStart, semi + 1);
  const parsed = JSON.parse(rawJson);
  console.log('LocaleData parsed! Keys count:', Object.keys(parsed).length);
  const filtered = { en: parsed.en, vi: parsed.vi };
  console.log('Original localeData size:', (rawJson.length / 1024).toFixed(1), 'KB');
  console.log('Filtered localeData size:', (JSON.stringify(filtered).length / 1024).toFixed(1), 'KB');
}
