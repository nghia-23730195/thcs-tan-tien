const fs = require('fs');
const html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');

// Search for string data
const strIdx = html.indexOf('window.phet.chipper.strings');
console.log('strings index:', strIdx);
if (strIdx !== -1) {
  const nextScript = html.indexOf('</script>', strIdx);
  console.log('Size of strings script block:', ((nextScript - strIdx) / 1024).toFixed(1), 'KB');
}
