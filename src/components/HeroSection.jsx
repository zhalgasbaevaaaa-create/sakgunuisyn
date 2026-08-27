import React from 'react';
import { CHRONOLOGY_SUMMARY } from '../data/historyData';
import { Compass, Map, Shield, ChevronDown, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function HeroSection({ onExploreMap, onExploreStates }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-obsidian-950">
      {/* Background Image with Dark Vignette and Gold Sparkles */}
      <div className="absolute inset-0 z-0">
        <img 
          src="./images/hero_background.jpg" 
          alt="Ерте темір дәуірі" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-transparent" />
        <div className="absolute inset-0 bg-radial-vignette opacity-90" />
        <div className="absolute inset-0 ornament-bg opacity-30" />
      </div>

      {/* Decorative Golden Ornaments */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-gold-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Top Historical Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
          <span>Академиялық Цифрлық Музей & Атлас</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          <span className="text-slate-300 font-normal">100% PDF Деректері</span>
        </div>

        {/* Main Title */}
        <h1 className="font-lora text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
          <span className="block text-slate-200">{CHRONOLOGY_SUMMARY.title}</span>
          <span className="gold-gradient-text block text-2xl sm:text-4xl lg:text-5xl mt-2 font-normal italic">
            Қазақстан мен Орталық Азия Көшпелілер Өркениеті
          </span>
        </h1>

        {/* Subtitle / Traditional Period */}
        <div className="max-w-3xl mx-auto space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans mb-8">
          <p className="bg-obsidian-900/60 p-4 rounded-xl border border-gold-500/10 backdrop-blur-sm text-slate-200">
            {CHRONOLOGY_SUMMARY.traditionalPeriod}
          </p>
          <p className="text-slate-400 text-xs sm:text-sm">
            {CHRONOLOGY_SUMMARY.historicalFeature}
          </p>
        </div>

        {/* Call-to-action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreMap}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-gold-500/20 hover:scale-105 transition-all duration-300"
          >
            <Map className="w-5 h-5 text-obsidian-950 group-hover:rotate-12 transition-transform" />
            <span>Интерактивті Картаны Ашу</span>
          </button>

          <button
            onClick={onExploreStates}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-obsidian-800/80 hover:bg-obsidian-800 border border-gold-500/30 hover:border-gold-500/60 text-gold-400 hover:text-gold-300 font-semibold text-sm sm:text-base backdrop-blur-md transition-all shadow-lg"
          >
            <Shield className="w-5 h-5" />
            <span>Мемлекеттерді Зерттеу</span>
          </button>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-obsidian-900/70 border border-gold-500/20 backdrop-blur-md hover:border-gold-500/40 transition-all text-left group">
            <div className="text-gold-400 text-2xl sm:text-3xl font-bold font-lora mb-1 group-hover:scale-105 transition-transform">
              6 Мемлекет
            </div>
            <div className="text-slate-400 text-xs font-sans">
              Сақтар, Скифтер, Сарматтар, Ғұндар, Үйсіндер, Қаңлылар
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-900/70 border border-gold-500/20 backdrop-blur-md hover:border-gold-500/40 transition-all text-left group">
            <div className="text-gold-400 text-2xl sm:text-3xl font-bold font-lora mb-1 group-hover:scale-105 transition-transform">
              11+ Соғыстар
            </div>
            <div className="text-slate-400 text-xs font-sans">
              Кир, Дарий, Филипп II, Байдэн шайқастары мен Хань оқиғалары
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-900/70 border border-gold-500/20 backdrop-blur-md hover:border-gold-500/40 transition-all text-left group">
            <div className="text-gold-400 text-2xl sm:text-3xl font-bold font-lora mb-1 group-hover:scale-105 transition-transform">
              10+ Тұлғалар
            </div>
            <div className="text-slate-400 text-xs font-sans">
              Томирис, Мөде, Скунха, Елжау, Атей, Чжан Цянь т.б.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-900/70 border border-gold-500/20 backdrop-blur-md hover:border-gold-500/40 transition-all text-left group">
            <div className="text-gold-400 text-xl sm:text-2xl font-bold font-lora mb-1 group-hover:scale-105 transition-transform">
              б.з.б. VIII ғ. – б.з. VI ғ.
            </div>
            <div className="text-slate-400 text-xs font-sans">
              Хронологиялық толық қамту
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={onExploreMap}
            className="flex flex-col items-center text-slate-400 hover:text-gold-400 text-xs transition-colors"
          >
            <span className="mb-1">Төмен қарай жылжыңыз</span>
            <ChevronDown className="w-5 h-5 animate-bounce text-gold-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
