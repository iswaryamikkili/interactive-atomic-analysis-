
  /*EDUCATIONAL MODULES
  Three tabs injected below the main spectrum:
   1. Energy Level Diagram (Bohr model + transitions)
   2. Wave Properties (interactive λ/f/E visualiser)
   3. Compare Two Elements (D3 overlay)

Maps spectral lines to approximate n transitions using E = 13.6(1/n1² - 1/n2²) eV   */
 
const HYDROGEN_LEVELS = [1,2,3,4,5,6,7];

function estimateTransition(wl) {
  // Use Rydberg formula approximation to find closest ni→nf
  const E = 1239.84 / wl; // eV
  let best = {ni:3, nf:2, diff:999};
  for (let nf = 1; nf <= 6; nf++) {
    for (let ni = nf+1; ni <= 8; ni++) {
      const Ecalc = 13.6056 * (1/(nf*nf) - 1/(ni*ni));
      const diff  = Math.abs(Ecalc - E);
      if (diff < best.diff) best = {ni, nf, diff};
    }
  }
  return best;
}

// ── Orbital sub-shell labels ──
const SUBSHELL = ['s','p','d','f','g'];


/*BUILD EDUCATIONAL SECTION
Called after renderMain() — appends 3-tab card to #main*/

function buildEduSection(el, lines, mainArea) {

  // Remove old edu section if present
  const old = document.getElementById('edu-section');
  if (old) old.remove();

  const section = document.createElement('div');
  section.id = 'edu-section';
  section.innerHTML = `
    <div class="spectrum-card" style="animation-delay:0.1s">
      <div class="card-header">
        <div class="card-title">⚛ Educational Tools — ${el.name}</div>
      </div>
      <div class="edu-tabs">
        <button class="edu-tab active" data-tab="energy">Energy Levels</button>
        <button class="edu-tab" data-tab="wave">Wave Properties</button>
        <button class="edu-tab" data-tab="compare">Compare Elements</button>
      </div>

      <!-- TAB 1: Energy Level Diagram -->
      <div class="edu-panel active" id="tab-energy">
        <svg id="energy-level-svg" height="360"></svg>
        <div class="transition-select-hint" id="transition-hint">
          Click any spectral line above — or hover a transition arrow below — to highlight it here
        </div>
        <div class="quantum-info" id="quantum-info">
          <div class="q-card">
            <div class="q-card-label">Transition</div>
            <div class="q-card-val" id="qi-trans">—</div>
            <div class="q-card-sub">Select a line to see details</div>
          </div>
          <div class="q-card">
            <div class="q-card-label">Photon Energy</div>
            <div class="q-card-val" id="qi-energy">—</div>
            <div class="q-card-sub">E = hf = hc/λ</div>
          </div>
          <div class="q-card">
            <div class="q-card-label">Wavelength</div>
            <div class="q-card-val" id="qi-wl">—</div>
            <div class="q-card-sub">λ = hc/E</div>
          </div>
          <div class="q-card">
            <div class="q-card-label">Series</div>
            <div class="q-card-val" id="qi-series">—</div>
            <div class="q-card-sub" id="qi-series-desc">—</div>
          </div>
        </div>
      </div>

      <!-- TAB 2: Wave Properties -->
      <div class="edu-panel" id="tab-wave">
        <div class="wave-layout">
          <div>
            <canvas id="wave-canvas" height="160"></canvas>
            <div style="margin-top:12px">
              <div class="spectrum-bar-label"><span>UV 200nm</span><span>Visible</span><span>IR 1000nm</span></div>
              <div class="spectrum-position-bar"><div class="spectrum-needle" id="wave-needle"></div></div>
            </div>
          </div>
          <div class="wave-controls">
            <div class="wave-slider-group">
              <label>WAVELENGTH (nm) <span id="wl-display">550</span> nm</label>
              <input type="range" class="wave-range" id="wl-slider" min="200" max="1000" value="550" step="1">
            </div>
            <div class="wave-equations">
              <div class="equation-row">
                <span class="eq-name">FREQ</span>
                <span class="eq-formula">f = c/λ</span>
                <span class="eq-value" id="eq-freq">—</span>
              </div>
              <div class="equation-row">
                <span class="eq-name">ENERGY</span>
                <span class="eq-formula">E = hf</span>
                <span class="eq-value" id="eq-energy">—</span>
              </div>
              <div class="equation-row">
                <span class="eq-name">MOMENTUM</span>
                <span class="eq-formula">p = h/λ</span>
                <span class="eq-value" id="eq-momentum">—</span>
              </div>
              <div class="equation-row">
                <span class="eq-name">de BROGLIE</span>
                <span class="eq-formula">λ = h/p</span>
                <span class="eq-value" id="eq-debroglie">—</span>
              </div>
            </div>
            <div style="margin-top:8px">
              <div class="q-card-label" style="font-family:'Share Tech Mono',monospace;font-size:0.55rem;letter-spacing:.12em;color:var(--text-dim);margin-bottom:8px">JUMP TO ELEMENT LINE</div>
              <div id="line-quick-btns" style="display:flex;flex-wrap:wrap;gap:5px;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: Compare -->
      <div class="edu-panel" id="tab-compare">
        <div class="compare-layout">
          <div class="compare-picker">
            <label>ELEMENT A</label>
            <select id="cmp-a"></select>
            <div style="width:14px;height:14px;border-radius:3px;background:var(--glow-cyan);flex-shrink:0"></div>
          </div>
          <div class="compare-picker">
            <label>ELEMENT B</label>
            <select id="cmp-b"></select>
            <div style="width:14px;height:14px;border-radius:3px;background:var(--glow-teal);flex-shrink:0"></div>
          </div>
        </div>
        <div class="compare-legend">
          <span><span class="cleg-dot" style="background:var(--glow-cyan)"></span><span id="cleg-a">Element A</span></span>
          <span><span class="cleg-dot" style="background:var(--glow-teal)"></span><span id="cleg-b">Element B</span></span>
        </div>
        <div id="compare-chart"></div>
        <div id="compare-diff" style="margin-top:16px"></div>
      </div>
    </div>
  `;
  mainArea.appendChild(section);

  // ── Tab switching ──
  section.querySelectorAll('.edu-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.edu-tab').forEach(b => b.classList.remove('active'));
      section.querySelectorAll('.edu-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      if (btn.dataset.tab === 'wave')    initWavePanel(el, lines);
      if (btn.dataset.tab === 'compare') initComparePanel(el);
      if (btn.dataset.tab === 'energy')  drawEnergyDiagram(el, lines, null);
    });
  });

  // Init first tab
  drawEnergyDiagram(el, lines, null);
}


