// ═══════════════════════════════════════════════════════
//  ELEMENT DATA
// ═══════════════════════════════════════════════════════
const ELEMENTS = [
  { z:1,  sym:'H',  name:'Hydrogen',      mass:'1.008',   cat:'reactive-nonmetal',  period:1, group:1,  config:'1s¹',               phase:'Gas',     melt:'-259.1°C', boil:'-252.9°C', density:'0.0899 g/L', discovery:'1766', desc:'The lightest and most abundant element in the universe. It is a colorless, odorless diatomic gas at standard conditions.' },
  { z:2,  sym:'He', name:'Helium',        mass:'4.003',   cat:'noble-gas',          period:1, group:18, config:'1s²',               phase:'Gas',     melt:'—',        boil:'-268.9°C', density:'0.179 g/L',  discovery:'1868', desc:'A colorless, odorless, tasteless, non-toxic, inert noble gas. Second lightest and second most abundant element in the universe.' },
  { z:3,  sym:'Li', name:'Lithium',       mass:'6.941',   cat:'alkali-metal',       period:2, group:1,  config:'[He] 2s¹',          phase:'Solid',   melt:'180.5°C',  boil:'1342°C',   density:'0.534 g/cm³',discovery:'1817', desc:'The lightest metal and solid element. Soft, silvery-white alkali metal under standard conditions. Highly reactive and flammable.' },
  { z:4,  sym:'Be', name:'Beryllium',     mass:'9.012',   cat:'alkaline-earth',     period:2, group:2,  config:'[He] 2s²',          phase:'Solid',   melt:'1287°C',   boil:'2469°C',   density:'1.85 g/cm³', discovery:'1798', desc:'A hard, grayish metal with one of the highest melting points of the light elements. Used in aerospace and nuclear applications.' },
  { z:5,  sym:'B',  name:'Boron',         mass:'10.811',  cat:'metalloid',          period:2, group:13, config:'[He] 2s² 2p¹',      phase:'Solid',   melt:'2076°C',   boil:'3927°C',   density:'2.34 g/cm³', discovery:'1808', desc:'A metalloid with distinctive chemical properties between metals and nonmetals. Essential for plant growth and used in semiconductors.' },
  { z:6,  sym:'C',  name:'Carbon',        mass:'12.011',  cat:'reactive-nonmetal',  period:2, group:14, config:'[He] 2s² 2p²',      phase:'Solid',   melt:'3550°C',   boil:'4827°C',   density:'2.267 g/cm³',discovery:'ancient',desc:'The basis of all known life. Forms more compounds than any other element and exists in multiple allotropes including diamond and graphite.' },
  { z:7,  sym:'N',  name:'Nitrogen',      mass:'14.007',  cat:'reactive-nonmetal',  period:2, group:15, config:'[He] 2s² 2p³',      phase:'Gas',     melt:'-210°C',   boil:'-195.8°C', density:'1.25 g/L',   discovery:'1772', desc:'Makes up ~78% of Earth\'s atmosphere. Colorless, odorless, and tasteless diatomic gas. Essential for biological processes.' },
  { z:8,  sym:'O',  name:'Oxygen',        mass:'15.999',  cat:'reactive-nonmetal',  period:2, group:16, config:'[He] 2s² 2p⁴',      phase:'Gas',     melt:'-218.8°C', boil:'-183°C',   density:'1.429 g/L',  discovery:'1774', desc:'Third most abundant element in the universe. Essential for respiration and combustion. Highly reactive and forms compounds with nearly all elements.' },
  { z:9,  sym:'F',  name:'Fluorine',      mass:'18.998',  cat:'halogen',            period:2, group:17, config:'[He] 2s² 2p⁵',      phase:'Gas',     melt:'-219.6°C', boil:'-188.1°C', density:'1.696 g/L',  discovery:'1886', desc:'The most electronegative and reactive of all elements. Pale yellow diatomic gas that reacts with almost every substance, including noble gases.' },
  { z:10, sym:'Ne', name:'Neon',          mass:'20.180',  cat:'noble-gas',          period:2, group:18, config:'[He] 2s² 2p⁶',      phase:'Gas',     melt:'-248.6°C', boil:'-246.1°C', density:'0.9 g/L',    discovery:'1898', desc:'A colorless, odorless inert noble gas. Well-known for its distinctive reddish-orange glow in neon signs and plasma tube lighting.' },
  { z:11, sym:'Na', name:'Sodium',        mass:'22.990',  cat:'alkali-metal',       period:3, group:1,  config:'[Ne] 3s¹',          phase:'Solid',   melt:'97.8°C',   boil:'883°C',    density:'0.97 g/cm³', discovery:'1807', desc:'A soft, silvery-white, highly reactive metal. Essential for biological systems and widely found as sodium chloride (table salt).' },
  { z:12, sym:'Mg', name:'Magnesium',     mass:'24.305',  cat:'alkaline-earth',     period:3, group:2,  config:'[Ne] 3s²',          phase:'Solid',   melt:'650°C',    boil:'1090°C',   density:'1.738 g/cm³',discovery:'1755', desc:'A shiny gray metal. Fourth most common element in Earth\'s crust and is essential to all living organisms.' },
  { z:13, sym:'Al', name:'Aluminium',     mass:'26.982',  cat:'post-transition',    period:3, group:13, config:'[Ne] 3s² 3p¹',      phase:'Solid',   melt:'660°C',    boil:'2519°C',   density:'2.70 g/cm³', discovery:'1825', desc:'The most abundant metal in Earth\'s crust. Lightweight, silvery-white metal with excellent corrosion resistance and conductivity.' },
  { z:14, sym:'Si', name:'Silicon',       mass:'28.086',  cat:'metalloid',          period:3, group:14, config:'[Ne] 3s² 3p²',      phase:'Solid',   melt:'1414°C',   boil:'3265°C',   density:'2.33 g/cm³', discovery:'1824', desc:'The second most abundant element in Earth\'s crust. A semiconductor that forms the basis of modern electronics and the digital revolution.' },
  { z:15, sym:'P',  name:'Phosphorus',    mass:'30.974',  cat:'reactive-nonmetal',  period:3, group:15, config:'[Ne] 3s² 3p³',      phase:'Solid',   melt:'44.1°C',   boil:'280.5°C',  density:'1.82 g/cm³', discovery:'1669', desc:'Essential for life, occurring in DNA and ATP. Exists in several allotropes including white phosphorus, which is highly reactive.' },
  { z:16, sym:'S',  name:'Sulfur',        mass:'32.065',  cat:'reactive-nonmetal',  period:3, group:16, config:'[Ne] 3s² 3p⁴',      phase:'Solid',   melt:'119.6°C',  boil:'444.6°C',  density:'2.07 g/cm³', discovery:'ancient',desc:'A bright yellow crystalline solid at room temperature. Used in gunpowder, matches, insecticides, and in vulcanizing natural rubber.' },
  { z:17, sym:'Cl', name:'Chlorine',      mass:'35.453',  cat:'halogen',            period:3, group:17, config:'[Ne] 3s² 3p⁵',      phase:'Gas',     melt:'-101.5°C', boil:'-34.05°C', density:'3.214 g/L',  discovery:'1774', desc:'A yellow-green toxic gas. Widely used in water purification, disinfectants, and as a feedstock for many chemical syntheses.' },
  { z:18, sym:'Ar', name:'Argon',         mass:'39.948',  cat:'noble-gas',          period:3, group:18, config:'[Ne] 3s² 3p⁶',      phase:'Gas',     melt:'-189.4°C', boil:'-185.9°C', density:'1.784 g/L',  discovery:'1894', desc:'The third most abundant gas in Earth\'s atmosphere. Colorless, odorless, and inert. Used extensively in welding and lighting.' },
  { z:19, sym:'K',  name:'Potassium',     mass:'39.098',  cat:'alkali-metal',       period:4, group:1,  config:'[Ar] 4s¹',          phase:'Solid',   melt:'63.4°C',   boil:'759°C',    density:'0.89 g/cm³', discovery:'1807', desc:'A soft, silvery-white metal that reacts rapidly with water. Essential mineral nutrient for all living organisms.' },
  { z:20, sym:'Ca', name:'Calcium',       mass:'40.078',  cat:'alkaline-earth',     period:4, group:2,  config:'[Ar] 4s²',          phase:'Solid',   melt:'842°C',    boil:'1484°C',   density:'1.54 g/cm³', discovery:'1808', desc:'The fifth most abundant element in Earth\'s crust. Essential for living organisms, particularly in teeth and bones.' },
  { z:21, sym:'Sc', name:'Scandium',      mass:'44.956',  cat:'transition-metal',   period:4, group:3,  config:'[Ar] 3d¹ 4s²',      phase:'Solid',   melt:'1541°C',   boil:'2836°C',   density:'2.99 g/cm³', discovery:'1879', desc:'A soft, silvery metallic element. Used in aerospace components and sports equipment such as bicycle frames and lacrosse sticks.' },
  { z:22, sym:'Ti', name:'Titanium',      mass:'47.867',  cat:'transition-metal',   period:4, group:4,  config:'[Ar] 3d² 4s²',      phase:'Solid',   melt:'1668°C',   boil:'3287°C',   density:'4.54 g/cm³', discovery:'1791', desc:'A lustrous transition metal with high strength-to-weight ratio and excellent corrosion resistance. Used in aerospace and medical implants.' },
  { z:23, sym:'V',  name:'Vanadium',      mass:'50.942',  cat:'transition-metal',   period:4, group:5,  config:'[Ar] 3d³ 4s²',      phase:'Solid',   melt:'1910°C',   boil:'3407°C',   density:'6.11 g/cm³', discovery:'1801', desc:'A hard, silvery-gray, ductile transition metal. Used as an additive in steel alloys for improving toughness and heat resistance.' },
  { z:24, sym:'Cr', name:'Chromium',      mass:'51.996',  cat:'transition-metal',   period:4, group:6,  config:'[Ar] 3d⁵ 4s¹',      phase:'Solid',   melt:'1907°C',   boil:'2671°C',   density:'7.19 g/cm³', discovery:'1797', desc:'A hard, lustrous metal with high corrosion resistance. Gives stainless steel its characteristic shine and corrosion resistance.' },
  { z:25, sym:'Mn', name:'Manganese',     mass:'54.938',  cat:'transition-metal',   period:4, group:7,  config:'[Ar] 3d⁵ 4s²',      phase:'Solid',   melt:'1246°C',   boil:'2061°C',   density:'7.21 g/cm³', discovery:'1774', desc:'A silvery-gray metal resembling iron but harder and brittle. Essential trace element in biology and important in steel production.' },
  { z:26, sym:'Fe', name:'Iron',          mass:'55.845',  cat:'transition-metal',   period:4, group:8,  config:'[Ar] 3d⁶ 4s²',      phase:'Solid',   melt:'1538°C',   boil:'2862°C',   density:'7.87 g/cm³', discovery:'ancient',desc:'The most common element by mass in Earth. Used in structural materials and as the basis of steel, the most important engineering material.' },
  { z:27, sym:'Co', name:'Cobalt',        mass:'58.933',  cat:'transition-metal',   period:4, group:9,  config:'[Ar] 3d⁷ 4s²',      phase:'Solid',   melt:'1495°C',   boil:'2927°C',   density:'8.90 g/cm³', discovery:'1735', desc:'A hard, lustrous, silver-gray metal. Used in superalloys, magnets, and rechargeable batteries. The blue color in medieval glass and pottery.' },
  { z:28, sym:'Ni', name:'Nickel',        mass:'58.693',  cat:'transition-metal',   period:4, group:10, config:'[Ar] 3d⁸ 4s²',      phase:'Solid',   melt:'1455°C',   boil:'2913°C',   density:'8.91 g/cm³', discovery:'1751', desc:'A silvery-white lustrous metal with slight golden tinge. Corrosion-resistant and used in many alloys, coinage, and batteries.' },
  { z:29, sym:'Cu', name:'Copper',        mass:'63.546',  cat:'transition-metal',   period:4, group:11, config:'[Ar] 3d¹⁰ 4s¹',     phase:'Solid',   melt:'1085°C',   boil:'2562°C',   density:'8.96 g/cm³', discovery:'ancient',desc:'One of the first metals worked by humans. Excellent thermal and electrical conductor. Essential trace element in living organisms.' },
  { z:30, sym:'Zn', name:'Zinc',          mass:'65.38',   cat:'transition-metal',   period:4, group:12, config:'[Ar] 3d¹⁰ 4s²',     phase:'Solid',   melt:'419.5°C',  boil:'907°C',    density:'7.14 g/cm³', discovery:'ancient',desc:'A bluish-white metal. Fourth most common metal used globally. Essential trace element and used to galvanize other metals to prevent rusting.' },
  { z:31, sym:'Ga', name:'Gallium',       mass:'69.723',  cat:'post-transition',    period:4, group:13, config:'[Ar] 3d¹⁰ 4s² 4p¹', phase:'Solid',   melt:'29.8°C',   boil:'2204°C',   density:'5.91 g/cm³', discovery:'1875', desc:'A soft metal that melts at just above room temperature. Used in semiconductors, LED technology, and famously melts in your hand.' },
  { z:32, sym:'Ge', name:'Germanium',     mass:'72.630',  cat:'metalloid',          period:4, group:14, config:'[Ar] 3d¹⁰ 4s² 4p²', phase:'Solid',   melt:'938.3°C',  boil:'2833°C',   density:'5.32 g/cm³', discovery:'1886', desc:'A lustrous, hard-brittle metalloid. Used as a semiconductor in transistors, solar cells, and infrared optical systems.' },
  { z:33, sym:'As', name:'Arsenic',       mass:'74.922',  cat:'metalloid',          period:4, group:15, config:'[Ar] 3d¹⁰ 4s² 4p³', phase:'Solid',   melt:'817°C',    boil:'614°C',    density:'5.73 g/cm³', discovery:'ancient',desc:'A metalloid occurring in many minerals. Notorious for its toxicity. Used in semiconductors, wood preservatives, and historically in pigments.' },
  { z:34, sym:'Se', name:'Selenium',      mass:'78.971',  cat:'reactive-nonmetal',  period:4, group:16, config:'[Ar] 3d¹⁰ 4s² 4p⁴', phase:'Solid',   melt:'221°C',    boil:'685°C',    density:'4.82 g/cm³', discovery:'1817', desc:'A nonmetal with properties between sulfur and tellurium. Essential trace element in humans. Used in photocells and semiconductors.' },
  { z:35, sym:'Br', name:'Bromine',       mass:'79.904',  cat:'halogen',            period:4, group:17, config:'[Ar] 3d¹⁰ 4s² 4p⁵', phase:'Liquid',  melt:'-7.2°C',   boil:'58.8°C',   density:'3.12 g/cm³', discovery:'1826', desc:'A volatile red-brown liquid at room temperature. One of only two elements liquid at standard conditions. Used in flame retardants.' },
  { z:36, sym:'Kr', name:'Krypton',       mass:'83.798',  cat:'noble-gas',          period:4, group:18, config:'[Ar] 3d¹⁰ 4s² 4p⁶', phase:'Gas',     melt:'-157.4°C', boil:'-153.2°C', density:'3.749 g/L',  discovery:'1898', desc:'A colorless, odorless noble gas. Used in high-powered, high-efficiency fluorescent lights and as an inert filling gas.' },
  { z:37, sym:'Rb', name:'Rubidium',      mass:'85.468',  cat:'alkali-metal',       period:5, group:1,  config:'[Kr] 5s¹',          phase:'Solid',   melt:'39.3°C',   boil:'688°C',    density:'1.53 g/cm³', discovery:'1861', desc:'A soft, silvery-white metallic element of the alkali metals group. Highly reactive in air and spontaneously ignites in water.' },
  { z:38, sym:'Sr', name:'Strontium',     mass:'87.62',   cat:'alkaline-earth',     period:5, group:2,  config:'[Kr] 5s²',          phase:'Solid',   melt:'777°C',    boil:'1382°C',   density:'2.64 g/cm³', discovery:'1790', desc:'A soft silver-white or yellowish metallic element. Used in fireworks and signals for its brilliant red flame color.' },
  { z:39, sym:'Y',  name:'Yttrium',       mass:'88.906',  cat:'transition-metal',   period:5, group:3,  config:'[Kr] 4d¹ 5s²',      phase:'Solid',   melt:'1526°C',   boil:'3336°C',   density:'4.47 g/cm³', discovery:'1794', desc:'A silvery-metallic transition metal. Used in LEDs, phosphors, camera lenses, and as a component in superconductors.' },
  { z:40, sym:'Zr', name:'Zirconium',     mass:'91.224',  cat:'transition-metal',   period:5, group:4,  config:'[Kr] 4d² 5s²',      phase:'Solid',   melt:'1855°C',   boil:'4409°C',   density:'6.52 g/cm³', discovery:'1789', desc:'A lustrous, grey-white, strong transition metal. Low neutron absorption makes it ideal for nuclear reactor cladding.' },
  { z:41, sym:'Nb', name:'Niobium',       mass:'92.906',  cat:'transition-metal',   period:5, group:5,  config:'[Kr] 4d⁴ 5s¹',      phase:'Solid',   melt:'2477°C',   boil:'4744°C',   density:'8.57 g/cm³', discovery:'1801', desc:'A soft, grey, crystalline, ductile metal. Used in superconducting magnets and jet engines for its high-temperature properties.' },
  { z:42, sym:'Mo', name:'Molybdenum',    mass:'95.96',   cat:'transition-metal',   period:5, group:6,  config:'[Kr] 4d⁵ 5s¹',      phase:'Solid',   melt:'2623°C',   boil:'4639°C',   density:'10.28 g/cm³',discovery:'1781', desc:'A silvery metal with the sixth-highest melting point of any element. Widely used in high-strength steel alloys and as a catalyst.' },
  { z:43, sym:'Tc', name:'Technetium',    mass:'(98)',    cat:'transition-metal',   period:5, group:7,  config:'[Kr] 4d⁵ 5s²',      phase:'Solid',   melt:'2157°C',   boil:'4265°C',   density:'11.5 g/cm³', discovery:'1937', desc:'The first element to be artificially produced. Radioactive with no stable isotopes. Used in nuclear medicine imaging.' },
  { z:44, sym:'Ru', name:'Ruthenium',     mass:'101.07',  cat:'transition-metal',   period:5, group:8,  config:'[Kr] 4d⁷ 5s¹',      phase:'Solid',   melt:'2334°C',   boil:'4150°C',   density:'12.37 g/cm³',discovery:'1844', desc:'A rare platinum-group metal. Used to harden platinum and palladium, and as a catalyst. Named after Russia.' },
  { z:45, sym:'Rh', name:'Rhodium',       mass:'102.906', cat:'transition-metal',   period:5, group:9,  config:'[Kr] 4d⁸ 5s¹',      phase:'Solid',   melt:'1964°C',   boil:'3695°C',   density:'12.41 g/cm³',discovery:'1803', desc:'A rare, hard, silvery-white, inert transition metal of the platinum group. The most expensive and rarest naturally occurring element.' },
  { z:46, sym:'Pd', name:'Palladium',     mass:'106.42',  cat:'transition-metal',   period:5, group:10, config:'[Kr] 4d¹⁰',         phase:'Solid',   melt:'1554.9°C', boil:'2963°C',   density:'12.02 g/cm³',discovery:'1803', desc:'A lustrous silver-white metal of the platinum group. Used in catalytic converters, dentistry, electronics, and jewelry.' },
  { z:47, sym:'Ag', name:'Silver',        mass:'107.868', cat:'transition-metal',   period:5, group:11, config:'[Kr] 4d¹⁰ 5s¹',     phase:'Solid',   melt:'961.8°C',  boil:'2162°C',   density:'10.49 g/cm³',discovery:'ancient',desc:'A soft, white, lustrous transition metal with the highest electrical conductivity of any element. Used in currency, jewelry, and electronics.' },
  { z:48, sym:'Cd', name:'Cadmium',       mass:'112.411', cat:'transition-metal',   period:5, group:12, config:'[Kr] 4d¹⁰ 5s²',     phase:'Solid',   melt:'321.1°C',  boil:'767°C',    density:'8.69 g/cm³', discovery:'1817', desc:'A soft, bluish-white metal. Used in Ni-Cd batteries, pigments, coatings, and plating. Toxic and a significant environmental hazard.' },
  { z:49, sym:'In', name:'Indium',        mass:'114.818', cat:'post-transition',    period:5, group:13, config:'[Kr] 4d¹⁰ 5s² 5p¹', phase:'Solid',   melt:'156.6°C',  boil:'2072°C',   density:'7.31 g/cm³', discovery:'1863', desc:'A soft, silvery-white metal resembling tin. Key component of indium tin oxide (ITO), used in LCD screens and touchscreens.' },
  { z:50, sym:'Sn', name:'Tin',           mass:'118.710', cat:'post-transition',    period:5, group:14, config:'[Kr] 4d¹⁰ 5s² 5p²', phase:'Solid',   melt:'231.9°C',  boil:'2602°C',   density:'7.31 g/cm³', discovery:'ancient',desc:'A silvery metal historically used in bronze (with copper). Used in solder, tin cans, window glass manufacture, and many alloys.' },
  { z:51, sym:'Sb', name:'Antimony',      mass:'121.760', cat:'metalloid',          period:5, group:15, config:'[Kr] 4d¹⁰ 5s² 5p³', phase:'Solid',   melt:'630.6°C',  boil:'1587°C',   density:'6.68 g/cm³', discovery:'ancient',desc:'A lustrous gray metalloid. Used in flame-retardant materials, batteries, and semiconductors. Known since antiquity.' },
  { z:52, sym:'Te', name:'Tellurium',     mass:'127.60',  cat:'metalloid',          period:5, group:16, config:'[Kr] 4d¹⁰ 5s² 5p⁴', phase:'Solid',   melt:'449.5°C',  boil:'988°C',    density:'6.24 g/cm³', discovery:'1782', desc:'A brittle, mildly toxic, rare, silver-white metalloid. Used in alloys, solar cells, and as a glass additive.' },
  { z:53, sym:'I',  name:'Iodine',        mass:'126.904', cat:'halogen',            period:5, group:17, config:'[Kr] 4d¹⁰ 5s² 5p⁵', phase:'Solid',   melt:'113.5°C',  boil:'184.3°C',  density:'4.93 g/cm³', discovery:'1811', desc:'A lustrous purple-black solid. Essential trace element for thyroid function. Used in antiseptics, photography, and organic chemistry.' },
  { z:54, sym:'Xe', name:'Xenon',         mass:'131.293', cat:'noble-gas',          period:5, group:18, config:'[Kr] 4d¹⁰ 5s² 5p⁶', phase:'Gas',     melt:'-111.7°C', boil:'-108.1°C', density:'5.894 g/L',  discovery:'1898', desc:'A dense, colorless, odorless noble gas. Used in flash lamps, arc lamps, and as a general anesthetic. Can form some chemical compounds.' },
  { z:55, sym:'Cs', name:'Cesium',        mass:'132.905', cat:'alkali-metal',       period:6, group:1,  config:'[Xe] 6s¹',          phase:'Solid',   melt:'28.4°C',   boil:'671°C',    density:'1.93 g/cm³', discovery:'1860', desc:'A soft, gold-colored metal. Highly reactive; used in atomic clocks (Cs-133 defines the SI second) and as a catalyst.' },
  { z:56, sym:'Ba', name:'Barium',        mass:'137.327', cat:'alkaline-earth',     period:6, group:2,  config:'[Xe] 6s²',          phase:'Solid',   melt:'727°C',    boil:'1897°C',   density:'3.62 g/cm³', discovery:'1808', desc:'A soft, silvery alkaline earth metal. Barium sulfate is used as a radiocontrast agent in X-ray imaging of the digestive system.' },
  { z:57, sym:'La', name:'Lanthanum',     mass:'138.905', cat:'lanthanide',         period:6, group:3,  config:'[Xe] 5d¹ 6s²',      phase:'Solid',   melt:'920°C',    boil:'3464°C',   density:'6.15 g/cm³', discovery:'1839', desc:'A soft, ductile, silvery-white metal. Used in camera lenses, studio lighting, and hydrogen storage alloys.' },
  { z:58, sym:'Ce', name:'Cerium',        mass:'140.116', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f¹ 5d¹ 6s²', phase:'Solid',   melt:'799°C',    boil:'3443°C',   density:'6.77 g/cm³', discovery:'1803', desc:'The most abundant of the rare earth metals. Used as a catalyst in catalytic converters, in glass polishing, and in self-cleaning ovens.' },
  { z:59, sym:'Pr', name:'Praseodymium',  mass:'140.908', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f³ 6s²',     phase:'Solid',   melt:'931°C',    boil:'3520°C',   density:'6.77 g/cm³', discovery:'1885', desc:'A soft, silvery, malleable and ductile metal. Used in aircraft engine components and strong permanent magnets with neodymium.' },
  { z:60, sym:'Nd', name:'Neodymium',     mass:'144.242', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f⁴ 6s²',     phase:'Solid',   melt:'1021°C',   boil:'3074°C',   density:'7.01 g/cm³', discovery:'1885', desc:'Used in the strongest permanent magnets known (Nd₂Fe₁₄B). Found in electric motors, hard drives, and wind turbines.' },
  { z:61, sym:'Pm', name:'Promethium',    mass:'(145)',   cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f⁵ 6s²',     phase:'Solid',   melt:'1100°C',   boil:'3000°C',   density:'7.26 g/cm³', discovery:'1945', desc:'A radioactive rare earth element. Used in luminous paint, atomic batteries, and as a portable X-ray source. No stable isotopes.' },
  { z:62, sym:'Sm', name:'Samarium',      mass:'150.36',  cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f⁶ 6s²',     phase:'Solid',   melt:'1072°C',   boil:'1900°C',   density:'7.52 g/cm³', discovery:'1879', desc:'Used in samarium-cobalt magnets for permanent magnets in motors. Also used in cancer treatment via radioactive Sm-153.' },
  { z:63, sym:'Eu', name:'Europium',      mass:'151.964', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f⁷ 6s²',     phase:'Solid',   melt:'826°C',    boil:'1529°C',   density:'5.24 g/cm³', discovery:'1901', desc:'The most reactive of the rare earth metals. Used as a red and blue phosphor in television screens and energy-efficient lighting.' },
  { z:64, sym:'Gd', name:'Gadolinium',    mass:'157.25',  cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f⁷ 5d¹ 6s²', phase:'Solid',   melt:'1312°C',   boil:'3250°C',   density:'7.90 g/cm³', discovery:'1880', desc:'Used as a contrast agent in MRI scans. Also used in nuclear reactor shielding and in memory chips due to its magnetic properties.' },
  { z:65, sym:'Tb', name:'Terbium',       mass:'158.925', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f⁹ 6s²',     phase:'Solid',   melt:'1356°C',   boil:'3230°C',   density:'8.23 g/cm³', discovery:'1843', desc:'A silvery-white rare earth metal. Used in solid-state devices, green phosphors in fluorescent lighting, and magnetic materials.' },
  { z:66, sym:'Dy', name:'Dysprosium',    mass:'162.500', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f¹⁰ 6s²',    phase:'Solid',   melt:'1407°C',   boil:'2567°C',   density:'8.55 g/cm³', discovery:'1886', desc:'Has the highest magnetic susceptibility of any element. Used in data storage and in neodymium magnets to improve high-temperature performance.' },
  { z:67, sym:'Ho', name:'Holmium',       mass:'164.930', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f¹¹ 6s²',    phase:'Solid',   melt:'1461°C',   boil:'2720°C',   density:'8.80 g/cm³', discovery:'1878', desc:'Has the highest magnetic moment of any naturally occurring element. Used in magnets, medical lasers, and nuclear reactors.' },
  { z:68, sym:'Er', name:'Erbium',        mass:'167.259', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f¹² 6s²',    phase:'Solid',   melt:'1529°C',   boil:'2868°C',   density:'9.07 g/cm³', discovery:'1842', desc:'A silvery-white solid metal. Used in fiber optic amplifiers (erbium-doped fiber amplifier / EDFA), lasers, and as a pink colorant in glass.' },
  { z:69, sym:'Tm', name:'Thulium',       mass:'168.934', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f¹³ 6s²',    phase:'Solid',   melt:'1545°C',   boil:'1950°C',   density:'9.32 g/cm³', discovery:'1879', desc:'The least abundant of the lanthanides in the Earth\'s crust. Used in portable X-ray devices and as a blue-green phosphor.' },
  { z:70, sym:'Yb', name:'Ytterbium',     mass:'173.045', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f¹⁴ 6s²',    phase:'Solid',   melt:'824°C',    boil:'1196°C',   density:'6.97 g/cm³', discovery:'1878', desc:'A silvery, lustrous rare earth metal. Used in stainless steel, atomic clocks, and as a dopant in fiber optic amplifiers.' },
  { z:71, sym:'Lu', name:'Lutetium',      mass:'174.967', cat:'lanthanide',         period:6, group:null,config:'[Xe] 4f¹⁴ 5d¹ 6s²',phase:'Solid',   melt:'1663°C',   boil:'3402°C',   density:'9.84 g/cm³', discovery:'1907', desc:'The hardest and densest lanthanide. Used in PET scanners, LED lighting research, and petroleum refining catalysts.' },
  { z:72, sym:'Hf', name:'Hafnium',       mass:'178.49',  cat:'transition-metal',   period:6, group:4,  config:'[Xe] 4f¹⁴ 5d² 6s²', phase:'Solid',   melt:'2233°C',   boil:'4603°C',   density:'13.31 g/cm³',discovery:'1923', desc:'A lustrous, silvery gray tetravalent transition metal. Used in nuclear reactor control rods and in microprocessor gates.' },
  { z:73, sym:'Ta', name:'Tantalum',      mass:'180.948', cat:'transition-metal',   period:6, group:5,  config:'[Xe] 4f¹⁴ 5d³ 6s²', phase:'Solid',   melt:'3017°C',   boil:'5458°C',   density:'16.65 g/cm³',discovery:'1802', desc:'A rare, hard, blue-gray, lustrous transition metal. Highly corrosion-resistant. Used in electronic components and surgical implants.' },
  { z:74, sym:'W',  name:'Tungsten',      mass:'183.84',  cat:'transition-metal',   period:6, group:6,  config:'[Xe] 4f¹⁴ 5d⁴ 6s²', phase:'Solid',   melt:'3422°C',   boil:'5555°C',   density:'19.3 g/cm³', discovery:'1783', desc:'Has the highest melting point of all known elements. Used in incandescent light bulb filaments, X-ray tubes, and cutting tools.' },
  { z:75, sym:'Re', name:'Rhenium',       mass:'186.207', cat:'transition-metal',   period:6, group:7,  config:'[Xe] 4f¹⁴ 5d⁵ 6s²', phase:'Solid',   melt:'3186°C',   boil:'5596°C',   density:'21.02 g/cm³',discovery:'1925', desc:'One of the rarest elements in Earth\'s crust. Used in jet engine components and as a catalyst in catalytic reforming of hydrocarbons.' },
  { z:76, sym:'Os', name:'Osmium',        mass:'190.23',  cat:'transition-metal',   period:6, group:8,  config:'[Xe] 4f¹⁴ 5d⁶ 6s²', phase:'Solid',   melt:'3033°C',   boil:'5012°C',   density:'22.59 g/cm³',discovery:'1803', desc:'The densest naturally occurring element. A hard, brittle, silvery-blue metal. Toxic as OsO₄. Used in alloys for fountain pen nibs.' },
  { z:77, sym:'Ir', name:'Iridium',       mass:'192.217', cat:'transition-metal',   period:6, group:9,  config:'[Xe] 4f¹⁴ 5d⁷ 6s²', phase:'Solid',   melt:'2446°C',   boil:'4428°C',   density:'22.56 g/cm³',discovery:'1803', desc:'The second densest element and the most corrosion-resistant metal known. Used in high-performance spark plugs and crucibles.' },
  { z:78, sym:'Pt', name:'Platinum',      mass:'195.084', cat:'transition-metal',   period:6, group:10, config:'[Xe] 4f¹⁴ 5d⁹ 6s¹', phase:'Solid',   melt:'1768.3°C', boil:'3825°C',   density:'21.45 g/cm³',discovery:'1748', desc:'A dense, malleable, ductile, precious, silver-white transition metal. Used in catalytic converters, jewelry, and laboratory equipment.' },
  { z:79, sym:'Au', name:'Gold',          mass:'196.967', cat:'transition-metal',   period:6, group:11, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s¹',phase:'Solid',   melt:'1064.2°C', boil:'2856°C',   density:'19.3 g/cm³', discovery:'ancient',desc:'The most iconic of metals. Highly valued for its rarity, malleability, conductivity, and resistance to corrosion throughout human history.' },
  { z:80, sym:'Hg', name:'Mercury',       mass:'200.592', cat:'transition-metal',   period:6, group:12, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s²',phase:'Liquid',  melt:'-38.8°C',  boil:'356.7°C',  density:'13.53 g/cm³',discovery:'ancient',desc:'The only metal liquid at standard conditions. Used in thermometers, barometers, and fluorescent lamps. Highly toxic.' },
  { z:81, sym:'Tl', name:'Thallium',      mass:'204.383', cat:'post-transition',    period:6, group:13, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹',phase:'Solid', melt:'304°C',   boil:'1473°C',   density:'11.85 g/cm³',discovery:'1861', desc:'A soft, gray post-transition metal. Highly toxic. Used in infrared detectors, low-temperature thermometers, and historically as a poison.' },
  { z:82, sym:'Pb', name:'Lead',          mass:'207.2',   cat:'post-transition',    period:6, group:14, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',phase:'Solid', melt:'327.5°C',  boil:'1749°C',   density:'11.34 g/cm³',discovery:'ancient',desc:'A heavy metal with a long history of use in plumbing, batteries, and paints. Highly toxic, leading to global campaigns to reduce its use.' },
  { z:83, sym:'Bi', name:'Bismuth',       mass:'208.980', cat:'post-transition',    period:6, group:15, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³',phase:'Solid', melt:'271.4°C',  boil:'1564°C',   density:'9.79 g/cm³', discovery:'1753', desc:'A brittle metal with a distinctive pink/silver color. Used in cosmetics, pharmaceuticals, and as a lead substitute in ammunition.' },
  { z:84, sym:'Po', name:'Polonium',      mass:'(209)',   cat:'post-transition',    period:6, group:16, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴',phase:'Solid', melt:'254°C',    boil:'962°C',    density:'9.32 g/cm³', discovery:'1898', desc:'A highly radioactive metal discovered by Marie Curie. Used in nuclear batteries and anti-static devices. Extremely toxic.' },
  { z:85, sym:'At', name:'Astatine',      mass:'(210)',   cat:'halogen',            period:6, group:17, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵',phase:'Solid', melt:'302°C',    boil:'337°C',    density:'~7 g/cm³',   discovery:'1940', desc:'The rarest naturally occurring element on Earth, with less than 30 grams present at any time. Highly radioactive halogen.' },
  { z:86, sym:'Rn', name:'Radon',         mass:'(222)',   cat:'noble-gas',          period:6, group:18, config:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶',phase:'Gas',  melt:'-71°C',    boil:'-61.7°C',  density:'9.73 g/L',   discovery:'1900', desc:'A colorless, odorless, radioactive noble gas. The second most frequent cause of lung cancer after smoking due to natural seepage from soil.' },
  { z:87, sym:'Fr', name:'Francium',      mass:'(223)',   cat:'alkali-metal',       period:7, group:1,  config:'[Rn] 7s¹',           phase:'Solid',   melt:'27°C',     boil:'677°C',    density:'~1.87 g/cm³',discovery:'1939', desc:'The second rarest naturally occurring element. Highly unstable and radioactive. All its isotopes have very short half-lives.' },
  { z:88, sym:'Ra', name:'Radium',        mass:'(226)',   cat:'alkaline-earth',     period:7, group:2,  config:'[Rn] 7s²',           phase:'Solid',   melt:'700°C',    boil:'1737°C',   density:'5 g/cm³',    discovery:'1898', desc:'A radioactive metal discovered by Marie and Pierre Curie. Used historically in luminous paints and radiotherapy before its toxicity was recognized.' },
  { z:89, sym:'Ac', name:'Actinium',      mass:'(227)',   cat:'actinide',           period:7, group:3,  config:'[Rn] 6d¹ 7s²',      phase:'Solid',   melt:'1051°C',   boil:'3198°C',   density:'10.07 g/cm³',discovery:'1899', desc:'A radioactive metallic element. Found in uranium ores. The actinide series is named after it. Used in neutron sources and cancer treatment.' },
  { z:90, sym:'Th', name:'Thorium',       mass:'232.038', cat:'actinide',           period:7, group:null,config:'[Rn] 6d² 7s²',     phase:'Solid',   melt:'1750°C',   boil:'4788°C',   density:'11.7 g/cm³', discovery:'1829', desc:'A naturally radioactive metal. About 3-4× more abundant than uranium. Proposed as an alternative nuclear fuel for molten salt reactors.' },
  { z:91, sym:'Pa', name:'Protactinium',  mass:'231.036', cat:'actinide',           period:7, group:null,config:'[Rn] 5f² 6d¹ 7s²', phase:'Solid',   melt:'1568°C',   boil:'4027°C',   density:'15.37 g/cm³',discovery:'1913', desc:'A dense, silvery-gray metal. One of the rarest and most expensive naturally occurring elements. Highly toxic and radioactive.' },
  { z:92, sym:'U',  name:'Uranium',       mass:'238.029', cat:'actinide',           period:7, group:null,config:'[Rn] 5f³ 6d¹ 7s²', phase:'Solid',   melt:'1135°C',   boil:'4131°C',   density:'19.1 g/cm³', discovery:'1789', desc:'A dense, silvery-gray, slightly radioactive metal. Fuel for nuclear reactors and material for nuclear weapons. Named after the planet Uranus.' },
  { z:93, sym:'Np', name:'Neptunium',     mass:'(237)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f⁴ 6d¹ 7s²', phase:'Solid',   melt:'644°C',    boil:'4000°C',   density:'20.25 g/cm³',discovery:'1940', desc:'The first transuranic element to be synthesized. Radioactive and fissile. Named after the planet Neptune. Used in neutron detectors.' },
  { z:94, sym:'Pu', name:'Plutonium',     mass:'(244)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f⁶ 7s²',     phase:'Solid',   melt:'640°C',    boil:'3228°C',   density:'19.86 g/cm³',discovery:'1940', desc:'An actinide metal of silvery-gray appearance. Used in nuclear weapons and as fuel in nuclear reactors. Extremely toxic and radioactive.' },
  { z:95, sym:'Am', name:'Americium',     mass:'(243)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f⁷ 7s²',     phase:'Solid',   melt:'1176°C',   boil:'2011°C',   density:'13.69 g/cm³',discovery:'1944', desc:'A transuranic radioactive metal. Used in smoke detectors worldwide (as Am-241) and in neutron sources. First produced in the Manhattan Project.' },
  { z:96, sym:'Cm', name:'Curium',        mass:'(247)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f⁷ 6d¹ 7s²', phase:'Solid',   melt:'1345°C',   boil:'3110°C',   density:'13.51 g/cm³',discovery:'1944', desc:'Named after Marie and Pierre Curie. An extremely radioactive synthetic element. Used as an alpha particle source in space exploration.' },
  { z:97, sym:'Bk', name:'Berkelium',     mass:'(247)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f⁹ 7s²',     phase:'Solid',   melt:'986°C',    boil:'unknown',  density:'14.78 g/cm³',discovery:'1949', desc:'Named after the city of Berkeley, California where it was first synthesized. A synthetic radioactive element with no known uses outside of research.' },
  { z:98, sym:'Cf', name:'Californium',   mass:'(251)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f¹⁰ 7s²',    phase:'Solid',   melt:'900°C',    boil:'unknown',  density:'15.1 g/cm³', discovery:'1950', desc:'Named after the US state of California. Used as a neutron source for treating certain cancers and in portable metal detectors.' },
  { z:99, sym:'Es', name:'Einsteinium',   mass:'(252)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f¹¹ 7s²',    phase:'Solid',   melt:'860°C',    boil:'996°C',    density:'8.84 g/cm³', discovery:'1952', desc:'Named after Albert Einstein. A synthetic, radioactive element first found in the fallout of the first hydrogen bomb test. No practical uses.' },
  { z:100,sym:'Fm', name:'Fermium',       mass:'(257)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f¹² 7s²',    phase:'Solid',   melt:'1527°C',   boil:'unknown',  density:'unknown',    discovery:'1952', desc:'Named after Enrico Fermi. A synthetic, radioactive element. Only tiny amounts have been produced; no practical applications exist.' },
  { z:101,sym:'Md', name:'Mendelevium',   mass:'(258)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f¹³ 7s²',    phase:'Solid',   melt:'827°C',    boil:'unknown',  density:'unknown',    discovery:'1955', desc:'Named after Dmitri Mendeleev, creator of the periodic table. A synthetic transuranic element produced in minute quantities only.' },
  { z:102,sym:'No', name:'Nobelium',      mass:'(259)',   cat:'actinide',           period:7, group:null,config:'[Rn] 5f¹⁴ 7s²',    phase:'Solid',   melt:'827°C',    boil:'unknown',  density:'unknown',    discovery:'1966', desc:'Named after Alfred Nobel. A synthetic transuranic element. Produced in only minute quantities; no practical applications are known.' },
  { z:103,sym:'Lr', name:'Lawrencium',    mass:'(266)',   cat:'actinide',           period:7, group:3,  config:'[Rn] 5f¹⁴ 7s² 7p¹', phase:'Solid',   melt:'1627°C',   boil:'unknown',  density:'unknown',    discovery:'1961', desc:'Named after Ernest Orlando Lawrence. The last actinide element. Produced in particle accelerators only; no practical uses.' },
  { z:104,sym:'Rf', name:'Rutherfordium', mass:'(267)',   cat:'transition-metal',   period:7, group:4,  config:'[Rn] 5f¹⁴ 6d² 7s²', phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1969', desc:'Named after Ernest Rutherford. A synthetic transuranic element. Only a few atoms have been created; properties are poorly understood.' },
  { z:105,sym:'Db', name:'Dubnium',       mass:'(268)',   cat:'transition-metal',   period:7, group:5,  config:'[Rn] 5f¹⁴ 6d³ 7s²', phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1968', desc:'Named after Dubna, Russia. A synthetic transuranic element. Only a few atoms exist at any time; completely radioactive with no uses.' },
  { z:106,sym:'Sg', name:'Seaborgium',    mass:'(271)',   cat:'transition-metal',   period:7, group:6,  config:'[Rn] 5f¹⁴ 6d⁴ 7s²', phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1974', desc:'Named after Glenn T. Seaborg. A synthetic, radioactive element existing only in trace amounts. No practical applications.' },
  { z:107,sym:'Bh', name:'Bohrium',       mass:'(272)',   cat:'transition-metal',   period:7, group:7,  config:'[Rn] 5f¹⁴ 6d⁵ 7s²', phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1981', desc:'Named after Niels Bohr. A synthetic, extremely radioactive element with extremely short half-lives. No uses outside of scientific research.' },
  { z:108,sym:'Hs', name:'Hassium',       mass:'(277)',   cat:'transition-metal',   period:7, group:8,  config:'[Rn] 5f¹⁴ 6d⁶ 7s²', phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1984', desc:'Named after the German state of Hesse. A synthetic superheavy element. Only a few atoms have ever been created in particle accelerators.' },
  { z:109,sym:'Mt', name:'Meitnerium',    mass:'(278)',   cat:'unknown',            period:7, group:9,  config:'[Rn] 5f¹⁴ 6d⁷ 7s²', phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1982', desc:'Named after physicist Lise Meitner. An extremely radioactive synthetic element. No practical uses; properties are mostly theoretical.' },
  { z:110,sym:'Ds', name:'Darmstadtium',  mass:'(281)',   cat:'unknown',            period:7, group:10, config:'[Rn] 5f¹⁴ 6d⁹ 7s¹', phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1994', desc:'Named after Darmstadt, Germany. One of the most recently discovered elements. Extremely unstable; only a few atoms have been synthesized.' },
  { z:111,sym:'Rg', name:'Roentgenium',   mass:'(282)',   cat:'unknown',            period:7, group:11, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s¹',phase:'Solid',   melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1994', desc:'Named after Wilhelm Röntgen. An extremely radioactive synthetic element. Only a few atoms created; properties predicted computationally.' },
  { z:112,sym:'Cn', name:'Copernicium',   mass:'(285)',   cat:'transition-metal',   period:7, group:12, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s²',phase:'Gas?',    melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1996', desc:'Named after Nicolaus Copernicus. May behave more like a noble gas than a metal due to relativistic effects. Extremely short-lived.' },
  { z:113,sym:'Nh', name:'Nihonium',      mass:'(286)',   cat:'post-transition',    period:7, group:13, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹',phase:'Solid', melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'2004', desc:'Named after Japan (Nihon). First element discovered in Asia. An extremely unstable synthetic element with very short half-lives.' },
  { z:114,sym:'Fl', name:'Flerovium',     mass:'(289)',   cat:'post-transition',    period:7, group:14, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²',phase:'Solid', melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'1999', desc:'Named after the Flerov Laboratory. May have noble-gas-like properties due to relativistic effects. Extremely short-lived radioactive element.' },
  { z:115,sym:'Mc', name:'Moscovium',     mass:'(290)',   cat:'post-transition',    period:7, group:15, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³',phase:'Solid', melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'2003', desc:'Named after Moscow Oblast. A synthetic element. Only a few atoms have been confirmed. Properties are largely unknown and theoretical.' },
  { z:116,sym:'Lv', name:'Livermorium',   mass:'(293)',   cat:'post-transition',    period:7, group:16, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴',phase:'Solid', melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'2000', desc:'Named after Lawrence Livermore National Laboratory. A superheavy synthetic element with very short half-lives. No practical uses.' },
  { z:117,sym:'Ts', name:'Tennessine',    mass:'(294)',   cat:'halogen',            period:7, group:17, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵',phase:'Solid', melt:'unknown',  boil:'unknown',  density:'unknown',    discovery:'2010', desc:'Named after Tennessee, USA. A superheavy synthetic element. Confirmed in 2016. Expected to be a solid metal unlike other halogens.' },
  { z:118,sym:'Og', name:'Oganesson',     mass:'(294)',   cat:'noble-gas',          period:7, group:18, config:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶',phase:'Solid?', melt:'unknown', boil:'unknown',  density:'unknown',    discovery:'2002', desc:'The heaviest element on the periodic table. Named after Yuri Oganessian. May be a solid at standard conditions unlike other noble gases.' },
];

// ═══════════════════════════════════════════════════════
//  CATEGORY METADATA
// ═══════════════════════════════════════════════════════
const CATEGORIES = [
  { id:'alkali-metal',      label:'Alkali Metal',       color:'var(--c-alkali)' },
  { id:'alkaline-earth',    label:'Alkaline Earth',     color:'var(--c-alkaline)' },
  { id:'transition-metal',  label:'Transition Metal',   color:'var(--c-transition)' },
  { id:'post-transition',   label:'Post-Transition',    color:'var(--c-post)' },
  { id:'metalloid',         label:'Metalloid',          color:'var(--c-metalloid)' },
  { id:'reactive-nonmetal', label:'Reactive Nonmetal',  color:'var(--c-nonmetal)' },
  { id:'halogen',           label:'Halogen',            color:'var(--c-halogen)' },
  { id:'noble-gas',         label:'Noble Gas',          color:'var(--c-noble)' },
  { id:'lanthanide',        label:'Lanthanide',         color:'var(--c-lanthanide)' },
  { id:'actinide',          label:'Actinide',           color:'var(--c-actinide)' },
  { id:'unknown',           label:'Unknown',            color:'var(--c-unknown)' },
];

// ═══════════════════════════════════════════════════════
//  GRID LAYOUT MAP  [period, group] → 1-based col index
//  Groups 1-18. Lanthanides/actinides go in extra rows.
// ═══════════════════════════════════════════════════════

// Build element lookup by Z
const byZ = {};
ELEMENTS.forEach(e => byZ[e.z] = e);

// ═══════════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════════
function getCatColor(cat) {
  const c = CATEGORIES.find(x => x.id === cat);
  return c ? c.color : 'var(--c-unknown)';
}

function formatCatLabel(cat) {
  const c = CATEGORIES.find(x => x.id === cat);
  return c ? c.label : 'Unknown';
}

function buildLegend() {
  const wrap = document.getElementById('legend');
  CATEGORIES.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.dataset.cat = cat.id;
    item.innerHTML = `<span class="legend-dot" style="background:${cat.color}"></span>${cat.label}`;
    item.addEventListener('click', () => filterByCategory(cat.id));
    wrap.appendChild(item);
  });
}

let activeFilter = null;

function filterByCategory(catId) {
  if (activeFilter === catId) {
    activeFilter = null;
    document.querySelectorAll('.element').forEach(el => el.classList.remove('dimmed'));
    document.querySelectorAll('.legend-item').forEach(li => li.style.color = '');
  } else {
    activeFilter = catId;
    document.querySelectorAll('.element').forEach(el => {
      el.classList.toggle('dimmed', el.dataset.cat !== catId);
    });
    document.querySelectorAll('.legend-item').forEach(li => {
      li.style.color = li.dataset.cat === catId ? 'var(--text-primary)' : '';
    });
  }
}

function makeCell(el, delay = 0) {
  const div = document.createElement('div');
  div.className = `element cat-${el.cat}`;
  div.dataset.z   = el.z;
  div.dataset.cat = el.cat;
  div.style.animationDelay = `${delay}ms`;
  div.innerHTML = `
    <div class="el-number">${el.z}</div>
    <div class="el-symbol">${el.sym}</div>
    <div class="el-name">${el.name}</div>
    <div class="el-mass">${el.mass}</div>
  `;
  div.addEventListener('click', () => openPanel(el));
  div.addEventListener('mouseenter', (e) => showTooltip(e, el));
  div.addEventListener('mouseleave', hideTooltip);
  return div;
}

function makeSpacerCell(cols = 1) {
  const div = document.createElement('div');
  div.className = 'element spacer';
  div.style.gridColumn = `span ${cols}`;
  return div;
}

function buildTable() {
  const table = document.getElementById('periodic-table');

  // ── Period 1 ──────────────────────────────────────────
  table.appendChild(makeCell(byZ[1], 0));
  table.appendChild(makeSpacerCell(16));
  table.appendChild(makeCell(byZ[2], 10));

  // ── Period 2 ──────────────────────────────────────────
  table.appendChild(makeCell(byZ[3], 20));
  table.appendChild(makeCell(byZ[4], 25));
  table.appendChild(makeSpacerCell(10));
  for (let z = 5; z <= 10; z++) table.appendChild(makeCell(byZ[z], 30 + (z-5)*5));

  // ── Period 3 ──────────────────────────────────────────
  table.appendChild(makeCell(byZ[11], 40));
  table.appendChild(makeCell(byZ[12], 45));
  table.appendChild(makeSpacerCell(10));
  for (let z = 13; z <= 18; z++) table.appendChild(makeCell(byZ[z], 50 + (z-13)*5));

  // ── Period 4 ──────────────────────────────────────────
  for (let z = 19; z <= 36; z++) table.appendChild(makeCell(byZ[z], 55 + (z-19)*4));

  // ── Period 5 ──────────────────────────────────────────
  for (let z = 37; z <= 54; z++) table.appendChild(makeCell(byZ[z], 130 + (z-37)*4));

  // ── Period 6 ──────────────────────────────────────────
  // Cs, Ba
  table.appendChild(makeCell(byZ[55], 200));
  table.appendChild(makeCell(byZ[56], 204));
  // La placeholder cell
  const laRef = document.createElement('div');
  laRef.className = 'element la-ac-label';
  laRef.textContent = '57–71';
  laRef.style.animationDelay = '208ms';
  table.appendChild(laRef);
  // Hf–Rn
  for (let z = 72; z <= 86; z++) table.appendChild(makeCell(byZ[z], 210 + (z-72)*4));

  // ── Period 7 ──────────────────────────────────────────
  table.appendChild(makeCell(byZ[87], 270));
  table.appendChild(makeCell(byZ[88], 274));
  const acRef = document.createElement('div');
  acRef.className = 'element la-ac-label';
  acRef.textContent = '89–103';
  acRef.style.animationDelay = '278ms';
  table.appendChild(acRef);
  for (let z = 104; z <= 118; z++) table.appendChild(makeCell(byZ[z], 280 + (z-104)*4));

  // ── Gap ───────────────────────────────────────────────
  const gap = document.createElement('div');
  gap.className = 'la-ac-gap';
  gap.style.gridColumn = '1 / -1';
  table.appendChild(gap);

  // ── Lanthanides Row ───────────────────────────────────
  const laLabel = document.createElement('div');
  laLabel.className = 'element la-ac-label';
  laLabel.textContent = 'La';
  laLabel.style.gridColumn = '3 / span 1';
  table.appendChild(laLabel);
  for (let z = 57; z <= 71; z++) {
    const cell = makeCell(byZ[z], 300 + (z-57)*5);
    table.appendChild(cell);
  }

  // ── Actinides Row ─────────────────────────────────────
  const acLabel = document.createElement('div');
  acLabel.className = 'element la-ac-label';
  acLabel.textContent = 'Ac';
  acLabel.style.gridColumn = '3 / span 1';
  table.appendChild(acLabel);
  for (let z = 89; z <= 103; z++) {
    const cell = makeCell(byZ[z], 370 + (z-89)*5);
    table.appendChild(cell);
  }
}

// ═══════════════════════════════════════════════════════
//  DETAIL PANEL
// ═══════════════════════════════════════════════════════
function openPanel(el) {
  const panel = document.getElementById('detail-panel');
  const catColor = getCatColor(el.cat);

  panel.style.setProperty('--cat-color-panel', catColor);

  panel.querySelector('.panel-symbol').textContent = el.sym;
  panel.querySelector('.panel-name').textContent   = el.name;
  panel.querySelector('.panel-number').textContent = `Atomic Number: ${el.z}`;

  panel.querySelector('#prop-mass').textContent    = el.mass + ' u';
  panel.querySelector('#prop-phase').textContent   = el.phase;
  panel.querySelector('#prop-melt').textContent    = el.melt;
  panel.querySelector('#prop-boil').textContent    = el.boil;
  panel.querySelector('#prop-density').textContent = el.density;
  panel.querySelector('#prop-discovery').textContent = el.discovery;
  panel.querySelector('#prop-category').textContent = formatCatLabel(el.cat);
  panel.querySelector('.electron-config').textContent = el.config;
  panel.querySelector('.panel-description').textContent = el.desc;

  // Mini spectrum preview
  const canvas = document.getElementById('panel-spectrum-canvas');
  if (canvas && typeof generateSpectralLines === 'function') {
    const ctx   = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    const lines = generateSpectralLines(el.z);
    lines.forEach(line => {
      const x = ((line.wl - 200) / 800) * w;
      const color = wavelengthToRGB(line.wl);
      ctx.strokeStyle = color;
      ctx.globalAlpha = line.int / 100;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(x, h - (line.int / 100) * h * 0.9); ctx.stroke();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
  const link = document.getElementById('panel-spectrum-link');
  if (link) link.href = `spectral.html?z=${el.z}`;

  panel.classList.add('open');
  document.querySelectorAll('.element').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.element[data-z="${el.z}"]`)?.classList.add('selected');
}

function closePanel() {
  document.getElementById('detail-panel').classList.remove('open');
  document.querySelectorAll('.element').forEach(c => c.classList.remove('selected'));
}

// ═══════════════════════════════════════════════════════
//  TOOLTIP
// ═══════════════════════════════════════════════════════
const tooltip = document.getElementById('tooltip');

function showTooltip(e, el) {
  tooltip.innerHTML = `<b>${el.name}</b> &nbsp;·&nbsp; ${el.sym} &nbsp;·&nbsp; Z=${el.z} &nbsp;·&nbsp; ${formatCatLabel(el.cat)}`;
  tooltip.style.display = 'block';
  moveTooltip(e);
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

document.addEventListener('mousemove', e => {
  if (tooltip.style.display === 'block') moveTooltip(e);
});

function moveTooltip(e) {
  let x = e.clientX + 14, y = e.clientY + 14;
  if (x + 280 > window.innerWidth)  x = e.clientX - 290;
  if (y + 60  > window.innerHeight) y = e.clientY - 50;
  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
}




// ═══════════════════════════════════════════════════════
//  INIT — only runs on the periodic table page (index.html)
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Guard: only initialise if periodic table DOM is present
  if (!document.getElementById('periodic-table')) return;

  buildLegend();
  buildTable();
  document.querySelector('.panel-close').addEventListener('click', closePanel);
  // Close panel on outside click
  document.addEventListener('click', e => {
    const panel = document.getElementById('detail-panel');
    if (panel.classList.contains('open') &&
        !panel.contains(e.target) &&
        !e.target.closest('.element[data-z]')) {
      closePanel();
    }
  });
});