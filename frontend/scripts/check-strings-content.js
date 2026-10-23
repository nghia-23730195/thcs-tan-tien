const fs = require('fs');
const html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');

const strIdx = html.indexOf('window.phet.chipper.strings');
console.log('Snippet of strings:');
console.log(html.substring(strIdx, strIdx + 300));