//  TAB 1 — ENERGY LEVEL DIAGRAM

function drawEnergyDiagram(el, lines, activeLine) {
  const container = document.getElementById('energy-level-svg');
  if (!container) return;
  d3.select(container).selectAll('*').remove();

  const W  = container.parentElement.clientWidth - 48 || 700;
  const H  = 360;
  const ml = 90, mr = 40, mt = 20, mb = 30;
  const iW = W - ml - mr;
  const iH = H - mt - mb;

  container.setAttribute('width', W);

  const svg = d3.select(container);
  const g   = svg.append('g').attr('transform', `translate(${ml},${mt})`);

  // Energy levels n=1..7 using Bohr: E_n = -13.6/n² eV
  const levels = HYDROGEN_LEVELS.map(n => ({
    n,
    E: -13.6056 / (n * n),
    label: `n = ${n}`,
  }));
  levels.push({ n: Infinity, E: 0, label: 'n = ∞ (ionised)' });

  const Emin = -14;
  const Emax = 1;
  const yScale = d3.scaleLinear().domain([Emin, Emax]).range([iH, 0]);

  // ── Draw energy levels ──
  levels.forEach(lv => {
    const y = yScale(lv.E);
    g.append('line')
      .attr('x1', 0).attr('x2', iW).attr('y1', y).attr('y2', y)
      .attr('stroke', lv.n === Infinity ? 'rgba(0,200,255,0.4)' : 'rgba(0,200,255,0.2)')
      .attr('stroke-width', lv.n === Infinity ? 1 : 1.5)
      .attr('stroke-dasharray', lv.n === Infinity ? '4 4' : null);

    // Label left
    g.append('text').attr('x', -6).attr('y', y + 4)
      .attr('text-anchor', 'end')
      .attr('font-family', 'Share Tech Mono, monospace')
      .attr('font-size', '11px').attr('fill', '#3e6e88')
      .text(lv.n === Infinity ? '∞' : `n=${lv.n}`);

    // Energy right
    g.append('text').attr('x', iW + 6).attr('y', y + 4)
      .attr('font-family', 'Share Tech Mono, monospace')
      .attr('font-size', '10px').attr('fill', '#2a5a70')
      .text(lv.n === Infinity ? '0 eV' : lv.E.toFixed(2) + ' eV');
  });

  // Y axis label
  g.append('text').attr('transform','rotate(-90)').attr('x', -iH/2).attr('y', -74)
    .attr('text-anchor','middle').attr('fill','#3e6e88')
    .attr('font-family','Share Tech Mono, monospace').attr('font-size','10px').attr('letter-spacing','0.12em')
    .text('ENERGY (eV)');

  // ── Draw transitions for each spectral line ──
  const sorted = [...lines].sort((a,b) => a.wl - b.wl);
  const nLines = sorted.length;
  const xStep  = Math.min(28, iW / Math.max(nLines, 1));

  sorted.forEach((line, i) => {
    const tr    = estimateTransition(line.wl);
    const color = wavelengthToRGB(line.wl);
    const isActive = activeLine && Math.abs(activeLine.wl - line.wl) < 0.5;
    const x     = 30 + i * xStep;
    const yTop  = yScale(-13.6056 / (tr.ni * tr.ni));
    const yBot  = yScale(-13.6056 / (tr.nf * tr.nf));
    const alpha = isActive ? 1 : 0.5;

    // Arrow line
    g.append('line')
      .attr('x1', x).attr('x2', x)
      .attr('y1', yTop).attr('y2', yBot + 6)
      .attr('stroke', color)
      .attr('stroke-width', isActive ? 2.5 : 1.5)
      .attr('opacity', alpha)
      .attr('marker-end', `url(#arrow-${i})`);

    // Arrow marker
    const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
    const marker = defs.append('marker')
      .attr('id', `arrow-${i}`)
      .attr('viewBox','0 -4 8 8').attr('refX',6).attr('refY',0)
      .attr('markerWidth',6).attr('markerHeight',6).attr('orient','auto');
    marker.append('path').attr('d','M0,-4L8,0L0,4').attr('fill', color).attr('opacity', alpha);

    // Hover area
    g.append('rect')
      .attr('x', x - 6).attr('y', Math.min(yTop, yBot)).attr('width', 12)
      .attr('height', Math.abs(yBot - yTop))
      .attr('fill', 'transparent').attr('cursor', 'pointer')
      .on('mouseenter', function() { highlightTransition(line, tr, color); })
      .on('mouseleave', function() { clearTransitionHighlight(); });
  });

  // Ionisation line label
  g.append('text').attr('x', iW / 2).attr('y', yScale(0) - 6)
    .attr('text-anchor','middle').attr('fill','rgba(0,200,255,0.4)')
    .attr('font-family','Share Tech Mono, monospace').attr('font-size','10px').attr('letter-spacing','0.1em')
    .text('IONISATION LIMIT');

  // Series bracket labels
  const seriesData = [
    { name:'Lyman',   nf:1, color:'#cc44ff', region:'UV' },
    { name:'Balmer',  nf:2, color:'#00c8ff', region:'Visible' },
    { name:'Paschen', nf:3, color:'#ff8844', region:'IR' },
  ];
  seriesData.forEach(s => {
    const yS = yScale(-13.6056/(s.nf*s.nf));
    g.append('text').attr('x', iW - 4).attr('y', yS - 6)
      .attr('text-anchor','end').attr('fill', s.color)
      .attr('font-family','Share Tech Mono, monospace').attr('font-size','9px').attr('opacity',0.7)
      .text(`${s.name} series (${s.region})`);
  });
}

