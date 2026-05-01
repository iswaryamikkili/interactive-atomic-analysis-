

const SPECTRAL_DATA = {
};

//generate spectral lines
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
  return `rgb(${ri},${gi},${bi})`;
}

function spectralRegion(wl) {
  if (wl < 400) return 'UV';
  if (wl < 700) return 'Visible';
  return 'IR';
}
