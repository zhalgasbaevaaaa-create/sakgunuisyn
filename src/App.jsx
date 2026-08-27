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

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [progress, setProgress] = useState(10);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedStateForView, setSelectedStateForView] = useState(null);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const calculatedProgress = Math.min(Math.round((currentScroll / totalHeight) * 100), 100);
      setProgress(Math.max(calculatedProgress, 10));

      // Update active section based on scroll offset
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
  }, []);

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
        />

        <StatesSection activeStateId={selectedStateForView} />

        <FiguresSection />

        <TimelineSection />

        <ContinuitySection />

        <LegendsSection />

        <QuizSection
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          onQuizComplete={handleQuizScoreUpdate}
        />

        <ResultsSection
          userAnswers={userAnswers}
          totalQuestions={QUIZ_QUESTIONS.length}
          onReset={() => {
            setUserAnswers({});
            setScore(0);
          }}
        />
      </main>

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