function highlightTransition(line, tr, color) {
  const seriesMap = { 1:'Lyman (UV)', 2:'Balmer (Visible)', 3:'Paschen (IR)', 4:'Brackett (IR)', 5:'Pfund (IR)' };
  document.getElementById('qi-trans').textContent    = `n=${tr.ni} → n=${tr.nf}`;
  document.getElementById('qi-trans').style.color    = color;
  document.getElementById('qi-energy').textContent   = (1239.84/line.wl).toFixed(4) + ' eV';
  document.getElementById('qi-wl').textContent       = line.wl.toFixed(1) + ' nm';
  document.getElementById('qi-series').textContent   = seriesMap[tr.nf] || `nf=${tr.nf}`;
  document.getElementById('qi-series-desc').textContent =
    `Δn = ${tr.ni - tr.nf}  |  Region: ${spectralRegion(line.wl)}`;
  const hint = document.getElementById('transition-hint');
  if (hint) hint.style.display = 'none';
}

function clearTransitionHighlight() {
  // Keep values visible on hover end — don't clear
}

//  TAB 2 — WAVE PROPERTIES

function initWavePanel(el, lines) {
  const canvas = document.getElementById('wave-canvas');
  if (!canvas) return;
  canvas.width  = canvas.parentElement.clientWidth || 400;
  canvas.height = 160;

  const slider   = document.getElementById('wl-slider');
  const wlDisp   = document.getElementById('wl-display');

  // Quick-jump buttons for this element's lines
  const btnWrap = document.getElementById('line-quick-btns');
  if (btnWrap) {
    btnWrap.innerHTML = '';
    [...lines].sort((a,b)=>a.wl-b.wl).forEach(line => {
      const btn = document.createElement('button');
      btn.style.cssText = `
        background:rgba(0,0,0,0.4); border:1px solid ${wavelengthToRGB(line.wl)};
        color:${wavelengthToRGB(line.wl)}; border-radius:3px; padding:3px 8px;
        font-family:'Share Tech Mono',monospace; font-size:0.6rem; cursor:pointer;
        transition:all 0.15s;`;
      btn.textContent = line.wl.toFixed(0) + ' nm';
      btn.addEventListener('click', () => {
        slider.value = Math.round(line.wl);
        updateWave(Math.round(line.wl));
      });
      btnWrap.appendChild(btn);
    });
  }

  function updateWave(wl) {
    wlDisp.textContent = wl;
    const freq     = (2.998e8 / (wl * 1e-9));           // Hz
    const energy   = (6.626e-34 * freq);                 // J
    const energyEV = energy / 1.602e-19;                 // eV
    const momentum = 6.626e-34 / (wl * 1e-9);            // kg·m/s
    const freqTHz  = (freq / 1e12).toFixed(3);

    document.getElementById('eq-freq').textContent      = freqTHz + ' THz';
    document.getElementById('eq-energy').textContent    = energyEV.toFixed(4) + ' eV';
    document.getElementById('eq-momentum').textContent  = momentum.toExponential(3) + ' kg·m/s';
    document.getElementById('eq-debroglie').textContent = wl + ' nm (photon)';

    // Needle position (200–1000 nm range → 0–100%)
    const pct = ((wl - 200) / 800 * 100).toFixed(1);
    const needle = document.getElementById('wave-needle');
    if (needle) needle.style.left = pct + '%';

    drawWaveCanvas(canvas, wl);
  }

  slider.addEventListener('input', () => updateWave(+slider.value));
  updateWave(+slider.value);
}

