
const fs   = require('fs');
const path = require('path');


// Maps element name → atomic number
const ELEMENTS = {
  hydrogen:1, helium:2, lithium:3, beryllium:4, boron:5,
  carbon:6, nitrogen:7, oxygen:8, fluorine:9, neon:10,
  sodium:11, magnesium:12, aluminum:13, silicon:14, phosphorus:15,
  sulfur:16, chlorine:17, argon:18, potassium:19, calcium:20,
  scandium:21, titanium:22, vanadium:23, chromium:24, manganese:25,
  iron:26, cobalt:27, nickel:28, copper:29, zinc:30,
  gallium:31, germanium:32, arsenic:33, selenium:34, bromine:35,
  krypton:36, rubidium:37, strontium:38, yttrium:39, zirconium:40,
  niobium:41, molybdenum:42, technetium:43, ruthenium:44, rhodium:45,
  palladium:46, silver:47, cadmium:48, indium:49, tin:50,
  antimony:51, tellurium:52, iodine:53, xenon:54, cesium:55,
  barium:56, lanthanum:57, cerium:58, praseodymium:59, neodymium:60,
  promethium:61, samarium:62, europium:63, gadolinium:64, terbium:65,
  dysprosium:66, holmium:67, erbium:68, thulium:69, ytterbium:70,
  lutetium:71, hafnium:72, tantalum:73, tungsten:74, rhenium:75,
  osmium:76, iridium:77, platinum:78, gold:79, mercury:80,
  thallium:81, lead:82, bismuth:83, polonium:84, astatine:85,
  radon:86, francium:87, radium:88, actinium:89, thorium:90,
  protactinium:91, uranium:92, neptunium:93, plutonium:94, americium:95,
  curium:96, berkelium:97, californium:98, einsteinium:99,
};

// ── Parser ────────────────────────────────────────────
function parseNISTFile(filepath) {
  const html = fs.readFileSync(filepath, 'utf8');
  const lines = [];

  /*Detect which table we are in (vacuum vs air)
   Split the HTML into the two table sections
  First table = Vacuum wavelengths, second = Air wavelengths*/
  
  const vacuumMatch = html.match(/Vacuum[\s\S]*?<\/table>/i);
  const airMatch    = html.match(/Air[\s\S]*?<\/table>/i);

  // Extract all <tr> rows from the full HTML
  // Each data row looks like:
  // <tr><td>   15   P</td><td>   926.2256</td><td>H I</td><td>...</td></tr>
  const rowRegex = /<tr>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/gi;

  // Track which section we're parsing for vacuum vs air
  // We split the HTML at the "Air Wavelength" heading
  let vacuumSection = html;
  let airSection    = '';

  const airIdx = html.search(/Air\s*<br/i);
  if (airIdx > -1) {
    vacuumSection = html.substring(0, airIdx);
    airSection    = html.substring(airIdx);
  }

  // Parse a section and return lines with isVacuum flag
  function parseSection(text, isVacuum) {
    const results = [];
    const re = /<tr>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/gi;
    let m;
    while ((m = re.exec(text)) !== null) {
      // Strip all HTML tags and whitespace from each cell
      const intStr = m[1].replace(/<[^>]+>/g, '').trim();
      const wlStr  = m[2].replace(/<[^>]+>/g, '').trim();
      const spec   = m[3].replace(/<[^>]+>/g, '').trim();

      // Skip header rows and empty rows
      if (!wlStr || isNaN(parseFloat(wlStr))) continue;
      if (intStr === 'Intensity' || wlStr === 'Wavelength') continue;

      // Extract numeric intensity (may have trailing letters like P, c)
      const intNum = parseFloat(intStr.replace(/[^0-9.]/g, ''));
      const wlNum  = parseFloat(wlStr.replace(/[^0-9.]/g, ''));

      if (isNaN(intNum) || isNaN(wlNum) || wlNum <= 0) continue;

      // Convert Ångströms to nm (÷ 10)
      const wlNm = wlNum / 10;

      // Only keep lines in 200-1000 nm window
      if (wlNm < 200 || wlNm > 1000) continue;

      results.push({ wl: wlNm, int: intNum, vacuum: isVacuum });
    }
    return results;
  }

  const vacLines = parseSection(vacuumSection, true);
  const airLines = parseSection(airSection,    false);
  const allLines = [...vacLines, ...airLines];

  // Deduplicate lines closer than 0.05 nm — keep higher intensity
  allLines.sort((a, b) => a.wl - b.wl);
  const deduped = [];
  for (let i = 0; i < allLines.length; i++) {
    const cur  = allLines[i];
    const prev = deduped[deduped.length - 1];
    if (prev && Math.abs(cur.wl - prev.wl) < 0.05) {
      if (cur.int > prev.int) deduped[deduped.length - 1] = cur;
    } else {
      deduped.push(cur);
    }
  }

  return deduped;
}

// ── Main ──────────────────────────────────────────────
const folder  = process.cwd(); // run from your project folder
const results = {};
const found   = [];
const missing = [];

console.log(`\nScanning folder: ${folder}\n`);

for (const [name, z] of Object.entries(ELEMENTS)) {
  // Try both possible file names:  hydrogen.htm  or  hydrogentable2.htm
  const candidates = [
    path.join(folder, `${name}.htm`),
    path.join(folder, `${name}.html`),
    path.join(folder, `${name}table2.htm`),
    path.join(folder, `${name}table2.html`),
  ];

  let parsed = null;
  for (const fp of candidates) {
    if (fs.existsSync(fp)) {
      try {
        parsed = parseNISTFile(fp);
        console.log(`  ✓  Z=${String(z).padStart(3)}  ${name.padEnd(16)}  ${parsed.length} lines  (${fp.split('/').pop()})`);
        found.push({ name, z, lines: parsed });
        results[z] = parsed;
      } catch (e) {
        console.log(`  ✗  Z=${String(z).padStart(3)}  ${name.padEnd(16)}  ERROR: ${e.message}`);
      }
      break;
    }
  }
  if (!parsed) {
    missing.push(name);
  }
}

