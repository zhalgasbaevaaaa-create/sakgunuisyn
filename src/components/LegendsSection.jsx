import React, { useState } from 'react';
import { MYTHS_AND_LEGENDS } from '../data/historyData';
import { Scroll, Sparkles, BookOpen, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';

export default function LegendsSection({ onToggleFullscreen, isFullscreen }) {
  const [selectedMyth, setSelectedMyth] = useState(null);

  return (
    <section id="legends" className={`py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10 ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="mx-auto inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Scroll className="w-3.5 h-3.5" />
              <span>Аңыздар мен Тарихи Шындық</span>
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
            Ерте көшпелілердің киелі аңыздары мен мифологиясы
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            PDF-те арнайы талданған этногенетикалық аңыздар, билеуші әулеттердің тәңірлік тегін түсіндіретін мифтер және тарихи шынайылық.
          </p>
        </div>

        {/* Myths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MYTHS_AND_LEGENDS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMyth(item)}
              className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-500/50 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 font-semibold text-[11px] font-lora border border-gold-500/20">
                    {item.state}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    {item.type}
                  </span>
                </div>

                <h3 className="font-lora text-xl font-bold text-slate-100 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-4 leading-relaxed font-sans">
                  {item.content}
                </p>
              </div>

              <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 font-sans">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Тарихи-ғылыми түсіндірме:
                </span>
                <p className="line-clamp-2 italic">{item.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer */}
        {selectedMyth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-obsidian-900 border border-gold-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-gold-400 font-lora">{selectedMyth.state}</span>
                <span className="text-xs text-slate-400">{selectedMyth.type}</span>
              </div>

              <h3 className="font-lora text-2xl font-bold text-slate-100">
                {selectedMyth.title}
              </h3>

              <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-gold-400 text-xs uppercase tracking-wider">Аңыздың мазмұны:</h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">{selectedMyth.content}</p>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 space-y-2 text-xs text-amber-300">
                <h4 className="font-bold text-xs uppercase tracking-wider">Ғылыми-тарихи сараптама (PDF):</h4>
                <p className="leading-relaxed italic">{selectedMyth.note}</p>
              </div>

              <button
                onClick={() => setSelectedMyth(null)}
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
