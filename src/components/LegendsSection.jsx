import React, { useState } from 'react';
import { MYTHS_AND_LEGENDS } from '../data/historyData';
import { Scroll, Sparkles, AlertCircle, Maximize2, Minimize2, ChevronDown, ChevronUp, ZoomIn, ZoomOut } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export default function LegendsSection({ onToggleFullscreen, isFullscreen }) {
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');
  const [expandedCellId, setExpandedStateId] = useState(null);
  const [fontScaleMap, setFontScaleMap] = useState({});

  const stateOptions = [
    { id: 'all', label: 'Барлық аңыздар' },
    { id: 'saka', label: 'Сақтар аңыздары' },
    { id: 'wusun', label: 'Үйсіндер аңыздары' },
    { id: 'huns', label: 'Ғұндар аңыздары' },
    { id: 'kangju', label: 'Қаңлы аңыздары' },
  ];

  const filteredLegends = MYTHS_AND_LEGENDS.filter((item) => {
    if (selectedStateFilter === 'all') return true;
    return item.stateId === selectedStateFilter;
  });

  const toggleExpandCell = (id) => {
    setExpandedStateId(prev => (prev === id ? null : id));
  };

  const changeFontSize = (id, delta, e) => {
    e.stopPropagation();
    setFontScaleMap(prev => {
      const current = prev[id] || 1;
      const next = Math.max(0.85, Math.min(1.8, current + delta));
      return { ...prev, [id]: next };
    });
  };

  return (
    <section id="legends" className={`py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10 ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="mx-auto inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Scroll className="w-3.5 h-3.5" />
              <span>Тарихи Аңыздар мен Мифология</span>
            </div>

            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className="px-3 py-1.5 rounded-xl bg-obsidian-900 border border-gold-500/30 text-gold-400 hover:text-gold-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all"
                title="Толық экран режимі"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Шығу' : 'Толық экран'}</span>
              </button>
            )}
          </div>

          <h2 className="font-lora text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Ерте көшпелілер өркениетінің киелі аңыздары
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            Әрбір аңыз жеке ұяшыққа салынған. Ұяшықты басып үлкейтуге, кішірейтуге және шрифтін өзіңізге ыңғайлы көлемде өзгертуге болады.
          </p>
        </div>

        {/* State Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs">
          {stateOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedStateFilter(opt.id)}
              className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                selectedStateFilter === opt.id
                  ? 'bg-gold-500 text-obsidian-950 border-gold-500 shadow-md'
                  : 'bg-obsidian-900 text-slate-300 border-slate-800 hover:border-gold-500/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Expandable Legends Cells Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLegends.map((item) => {
            const isExpanded = expandedCellId === item.id;
            const fontScale = fontScaleMap[item.id] || 1;

            return (
              <div
                key={item.id}
                className={`bg-obsidian-900 border rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between ${
                  isExpanded
                    ? 'border-gold-500/60 ring-2 ring-gold-500/30 md:col-span-2 bg-obsidian-900/95'
                    : 'border-gold-500/20 hover:border-gold-500/40'
                }`}
              >
                {/* Cell Header */}
                <div
                  onClick={() => toggleExpandCell(item.id)}
                  className="p-5 border-b border-slate-800/80 cursor-pointer flex items-center justify-between gap-4 bg-gradient-to-r from-obsidian-900 via-obsidian-950 to-obsidian-900"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 font-semibold text-xs font-lora border border-gold-500/20">
                        {item.state}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="font-lora text-lg sm:text-xl font-bold text-slate-100">
                      {item.title}
                    </h3>
                  </div>

                  {/* Cell Controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center bg-obsidian-950 border border-slate-800 rounded-lg p-1 text-xs text-slate-300">
                      <button
                        onClick={(e) => changeFontSize(item.id, 0.15, e)}
                        className="p-1 hover:text-gold-400 font-bold"
                        title="Шрифтті үлкейту (A+)"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-1 text-[10px] font-mono text-gold-400">
                        {Math.round(fontScale * 100)}%
                      </span>
                      <button
                        onClick={(e) => changeFontSize(item.id, -0.15, e)}
                        className="p-1 hover:text-gold-400 font-bold"
                        title="Шрифтті кішірейту (A-)"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isExpanded
                          ? 'bg-gold-500 text-obsidian-950'
                          : 'bg-obsidian-800 text-gold-400 border border-gold-500/20'
                      }`}
                    >
                      <span>{isExpanded ? 'Ұяшықты кішірейту' : 'Ұяшықты үлкейту'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Cell Content */}
                <div
                  className="p-6 space-y-4 font-sans transition-all"
                  style={{ fontSize: `${fontScale}rem`, lineHeight: `${fontScale * 1.7}` }}
                >
                  {isExpanded && item.image && (
                    <div className="relative h-64 rounded-xl overflow-hidden border border-gold-500/20 mb-4 animate-fadeIn">
                      <img
                        src={getAssetUrl(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 text-slate-200">
                    <h4 className="font-lora font-bold text-gold-400 mb-1" style={{ fontSize: `${fontScale * 1.1}rem` }}>
                      Аңыздың мазмұны:
                    </h4>
                    <p className="leading-relaxed font-lora">
                      {item.content}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-300 space-y-1">
                    <h4 className="font-bold flex items-center gap-1.5" style={{ fontSize: `${fontScale * 1.05}rem` }}>
                      <AlertCircle className="w-4 h-4" /> Тарихи-ғылыми түсіндірме:
                    </h4>
                    <p className="italic leading-relaxed">{item.note}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
