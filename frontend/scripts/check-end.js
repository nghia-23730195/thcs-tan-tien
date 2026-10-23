const fs = require('fs');

const html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');
const strPrefix = 'window.phet.chipper.strings = ';
const strIdx = html.indexOf(strPrefix);
if (strIdx !== -1) {
  const jsonStart = strIdx + strPrefix.length;
  // find first occurrence of '};\n' or '};' after jsonStart
  let semi = html.indexOf('};\n', jsonStart);
  if (semi === -1) semi = html.indexOf('};<', jsonStart);
  if (semi === -1) semi = html.indexOf('};', jsonStart);
  console.log('semi position:', semi);
  console.log('Chars near semi:');
  console.log(html.substring(semi - 50, semi + 20));
  const rawJson = html.substring(jsonStart, semi + 1);
  const parsed = JSON.parse(rawJson);
  console.log('Parsed successfully! Language keys count:', Object.keys(parsed).length);
  const filtered = { en: parsed.en, vi: parsed.vi };
  console.log('Filtered keys:', Object.keys(filtered));
  console.log('Original JSON size:', (rawJson.length / 1024).toFixed(1), 'KB');
  console.log('Filtered JSON size:', (JSON.stringify(filtered).length / 1024).toFixed(1), 'KB');
}
