// ═══════════════════════════════════════════════════════
//  PURITY ANALYSER — purity.js
//  Three visualisations: D3 overlay · Three.js waterfall · Plotly
// ═══════════════════════════════════════════════════════

// ── Element list (lightweight — just for dropdowns) ──
const EL_LIST = [
    {z:1,sym:'H',name:'Hydrogen'},{z:2,sym:'He',name:'Helium'},
    {z:3,sym:'Li',name:'Lithium'},{z:4,sym:'Be',name:'Beryllium'},
    {z:5,sym:'B',name:'Boron'},{z:6,sym:'C',name:'Carbon'},
    {z:7,sym:'N',name:'Nitrogen'},{z:8,sym:'O',name:'Oxygen'},
    {z:9,sym:'F',name:'Fluorine'},{z:10,sym:'Ne',name:'Neon'},
    {z:11,sym:'Na',name:'Sodium'},{z:12,sym:'Mg',name:'Magnesium'},
    {z:13,sym:'Al',name:'Aluminium'},{z:14,sym:'Si',name:'Silicon'},
    {z:15,sym:'P',name:'Phosphorus'},{z:16,sym:'S',name:'Sulfur'},
    {z:17,sym:'Cl',name:'Chlorine'},{z:18,sym:'Ar',name:'Argon'},
    {z:19,sym:'K',name:'Potassium'},{z:20,sym:'Ca',name:'Calcium'},
    {z:21,sym:'Sc',name:'Scandium'},{z:22,sym:'Ti',name:'Titanium'},
    {z:23,sym:'V',name:'Vanadium'},{z:24,sym:'Cr',name:'Chromium'},
    {z:25,sym:'Mn',name:'Manganese'},{z:26,sym:'Fe',name:'Iron'},
    {z:27,sym:'Co',name:'Cobalt'},{z:28,sym:'Ni',name:'Nickel'},
    {z:29,sym:'Cu',name:'Copper'},{z:30,sym:'Zn',name:'Zinc'},
    {z:31,sym:'Ga',name:'Gallium'},{z:32,sym:'Ge',name:'Germanium'},
    {z:33,sym:'As',name:'Arsenic'},{z:34,sym:'Se',name:'Selenium'},
    {z:35,sym:'Br',name:'Bromine'},{z:36,sym:'Kr',name:'Krypton'},
    {z:37,sym:'Rb',name:'Rubidium'},{z:38,sym:'Sr',name:'Strontium'},
    {z:39,sym:'Y',name:'Yttrium'},{z:40,sym:'Zr',name:'Zirconium'},
    {z:47,sym:'Ag',name:'Silver'},{z:50,sym:'Sn',name:'Tin'},
    {z:53,sym:'I',name:'Iodine'},{z:54,sym:'Xe',name:'Xenon'},
    {z:55,sym:'Cs',name:'Cesium'},{z:56,sym:'Ba',name:'Barium'},
    {z:79,sym:'Au',name:'Gold'},{z:80,sym:'Hg',name:'Mercury'},
    {z:82,sym:'Pb',name:'Lead'},{z:92,sym:'U',name:'Uranium'},
  ];
  
  // ── Impurity slot colors ──
  const SLOT_COLORS = ['#ff4d6d','#ffcc00','#a855f7','#ff8c42'];
  
  // ── State ──
  let baseZ       = 26; // Iron default — good demo element
  let impurities  = []; // [{z, conc, color}]
  let threshold   = 10;
  let analysed    = false;
  let threeScene  = null;
  let savedZoom   = null;
  
  // ── DOM ──
  const tooltip = document.getElementById('pur-tooltip');
  
  // ════════════════════════════════════════════════════════
  //  INIT
  // ════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
  
    populateSelects();
    updateBaseDisplay();
    addImpuritySlot(); // start with one empty slot
    drawD3();
  
    // Base element change
    document.getElementById('base-select').addEventListener('change', function() {
      baseZ = parseInt(this.value);
      updateBaseDisplay();
      if (analysed) runAnalysis();
      else drawD3();
    });
  
    // Add impurity
    document.getElementById('add-imp-btn').addEventListener('click', addImpuritySlot);
  
    // Threshold slider
    document.getElementById('thresh-range').addEventListener('input', function() {
      threshold = parseInt(this.value);
      document.getElementById('thresh-val').textContent = threshold + '%';
      if (analysed) runAnalysis();
      else drawD3();
    });
  
    // Analyse button
    document.getElementById('analyse-btn').addEventListener('click', runAnalysis);
  
    // Tabs
    document.querySelectorAll('.viz-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.viz-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.viz-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('tab-' + btn.dataset.tab);
        panel.classList.add('active');
        if (btn.dataset.tab === 'three')  initThree();
        if (btn.dataset.tab === 'plotly') drawPlotly();
      });
    });
  
    // Three.js controls
    document.getElementById('three-reset').addEventListener('click', () => {
      if (threeScene) threeScene.resetCamera();
    });
    document.getElementById('three-top').addEventListener('click', () => {
      if (threeScene) threeScene.topCamera();
    });
  
    // Resize
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { drawD3(); if (threeScene) threeScene.resize(); }, 200);
    });
  });
  
  // ════════════════════════════════════════════════════════
  //  POPULATE SELECTS
  // ════════════════════════════════════════════════════════
  function populateSelects() {
    const base = document.getElementById('base-select');
    EL_LIST.forEach(el => {
      const opt = document.createElement('option');
      opt.value = el.z;
      opt.textContent = `${el.z}. ${el.sym} — ${el.name}`;
      if (el.z === baseZ) opt.selected = true;
      base.appendChild(opt);
    });
  }
  
  function makeImpSelect(excludeZ) {
    const sel = document.createElement('select');
    sel.className = 'el-select';
    EL_LIST.forEach(el => {
      if (el.z === excludeZ) return;
      const opt = document.createElement('option');
      opt.value = el.z;
      opt.textContent = `${el.z}. ${el.sym} — ${el.name}`;
      sel.appendChild(opt);
    });
    return sel;
  }
  
  // ════════════════════════════════════════════════════════
  //  BASE DISPLAY
  // ════════════════════════════════════════════════════════
  function updateBaseDisplay() {
    const el = EL_LIST.find(e => e.z === baseZ) || EL_LIST[0];
    document.getElementById('base-sym').textContent  = el.sym;
    document.getElementById('base-name').textContent = el.name;
    document.getElementById('base-z').textContent    = `Z = ${el.z}`;
  }
  
  // ════════════════════════════════════════════════════════
  //  IMPURITY SLOTS
  // ════════════════════════════════════════════════════════
  function addImpuritySlot() {
    if (impurities.length >= 4) return;
    const idx   = impurities.length;
    const color = SLOT_COLORS[idx];
    const defaultZ = EL_LIST.find(e => e.z !== baseZ)?.z || 1;
    const imp   = { z: defaultZ, conc: 5, color };
    impurities.push(imp);
  
    const slot = document.createElement('div');
    slot.className = 'impurity-slot active';
    slot.style.setProperty('--slot-color', color);
    slot.dataset.idx = idx;
  
    const sel = makeImpSelect(baseZ);
    sel.value = defaultZ;
  
    slot.innerHTML = `
      <div class="slot-header">
        <div class="slot-dot"></div>
        <div class="slot-title">IMPURITY ${idx + 1}</div>
        <button class="slot-remove" data-idx="${idx}">✕</button>
      </div>`;
    slot.appendChild(sel);
    slot.innerHTML += `
      <div class="slot-conc-row">
        <label>CONC.</label>
        <input type="range" class="conc-range" min="0.1" max="30" step="0.1" value="${imp.conc}">
        <span class="slot-conc-val">${imp.conc}%</span>
      </div>`;
  
    const slotsEl = document.getElementById('impurity-slots');
    slotsEl.appendChild(slot);
  
    // Re-query after innerHTML (slot.querySelector works on the slot element)
    slot.querySelector('select').addEventListener('change', function() {
      imp.z = parseInt(this.value);
      if (analysed) runAnalysis(); else drawD3();
    });
    slot.querySelector('.conc-range').addEventListener('input', function() {
      imp.conc = parseFloat(this.value);
      slot.querySelector('.slot-conc-val').textContent = imp.conc.toFixed(1) + '%';
      if (analysed) runAnalysis(); else drawD3();
    });
    slot.querySelector('.slot-remove').addEventListener('click', function() {
      const i = parseInt(this.dataset.idx);
      removeImpuritySlot(i);
    });
  
    updateAddBtn();
    if (analysed) runAnalysis(); else drawD3();
  }
  
  function removeImpuritySlot(idx) {
    impurities.splice(idx, 1);
    rebuildSlots();
    if (analysed) runAnalysis(); else drawD3();
  }
  
  function rebuildSlots() {
    const wrap = document.getElementById('impurity-slots');
    wrap.innerHTML = '';
    const saved = [...impurities];
    impurities = [];
    saved.forEach((imp, idx) => {
      impurities.push(imp);
      const color = SLOT_COLORS[idx];
      imp.color   = color;
      const slot  = document.createElement('div');
      slot.className = 'impurity-slot active';
      slot.style.setProperty('--slot-color', color);
      slot.dataset.idx = idx;
  
      const sel = makeImpSelect(baseZ);
      sel.value = imp.z;
  
      slot.innerHTML = `
        <div class="slot-header">
          <div class="slot-dot"></div>
          <div class="slot-title">IMPURITY ${idx + 1}</div>
          <button class="slot-remove" data-idx="${idx}">✕</button>
        </div>`;
      slot.appendChild(sel);
      slot.innerHTML += `
        <div class="slot-conc-row">
          <label>CONC.</label>
          <input type="range" class="conc-range" min="0.1" max="30" step="0.1" value="${imp.conc}">
          <span class="slot-conc-val">${imp.conc.toFixed(1)}%</span>
        </div>`;
      wrap.appendChild(slot);
  
      slot.querySelector('select').addEventListener('change', function() {
        imp.z = parseInt(this.value);
        if (analysed) runAnalysis(); else drawD3();
      });
      slot.querySelector('.conc-range').addEventListener('input', function() {
        imp.conc = parseFloat(this.value);
        slot.querySelector('.slot-conc-val').textContent = imp.conc.toFixed(1) + '%';
        if (analysed) runAnalysis(); else drawD3();
      });
      slot.querySelector('.slot-remove').addEventListener('click', function() {
        removeImpuritySlot(parseInt(this.dataset.idx));
      });
    });
    updateAddBtn();
  }
  
  function updateAddBtn() {
    const btn = document.getElementById('add-imp-btn');
    btn.disabled = impurities.length >= 4;
    btn.textContent = impurities.length >= 4 ? 'MAX 4 IMPURITIES' : '+ ADD IMPURITY';
  }
  
  // ════════════════════════════════════════════════════════
  //  RUN ANALYSIS
  // ════════════════════════════════════════════════════════
  function runAnalysis() {
    analysed = true;
    savedZoom = null;
    drawD3();
    updatePurityScore();
    updateLineTable();
    updateReport();
    if (document.getElementById('tab-three').classList.contains('active')) initThree();
    if (document.getElementById('tab-plotly').classList.contains('active')) drawPlotly();
  }
  
  function totalImpConc() {
    return impurities.reduce((s, i) => s + i.conc, 0);
  }
  
  function purityPct() {
    return Math.max(0, 100 - totalImpConc());
  }
  
  // ════════════════════════════════════════════════════════
  //  PURITY SCORE UI
  // ════════════════════════════════════════════════════════
  function updatePurityScore() {
    const pct  = purityPct();
    const base = EL_LIST.find(e => e.z === baseZ);
  
    document.getElementById('purity-number').textContent = pct.toFixed(1) + '%';
    document.getElementById('purity-fill').style.width   = pct + '%';
  
    const bd = document.getElementById('purity-breakdown');
    bd.innerHTML = '';
  
    // Base row
    const baseRow = document.createElement('div');
    baseRow.className = 'pb-row';
    baseRow.innerHTML = `
      <div class="pb-dot" style="background:var(--glow-cyan)"></div>
      <div class="pb-name">${base.sym} — ${base.name}</div>
      <div class="pb-pct">${pct.toFixed(1)}%</div>
      <div class="pb-bar-wrap"><div class="pb-bar" style="width:${pct}%;background:var(--glow-cyan)"></div></div>`;
    bd.appendChild(baseRow);
  
    // Impurity rows
    impurities.forEach(imp => {
      const el = EL_LIST.find(e => e.z === imp.z);
      if (!el) return;
      const row = document.createElement('div');
      row.className = 'pb-row';
      row.innerHTML = `
        <div class="pb-dot" style="background:${imp.color}"></div>
        <div class="pb-name">${el.sym} — ${el.name}</div>
        <div class="pb-pct">${imp.conc.toFixed(1)}%</div>
        <div class="pb-bar-wrap"><div class="pb-bar" style="width:${Math.min(100,imp.conc/30*100)}%;background:${imp.color}"></div></div>`;
      bd.appendChild(row);
    });
  }
  
  function updateReport() {
    const baseLines = generateSpectralLines(baseZ);
    const detectedLines = baseLines.filter(l => l.int > threshold).length
      + impurities.reduce((s, imp) => {
          const ls = generateSpectralLines(imp.z);
          return s + ls.filter(l => (l.int * imp.conc / 100) > threshold).length;
        }, 0);
  
    document.getElementById('rep-lines').textContent  = detectedLines;
    document.getElementById('rep-imps').textContent   = impurities.length;
    const pct = purityPct();
    const statusEl = document.getElementById('rep-status');
    if (pct >= 99) { statusEl.textContent = 'HIGH PURITY'; statusEl.style.color = 'var(--glow-teal)'; }
    else if (pct >= 95) { statusEl.textContent = 'ACCEPTABLE'; statusEl.style.color = '#ffcc44'; }
    else { statusEl.textContent = 'CONTAMINATED'; statusEl.style.color = '#ff4d6d'; }
  }
  
  // ════════════════════════════════════════════════════════
  //  LINE IDENTIFICATION TABLE
  // ════════════════════════════════════════════════════════
  function updateLineTable() {
    const tbody = document.getElementById('line-table-body');
    tbody.innerHTML = '';
  
    const base    = EL_LIST.find(e => e.z === baseZ);
    const allRows = [];
  
    // Base lines
    generateSpectralLines(baseZ).forEach(l => {
      allRows.push({ ...l, elSym: base.sym, elName: base.name, color: 'var(--glow-cyan)', isBase: true });
    });
  
    // Impurity lines — scale intensity by concentration
    impurities.forEach(imp => {
      const el = EL_LIST.find(e => e.z === imp.z);
      if (!el) return;
      generateSpectralLines(imp.z).forEach(l => {
        const scaledInt = l.int * imp.conc / 100;
        allRows.push({ ...l, int: scaledInt, elSym: el.sym, elName: el.name, color: imp.color, isBase: false });
      });
    });
  
    allRows.sort((a, b) => a.wl - b.wl);
  
    document.getElementById('line-table-sub').textContent =
      `${allRows.length} lines · ${allRows.filter(r => r.int > threshold).length} detected above threshold`;
  
    allRows.forEach(row => {
      const detected = row.int > threshold;
      const wlColor  = wavelengthToRGB(row.wl);
      const region   = spectralRegion(row.wl);
      const tr = document.createElement('tr');
      tr.style.opacity = detected ? '1' : '0.3';
      tr.innerHTML = `
        <td style="padding:5px 12px 5px 0;color:${row.color};font-weight:${row.isBase?'700':'400'}">${row.wl.toFixed(1)}</td>
        <td style="padding:5px 12px 5px 0">
          <span style="display:inline-block;width:14px;height:14px;border-radius:2px;
            background:${wlColor};box-shadow:0 0 5px ${wlColor};vertical-align:middle"></span>
        </td>
        <td style="padding:5px 12px 5px 0">
          <span style="color:${row.color}">${row.elSym}</span>
          <span style="color:var(--text-dim);font-size:0.58rem"> ${row.elName}</span>
        </td>
        <td style="padding:5px 12px 5px 0">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:${Math.min(60,row.int)}px;height:3px;background:${row.color};border-radius:2px"></div>
            ${row.int.toFixed(1)}%
          </div>
        </td>
        <td style="padding:5px 12px 5px 0">
          <span style="font-size:0.58rem;padding:1px 6px;border-radius:2px;
            ${detected
              ? 'background:rgba(0,255,160,0.1);border:1px solid rgba(0,255,160,0.25);color:#00ffa0'
              : 'background:rgba(255,80,80,0.08);border:1px solid rgba(255,80,80,0.2);color:#ff6666'}">
            ${detected ? 'YES' : 'NO'}
          </span>
        </td>
        <td style="padding:5px 12px 5px 0">
          <span style="font-size:0.58rem;padding:1px 5px;border-radius:2px;
            ${region==='UV'?'background:rgba(180,60,255,0.1);color:#cc88ff':
              region==='Visible'?'background:rgba(0,200,100,0.1);color:#80ffcc':
              'background:rgba(255,80,0,0.1);color:#ff9966'}">${region}</span>
        </td>
        <td style="padding:5px 0;color:var(--text-dim);font-size:0.6rem">${row.note||row.series||''}</td>`;
      tbody.appendChild(tr);
    });
  }
  
  // ════════════════════════════════════════════════════════
  //  TAB 1 — D3 OVERLAY SPECTRUM
  // ════════════════════════════════════════════════════════
  function drawD3() {
    const container = document.getElementById('d3-chart');
    if (!container) return;
    d3.select(container).selectAll('*').remove();
  
    const W  = container.clientWidth || 800;
    const H  = 280;
    const m  = { top: 20, right: 24, bottom: 48, left: 58 };
    const iW = W - m.left - m.right;
    const iH = H - m.top  - m.bottom;
  
    const svg = d3.select(container).append('svg')
      .attr('width', '100%').attr('height', H).style('display', 'block');
  
    svg.append('defs').append('clipPath').attr('id', 'pur-clip')
      .append('rect').attr('width', iW).attr('height', iH + 10).attr('y', -5);
  
    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);
  
    const xBase  = d3.scaleLinear().domain([200, 1000]).range([0, iW]);
    const yScale = d3.scaleLinear().domain([0, 115]).range([iH, 0]);
    let   xScale = savedZoom ? savedZoom.rescaleX(xBase) : xBase.copy();
  
    const xAxisG = g.append('g').attr('transform', `translate(0,${iH})`);
    const yAxisG = g.append('g');
  
    function styleAx(ax) {
      ax.selectAll('text').style('fill','#3e6e88').style('font-family','Share Tech Mono,monospace').style('font-size','10px');
      ax.selectAll('line,path').style('stroke','rgba(0,200,255,0.1)');
    }
    function updateAxes(xs) {
      xAxisG.call(d3.axisBottom(xs).ticks(10).tickFormat(d => d + ' nm'));
      yAxisG.call(d3.axisLeft(yScale).ticks(5).tickFormat(d => d + '%'));
      styleAx(xAxisG); styleAx(yAxisG);
    }
    updateAxes(xScale);
  
    g.append('text').attr('x', iW/2).attr('y', iH+40)
      .attr('text-anchor','middle').attr('fill','#3e6e88')
      .attr('font-family','Share Tech Mono,monospace').attr('font-size','10px').attr('letter-spacing','0.14em')
      .text('WAVELENGTH (nm)');
    g.append('text').attr('transform','rotate(-90)').attr('x',-iH/2).attr('y',-44)
      .attr('text-anchor','middle').attr('fill','#3e6e88')
      .attr('font-family','Share Tech Mono,monospace').attr('font-size','10px').attr('letter-spacing','0.14em')
      .text('INTENSITY (%)');
  
    // Gridlines
    g.append('g').attr('clip-path','url(#pur-clip)')
      .selectAll('line').data(yScale.ticks(5)).join('line')
      .attr('x1',0).attr('x2',iW).attr('y1',d=>yScale(d)).attr('y2',d=>yScale(d))
      .attr('stroke','rgba(0,200,255,0.04)');
  
    // Region bands
    const bandG = g.append('g').attr('clip-path','url(#pur-clip)');
    function drawBands(xs) {
      bandG.selectAll('*').remove();
      [{x1:200,x2:400,fill:'rgba(160,40,255,0.06)'},{x1:400,x2:700,fill:'rgba(255,255,255,0.02)'},{x1:700,x2:1000,fill:'rgba(255,70,0,0.06)'}]
      .forEach(r => {
        const p1=xs(r.x1),p2=xs(r.x2);
        if(p2<0||p1>iW) return;
        bandG.append('rect').attr('x',Math.max(0,p1)).attr('y',0)
          .attr('width',Math.min(iW,p2)-Math.max(0,p1)).attr('height',iH).attr('fill',r.fill);
      });
    }
    drawBands(xScale);
  
    // Detection threshold line
    const threshG = g.append('g').attr('clip-path','url(#pur-clip)');
    function drawThreshold(xs) {
      threshG.selectAll('*').remove();
      const ty = yScale(threshold);
      threshG.append('line').attr('x1',0).attr('x2',iW).attr('y1',ty).attr('y2',ty)
        .attr('stroke','#ffcc44').attr('stroke-width',1).attr('stroke-dasharray','6 4').attr('opacity',0.7);
      threshG.append('text').attr('x',4).attr('y',ty-4)
        .attr('fill','#ffcc44').attr('font-family','Share Tech Mono,monospace').attr('font-size','9px')
        .text('detection limit');
    }
    drawThreshold(xScale);
  
    // Lines group
    const linesG = g.append('g').attr('clip-path','url(#pur-clip)');
  
    function drawAllLines(xs) {
      linesG.selectAll('*').remove();
  
      // Base element lines
      const baseLines = generateSpectralLines(baseZ);
      baseLines.forEach(line => {
        const x       = xs(line.wl);
        if (x < -8 || x > iW + 8) return;
        const col     = wavelengthToRGB(line.wl);
        const detected = line.int > threshold;
        const alpha   = detected ? 0.9 : 0.25;
  
        linesG.append('line').attr('x1',x).attr('x2',x).attr('y1',yScale(line.int)).attr('y2',iH)
          .attr('stroke','var(--glow-cyan)').attr('stroke-width',1.5).attr('opacity',alpha);
        const dot = linesG.append('circle').attr('cx',x).attr('cy',yScale(line.int)).attr('r',3)
          .attr('fill',col).attr('opacity',alpha).attr('cursor','crosshair');
  
        linesG.append('rect').attr('x',x-6).attr('y',0).attr('width',12).attr('height',iH)
          .attr('fill','transparent').attr('cursor','crosshair')
          .on('mouseenter', ev => {
            dot.attr('r',6);
            showTip(ev, line, 'var(--glow-cyan)', 'Base element', null);
          })
          .on('mousemove', moveTip)
          .on('mouseleave', () => { dot.attr('r',3); hideTip(); });
      });
  
      // Impurity lines — intensity scaled by concentration
      impurities.forEach(imp => {
        const impLines = generateSpectralLines(imp.z);
        const el       = EL_LIST.find(e => e.z === imp.z);
        impLines.forEach(line => {
          const scaledInt = line.int * imp.conc / 100;
          const x         = xs(line.wl);
          if (x < -8 || x > iW + 8) return;
          const detected   = scaledInt > threshold;
          const alpha      = detected ? 0.85 : 0.2;
  
          // Offset slightly so they don't perfectly overlap base lines
          const ox = x + 2;
          linesG.append('line').attr('x1',ox).attr('x2',ox)
            .attr('y1',yScale(Math.min(scaledInt,110))).attr('y2',iH)
            .attr('stroke',imp.color).attr('stroke-width',1.5)
            .attr('stroke-dasharray', detected ? null : '3 2')
            .attr('opacity',alpha);
          const dot2 = linesG.append('circle').attr('cx',ox).attr('cy',yScale(Math.min(scaledInt,110))).attr('r',3)
            .attr('fill',imp.color).attr('opacity',alpha).attr('cursor','crosshair');
  
          linesG.append('rect').attr('x',ox-6).attr('y',0).attr('width',12).attr('height',iH)
            .attr('fill','transparent').attr('cursor','crosshair')
            .on('mouseenter', ev => {
              dot2.attr('r',6);
              showTip(ev, {...line, int: scaledInt}, imp.color, `Impurity: ${el?.sym}`, imp.conc);
            })
            .on('mousemove', moveTip)
            .on('mouseleave', () => { dot2.attr('r',3); hideTip(); });
        });
      });
    }
    drawAllLines(xScale);
  
    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([1, 50])
      .translateExtent([[0,0],[iW,iH]])
      .extent([[0,0],[iW,iH]])
      .on('zoom', ev => {
        savedZoom = ev.transform;
        xScale = ev.transform.rescaleX(xBase);
        updateAxes(xScale); drawBands(xScale); drawThreshold(xScale); drawAllLines(xScale);
      });
    svg.call(zoom);
    if (savedZoom) svg.call(zoom.transform, savedZoom);
  }
  
  // ════════════════════════════════════════════════════════
  //  TAB 2 — THREE.JS 3D WATERFALL
  // ════════════════════════════════════════════════════════
  function initThree() {
    const canvas = document.getElementById('three-mount');
    if (!canvas || !window.THREE) return;
  
    // Clean up old scene
    if (threeScene) { threeScene.dispose(); threeScene = null; }
  
    const W = canvas.clientWidth  || 800;
    const H = canvas.clientHeight || 400;
  
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
  
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    camera.position.set(0, 6, 14);
    camera.lookAt(0, 0, 0);
  
    // Soft ambient + directional light
    scene.add(new THREE.AmbientLight(0x223344, 2));
    const dLight = new THREE.DirectionalLight(0x00c8ff, 1);
    dLight.position.set(5, 10, 5);
    scene.add(dLight);
  
    // Grid floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x0a2030, 0x0a2030);
    scene.add(gridHelper);
  
    // Build waterfall surfaces
    buildWaterfall(scene);
  
    // Axes labels as sprites
    addAxisLabels(scene);
  
    // ── Orbit controls (manual, no import needed) ──
    let isDragging = false, prevMouse = {x:0,y:0};
    let spherical  = { theta: 0.3, phi: 0.9, radius: 14 };
  
    canvas.addEventListener('mousedown', e => { isDragging = true; prevMouse = {x:e.clientX, y:e.clientY}; });
    canvas.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      spherical.theta -= dx * 0.008;
      spherical.phi    = Math.max(0.1, Math.min(Math.PI/2 - 0.05, spherical.phi + dy * 0.008));
      prevMouse = {x: e.clientX, y: e.clientY};
      updateCamera();
    });
    canvas.addEventListener('mouseup',   () => isDragging = false);
    canvas.addEventListener('mouseleave',() => isDragging = false);
    canvas.addEventListener('wheel', e => {
      spherical.radius = Math.max(6, Math.min(30, spherical.radius + e.deltaY * 0.02));
      updateCamera();
    });
  
    function updateCamera() {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 1, 0);
    }
  
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  
    threeScene = {
      resetCamera() { spherical = {theta:0.3,phi:0.9,radius:14}; updateCamera(); },
      topCamera()   { spherical = {theta:0,  phi:0.15,radius:16}; updateCamera(); },
      resize() {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      },
      dispose() {
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }
  
  function buildWaterfall(scene) {
    // X axis: wavelength 200-1000nm mapped to -8..8
    // Y axis: intensity 0-100 mapped to 0..4
    // Z axis: concentration 0-30% mapped to -4..4
    // Each impurity gets its own surface at its concentration Z position
  
    const wlMin = 200, wlMax = 1000;
    const xMap  = wl  => ((wl - wlMin) / (wlMax - wlMin)) * 16 - 8;
    const yMap  = int => (int / 100) * 4;
    const zMap  = conc => (conc / 30) * 8 - 4;
  
    // Base element surface (flat at z=0)
    const baseLines = generateSpectralLines(baseZ);
    drawLineSurface(scene, baseLines, 0x00c8ff, 0, xMap, yMap);
  
    // Each impurity surface at its concentration Z
    impurities.forEach((imp, i) => {
      const lines = generateSpectralLines(imp.z);
      const scaledLines = lines.map(l => ({...l, int: l.int * imp.conc / 100}));
      const col = parseInt(SLOT_COLORS[i].replace('#',''), 16);
      drawLineSurface(scene, scaledLines, col, zMap(imp.conc), xMap, yMap);
    });
  
    // Floor plane
    const floorGeo = new THREE.PlaneGeometry(16, 8);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x020a14, transparent: true, opacity: 0.6, side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
  }
  
  function drawLineSurface(scene, lines, colorHex, zPos, xMap, yMap) {
    const color = new THREE.Color(colorHex);
  
    lines.forEach(line => {
      const x  = xMap(line.wl);
      const yT = yMap(Math.min(line.int, 100));
      if (yT < 0.02) return;
  
      // Vertical line (spike)
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0,  zPos),
        new THREE.Vector3(x, yT, zPos),
      ]);
      const mat = new THREE.LineBasicMaterial({ color, opacity: 0.9, transparent: true });
      scene.add(new THREE.Line(geo, mat));
  
      // Glow sphere at top
      const sphereGeo = new THREE.SphereGeometry(0.06, 6, 6);
      const sphereMat = new THREE.MeshBasicMaterial({ color });
      const sphere    = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(x, yT, zPos);
      scene.add(sphere);
    });
  
    // Baseline at z
    const baseGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, 0, zPos),
      new THREE.Vector3(8,  0, zPos),
    ]);
    const baseMat = new THREE.LineBasicMaterial({ color, opacity: 0.2, transparent: true });
    scene.add(new THREE.Line(baseGeo, baseMat));
  }
  
  function addAxisLabels(scene) {
    // Simple axis lines
    const axMat = new THREE.LineBasicMaterial({ color: 0x1a3a4a });
  
    // X axis (wavelength)
    const xGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, 0, 0), new THREE.Vector3(8, 0, 0)
    ]);
    scene.add(new THREE.Line(xGeo, axMat));
  
    // Y axis (intensity)
    const yGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, 0, 0), new THREE.Vector3(-8, 4, 0)
    ]);
    scene.add(new THREE.Line(yGeo, axMat));
  
    // Z axis (concentration)
    const zGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, 0, -4), new THREE.Vector3(-8, 0, 4)
    ]);
    scene.add(new THREE.Line(zGeo, axMat));
  }
  
  // ════════════════════════════════════════════════════════
  //  TAB 3 — PLOTLY COMPOSITION ANALYSIS
  // ════════════════════════════════════════════════════════
  function drawPlotly() {
    drawPlotlyHeatmap();
    drawPlotlyBar();
  }
  
  function drawPlotlyHeatmap() {
    const el = document.getElementById('plotly-heatmap');
    if (!el || !window.Plotly) return;
  
    // Build heatmap: rows = elements, cols = wavelength bins
    const elements  = [
      { z: baseZ, color: '#00c8ff', label: EL_LIST.find(e=>e.z===baseZ)?.sym || '?' },
      ...impurities.map(i => ({ z: i.z, color: i.color, label: EL_LIST.find(e=>e.z===i.z)?.sym || '?' }))
    ];
  
    const wlBins  = [];
    for (let w = 200; w <= 1000; w += 10) wlBins.push(w);
  
    const zData = elements.map(elem => {
      const lines = generateSpectralLines(elem.z);
      const imp   = impurities.find(i => i.z === elem.z);
      const scale = imp ? imp.conc / 100 : 1;
      return wlBins.map(bin => {
        const match = lines.find(l => Math.abs(l.wl - bin) < 5);
        return match ? (match.int * scale) : 0;
      });
    });
  
    Plotly.newPlot(el, [{
      type: 'heatmap',
      x: wlBins,
      y: elements.map(e => e.label),
      z: zData,
      colorscale: [
        [0,    'rgb(2,10,18)'],
        [0.2,  'rgb(0,40,80)'],
        [0.5,  'rgb(0,100,160)'],
        [0.8,  'rgb(0,180,220)'],
        [1.0,  'rgb(0,255,208)'],
      ],
      showscale: true,
      hoverongaps: false,
      colorbar: {
        tickfont: { family: 'Share Tech Mono', size: 10, color: '#3e6e88' },
        title: { text: 'Intensity', font: { family: 'Share Tech Mono', size: 10, color: '#3e6e88' } },
      }
    }], {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor:  'rgba(12,30,46,0.8)',
      margin: { l: 50, r: 20, t: 30, b: 50 },
      font:   { family: 'Share Tech Mono', size: 10, color: '#3e6e88' },
      xaxis: {
        title: { text: 'Wavelength (nm)', font: { color: '#3e6e88', size: 10 } },
        tickfont: { color: '#3e6e88' }, gridcolor: 'rgba(0,200,255,0.05)',
        zerolinecolor: 'rgba(0,200,255,0.1)',
      },
      yaxis: {
        tickfont: { color: '#7aa8c0', size: 11 },
        gridcolor: 'rgba(0,200,255,0.05)',
      },
      title: { text: 'Spectral Intensity Heatmap', font: { family:'Rajdhani', size:13, color:'#00c8ff' }, x: 0.02 }
    }, { responsive: true, displayModeBar: false });
  }
  
  function drawPlotlyBar() {
    const el = document.getElementById('plotly-bar');
    if (!el || !window.Plotly) return;
  
    const pct  = purityPct();
    const base = EL_LIST.find(e => e.z === baseZ);
    const labels = [base.sym];
    const values = [pct];
    const colors = ['#00c8ff'];
    const texts  = [`${base.name}<br>${pct.toFixed(2)}%`];
  
    impurities.forEach(imp => {
      const impEl = EL_LIST.find(e => e.z === imp.z);
      labels.push(impEl?.sym || '?');
      values.push(imp.conc);
      colors.push(imp.color);
      texts.push(`${impEl?.name || '?'}<br>${imp.conc.toFixed(2)}%`);
    });
  
    Plotly.newPlot(el, [{
      type: 'bar',
      x: labels,
      y: values,
      text: values.map(v => v.toFixed(2) + '%'),
      textposition: 'outside',
      marker: {
        color: colors,
        opacity: 0.85,
        line: { color: colors.map(c => c), width: 1 }
      },
      hovertext: texts,
      hoverinfo: 'text',
    }], {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor:  'rgba(12,30,46,0.8)',
      margin: { l: 50, r: 20, t: 40, b: 50 },
      font:   { family: 'Share Tech Mono', size: 10, color: '#3e6e88' },
      xaxis: {
        tickfont: { color: '#7aa8c0', size: 11 },
        gridcolor: 'rgba(0,200,255,0.05)',
      },
      yaxis: {
        title: { text: 'Concentration (%)', font: { color: '#3e6e88', size: 10 } },
        tickfont: { color: '#3e6e88' },
        gridcolor: 'rgba(0,200,255,0.05)',
        range: [0, Math.max(...values) * 1.3],
      },
      title: { text: 'Sample Composition', font: { family:'Rajdhani', size:13, color:'#00c8ff' }, x: 0.02 },
      bargap: 0.3,
    }, { responsive: true, displayModeBar: false });
  }
  
  // ════════════════════════════════════════════════════════
  //  TOOLTIP
  // ════════════════════════════════════════════════════════
  function showTip(ev, line, color, label, conc) {
    const freq   = (299792.458 / line.wl * 1000).toFixed(2);
    const energy = (1239.84 / line.wl).toFixed(4);
    tooltip.innerHTML = `
      <div style="font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:${color}">${line.wl.toFixed(1)} nm</div>
      <div style="color:#3e6e88;font-size:0.6rem;margin-bottom:4px">${label}</div>
      <div><span style="color:#3e6e88">Region: </span>${spectralRegion(line.wl)}</div>
      <div><span style="color:#3e6e88">Freq: </span>${freq} THz</div>
      <div><span style="color:#3e6e88">Energy: </span>${energy} eV</div>
      <div><span style="color:#3e6e88">Intensity: </span>${line.int.toFixed(1)}%</div>
      ${conc !== null ? `<div><span style="color:#3e6e88">Concentration: </span>${conc}%</div>` : ''}
      ${line.note ? `<div style="color:#7aa8c0;font-size:0.6rem;margin-top:4px">${line.note}</div>` : ''}`;
    tooltip.style.display = 'block';
    moveTip(ev);
  }
  function moveTip(ev) {
    let x = ev.clientX + 16, y = ev.clientY - 10;
    if (x + 200 > window.innerWidth)  x = ev.clientX - 215;
    if (y + 180 > window.innerHeight) y = ev.clientY - 190;
    tooltip.style.left = x + 'px'; tooltip.style.top = y + 'px';
  }
  function hideTip() { tooltip.style.display = 'none'; }