const fs = require('fs');
const path = require('path');
const https = require('https');

const sims = [
  {
    name: 'geometric-optics-basics',
    url: 'https://phet.colorado.edu/sims/html/geometric-optics-basics/latest/geometric-optics-basics_all.html?locale=vi'
  },
  {
    name: 'circuit-construction-kit-dc-virtual-lab',
    url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_all.html?locale=vi'
  },
  {
    name: 'density',
    url: 'https://phet.colorado.edu/sims/html/density/latest/density_all.html?locale=vi'
  },
  {
    name: 'balancing-act',
    url: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_all.html?locale=vi'
  },
  {
    name: 'masses-and-springs-basics',
    url: 'https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics_all.html?locale=vi'
  },
  {
    name: 'waves-intro',
    url: 'https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_all.html?locale=vi'
  }
];

const outDir = path.join(__dirname, '..', 'public', 'sims');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

const replacementSplash = `
<style>
  body {
    background-color: #ffffff !important;
  }
  #custom-splash-screen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    transition: opacity 0.35s ease;
  }
  .physix-loader-spinner {
    width: 44px;
    height: 44px;
    border: 3.5px solid #e2e8f0;
    border-top: 3.5px solid #059669;
    border-radius: 50%;
    animation: physixSpin 0.8s linear infinite;
  }
  @keyframes physixSpin {
    to { transform: rotate(360deg); }
  }
  .physix-loader-title {
    margin-top: 18px;
    color: #0f172a;
    font-weight: 700;
    font-size: 15px;
  }
  .physix-loader-sub {
    margin-top: 6px;
    color: #059669;
    font-weight: 600;
    font-size: 12px;
  }
</style>
<div id="custom-splash-screen">
  <div class="physix-loader-spinner"></div>
  <div class="physix-loader-title">Đang Khởi Tạo Phòng Thí Nghiệm Ảo</div>
  <div class="physix-loader-sub">Mô phỏng Khoa học Tự nhiên &amp; Vật lý THCS</div>
</div>
<script type="text/javascript">
window.PHET_SPLASH_DATA_URI = "";
window.phetSplashScreenDownloadComplete = function(t) { return "273"; };
window.phetSplashScreen = {
  dispose: function() {
    var el = document.getElementById("custom-splash-screen");
    if (el) {
      el.style.opacity = "0";
      setTimeout(function() {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }, 350);
    }
    delete window.phetSplashScreen;
  }
};
</script>
`;

async function processSim(sim) {
  console.log(`Downloading ${sim.name}...`);
  let html = await fetchUrl(sim.url);
  console.log(`Downloaded ${sim.name}: ${(html.length / 1024 / 1024).toFixed(2)} MB`);

  // Find exact splash script bounds
  const phetSplashIdx = html.indexOf('window.PHET_SPLASH_DATA_URI');
  if (phetSplashIdx === -1) {
    throw new Error(`Could not find window.PHET_SPLASH_DATA_URI in ${sim.name}`);
  }
  const startIdx = html.lastIndexOf('<script', phetSplashIdx);
  const endKeyword = 'delete window.phetSplashScreen';
  const endKeywordIdx = html.indexOf(endKeyword);
  if (endKeywordIdx === -1) {
    throw new Error(`Could not find ${endKeyword} in ${sim.name}`);
  }
  const endIdx = html.indexOf('</script>', endKeywordIdx) + 9;

  // Replace splash block cleanly
  html = html.substring(0, startIdx) + replacementSplash + html.substring(endIdx);

  // Replace black body background
  html = html.replace(/<body style="background-color:black;">/gi, '<body style="background-color:white;">');

  // Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Mô Phỏng Thí Nghiệm KHTN THCS</title>');

  // Write output
  const targetPath = path.join(outDir, `${sim.name}.html`);
  fs.writeFileSync(targetPath, html, 'utf8');
  console.log(`Successfully generated clean simulation: ${targetPath}`);
}

async function main() {
  for (const sim of sims) {
    await processSim(sim);
  }
  console.log('All 4 simulations have been cleanly generated without logos!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
