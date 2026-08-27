import React, { useState } from 'react';
import { STATES_DATA } from '../data/historyData';
import { BookOpen, Shield, MapPin, Swords, Scroll, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StatesSection({ activeStateId }) {
  const [expandedStateId, setExpandedStateId] = useState(activeStateId || 'saka');
  const [activeTabMap, setActiveTabMap] = useState({});

  const setTab = (stateId, tab) => {
    setActiveTabMap((prev) => ({ ...prev, [stateId]: tab }));
  };

  const getTab = (stateId) => activeTabMap[stateId] || 'overview';

  return (
    <section id="states" className="py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Негізгі Саяси Бірлестіктер</span>
          </div>
          <h2 className="font-lora text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Ерте темір дәуірінің 6 ірі мемлекеті мен одақтары
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            PDF-те берілген 100% түпнұсқа тарихи ақпарат. Әр мемлекеттің территориясы, астаналық орталықтары, билеушілері, соғыстары мен аңыздарын толық оқыңыз.
          </p>
        </div>

        {/* States Cards Container */}
        <div className="space-y-8">
          {STATES_DATA.map((state) => {
            const isExpanded = expandedStateId === state.id;
            const currentTab = getTab(state.id);

            return (
              <div
                key={state.id}
                id={`state-card-${state.id}`}
                className={`bg-obsidian-900 border rounded-2xl overflow-hidden transition-all duration-300 shadow-xl ${
                  isExpanded
                    ? 'border-gold-500/40 ring-1 ring-gold-500/20'
                    : 'border-gold-500/10 hover:border-gold-500/30'
                }`}
              >
                {/* Header Banner */}
                <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800/80">
                  {/* Background Image Layer with vignette */}
                  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <img
                      src={state.image}
                      alt={state.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian-900 via-obsidian-900/90 to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shadow-md"
                        style={{ backgroundColor: state.mapColor }}
                      />
                      <h3 className="font-lora text-2xl sm:text-3xl font-bold text-slate-100">
                        {state.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                        {state.period}
                      </span>
                    </div>
                    <p className="font-lora text-base sm:text-lg text-gold-300/90 italic">
                      {state.title}
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                      {state.shortDescription}
                    </p>
                  </div>

                  {/* Toggle Button */}
                  <div className="relative z-10 flex items-center gap-3 self-end md:self-center">
                    <button
                      onClick={() => setExpandedStateId(isExpanded ? null : state.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                        isExpanded
                          ? 'bg-gold-500 text-obsidian-950 shadow-lg'
                          : 'bg-obsidian-800 hover:bg-obsidian-800/80 text-gold-400 border border-gold-500/30'
                      }`}
                    >
                      <span>{isExpanded ? 'Бөлімді жабу' : 'Толық материалды оқу'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 bg-obsidian-950/90 space-y-6 animate-fadeIn">
                    {/* Inner Tabs Navigation */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 text-xs">
                      <button
                        onClick={() => setTab(state.id, 'overview')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                          currentTab === 'overview'
                            ? 'bg-gold-500 text-obsidian-950 font-bold'
                            : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-slate-800'
                        }`}
                      >
                        Жалпы шолу & Территория
                      </button>
                      <button
                        onClick={() => setTab(state.id, 'capital')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                          currentTab === 'capital'
                            ? 'bg-gold-500 text-obsidian-950 font-bold'
                            : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-slate-800'
                        }`}
                      >
                        Астанасы / Орталығы
                      </button>
                      <button
                        onClick={() => setTab(state.id, 'rulers')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                          currentTab === 'rulers'
                            ? 'bg-gold-500 text-obsidian-950 font-bold'
                            : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-slate-800'
                        }`}
                      >
                        Билеушілер мен Тайпалар
                      </button>
                      <button
                        onClick={() => setTab(state.id, 'wars')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                          currentTab === 'wars'
                            ? 'bg-gold-500 text-obsidian-950 font-bold'
                            : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-slate-800'
                        }`}
                      >
                        Негізгі соғыстары
                      </button>
                      <button
                        onClick={() => setTab(state.id, 'legend')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                          currentTab === 'legend'
                            ? 'bg-gold-500 text-obsidian-950 font-bold'
                            : 'bg-obsidian-900 text-slate-300 hover:text-gold-400 border border-slate-800'
                        }`}
                      >
                        Аңыздар мен Деректер
                      </button>
                    </div>

                    {/* Tab 1: Overview & Territory */}
                    {currentTab === 'overview' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 bg-obsidian-900 rounded-xl border border-slate-800 space-y-2">
                            <h4 className="font-lora text-base font-bold text-gold-400 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Территориясы мен Мекендеген өңірлері
                            </h4>
                            <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                              {state.territory.map((t, idx) => (
                                <li key={idx} className="leading-relaxed">{t}</li>
                              ))}
                            </ul>
                          </div>

                          {state.historiographyNote && (
                            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-300 space-y-1">
                              <h4 className="font-bold uppercase tracking-wider">Тарихи-ғылыми ескертпе:</h4>
                              <p className="leading-relaxed">{state.historiographyNote}</p>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-obsidian-900 rounded-xl border border-slate-800 space-y-2">
                            <h4 className="font-lora text-base font-bold text-gold-400 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Тарихи маңызы мен қорытындысы
                            </h4>
                            <p className="text-sm text-slate-200 leading-relaxed italic font-lora">
                              "{state.conclusion}"
                            </p>
                          </div>

                          {state.stats && (
                            <div className="p-4 bg-obsidian-900 rounded-xl border border-gold-500/20 text-xs text-slate-300 space-y-2">
                              <h4 className="font-bold text-gold-400 text-sm">Демография және Әскер қуаты («Ханьшу»):</h4>
                              <p>• Түтін саны: <span className="font-bold text-slate-100">{state.stats.households}</span></p>
                              <p>• Халық саны: <span className="font-bold text-slate-100">{state.stats.population}</span></p>
                              <p>• Әскер күші: <span className="font-bold text-slate-100">{state.stats.army}</span></p>
                              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">{state.stats.note}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Capital Details */}
                    {currentTab === 'capital' && (
                      <div className="p-5 bg-obsidian-900 rounded-xl border border-gold-500/20 space-y-3">
                        <h4 className="font-lora text-lg font-bold text-gold-400 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-gold-400" />
                          Астанасы мен саяси орталығы жөніндегі PDF мазмұны
                        </h4>
                        <div className="p-4 bg-obsidian-950 rounded-lg border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans">
                          {state.capitalNote}
                        </div>
                        {state.rulerTitle && (
                          <div className="pt-2 text-xs text-gold-300">
                            <strong>Билеушісінің лауазымы (титулы):</strong> {state.rulerTitle}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 3: Rulers & Tribes */}
                    {currentTab === 'rulers' && (
                      <div className="space-y-4">
                        {state.tribes && (
                          <div className="p-4 bg-obsidian-900 rounded-xl border border-slate-800 space-y-3">
                            <h4 className="font-lora text-base font-bold text-gold-400">
                              Негізгі Тайпалары мен Топтары:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {state.tribes.map((tr, idx) => (
                                <div key={idx} className="p-3 bg-obsidian-950 rounded-lg border border-slate-800 text-xs">
                                  <h5 className="font-bold text-slate-100 text-sm">{tr.name}</h5>
                                  <p className="text-slate-400 mt-0.5">{tr.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {state.rulers && (
                          <div className="p-4 bg-obsidian-900 rounded-xl border border-slate-800 space-y-3">
                            <h4 className="font-lora text-base font-bold text-gold-400">
                              Белгілі Билеушілері:
                            </h4>
                            <div className="space-y-2">
                              {state.rulers.map((r, idx) => (
                                <div key={idx} className="p-3 bg-obsidian-950 rounded-lg border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div>
                                    <h5 className="font-bold text-gold-300 text-sm font-lora">{r.name}</h5>
                                    <p className="text-slate-300">{r.role}</p>
                                  </div>
                                  {r.achievements && (
                                    <div className="text-slate-400 text-[11px] max-w-md">
                                      {r.achievements.join(' • ')}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {state.externalTies && (
                          <div className="p-4 bg-obsidian-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                            <h4 className="font-bold text-gold-400 mb-2">Саяси Байланыстары:</h4>
                            <div className="flex flex-wrap gap-2">
                              {state.externalTies.map((tie, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-obsidian-950 rounded-md border border-slate-800">
                                  {tie}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 4: Wars */}
                    {currentTab === 'wars' && (
                      <div className="space-y-4">
                        <h4 className="font-lora text-lg font-bold text-gold-400 flex items-center gap-2">
                          <Swords className="w-5 h-5" />
                          Негізгі Соғыстары мен Шайқастары
                        </h4>
                        <div className="space-y-3">
                          {state.wars.map((w, idx) => (
                            <div key={idx} className="p-4 bg-obsidian-900 rounded-xl border border-gold-500/20 text-xs sm:text-sm space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                                <h5 className="font-bold text-slate-100 text-base font-lora">{w.name}</h5>
                                <span className="px-2.5 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold text-xs">
                                  {w.date}
                                </span>
                              </div>
                              <p className="text-slate-300 leading-relaxed">{w.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 5: Legends */}
                    {currentTab === 'legend' && (
                      <div className="p-5 bg-obsidian-900 rounded-xl border border-gold-500/20 space-y-3">
                        <h4 className="font-lora text-lg font-bold text-gold-400 flex items-center gap-2">
                          <Scroll className="w-5 h-5" />
                          Аңыздық деректер мен мифологиялық сюжеттер
                        </h4>
                        <p className="text-sm text-slate-200 leading-relaxed font-sans bg-obsidian-950 p-4 rounded-lg border border-slate-800">
                          {state.legend}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
