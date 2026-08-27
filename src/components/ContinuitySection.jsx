import React from 'react';
import { CONTINUITY_DATA } from '../data/historyData';
import { ShieldAlert, ArrowRight, BookOpen, Scroll, CheckCircle2, Maximize2, Minimize2 } from 'lucide-react';

export default function ContinuitySection({ onToggleFullscreen, isFullscreen }) {
  return (
    <section id="continuity" className={`py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10 ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="mx-auto inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Тарихи Сабақтастық & Дереккөздер</span>
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
            {CONTINUITY_DATA.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            {CONTINUITY_DATA.description}
          </p>
        </div>

        {/* Continuity Flow Diagram */}
        <div className="mb-16">
          <h3 className="font-lora text-xl font-bold text-gold-400 mb-6 text-center">
            Тарихи сабақтастық даму тізбегі:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CONTINUITY_DATA.chain.map((item) => (
              <div
                key={item.step}
                className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-500/50 rounded-2xl p-4 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs flex items-center justify-center font-lora">
                    {item.step}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Қадам</span>
                </div>

                <div>
                  <h4 className="font-lora font-bold text-slate-100 text-sm mb-1 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-obsidian-900 via-obsidian-950 to-obsidian-900 rounded-2xl border border-gold-500/30 text-center max-w-4xl mx-auto shadow-2xl">
            <h4 className="font-lora text-lg font-bold text-gold-400 mb-2">
              Ең маңызды ғылыми қорытынды:
            </h4>
            <p className="text-sm sm:text-base text-slate-200 font-lora italic leading-relaxed">
              «Сақ-сармат әлемі → ғұндық дәуірдің күшеюі → Үйсін және Қаңлы мемлекеттері → Орталық Азиядағы кейінгі түркі дәуіріне өтетін саяси-мәдени негіз.»
            </p>
          </div>
        </div>

        {/* Primary Sources Grid */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-lora text-2xl font-bold text-slate-100">
              Негізгі пайдаланылған тарихи дереккөздер
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Ерте темір дәуірінің мемлекеттері туралы дерек қалдырған көне авторлар мен патша жазбалары
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTINUITY_DATA.sources.map((src, idx) => (
              <div
                key={idx}
                className="bg-obsidian-900 border border-gold-500/20 hover:border-gold-500/40 rounded-2xl p-5 backdrop-blur-md shadow-lg space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-gold-400" />
                    <h4 className="font-lora text-lg font-bold text-slate-100">{src.name}</h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-300 text-[11px] font-semibold">
                    {src.origin}
                  </span>
                </div>

                <p className="font-lora font-semibold text-gold-400 text-xs italic">
                  Еңбегі: {src.work}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {src.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