function drawWaveCanvas(canvas, wl) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  const color     = wavelengthToRGB(wl);
  const amplitude = H * 0.3;
  const cy        = H / 2;

  // Number of full cycles visible — shorter wavelength = more cycles
  const cycles = 2 + (1000 - wl) / 200;
  const freq   = (cycles * 2 * Math.PI) / W;

  // Glow effect
  ctx.shadowColor = color;
  ctx.shadowBlur  = 12;

  // Wave
  ctx.beginPath();
  ctx.moveTo(0, cy);
  for (let x = 0; x <= W; x++) {
    const y = cy - amplitude * Math.sin(freq * x);
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth   = 2;
  ctx.stroke();
  ctx.shadowBlur  = 0;

  // Wavelength annotation — one full cycle
  const cycleW = W / cycles;
  const cx1    = cycleW * 0.5;
  const cx2    = cx1 + cycleW;
  const arrowY = cy + amplitude + 22;

  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth   = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(cx1, cy - amplitude - 8); ctx.lineTo(cx1, arrowY);
  ctx.moveTo(cx2, cy - amplitude - 8); ctx.lineTo(cx2, arrowY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx1, arrowY); ctx.lineTo(cx2, arrowY);
  ctx.moveTo(cx1 + 6, arrowY - 4); ctx.lineTo(cx1, arrowY); ctx.lineTo(cx1 + 6, arrowY + 4);
  ctx.moveTo(cx2 - 6, arrowY - 4); ctx.lineTo(cx2, arrowY); ctx.lineTo(cx2 - 6, arrowY + 4);
  ctx.stroke();

  // λ label
  ctx.font      = '12px Share Tech Mono, monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.textAlign = 'center';
  ctx.fillText(`λ = ${wl} nm`, (cx1+cx2)/2, arrowY + 14);

  // Amplitude label
  ctx.font      = '10px Share Tech Mono, monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.textAlign = 'left';
  ctx.fillText('A', 4, cy - amplitude + 4);

  // Region label top-right
  ctx.textAlign = 'right';
  ctx.fillStyle = color;
  ctx.font = '11px Share Tech Mono, monospace';
  ctx.fillText(spectralRegion(wl), W - 8, 16);
}


