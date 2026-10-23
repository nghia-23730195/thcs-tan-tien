const fs = require('fs');
const html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');

const qpIdx = html.indexOf('phet.chipper.queryParameters');
console.log('queryParameters index:', qpIdx);
if (qpIdx !== -1) {
  console.log(html.substring(qpIdx - 50, qpIdx + 400));
}
