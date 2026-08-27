import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/historyData';
import { Clock, Calendar, Swords, Info, ChevronRight, Filter } from 'lucide-react';

export default function TimelineSection() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const sortedEvents = [...TIMELINE_EVENTS].sort((a, b) => a.sortYear - b.sortYear);

  const filteredEvents = sortedEvents.filter((ev) => {
    if (activeFilter === 'all') return true;
    return ev.state.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="timeline" className="py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Интерактивті Хронология</span>
          </div>
          <h2 className="font-lora text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Ең маңызды соғыстар мен тарихи оқиғалар
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            PDF кестесіндегі барлық 11 негізгі даталар мен оқиғалардың хроникасы. Оқиғаны басып, толық мәліметпен танысыңыз.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs">
          <span className="text-slate-400 font-medium mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-gold-400" /> Сүзгі:
          </span>
          {['all', 'Сақ', 'Скиф', 'Сармат', 'Ғұн', 'Үйсін', 'Қаңлы'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full font-semibold border transition-all ${
                activeFilter === f
                  ? 'bg-gold-500 text-obsidian-950 border-gold-500 shadow-md'
                  : 'bg-obsidian-900 text-slate-300 border-slate-800 hover:border-gold-500/30'
              }`}
            >
              {f === 'all' ? 'Барлық оқиғалар' : f}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-amber-500 to-gold-700 opacity-30 sm:-translate-x-1/2" />

          <div className="space-y-8">
            {filteredEvents.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Timeline Dot Pin */}
                  <div className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-obsidian-950 border-2 border-gold-500 flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:bg-gold-500 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-gold-400 group-hover:bg-obsidian-950" />
                  </div>

                  {/* Event Card Wrapper */}
                  <div className="ml-10 sm:ml-0 sm:w-1/2 sm:px-6">
                    <div
                      onClick={() => setSelectedEvent(item)}
                      className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-500/50 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:-translate-y-1 transition-all cursor-pointer group-hover:shadow-gold-500/10 space-y-3"
                    >
                      {/* Date Badge & State */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs font-lora">
                          {item.year}
                        </span>
                        <span className="text-[11px] text-slate-400 font-sans">
                          {item.state}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="font-lora text-lg font-bold text-slate-100 group-hover:text-gold-300 transition-colors">
                        {item.title}
                      </h3>

                      {/* Outcome / Result */}
                      <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1 font-sans">
                        <strong className="text-gold-400 block font-lora">Нәтиже:</strong>
                        <p className="leading-relaxed">{item.result}</p>
                      </div>

                      {/* Action Link */}
                      <div className="flex items-center gap-1 text-[11px] text-gold-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Толық баяндауды көру</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Window for Event Details */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-obsidian-900 border border-gold-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs font-lora">
                  {selectedEvent.year}
                </span>
                <span className="text-xs text-slate-400">{selectedEvent.state}</span>
              </div>

              <h3 className="font-lora text-2xl font-bold text-slate-100">
                {selectedEvent.title}
              </h3>

              <div className="p-4 bg-obsidian-950 rounded-xl border border-gold-500/20 space-y-2">
                <h4 className="font-bold text-gold-400 text-xs uppercase tracking-wider">Шайқас/Оқиға нәтижесі (PDF):</h4>
                <p className="text-sm text-slate-200 leading-relaxed font-lora">{selectedEvent.result}</p>
              </div>

              <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">Толық сипаттамасы:</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{selectedEvent.details}</p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full py-2.5 bg-gold-500 text-obsidian-950 font-bold rounded-xl text-xs hover:opacity-95 transition-opacity"
              >
                Жабу
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
