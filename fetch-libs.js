// Downloads the 3 libraries the app loads from the internet, so the APK works offline.
const https = require('https'), fs = require('fs'), path = require('path');
const libs = {
  'xlsx.full.min.js': 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'jspdf.umd.min.js': 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'jspdf.plugin.autotable.min.js': 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'
};
const dir = path.join(__dirname, 'www', 'lib'); fs.mkdirSync(dir, { recursive: true });
function get(url, dest) {
  return new Promise((res, rej) => https.get(url, r => {
    if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return get(r.headers.location, dest).then(res, rej);
    if (r.statusCode !== 200) return rej(new Error(url + ' -> ' + r.statusCode));
    r.pipe(fs.createWriteStream(dest)).on('finish', res);
  }).on('error', rej));
}
(async () => {
  for (const [f, u] of Object.entries(libs)) { await get(u, path.join(dir, f)); console.log('downloaded', f); }
  const idx = path.join(__dirname, 'www', 'index.html');
  let h = fs.readFileSync(idx, 'utf8');
  for (const [f, u] of Object.entries(libs)) h = h.split(u).join('lib/' + f);
  fs.writeFileSync(idx, h); console.log('index.html now uses the local copies.');
})().catch(e => { console.error(e.message); process.exit(1); });
