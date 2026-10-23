const fs = require('fs');

const files = [
  'geometric-optics-basics.html',
  'circuit-construction-kit-dc-virtual-lab.html',
  'density.html',
  'balancing-act.html',
  'masses-and-springs-basics.html',
  'waves-intro.html'
];

for (const file of files) {
  const html = fs.readFileSync(`frontend/public/sims/${file}`, 'utf8');
  const urls = html.match(/https?:\/\/[^\s"'<>]+/g) || [];
  const domains = new Set();
  urls.forEach(u => {
    try {
      const h = new URL(u).hostname;
      if (h) domains.add(h);
    } catch(e) {}
  });
  console.log(file, '-> External domains:', Array.from(domains));
}
