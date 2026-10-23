const fs = require('fs');
const html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');

const gtmIdx = html.indexOf('googletagmanager');
console.log('GTM index:', gtmIdx);
if (gtmIdx !== -1) {
  console.log(html.substring(gtmIdx - 100, gtmIdx + 300));
}

const cfIdx = html.indexOf('cloudflareinsights');
console.log('Cloudflare index:', cfIdx);
if (cfIdx !== -1) {
  console.log(html.substring(cfIdx - 100, cfIdx + 300));
}
