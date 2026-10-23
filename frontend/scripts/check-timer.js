const fs = require('fs');

const html = fs.readFileSync('frontend/public/sims/geometric-optics-basics.html', 'utf8');

// Find all setTimeout or delay in custom-splash-screen
const customIdx = html.indexOf('custom-splash-screen');
console.log('Custom splash screen snippet:');
console.log(html.substring(customIdx - 100, customIdx + 600));