//  TAB 3 — COMPARE TWO ELEMENTS

function initComparePanel(currentEl) {
  const selA = document.getElementById('cmp-a');
  const selB = document.getElementById('cmp-b');
  if (!selA || !selB) return;

  // Populate dropdowns
  [selA, selB].forEach((sel, idx) => {
    sel.innerHTML = '';
    ELEMENTS_LIGHT.forEach(el => {
      const opt = document.createElement('option');
      opt.value = el.z;
      opt.textContent = `${el.z}. ${el.sym} — ${el.name}`;
      sel.appendChild(opt);
    });
    // Default: A = current element, B = next element
    sel.value = idx === 0 ? currentEl.z : Math.min(currentEl.z + 1, 118);
  });

  function redraw() {
    const zA = parseInt(selA.value);
    const zB = parseInt(selB.value);
    const elA = ELEMENTS_LIGHT.find(e => e.z === zA);
    const elB = ELEMENTS_LIGHT.find(e => e.z === zB);
    document.getElementById('cleg-a').textContent = `${elA.sym} — ${elA.name}`;
    document.getElementById('cleg-b').textContent = `${elB.sym} — ${elB.name}`;
    drawCompareChart(elA, elB);
  }

  selA.addEventListener('change', redraw);
  selB.addEventListener('change', redraw);
  redraw();
}

