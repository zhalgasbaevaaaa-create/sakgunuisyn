import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveMap from './components/InteractiveMap';
import StatesSection from './components/StatesSection';
import FiguresSection from './components/FiguresSection';
import TimelineSection from './components/TimelineSection';
import ContinuitySection from './components/ContinuitySection';
import LegendsSection from './components/LegendsSection';
import QuizSection from './components/QuizSection';
import ResultsSection from './components/ResultsSection';
import SearchModal from './components/SearchModal';
import { QUIZ_QUESTIONS } from './data/historyData';
import { X, Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [progress, setProgress] = useState(10);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedStateForView, setSelectedStateForView] = useState(null);
  const [fullscreenSection, setFullscreenSection] = useState(null); // 'map', 'states', 'figures', 'timeline', 'continuity', 'legends', 'quiz', 'results'

  // ESC key handler for full screen exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && fullscreenSection) {
        setFullscreenSection(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenSection]);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      if (fullscreenSection) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const calculatedProgress = Math.min(Math.round((currentScroll / totalHeight) * 100), 100);
      setProgress(Math.max(calculatedProgress, 10));

      const sections = ['hero', 'map', 'states', 'figures', 'timeline', 'continuity', 'legends', 'quiz', 'results'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fullscreenSection]);

  const handleQuizScoreUpdate = (currentScore, total) => {
    setScore(currentScore);
  };

  const handleNavigate = (sectionId, targetId) => {
    setActiveSection(sectionId);
    if (sectionId === 'states' && targetId) {
      setSelectedStateForView(targetId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFullscreen = (sectionId) => {
    if (fullscreenSection === sectionId) {
      setFullscreenSection(null);
    } else {
      setFullscreenSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 font-sans selection:bg-gold-500 selection:text-obsidian-950">
      {/* Top Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        openSearch={() => setIsSearchOpen(true)}
        progress={progress}
        score={score}
        totalQuestions={QUIZ_QUESTIONS.length}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          onExploreMap={() => handleNavigate('map')}
          onExploreStates={() => handleNavigate('states')}
        />

        <InteractiveMap
          onSelectState={(stateId) => handleNavigate('states', stateId)}
          onToggleFullscreen={() => toggleFullscreen('map')}
          isFullscreen={fullscreenSection === 'map'}
        />

        <StatesSection
          activeStateId={selectedStateForView}
          onToggleFullscreen={() => toggleFullscreen('states')}
          isFullscreen={fullscreenSection === 'states'}
        />

        <FiguresSection
          onToggleFullscreen={() => toggleFullscreen('figures')}
          isFullscreen={fullscreenSection === 'figures'}
        />

        <TimelineSection
          onToggleFullscreen={() => toggleFullscreen('timeline')}
          isFullscreen={fullscreenSection === 'timeline'}
        />

        <ContinuitySection
          onToggleFullscreen={() => toggleFullscreen('continuity')}
          isFullscreen={fullscreenSection === 'continuity'}
        />

        <LegendsSection
          onToggleFullscreen={() => toggleFullscreen('legends')}
          isFullscreen={fullscreenSection === 'legends'}
        />

        <QuizSection
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          onQuizComplete={handleQuizScoreUpdate}
          onToggleFullscreen={() => toggleFullscreen('quiz')}
          isFullscreen={fullscreenSection === 'quiz'}
        />

        <ResultsSection
          userAnswers={userAnswers}
          totalQuestions={QUIZ_QUESTIONS.length}
          onReset={() => {
            setUserAnswers({});
            setScore(0);
          }}
          onToggleFullscreen={() => toggleFullscreen('results')}
          isFullscreen={fullscreenSection === 'results'}
        />
      </main>

      {/* FULLSCREEN OVERLAY MODAL */}
      {fullscreenSection && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/98 backdrop-blur-2xl overflow-y-auto p-4 sm:p-10 fullscreen-mode animate-fadeIn">
          {/* Top Control Bar with Close Button (Крестик) */}
          <div className="sticky top-0 z-50 flex items-center justify-between bg-obsidian-900/90 backdrop-blur-md p-4 rounded-2xl border border-gold-500/30 mb-8 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-obsidian-950 font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-lora text-lg sm:text-2xl font-bold text-gold-400">
                  ТОЛЫҚ ЭКРАН РЕЖИМІ (Ерте темір дәуірі)
                </h2>
                <p className="text-xs text-slate-400 font-sans">
                  Шығу үшін оң жақтағы крестикті немесе клавиатурадан ESC пернесін басыңыз
                </p>
              </div>
            </div>

            {/* Prominent Top Close Button (Крестик) */}
            <button
              onClick={() => setFullscreenSection(null)}
              className="group p-3 rounded-2xl bg-gold-500/20 hover:bg-gold-500 border-2 border-gold-500 text-gold-300 hover:text-obsidian-950 transition-all duration-300 shadow-xl flex items-center gap-2"
              title="Толық экраннан шығу (ESC)"
            >
              <span className="hidden sm:inline font-bold text-sm">Жабу</span>
              <X className="w-7 h-7 stroke-[3] group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Render Fullscreen Content */}
          <div className="max-w-7xl mx-auto pb-16">
            {fullscreenSection === 'map' && (
              <InteractiveMap
                onSelectState={(stateId) => {
                  setFullscreenSection(null);
                  handleNavigate('states', stateId);
                }}
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
            {fullscreenSection === 'states' && (
              <StatesSection
                activeStateId={selectedStateForView}
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
            {fullscreenSection === 'figures' && (
              <FiguresSection
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
            {fullscreenSection === 'timeline' && (
              <TimelineSection
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
            {fullscreenSection === 'continuity' && (
              <ContinuitySection
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
            {fullscreenSection === 'legends' && (
              <LegendsSection
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
            {fullscreenSection === 'quiz' && (
              <QuizSection
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                onQuizComplete={handleQuizScoreUpdate}
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
            {fullscreenSection === 'results' && (
              <ResultsSection
                userAnswers={userAnswers}
                totalQuestions={QUIZ_QUESTIONS.length}
                onReset={() => {
                  setUserAnswers({});
                  setScore(0);
                }}
                onToggleFullscreen={() => setFullscreenSection(null)}
                isFullscreen={true}
              />
            )}
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Museum Footer */}
      <footer className="py-12 px-4 bg-obsidian-950 border-t border-gold-500/20 text-center text-xs text-slate-400 font-sans space-y-3">
        <div className="font-lora text-gold-400 font-bold text-base">
          ЕРТЕ ТЕМІР ДӘУІРІ: САЯСИ КАРТА
        </div>
        <p className="max-w-2xl mx-auto text-slate-400">
          Қазақстан тарихының цифрлық музейі, интерактивті саяси атласы мен білім беру платформасы. Басты және жалғыз мазмұндық дереккөзі: PDF материалы.
        </p>
        <div className="text-[11px] text-slate-500">
          © 2026 Интерактивті Тарихи Платформа. Барлық құқықтар қорғалған.
        </div>
      </footer>
    </div>
  );
}
