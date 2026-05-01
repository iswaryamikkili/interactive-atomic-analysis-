// ═══════════════════════════════════════════════════════
//  SPECTRAL VIEWER — Fully self-contained
//  Depends only on: D3 v7 (CDN) + spectral-data.js
// ═══════════════════════════════════════════════════════

const ELEMENTS_LIGHT = [
  {z:1,sym:'H',name:'Hydrogen',mass:'1.008',cat:'reactive-nonmetal',period:1},
  {z:2,sym:'He',name:'Helium',mass:'4.003',cat:'noble-gas',period:1},
  {z:3,sym:'Li',name:'Lithium',mass:'6.941',cat:'alkali-metal',period:2},
  {z:4,sym:'Be',name:'Beryllium',mass:'9.012',cat:'alkaline-earth',period:2},
  {z:5,sym:'B',name:'Boron',mass:'10.811',cat:'metalloid',period:2},
  {z:6,sym:'C',name:'Carbon',mass:'12.011',cat:'reactive-nonmetal',period:2},
  {z:7,sym:'N',name:'Nitrogen',mass:'14.007',cat:'reactive-nonmetal',period:2},
  {z:8,sym:'O',name:'Oxygen',mass:'15.999',cat:'reactive-nonmetal',period:2},
  {z:9,sym:'F',name:'Fluorine',mass:'18.998',cat:'halogen',period:2},
  {z:10,sym:'Ne',name:'Neon',mass:'20.180',cat:'noble-gas',period:2},
  {z:11,sym:'Na',name:'Sodium',mass:'22.990',cat:'alkali-metal',period:3},
  {z:12,sym:'Mg',name:'Magnesium',mass:'24.305',cat:'alkaline-earth',period:3},
  {z:13,sym:'Al',name:'Aluminium',mass:'26.982',cat:'post-transition',period:3},
  {z:14,sym:'Si',name:'Silicon',mass:'28.086',cat:'metalloid',period:3},
  {z:15,sym:'P',name:'Phosphorus',mass:'30.974',cat:'reactive-nonmetal',period:3},
  {z:16,sym:'S',name:'Sulfur',mass:'32.065',cat:'reactive-nonmetal',period:3},
  {z:17,sym:'Cl',name:'Chlorine',mass:'35.453',cat:'halogen',period:3},
  {z:18,sym:'Ar',name:'Argon',mass:'39.948',cat:'noble-gas',period:3},
  {z:19,sym:'K',name:'Potassium',mass:'39.098',cat:'alkali-metal',period:4},
  {z:20,sym:'Ca',name:'Calcium',mass:'40.078',cat:'alkaline-earth',period:4},
  {z:21,sym:'Sc',name:'Scandium',mass:'44.956',cat:'transition-metal',period:4},
  {z:22,sym:'Ti',name:'Titanium',mass:'47.867',cat:'transition-metal',period:4},
  {z:23,sym:'V',name:'Vanadium',mass:'50.942',cat:'transition-metal',period:4},
  {z:24,sym:'Cr',name:'Chromium',mass:'51.996',cat:'transition-metal',period:4},
  {z:25,sym:'Mn',name:'Manganese',mass:'54.938',cat:'transition-metal',period:4},
  {z:26,sym:'Fe',name:'Iron',mass:'55.845',cat:'transition-metal',period:4},
  {z:27,sym:'Co',name:'Cobalt',mass:'58.933',cat:'transition-metal',period:4},
  {z:28,sym:'Ni',name:'Nickel',mass:'58.693',cat:'transition-metal',period:4},
  {z:29,sym:'Cu',name:'Copper',mass:'63.546',cat:'transition-metal',period:4},
  {z:30,sym:'Zn',name:'Zinc',mass:'65.38',cat:'transition-metal',period:4},
  {z:31,sym:'Ga',name:'Gallium',mass:'69.723',cat:'post-transition',period:4},
  {z:32,sym:'Ge',name:'Germanium',mass:'72.630',cat:'metalloid',period:4},
  {z:33,sym:'As',name:'Arsenic',mass:'74.922',cat:'metalloid',period:4},
  {z:34,sym:'Se',name:'Selenium',mass:'78.971',cat:'reactive-nonmetal',period:4},
  {z:35,sym:'Br',name:'Bromine',mass:'79.904',cat:'halogen',period:4},
  {z:36,sym:'Kr',name:'Krypton',mass:'83.798',cat:'noble-gas',period:4},
  {z:37,sym:'Rb',name:'Rubidium',mass:'85.468',cat:'alkali-metal',period:5},
  {z:38,sym:'Sr',name:'Strontium',mass:'87.62',cat:'alkaline-earth',period:5},
  {z:39,sym:'Y',name:'Yttrium',mass:'88.906',cat:'transition-metal',period:5},
  {z:40,sym:'Zr',name:'Zirconium',mass:'91.224',cat:'transition-metal',period:5},
  {z:41,sym:'Nb',name:'Niobium',mass:'92.906',cat:'transition-metal',period:5},
  {z:42,sym:'Mo',name:'Molybdenum',mass:'95.96',cat:'transition-metal',period:5},
  {z:43,sym:'Tc',name:'Technetium',mass:'(98)',cat:'transition-metal',period:5},
  {z:44,sym:'Ru',name:'Ruthenium',mass:'101.07',cat:'transition-metal',period:5},
  {z:45,sym:'Rh',name:'Rhodium',mass:'102.906',cat:'transition-metal',period:5},
  {z:46,sym:'Pd',name:'Palladium',mass:'106.42',cat:'transition-metal',period:5},
  {z:47,sym:'Ag',name:'Silver',mass:'107.868',cat:'transition-metal',period:5},
  {z:48,sym:'Cd',name:'Cadmium',mass:'112.411',cat:'transition-metal',period:5},
  {z:49,sym:'In',name:'Indium',mass:'114.818',cat:'post-transition',period:5},
  {z:50,sym:'Sn',name:'Tin',mass:'118.710',cat:'post-transition',period:5},
  {z:51,sym:'Sb',name:'Antimony',mass:'121.760',cat:'metalloid',period:5},
  {z:52,sym:'Te',name:'Tellurium',mass:'127.60',cat:'metalloid',period:5},
  {z:53,sym:'I',name:'Iodine',mass:'126.904',cat:'halogen',period:5},
  {z:54,sym:'Xe',name:'Xenon',mass:'131.293',cat:'noble-gas',period:5},
  {z:55,sym:'Cs',name:'Cesium',mass:'132.905',cat:'alkali-metal',period:6},
  {z:56,sym:'Ba',name:'Barium',mass:'137.327',cat:'alkaline-earth',period:6},
  {z:57,sym:'La',name:'Lanthanum',mass:'138.905',cat:'lanthanide',period:6},
  {z:58,sym:'Ce',name:'Cerium',mass:'140.116',cat:'lanthanide',period:6},
  {z:59,sym:'Pr',name:'Praseodymium',mass:'140.908',cat:'lanthanide',period:6},
  {z:60,sym:'Nd',name:'Neodymium',mass:'144.242',cat:'lanthanide',period:6},
  {z:61,sym:'Pm',name:'Promethium',mass:'(145)',cat:'lanthanide',period:6},
  {z:62,sym:'Sm',name:'Samarium',mass:'150.36',cat:'lanthanide',period:6},
  {z:63,sym:'Eu',name:'Europium',mass:'151.964',cat:'lanthanide',period:6},
  {z:64,sym:'Gd',name:'Gadolinium',mass:'157.25',cat:'lanthanide',period:6},
  {z:65,sym:'Tb',name:'Terbium',mass:'158.925',cat:'lanthanide',period:6},
  {z:66,sym:'Dy',name:'Dysprosium',mass:'162.500',cat:'lanthanide',period:6},
  {z:67,sym:'Ho',name:'Holmium',mass:'164.930',cat:'lanthanide',period:6},
  {z:68,sym:'Er',name:'Erbium',mass:'167.259',cat:'lanthanide',period:6},
  {z:69,sym:'Tm',name:'Thulium',mass:'168.934',cat:'lanthanide',period:6},
  {z:70,sym:'Yb',name:'Ytterbium',mass:'173.045',cat:'lanthanide',period:6},
  {z:71,sym:'Lu',name:'Lutetium',mass:'174.967',cat:'lanthanide',period:6},
  {z:72,sym:'Hf',name:'Hafnium',mass:'178.49',cat:'transition-metal',period:6},
  {z:73,sym:'Ta',name:'Tantalum',mass:'180.948',cat:'transition-metal',period:6},
  {z:74,sym:'W',name:'Tungsten',mass:'183.84',cat:'transition-metal',period:6},
  {z:75,sym:'Re',name:'Rhenium',mass:'186.207',cat:'transition-metal',period:6},
  {z:76,sym:'Os',name:'Osmium',mass:'190.23',cat:'transition-metal',period:6},
  {z:77,sym:'Ir',name:'Iridium',mass:'192.217',cat:'transition-metal',period:6},
  {z:78,sym:'Pt',name:'Platinum',mass:'195.084',cat:'transition-metal',period:6},
  {z:79,sym:'Au',name:'Gold',mass:'196.967',cat:'transition-metal',period:6},
  {z:80,sym:'Hg',name:'Mercury',mass:'200.592',cat:'transition-metal',period:6},
  {z:81,sym:'Tl',name:'Thallium',mass:'204.383',cat:'post-transition',period:6},
  {z:82,sym:'Pb',name:'Lead',mass:'207.2',cat:'post-transition',period:6},
  {z:83,sym:'Bi',name:'Bismuth',mass:'208.980',cat:'post-transition',period:6},
  {z:84,sym:'Po',name:'Polonium',mass:'(209)',cat:'post-transition',period:6},
  {z:85,sym:'At',name:'Astatine',mass:'(210)',cat:'halogen',period:6},
  {z:86,sym:'Rn',name:'Radon',mass:'(222)',cat:'noble-gas',period:6},
  {z:87,sym:'Fr',name:'Francium',mass:'(223)',cat:'alkali-metal',period:7},
  {z:88,sym:'Ra',name:'Radium',mass:'(226)',cat:'alkaline-earth',period:7},
  {z:89,sym:'Ac',name:'Actinium',mass:'(227)',cat:'actinide',period:7},
  {z:90,sym:'Th',name:'Thorium',mass:'232.038',cat:'actinide',period:7},
  {z:91,sym:'Pa',name:'Protactinium',mass:'231.036',cat:'actinide',period:7},
  {z:92,sym:'U',name:'Uranium',mass:'238.029',cat:'actinide',period:7},
  {z:93,sym:'Np',name:'Neptunium',mass:'(237)',cat:'actinide',period:7},
  {z:94,sym:'Pu',name:'Plutonium',mass:'(244)',cat:'actinide',period:7},
  {z:95,sym:'Am',name:'Americium',mass:'(243)',cat:'actinide',period:7},
  {z:96,sym:'Cm',name:'Curium',mass:'(247)',cat:'actinide',period:7},
  {z:97,sym:'Bk',name:'Berkelium',mass:'(247)',cat:'actinide',period:7},
  {z:98,sym:'Cf',name:'Californium',mass:'(251)',cat:'actinide',period:7},
  {z:99,sym:'Es',name:'Einsteinium',mass:'(252)',cat:'actinide',period:7},
  {z:100,sym:'Fm',name:'Fermium',mass:'(257)',cat:'actinide',period:7},
  {z:101,sym:'Md',name:'Mendelevium',mass:'(258)',cat:'actinide',period:7},
  {z:102,sym:'No',name:'Nobelium',mass:'(259)',cat:'actinide',period:7},
  {z:103,sym:'Lr',name:'Lawrencium',mass:'(266)',cat:'actinide',period:7},
  {z:104,sym:'Rf',name:'Rutherfordium',mass:'(267)',cat:'transition-metal',period:7},
  {z:105,sym:'Db',name:'Dubnium',mass:'(268)',cat:'transition-metal',period:7},
  {z:106,sym:'Sg',name:'Seaborgium',mass:'(271)',cat:'transition-metal',period:7},
  {z:107,sym:'Bh',name:'Bohrium',mass:'(272)',cat:'transition-metal',period:7},
  {z:108,sym:'Hs',name:'Hassium',mass:'(277)',cat:'transition-metal',period:7},
  {z:109,sym:'Mt',name:'Meitnerium',mass:'(278)',cat:'unknown',period:7},
  {z:110,sym:'Ds',name:'Darmstadtium',mass:'(281)',cat:'unknown',period:7},
  {z:111,sym:'Rg',name:'Roentgenium',mass:'(282)',cat:'unknown',period:7},
  {z:112,sym:'Cn',name:'Copernicium',mass:'(285)',cat:'transition-metal',period:7},
  {z:113,sym:'Nh',name:'Nihonium',mass:'(286)',cat:'post-transition',period:7},
  {z:114,sym:'Fl',name:'Flerovium',mass:'(289)',cat:'post-transition',period:7},
  {z:115,sym:'Mc',name:'Moscovium',mass:'(290)',cat:'post-transition',period:7},
  {z:116,sym:'Lv',name:'Livermorium',mass:'(293)',cat:'post-transition',period:7},
  {z:117,sym:'Ts',name:'Tennessine',mass:'(294)',cat:'halogen',period:7},
  {z:118,sym:'Og',name:'Oganesson',mass:'(294)',cat:'noble-gas',period:7},
];

