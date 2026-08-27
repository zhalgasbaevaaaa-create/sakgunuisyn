import React, { useState } from 'react';
import { STATES_DATA } from '../data/historyData';
import { ZoomIn, ZoomOut, RotateCcw, Info, MapPin, Sparkles, Navigation, Layers, ExternalLink } from 'lucide-react';

export default function InteractiveMap({ onSelectState }) {
  const [selectedStateId, setSelectedStateId] = useState('saka');
  const [eraFilter, setEraFilter] = useState('all'); // 'all', 'early', 'late'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [showRoutes, setShowRoutes] = useState(true);

  const selectedState = STATES_DATA.find((s) => s.id === selectedStateId) || STATES_DATA[0];

  // Zoom / Pan handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Regions definition in SVG coordinates (width 1000, height 550)
  // Maps Central Eurasia: W. Kazakhstan, Zhetysu, Syr Darya, Mongolia, Black Sea
  const mapRegions = [
    {
      id: 'scythians',
      name: 'Скифтер',
      period: 'б.з.б. VIII–III ғғ.',
      color: '#3b82f6', // Blue
      era: 'early',
      path: 'M 100,240 C 120,200 180,190 260,210 C 290,230 300,270 270,300 C 220,330 150,320 100,280 Z',
      center: { x: 190, y: 250 },
      capital: 'Scythian Neapolis (Қырым)',
      capitalPos: { x: 180, y: 280 }
    },
    {
      id: 'sarmatians',
      name: 'Сарматтар',
      period: 'б.з.б. III ғ. – б.з. IV ғ.',
      color: '#e11d48', // Red
      era: 'late',
      path: 'M 250,220 C 300,180 420,180 480,220 C 500,280 460,340 370,360 C 300,360 250,300 250,220 Z',
      center: { x: 360, y: 260 },
      capital: 'Орталық астанасы анықталмаған',
      capitalPos: { x: 370, y: 280 }
    },
    {
      id: 'saka',
      name: 'Сақтар',
      period: 'б.з.б. VIII–III ғғ.',
      color: '#d4af37', // Gold
      era: 'early',
      path: 'M 460,240 C 530,200 680,210 740,260 C 730,340 620,390 480,360 C 440,320 440,270 460,240 Z',
      center: { x: 570, y: 290 },
      capital: 'Біртұтас астанасы болмаған',
      capitalPos: { x: 580, y: 310 }
    },
    {
      id: 'huns',
      name: 'Ғұндар',
      period: 'б.з.б. III ғ. соңы – б.з. алғашқы ғғ.',
      color: '#10b981', // Emerald Green
      era: 'late',
      path: 'M 680,180 C 760,150 900,160 950,220 C 940,310 820,350 710,310 C 660,260 660,200 680,180 Z',
      center: { x: 800, y: 230 },
      capital: 'Longcheng (Лунчэн)',
      capitalPos: { x: 810, y: 240 }
    },
    {
      id: 'wusun',
      name: 'Үйсіндер',
      period: 'б.з.б. II ғ. – б.з. V ғ.',
      color: '#8b5cf6', // Purple
      era: 'late',
      path: 'M 560,300 C 620,280 690,300 700,350 C 690,400 620,410 560,380 C 540,350 540,320 560,300 Z',
      center: { x: 620, y: 340 },
      capital: 'Чигу (Қызыл аңғар)',
      capitalPos: { x: 630, y: 360 }
    },
    {
      id: 'kangju',
      name: 'Қаңлылар',
      period: 'б.з.б. II ғ. – б.з. IV ғ.',
      color: '#f59e0b', // Amber/Orange
      era: 'late',
      path: 'M 440,310 C 500,290 560,320 550,380 C 520,430 450,420 420,380 C 410,340 420,320 440,310 Z',
      center: { x: 480, y: 350 },
      capital: 'Юэни (қысқы) & Бэйтянь (жазғы)',
      capitalPos: { x: 485, y: 370 }
    }
  ];

  // Trade Routes Paths
  const silkRoadPath = "M 920,290 L 780,310 L 630,350 L 485,370 L 360,330 L 190,290";
  const syrDaryaPath = "M 550,260 L 520,310 L 480,360 L 440,390";

  return (
    <section id="map" className="py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Интерактивті Тарихи Атлас</span>
          </div>
          <h2 className="font-lora text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Ерте темір дәуірінің саяси картасы
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            Картадан сақтар, скифтер, сарматтар, ғұндар, үйсіндер және қаңлылардың тарихи мекендеген аумақтарын зерттеңіз. Аумақты басып, PDF-тегі толық деректерді қараңыз.
          </p>
        </div>

        {/* Map Control Bar */}
        <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-4 mb-6 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-4">
          {/* Era Filter Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              Кезеңдер:
            </span>
            <div className="flex bg-obsidian-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setEraFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  eraFilter === 'all'
                    ? 'bg-gold-500 text-obsidian-950 font-bold'
                    : 'text-slate-300 hover:text-gold-400'
                }`}
              >
                Барлық дәуір
              </button>
              <button
                onClick={() => setEraFilter('early')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  eraFilter === 'early'
                    ? 'bg-gold-500 text-obsidian-950 font-bold'
                    : 'text-slate-300 hover:text-gold-400'
                }`}
              >
                б.з.б. VIII–III ғғ. (Ерте)
              </button>
              <button
                onClick={() => setEraFilter('late')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  eraFilter === 'late'
                    ? 'bg-gold-500 text-obsidian-950 font-bold'
                    : 'text-slate-300 hover:text-gold-400'
                }`}
              >
                б.з.б. III ғ. – б.з. IV ғ. (Кейінгі)
              </button>
            </div>
          </div>

          {/* Quick State Selectors */}
          <div className="flex flex-wrap items-center gap-1.5">
            {mapRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedStateId(region.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  selectedStateId === region.id
                    ? 'bg-gold-500/20 text-gold-300 border-gold-500 font-bold shadow-md'
                    : 'bg-obsidian-950/60 text-slate-300 border-slate-800 hover:border-gold-500/30'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: region.color }}
                />
                <span>{region.name}</span>
              </button>
            ))}
          </div>

          {/* Map Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                showRoutes ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-obsidian-950 text-slate-400 border-slate-800'
              }`}
            >
              Сауда жолдары
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-obsidian-950 border border-slate-800 text-slate-300 hover:text-gold-400"
              title="Үлкейту"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-obsidian-950 border border-slate-800 text-slate-300 hover:text-gold-400"
              title="Кишірейту"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-lg bg-obsidian-950 border border-slate-800 text-slate-300 hover:text-gold-400"
              title="Бастапқы қалпы"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map & Detail Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive SVG Canvas Container with Antique Background */}
          <div className="lg:col-span-8 bg-obsidian-900 border border-gold-500/20 rounded-2xl overflow-hidden relative shadow-2xl min-h-[460px]">
            {/* Background Parchment Texture */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <img
                src="./images/map_background.jpg"
                alt="Map parchment"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hover Badge */}
            {hoveredRegion && (
              <div className="absolute top-4 left-4 z-20 bg-obsidian-950/90 border border-gold-400/40 p-3 rounded-xl backdrop-blur-md animate-fadeIn shadow-xl max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: hoveredRegion.color }}
                  />
                  <h4 className="font-lora text-sm font-bold text-gold-400">
                    {hoveredRegion.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">{hoveredRegion.period}</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Астана/Орталық: <span className="text-slate-200 font-semibold">{hoveredRegion.capital}</span>
                </p>
              </div>
            )}

            {/* SVG Canvas */}
            <div className="relative z-10 w-full h-full p-4 overflow-hidden flex items-center justify-center bg-transparent">
              <svg
                viewBox="0 0 1000 550"
                className="w-full h-auto max-h-[500px] transition-transform duration-300 cursor-grab active:cursor-grabbing"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
                }}
              >
                {/* Background Grid & Water Bodies */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212, 175, 55, 0.05)" strokeWidth="1"/>
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <rect width="1000" height="550" fill="url(#grid)" />

                {/* Seas / Rivers outlines for historical realism */}
                <path d="M 120,290 C 140,280 180,310 160,330 C 130,340 100,310 120,290 Z" fill="#14213d" opacity="0.7" stroke="#1d3557" />
                <path d="M 330,330 C 350,300 370,350 360,420 C 330,420 310,380 330,330 Z" fill="#14213d" opacity="0.7" stroke="#1d3557" />
                <path d="M 430,330 C 450,320 460,350 440,360 Z" fill="#14213d" opacity="0.7" stroke="#1d3557" />

                {/* Trade Routes overlay */}
                {showRoutes && (
                  <g opacity="0.6">
                    <path
                      d={silkRoadPath}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                    <path
                      d={syrDaryaPath}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    <text x="500" y="340" fill="#f59e0b" fontSize="10" fontFamily="sans-serif" fontStyle="italic">
                      Ұлы Жібек жолы
                    </text>
                    <text x="440" y="380" fill="#38bdf8" fontSize="10" fontFamily="sans-serif">
                      Сырдария
                    </text>
                  </g>
                )}

                {/* Region Polygons */}
                {mapRegions.map((region) => {
                  const isSelected = selectedStateId === region.id;
                  const isVisible = eraFilter === 'all' || region.era === eraFilter;

                  if (!isVisible) return null;

                  return (
                    <g key={region.id} className="transition-all duration-300">
                      <path
                        d={region.path}
                        fill={region.color}
                        fillOpacity={isSelected ? 0.45 : 0.25}
                        stroke={region.color}
                        strokeWidth={isSelected ? 3.5 : 2}
                        strokeDasharray={isSelected ? 'none' : '4 2'}
                        className="cursor-pointer transition-all hover:fill-opacity-50"
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedStateId(region.id)}
                        filter={isSelected ? 'url(#glow)' : undefined}
                      />

                      {/* Region Label */}
                      <text
                        x={region.center.x}
                        y={region.center.y}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#e2e8f0'}
                        fontSize={isSelected ? '16' : '13'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fontFamily="Lora, Georgia, serif"
                        className="pointer-events-none select-none drop-shadow-md"
                      >
                        {region.name}
                      </text>

                      {/* Capital Marker Pin */}
                      <g
                        transform={`translate(${region.capitalPos.x}, ${region.capitalPos.y})`}
                        className="cursor-pointer group"
                        onClick={() => setSelectedStateId(region.id)}
                      >
                        <circle r="4" fill="#d4af37" stroke="#0b0d12" strokeWidth="1.5" />
                        <circle r="8" fill="#d4af37" opacity="0.3" className="animate-ping" />
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Map Legend */}
            <div className="relative z-10 bg-obsidian-950/80 px-4 py-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                Картадағы белгішені немесе аумақты басып, толық мазмұнын оқыңыз
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400 inline-block" />
                  Сақ-Скиф өркениеті
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  Ғұн-Үйсін-Қаңлы
                </span>
              </div>
            </div>
          </div>

          {/* Right Selected State Details Panel (100% PDF content) */}
          <div className="lg:col-span-4 bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: selectedState.mapColor }}
                />
                <h3 className="font-lora text-xl font-bold text-slate-100">
                  {selectedState.name}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold">
                {selectedState.period}
              </span>
            </div>

            {/* State Visual Image */}
            <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-gold-500/20 group">
              <img
                src={selectedState.image}
                alt={selectedState.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-xs text-slate-200 font-lora italic bg-obsidian-950/80 p-2 rounded-lg border border-gold-500/20">
                {selectedState.shortDescription}
              </div>
            </div>

            {/* Content Tabbed Info */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 text-xs">
              {/* Territory List */}
              <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800">
                <h4 className="font-semibold text-gold-400 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Территориясы (PDF дерегі):
                </h4>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                  {selectedState.territory.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              {/* Capital Details */}
              <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800">
                <h4 className="font-semibold text-gold-400 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Астанасы / Орталығы:
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {selectedState.capitalNote}
                </p>
              </div>

              {/* Specific Rulers & Stats if available */}
              {selectedState.rulers && (
                <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800">
                  <h4 className="font-semibold text-gold-400 mb-1">Негізгі Билеушілері:</h4>
                  <ul className="space-y-1 text-slate-300">
                    {selectedState.rulers.map((r, i) => (
                      <li key={i} className="border-b border-slate-800/50 pb-1 last:border-0">
                        <strong className="text-slate-100">{r.name}</strong> — {r.role || r.achievements?.join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Kangju Stats special display */}
              {selectedState.stats && (
                <div className="p-3 bg-gold-500/10 rounded-xl border border-gold-500/20 text-gold-300">
                  <h4 className="font-semibold mb-1">Халық және Әскер Саны («Ханьшу»):</h4>
                  <p>• Түтін саны: {selectedState.stats.households}</p>
                  <p>• Халық саны: {selectedState.stats.population}</p>
                  <p>• Әскер күші: {selectedState.stats.army}</p>
                  <p className="text-[10px] text-slate-400 mt-1 italic">{selectedState.stats.note}</p>
                </div>
              )}

              {/* Conclusion */}
              <div className="p-3 bg-obsidian-950 rounded-xl border border-gold-500/20">
                <h4 className="font-semibold text-gold-400 mb-1">Тарихи маңызы:</h4>
                <p className="text-slate-300 italic">
                  {selectedState.conclusion}
                </p>
              </div>
            </div>

            {/* Bottom Button to view full state section */}
            <button
              onClick={() => onSelectState(selectedState.id)}
              className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg"
            >
              <span>Толық бөлімге өту ({selectedState.name})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