console.log(`\n  Found:   ${found.length} elements with NIST data`);
console.log(`  Missing: ${missing.length} elements (will use computed model)`);
if (missing.length > 0 && missing.length <= 20) {
  console.log(`  Missing list: ${missing.join(', ')}`);
}

// ── Generate spectral-data.js ─────────────────────────
const outPath = path.join(folder, 'spectral-data.js');

let out = `// ═══════════════════════════════════════════════════════
//  NIST ATOMIC SPECTRA DATABASE — AUTO-GENERATED
//  Source: NIST Handbook of Basic Atomic Spectroscopic Data
//  SRD-108 (Sansonetti & Martin, 2005)
//  Generated by parse-nist.js
//  Elements with real data: ${found.length}
//  Wavelengths in nm (converted from Angstroms ÷ 10)
//  Intensities: relative, normalized to 0-100 per element
// ═══════════════════════════════════════════════════════

const SPECTRAL_DATA = {\n`;

for (const [zStr, lines] of Object.entries(results)) {
  if (lines.length === 0) continue;

  // Normalize intensities to 0-100
  const maxInt = Math.max(...lines.map(l => l.int));
  const normed = lines.map(l => ({
    wl:  Math.round(l.wl * 1000) / 1000,  // 3 decimal places
    int: Math.round((l.int / maxInt) * 100),
  })).filter(l => l.int >= 1); // drop sub-1% lines

  const elName = Object.entries(ELEMENTS).find(([n, z]) => z === parseInt(zStr))?.[0] || '?';
  out += `\n  // Z=${zStr} ${elName.charAt(0).toUpperCase() + elName.slice(1)}\n`;
  out += `  ${zStr}: { lines: [\n`;
  for (const l of normed) {
    out += `    {wl:${l.wl.toFixed(3)}, int:${l.int}},\n`;
  }
  out += `  ]},\n`;
}

out += `};\n`;

// ── Append utility functions (same as before) ─────────
out += `
// ═══════════════════════════════════════════════════════
//  generateSpectralLines(z)
// ═══════════════════════════════════════════════════════
function generateSpectralLines(z) {
  if (SPECTRAL_DATA[z]) {
    return SPECTRAL_DATA[z].lines;
  }
  return computedLines(z);
}

function computedLines(z) {
  function Zeff(Z) {
    let sigma = 0;
    if (Z > 2)  sigma += 0.85 * Math.min(Z - 2, 8);
    if (Z > 10) sigma += 0.85 * Math.min(Z - 10, 8);
    return Math.max(1, Z - sigma);
  }
  const lines = [];
  const ze = Zeff(z);
  for (let ni = 3; ni <= 8; ni++) {
    for (let nf = 1; nf < ni && nf <= 5; nf++) {
      const E  = 13.6056 * ze * ze * (1/(nf*nf) - 1/(ni*ni)) / (z * 0.4 + 1);
      const wl = 1239.84 / Math.max(E, 0.5);
      if (wl < 200 || wl > 1000) continue;
      const int = Math.max(5, 100 - (ni - nf - 1) * 20 - (nf - 1) * 10);
      lines.push({ wl: Math.round(wl * 10) / 10, int });
    }
  }
  let s = (z * 2654435761) >>> 0;
  const lcg = () => { s = Math.imul(s, 1664525) + 1013904223 >>> 0; return s; };
  for (let i = 0; i < 3 + (z % 6); i++) {
    lines.push({ wl: 220 + (lcg() % 760), int: 10 + (lcg() % 50) });
  }
  return lines.sort((a, b) => a.wl - b.wl);
}

// Wavelength → RGB colour
function wavelengthToRGB(wl) {
  let r, g, b;
  if      (wl >= 380 && wl < 440) { r = -(wl-440)/(440-380); g = 0; b = 1; }
  else if (wl >= 440 && wl < 490) { r = 0; g = (wl-440)/(490-440); b = 1; }
  else if (wl >= 490 && wl < 510) { r = 0; g = 1; b = -(wl-510)/(510-490); }
  else if (wl >= 510 && wl < 580) { r = (wl-510)/(580-510); g = 1; b = 0; }
  else if (wl >= 580 && wl < 645) { r = 1; g = -(wl-645)/(645-580); b = 0; }
  else if (wl >= 645 && wl < 781) { r = 1; g = 0; b = 0; }
  else if (wl < 380) return '#bb44ff';
  else               return '#cc3300';
  let f;
  if      (wl >= 380 && wl < 420) f = 0.3 + 0.7*(wl-380)/(420-380);
  else if (wl >= 700 && wl < 781) f = 0.3 + 0.7*(780-wl)/(780-700);
  else f = 1.0;
  const ri = Math.round(255 * Math.pow(Math.max(0,r)*f, 0.8));
  const gi = Math.round(255 * Math.pow(Math.max(0,g)*f, 0.8));
  const bi = Math.round(255 * Math.pow(Math.max(0,b)*f, 0.8));
  return \`rgb(\${ri},\${gi},\${bi})\`;
}

function spectralRegion(wl) {
  if (wl < 400) return 'UV';
  if (wl < 700) return 'Visible';
  return 'IR';
}
`;

fs.writeFileSync(outPath, out, 'utf8');
console.log(`\n✅  spectral-data.js written to: ${outPath}`);
console.log(`    Total size: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB\n`);