function drawCompareChart(elA, elB) {
  const container = document.getElementById('compare-chart');
  if (!container) return;
  d3.select(container).selectAll('*').remove();

  const linesA = generateSpectralLines(elA.z);
  const linesB = generateSpectralLines(elB.z);

  const W  = container.clientWidth || 800;
  const H  = 260;
  const m  = {top:20, right:24, bottom:48, left:58};
  const iW = W - m.left - m.right;
  const iH = H - m.top  - m.bottom;

  const svg = d3.select(container).append('svg')
    .attr('width','100%').attr('height',H).style('display','block');

  svg.append('defs').append('clipPath').attr('id','cmp-clip')
    .append('rect').attr('width',iW).attr('height',iH+10).attr('y',-5);

  const g = svg.append('g').attr('transform',`translate(${m.left},${m.top})`);

  const xScale = d3.scaleLinear().domain([200,1000]).range([0,iW]);
  const yScale = d3.scaleLinear().domain([0,130]).range([iH,0]);

  // Axes
  const xAx = g.append('g').attr('transform',`translate(0,${iH})`);
  const yAx = g.append('g');
  xAx.call(d3.axisBottom(xScale).ticks(10).tickFormat(d=>d+' nm'));
  yAx.call(d3.axisLeft(yScale).ticks(5).tickFormat(d=>d+'%'));
  [xAx, yAx].forEach(ax => {
    ax.selectAll('text').style('fill','#3e6e88').style('font-family','Share Tech Mono,monospace').style('font-size','10px');
    ax.selectAll('line,path').style('stroke','rgba(0,200,255,0.1)');
  });

  g.append('text').attr('x',iW/2).attr('y',iH+40).attr('text-anchor','middle')
    .attr('fill','#3e6e88').attr('font-size','10px').attr('font-family','Share Tech Mono,monospace')
    .attr('letter-spacing','0.14em').text('WAVELENGTH (nm)');

  // Grid
  g.append('g').attr('clip-path','url(#cmp-clip)')
    .selectAll('line').data(yScale.ticks(5)).join('line')
    .attr('x1',0).attr('x2',iW).attr('y1',d=>yScale(d)).attr('y2',d=>yScale(d))
    .attr('stroke','rgba(0,200,255,0.04)');

  const lG = g.append('g').attr('clip-path','url(#cmp-clip)');

  // Element A lines — offset slightly left, cyan
  linesA.forEach(line => {
    const x = xScale(line.wl) - 1;
    const col = '#00c8ff';
    lG.append('line').attr('x1',x).attr('x2',x).attr('y1',yScale(line.int)).attr('y2',iH)
      .attr('stroke',col).attr('stroke-width',1.5).attr('opacity',0.85);
    lG.append('circle').attr('cx',x).attr('cy',yScale(line.int)).attr('r',2.5)
      .attr('fill',col).attr('opacity',0.9);
  });

  // Element B lines — offset slightly right, teal
  linesB.forEach(line => {
    const x = xScale(line.wl) + 1;
    const col = '#00ffd0';
    lG.append('line').attr('x1',x).attr('x2',x).attr('y1',yScale(line.int + 10)).attr('y2',iH)
      .attr('stroke',col).attr('stroke-width',1.5).attr('opacity',0.75).attr('stroke-dasharray','4 3');
    lG.append('circle').attr('cx',x).attr('cy',yScale(line.int + 10)).attr('r',2.5)
      .attr('fill',col).attr('opacity',0.85);
  });

  // Zoom
  const zoom = d3.zoom().scaleExtent([1,40])
    .translateExtent([[0,0],[iW,iH]]).extent([[0,0],[iW,iH]])
    .on('zoom', ev => {
      const xs = ev.transform.rescaleX(xScale);
      xAx.call(d3.axisBottom(xs).ticks(10).tickFormat(d=>d+' nm'));
      xAx.selectAll('text').style('fill','#3e6e88').style('font-family','Share Tech Mono,monospace').style('font-size','10px');
      lG.selectAll('*').remove();
      linesA.forEach(line => {
        const x = xs(line.wl)-1;
        lG.append('line').attr('x1',x).attr('x2',x).attr('y1',yScale(line.int)).attr('y2',iH)
          .attr('stroke','#00c8ff').attr('stroke-width',1.5).attr('opacity',0.85);
        lG.append('circle').attr('cx',x).attr('cy',yScale(line.int)).attr('r',2.5).attr('fill','#00c8ff').attr('opacity',0.9);
      });
      linesB.forEach(line => {
        const x = xs(line.wl)+1;
        lG.append('line').attr('x1',x).attr('x2',x).attr('y1',yScale(line.int+10)).attr('y2',iH)
          .attr('stroke','#00ffd0').attr('stroke-width',1.5).attr('opacity',0.75).attr('stroke-dasharray','4 3');
        lG.append('circle').attr('cx',x).attr('cy',yScale(line.int+10)).attr('r',2.5).attr('fill','#00ffd0').attr('opacity',0.85);
      });
    });
  svg.call(zoom);

  // Shared lines callout
  const diffBox = document.getElementById('compare-diff');
  if (diffBox) {
    const sharedWls = linesA.filter(a =>
      linesB.some(b => Math.abs(a.wl - b.wl) < 5)
    );
    if (sharedWls.length > 0) {
      diffBox.innerHTML = `
        <div class="card-header" style="border-top:1px solid var(--border);border-radius:0">
          <div class="card-title" style="font-size:0.72rem">⚠ Overlapping Regions (within 5 nm)</div>
        </div>
        <div style="padding:12px 16px;display:flex;flex-wrap:wrap;gap:6px">
          ${sharedWls.map(l => `
            <span style="font-family:'Share Tech Mono',monospace;font-size:0.65rem;
              padding:3px 8px;border-radius:3px;
              background:rgba(255,200,0,0.08);
              border:1px solid rgba(255,200,0,0.2);color:#ffcc44">
              ${l.wl.toFixed(1)} nm
            </span>`).join('')}
        </div>
        <div style="padding:0 16px 12px;font-family:'Share Tech Mono',monospace;font-size:0.6rem;color:var(--text-dim)">
          These wavelengths appear in both spectra — important for spectroscopic identification ambiguity.
        </div>`;
    } else {
      diffBox.innerHTML = `<div style="padding:12px 16px;font-family:'Share Tech Mono',monospace;font-size:0.65rem;color:var(--text-dim)">
        No overlapping spectral lines found between ${elA.name} and ${elB.name} — spectra are fully distinguishable.
      </div>`;
    }
  }
}