const CAT_COLORS = {
  'alkali-metal':'#ff4d6d','alkaline-earth':'#ff8c42','transition-metal':'#00b4d8',
  'post-transition':'#a8dadc','metalloid':'#52b788','reactive-nonmetal':'#74c69d',
  'halogen':'#b7e4c7','noble-gas':'#9d4edd','lanthanide':'#f4a261',
  'actinide':'#e76f51','unknown':'#415a77'
};

// ── Everything inside DOMContentLoaded so D3 is guaranteed loaded ──
document.addEventListener('DOMContentLoaded', () => {

  let currentElement = null;
  let showUV = true, showVis = true, showIR = true;
  let savedZoom = null;

  const urlParams = new URLSearchParams(window.location.search);
  const initZ     = parseInt(urlParams.get('z')) || 1;

  const sidebar  = document.getElementById('sidebar');
  const mainArea = document.getElementById('main');
  const tooltip  = document.getElementById('spec-tooltip');

  // ── Build sidebar ────────────────────────────────────
  function buildSidebar() {
    const byPeriod = {};
    ELEMENTS_LIGHT.forEach(el => {
      (byPeriod[el.period] = byPeriod[el.period] || []).push(el);
    });
    sidebar.innerHTML = '';
    Object.keys(byPeriod).sort((a,b)=>+a-+b).forEach(p => {
      const sec = document.createElement('div');
      sec.className = 'sidebar-section';
      sec.innerHTML = `<div class="sidebar-section-title">Period ${p}</div>`;
      byPeriod[p].forEach(el => {
        const row = document.createElement('div');
        row.className = 'element-row';
        row.dataset.z = el.z;
        row.innerHTML = `
          <div class="el-row-sym" style="color:${CAT_COLORS[el.cat]||'#aaa'}">${el.sym}</div>
          <div class="el-row-info">
            <div class="el-row-name">${el.name}</div>
            <div class="el-row-z">Z = ${el.z}</div>
          </div>
          <canvas class="el-row-preview" width="50" height="14" data-z="${el.z}"></canvas>`;
        row.addEventListener('click', () => selectElement(el.z));
        sec.appendChild(row);
      });
      sidebar.appendChild(sec);
    });
    requestAnimationFrame(() => {
      document.querySelectorAll('canvas.el-row-preview').forEach(c => {
        miniSpectrum(c, parseInt(c.dataset.z));
      });
    });
  }

  function miniSpectrum(canvas, z) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,canvas.width,canvas.height);
    generateSpectralLines(z).forEach(l => {
      const x = ((l.wl-200)/800)*canvas.width;
      ctx.strokeStyle = wavelengthToRGB(l.wl);
      ctx.globalAlpha = l.int/100; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  // ── Select element ───────────────────────────────────
  function selectElement(z) {
    currentElement = ELEMENTS_LIGHT.find(e => e.z === z);
    if (!currentElement) return;
    document.querySelectorAll('.element-row').forEach(r =>
      r.classList.toggle('active', +r.dataset.z === z));
    const row = document.querySelector(`.element-row[data-z="${z}"]`);
    if (row) row.scrollIntoView({block:'nearest',behavior:'smooth'});
    history.replaceState(null,'',`?z=${z}`);
    savedZoom = null;
    renderMain();
  }

  // ── Render main panel ────────────────────────────────
  function renderMain() {
    const el    = currentElement;
    const lines = generateSpectralLines(el.z);
    const uvC   = lines.filter(l=>l.wl<400).length;
    const visC  = lines.filter(l=>l.wl>=400&&l.wl<700).length;
    const irC   = lines.filter(l=>l.wl>=700).length;
    const cat   = el.cat.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());

    mainArea.innerHTML = `
      <div class="element-hero">
        <div class="hero-symbol">${el.sym}</div>
        <div class="hero-info">
          <div class="hero-name">${el.name}</div>
          <div class="hero-sub">Z = ${el.z} &nbsp;·&nbsp; ${el.mass} u &nbsp;·&nbsp; ${cat}</div>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><div class="stat-label">Lines</div><div class="stat-value">${lines.length}</div></div>
          <div class="stat-item"><div class="stat-label">UV</div><div class="stat-value" style="color:#cc88ff">${uvC}</div></div>
          <div class="stat-item"><div class="stat-label">Visible</div><div class="stat-value" style="color:#80ffcc">${visC}</div></div>
          <div class="stat-item"><div class="stat-label">IR</div><div class="stat-value" style="color:#ff9966">${irC}</div></div>
        </div>
      </div>

      <div class="spectrum-card">
        <div class="card-header">
          <div class="card-title">Emission Spectrum — Interactive</div>
          <div class="card-controls">
            <button class="ctrl-btn ${showUV?'active':''}"  id="btn-uv">UV</button>
            <button class="ctrl-btn ${showVis?'active':''}" id="btn-vis">VISIBLE</button>
            <button class="ctrl-btn ${showIR?'active':''}"  id="btn-ir">IR</button>
            <button class="ctrl-btn" id="btn-reset">RESET ZOOM</button>
          </div>
        </div>
        <div id="spectrum-chart" style="min-height:240px"></div>
        <div class="region-legend">
          <span><span class="region-dot" style="background:#cc44ff"></span>UV 200–400 nm</span>
          <span><span class="region-dot" style="background:#00ff88"></span>Visible 400–700 nm</span>
          <span><span class="region-dot" style="background:#ff5500"></span>IR 700–1000 nm</span>
          <span style="margin-left:auto;font-size:0.55rem">Scroll to zoom · Drag to pan · Hover for info</span>
        </div>
      </div>

      <div class="spectrum-card">
        <div class="card-header"><div class="card-title">Spectral Line Data</div></div>
        <div class="line-table-wrap">
          <table class="line-table">
            <thead><tr>
              <th>#</th><th>Color</th><th>Wavelength (nm)</th>
              <th>Frequency (THz)</th><th>Energy (eV)</th>
              <th>Intensity</th><th>Region</th>
              ${lines[0]?.series?'<th>Series</th>':''}
            </tr></thead>
            <tbody id="line-tbody"></tbody>
          </table>
        </div>
      </div>`;

    // Table rows
    const tbody = document.getElementById('line-tbody');
    [...lines].sort((a,b)=>a.wl-b.wl).forEach((line,i) => {
      const color  = wavelengthToRGB(line.wl);
      const freq   = (299792.458/line.wl*1000).toFixed(2);
      const energy = (1239.84/line.wl).toFixed(4);
      const region = spectralRegion(line.wl);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td><span class="td-swatch" style="background:${color};box-shadow:0 0 6px ${color}"></span></td>
        <td><b>${line.wl.toFixed(1)}</b></td>
        <td>${freq}</td><td>${energy}</td>
        <td><div style="display:flex;align-items:center;gap:6px">
          <div style="width:${Math.round(line.int)}px;max-width:100px;height:4px;border-radius:2px;background:${color};box-shadow:0 0 4px ${color}"></div>
          ${line.int}</div></td>
        <td><span class="td-region region-${region.toLowerCase()}">${region}</span></td>
        ${line.series?`<td style="color:var(--text-mid)">${line.series}</td>`:''}`;
      tbody.appendChild(tr);
    });

    // Button wiring
    document.getElementById('btn-uv').addEventListener('click', () => {
      showUV=!showUV; document.getElementById('btn-uv').classList.toggle('active',showUV); drawSpectrum();
    });
    document.getElementById('btn-vis').addEventListener('click', () => {
      showVis=!showVis; document.getElementById('btn-vis').classList.toggle('active',showVis); drawSpectrum();
    });
    document.getElementById('btn-ir').addEventListener('click', () => {
      showIR=!showIR; document.getElementById('btn-ir').classList.toggle('active',showIR); drawSpectrum();
    });
    document.getElementById('btn-reset').addEventListener('click', () => {
      savedZoom=null; drawSpectrum();
    });

    drawSpectrum();

    // Build educational modules below the spectrum
    if (typeof buildEduSection === 'function') {
      buildEduSection(el, lines, mainArea);
    }
  }

  // ── D3 Chart ─────────────────────────────────────────
  function drawSpectrum() {
    const container = document.getElementById('spectrum-chart');
    if (!container || !currentElement) return;
    d3.select(container).selectAll('*').remove();

    const W  = container.clientWidth || 800;
    const H  = 240;
    const m  = {top:24, right:24, bottom:52, left:58};
    const iW = W - m.left - m.right;
    const iH = H - m.top  - m.bottom;

    const allLines = generateSpectralLines(currentElement.z);
    const lines = allLines.filter(l =>
      (showUV  || l.wl >= 400) &&
      (showVis || l.wl < 400 || l.wl >= 700) &&
      (showIR  || l.wl < 700)
    );

    const svg = d3.select(container).append('svg')
      .attr('width','100%').attr('height',H).style('display','block');

    svg.append('defs').append('clipPath').attr('id','chart-clip')
      .append('rect').attr('width',iW).attr('height',iH+10).attr('y',-5);

    const g = svg.append('g').attr('transform',`translate(${m.left},${m.top})`);

    const xBase  = d3.scaleLinear().domain([200,1000]).range([0,iW]);
    const yScale = d3.scaleLinear().domain([0,110]).range([iH,0]);
    let   xScale = savedZoom ? savedZoom.rescaleX(xBase) : xBase.copy();

    const xAxisG = g.append('g').attr('transform',`translate(0,${iH})`);
    const yAxisG = g.append('g');

    function styleAx(ax) {
      ax.selectAll('text').style('fill','#3e6e88').style('font-family','Share Tech Mono,monospace').style('font-size','10px');
      ax.selectAll('line,path').style('stroke','rgba(0,200,255,0.12)');
    }
    function updateAxes(xs) {
      xAxisG.call(d3.axisBottom(xs).ticks(10).tickFormat(d=>d+' nm'));
      yAxisG.call(d3.axisLeft(yScale).ticks(5).tickFormat(d=>d+'%'));
      styleAx(xAxisG); styleAx(yAxisG);
    }
    updateAxes(xScale);

    // Labels
    g.append('text').attr('x',iW/2).attr('y',iH+42).attr('text-anchor','middle')
      .attr('fill','#3e6e88').attr('font-size','10px').attr('font-family','Share Tech Mono,monospace')
      .attr('letter-spacing','0.14em').text('WAVELENGTH (nm)');
    g.append('text').attr('transform','rotate(-90)').attr('x',-iH/2).attr('y',-44)
      .attr('text-anchor','middle').attr('fill','#3e6e88').attr('font-size','10px')
      .attr('font-family','Share Tech Mono,monospace').attr('letter-spacing','0.14em').text('INTENSITY (%)');

    // Grid
    g.append('g').attr('clip-path','url(#chart-clip)')
      .selectAll('line').data(yScale.ticks(5)).join('line')
      .attr('x1',0).attr('x2',iW).attr('y1',d=>yScale(d)).attr('y2',d=>yScale(d))
      .attr('stroke','rgba(0,200,255,0.05)');

    // Region bands
    const bandG = g.append('g').attr('clip-path','url(#chart-clip)');
    function drawBands(xs) {
      bandG.selectAll('*').remove();
      [{x1:200,x2:400,fill:'rgba(160,40,255,0.07)',lbl:'UV'},
       {x1:400,x2:700,fill:'rgba(255,255,255,0.02)',lbl:'VIS'},
       {x1:700,x2:1000,fill:'rgba(255,70,0,0.07)',lbl:'IR'}]
      .forEach(r => {
        const p1=xs(r.x1), p2=xs(r.x2);
        if (p2<0||p1>iW) return;
        const rx=Math.max(0,p1), rw=Math.min(iW,p2)-rx;
        bandG.append('rect').attr('x',rx).attr('y',0).attr('width',rw).attr('height',iH).attr('fill',r.fill);
        if (rw>30) bandG.append('text')
          .attr('x',Math.max(6,Math.min(iW-24,rx+rw/2))).attr('y',14)
          .attr('text-anchor','middle').attr('fill','rgba(255,255,255,0.1)')
          .attr('font-size','10px').attr('font-family','Share Tech Mono,monospace')
          .attr('letter-spacing','0.14em').text(r.lbl);
      });
    }
    drawBands(xScale);

    // Spectral lines
    const linesG = g.append('g').attr('clip-path','url(#chart-clip)');
    function drawLines(xs) {
      linesG.selectAll('*').remove();
      lines.forEach(line => {
        const x = xs(line.wl);
        if (x < -8 || x > iW+8) return;
        const col = wavelengthToRGB(line.wl);
        const y1  = yScale(line.int);

        linesG.append('line').attr('x1',x).attr('x2',x).attr('y1',y1).attr('y2',iH)
          .attr('stroke',col).attr('stroke-width',6).attr('opacity',0.1);
        linesG.append('line').attr('x1',x).attr('x2',x).attr('y1',y1).attr('y2',iH)
          .attr('stroke',col).attr('stroke-width',1.5).attr('opacity',0.92);
        const dot = linesG.append('circle').attr('cx',x).attr('cy',y1).attr('r',3)
          .attr('fill',col).attr('opacity',0.9).attr('cursor','crosshair');

        linesG.append('rect').attr('x',x-7).attr('y',0).attr('width',14).attr('height',iH)
          .attr('fill','transparent').attr('cursor','crosshair')
          .on('mouseenter', (ev) => { dot.attr('r',6); showTip(ev,line,col); })
          .on('mousemove',  moveTip)
          .on('mouseleave', () => { dot.attr('r',3); hideTip(); });
      });
    }
    drawLines(xScale);

    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([1,50])
      .translateExtent([[0,0],[iW,iH]])
      .extent([[0,0],[iW,iH]])
      .on('zoom', ev => {
        savedZoom = ev.transform;
        xScale = ev.transform.rescaleX(xBase);
        updateAxes(xScale); drawBands(xScale); drawLines(xScale);
      });

    svg.call(zoom);
    if (savedZoom) svg.call(zoom.transform, savedZoom);
  }

  // ── Tooltip ──────────────────────────────────────────
  function showTip(ev, line, color) {
    tooltip.innerHTML = `
      <div style="font-family:'Rajdhani',sans-serif;font-size:1.2rem;font-weight:700;color:${color}">${line.wl.toFixed(1)} nm</div>
      <div><span style="color:#3e6e88">Region: </span>${spectralRegion(line.wl)}</div>
      <div><span style="color:#3e6e88">Freq: </span>${(299792.458/line.wl*1000).toFixed(2)} THz</div>
      <div><span style="color:#3e6e88">Energy: </span>${(1239.84/line.wl).toFixed(4)} eV</div>
      <div><span style="color:#3e6e88">Intensity: </span>${line.int}%</div>
      ${line.series?`<div><span style="color:#3e6e88">Series: </span>${line.series}</div>`:''}`;
    tooltip.style.display = 'block';
    moveTip(ev);
  }
  function moveTip(ev) {
    let x=ev.clientX+16, y=ev.clientY-10;
    if (x+210>window.innerWidth)  x=ev.clientX-220;
    if (y+160>window.innerHeight) y=ev.clientY-170;
    tooltip.style.left=x+'px'; tooltip.style.top=y+'px';
  }
  function hideTip() { tooltip.style.display='none'; }

  // ── Search ───────────────────────────────────────────
  document.getElementById('element-search').addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.element-row').forEach(row => {
      if (!q) { row.style.display=''; return; }
      const el = ELEMENTS_LIGHT.find(e => e.z===+row.dataset.z);
      row.style.display = (el && (el.name.toLowerCase().includes(q)||el.sym.toLowerCase().includes(q)||String(el.z).includes(q))) ? '' : 'none';
    });
  });

  // ── Resize ───────────────────────────────────────────
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt=setTimeout(()=>{ if(currentElement) drawSpectrum(); },200); });

  // ── Boot ─────────────────────────────────────────────
  buildSidebar();
  selectElement(initZ);

}); // end DOMContentLoaded