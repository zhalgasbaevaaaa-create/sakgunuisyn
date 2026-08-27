import React, { useState } from 'react';
import { HISTORICAL_FIGURES } from '../data/historyData';
import { Users, User, Shield, BookOpen, Search, X, Sparkles, Award } from 'lucide-react';

export default function FiguresSection() {
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stateOptions = [
    { id: 'all', label: 'Барлығы' },
    { id: 'saka', label: 'Сақтар' },
    { id: 'scythians', label: 'Скифтер' },
    { id: 'huns', label: 'Ғұндар' },
    { id: 'wusun', label: 'Үйсіндер' },
    { id: 'kangju', label: 'Қаңлылар' },
  ];

  const filteredFigures = HISTORICAL_FIGURES.filter((fig) => {
    const matchesState = selectedStateFilter === 'all' || fig.stateId === selectedStateFilter;
    const matchesSearch =
      fig.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fig.pdfContent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <section id="figures" className="py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Тарихи Портреттер Галереясы</span>
          </div>
          <h2 className="font-lora text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Ерте темір дәуірінің көрнекті тұлғалары
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            PDF жазбаларында кездесетін Томирис, Мөде, Скунха, Елжау, Атей, Чжан Цянь сияқты саяси және әскери қайраткерлердің тарихи профильдері.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-4 mb-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* State Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1">Мемлекет:</span>
            {stateOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedStateFilter(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedStateFilter === opt.id
                    ? 'bg-gold-500 text-obsidian-950 font-bold border-gold-500 shadow-md'
                    : 'bg-obsidian-950/60 text-slate-300 border-slate-800 hover:border-gold-500/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Тұлға атын іздеу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-obsidian-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500/50"
            />
          </div>
        </div>

        {/* Figures Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFigures.map((fig) => (
            <div
              key={fig.id}
              onClick={() => setSelectedFigure(fig)}
              className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-obsidian-950">
                  <img
                    src={fig.image}
                    alt={fig.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-90" />
                  
                  {/* Reconstruction Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-gold-500/30 text-[10px] text-gold-300 flex items-center gap-1 font-sans">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    <span>{fig.reconstructionNote}</span>
                  </div>

                  {/* State Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-gold-500/20 backdrop-blur-md border border-gold-500/40 text-xs font-bold text-gold-300 font-lora">
                    {fig.stateName}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-2">
                  <h3 className="font-lora text-xl font-bold text-slate-100 group-hover:text-gold-400 transition-colors">
                    {fig.name}
                  </h3>
                  <p className="text-xs font-semibold text-gold-400/90 italic font-lora">
                    {fig.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Уақыты: <span className="text-slate-300">{fig.period}</span>
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed pt-2 font-sans border-t border-slate-800">
                    {fig.role}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFigure(fig);
                  }}
                  className="w-full py-2 bg-obsidian-950 group-hover:bg-gold-500 group-hover:text-obsidian-950 border border-gold-500/20 text-gold-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Толық профилін ашу</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Window for Full Profile Details */}
        {selectedFigure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-obsidian-900 border border-gold-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
              {/* Close Button */}
              <button
                onClick={() => setSelectedFigure(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-950 text-slate-400 hover:text-gold-400 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start border-b border-slate-800 pb-6">
                <div className="relative w-36 h-48 rounded-2xl overflow-hidden border-2 border-gold-500/30 flex-shrink-0 shadow-xl">
                  <img
                    src={selectedFigure.image}
                    alt={selectedFigure.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 to-transparent" />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedFigure.reconstructionNote}</span>
                  </div>
                  <h3 className="font-lora text-2xl sm:text-3xl font-bold text-slate-100">
                    {selectedFigure.name}
                  </h3>
                  <p className="font-lora text-gold-400 text-base italic">
                    {selectedFigure.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    Мемлекет/Кезең: <strong className="text-slate-200">{selectedFigure.stateName}</strong> ({selectedFigure.period})
                  </p>
                </div>
              </div>

              {/* Body Text */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-gold-400 text-xs uppercase tracking-wider">Тарихи рөлі мен қызметі:</h4>
                  <p>{selectedFigure.role}</p>
                </div>

                <div className="p-4 bg-obsidian-950 rounded-xl border border-gold-500/20 space-y-1">
                  <h4 className="font-bold text-gold-400 text-xs uppercase tracking-wider">PDF түпнұсқа дерегі:</h4>
                  <p className="text-slate-300 font-lora text-sm">{selectedFigure.pdfContent}</p>
                </div>

                <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Негізгі тарихи дереккөздер:</span>
                  <strong className="text-gold-300">{selectedFigure.primarySources}</strong>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedFigure(null)}
                  className="w-full py-3 bg-gold-500 text-obsidian-950 font-bold rounded-xl text-xs hover:opacity-95 transition-opacity"
                >
                  Жабу
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
