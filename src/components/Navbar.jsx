import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, Map, Users, Clock, ShieldAlert, Award, Search, Menu, X, CheckCircle, UserCheck } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, openSearch, progress, score, totalQuestions }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Басты бет', icon: Compass },
    { id: 'map', label: 'Тарихи карта', icon: Map },
    { id: 'states', label: 'Мемлекеттер', icon: BookOpen },
    { id: 'figures', label: 'Тұлғалар', icon: Users },
    { id: 'timeline', label: 'Хронология', icon: Clock },
    { id: 'continuity', label: 'Сабақтастық', icon: ShieldAlert },
    { id: 'legends', label: 'Аңыздар', icon: BookOpen },
    { id: 'quiz', label: 'Тапсырмалар', icon: CheckCircle },
    { id: 'results', label: 'Нәтиже', icon: Award },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-obsidian-950/95 backdrop-blur-md border-b border-gold-500/20 shadow-xl' 
        : 'bg-gradient-to-b from-obsidian-950/95 to-transparent'
    }`}>
      {/* Reading Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-obsidian-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Supervisor Top Banner */}
      <div className="bg-gradient-to-r from-obsidian-950 via-gold-500/20 to-obsidian-950 border-b border-gold-500/20 py-1 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-gold-300 font-lora">
          <UserCheck className="w-3.5 h-3.5 text-gold-400" />
          <span>Интерактивті сайт жетекшісі — Сарсенбаев А.Б.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-amber-700 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-obsidian-900 rounded-full flex items-center justify-center border border-gold-400/40">
              <Compass className="w-5 h-5 text-gold-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <h1 className="font-lora text-sm sm:text-base font-bold text-gold-400 tracking-wide leading-none">
              ЕРТЕ ТЕМІР ДӘУІРІ
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 tracking-wider uppercase font-sans mt-0.5">
              Интерактивті Саяси Атлас
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center space-x-1 bg-obsidian-800/60 p-1.5 rounded-full border border-gold-500/10 backdrop-blur-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-semibold shadow-md'
                    : 'text-slate-300 hover:text-gold-400 hover:bg-gold-500/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-obsidian-950' : 'text-gold-400/80'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 bg-obsidian-800 hover:bg-obsidian-800/80 border border-gold-500/20 hover:border-gold-500/40 rounded-full text-xs text-slate-300 hover:text-gold-400 transition-all shadow-inner"
            title="Іздеу (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Іздеу</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 bg-obsidian-950 text-[10px] text-slate-400 rounded border border-slate-700">Ctrl K</kbd>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-xs text-gold-400 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>{score}/{totalQuestions} ұпай</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-obsidian-800 border border-gold-500/20 text-gold-400 hover:text-gold-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-obsidian-950/95 border-b border-gold-500/20 px-4 py-4 backdrop-blur-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-gold-500 text-obsidian-950 font-semibold'
                      : 'bg-obsidian-800/80 text-slate-200 hover:bg-gold-500/10 hover:text-gold-400'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gold-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-gold-400">
            <span>Прогресс: {progress}%</span>
            <span>Жиналған ұпай: {score}</span>
          </div>
        </div>
      )}
    </header>
  );
}
