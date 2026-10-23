const fs = require('fs');

const html = fs.readFileSync('frontend/public/sims/density.html', 'utf8');
const strPrefix = 'window.phet.chipper.strings = ';
const idx = html.indexOf(strPrefix);
if (idx !== -1) {
  console.log(html.substring(idx, idx + 250));
}
