import React from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, Sparkles, BookOpen, ShieldCheck, Trophy, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultsSection({ userAnswers, totalQuestions, onReset, onToggleFullscreen, isFullscreen }) {
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length;
  const incorrectCount = answeredCount - correctCount;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const getRank = () => {
    if (percentage >= 90) return { title: 'Дала Тарихшысы & Академик', badge: '🥇 Алтын Дәреже' };
    if (percentage >= 70) return { title: 'Тарихи Зерттеуші', badge: '🥈 Күміс Дәреже' };
    if (percentage >= 50) return { title: 'Тарих Сүйер Ізденуші', badge: '🥉 Бронза Дәреже' };
    return { title: 'Тарихи Бастаушы', badge: '📜 Зерттеуші Статусы' };
  };

  const rank = getRank();

  const handleConfetti = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <section id="results" className={`py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10 ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 relative">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="mx-auto inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Сайт Соңындағы Нәтижелер Бүктемесі</span>
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
            Тарихи Зерттеу Нәтижесі
          </h2>
          <p className="text-slate-300 text-sm font-sans">
            Оқу материалы мен интерактивті тапсырмаларды орындау көрсеткіштеріңіз.
          </p>
        </div>

        {/* Result Dashboard Card */}
        <div className="bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8 text-center sm:text-left">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-500/40">
                {rank.badge}
              </span>
              <h3 className="font-lora text-2xl sm:text-3xl font-bold text-slate-100">
                {rank.title}
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Сайттағы барлық 6 мемлекет бойынша білім деңгейіңіз
              </p>
            </div>

            <div className="relative w-32 h-32 rounded-full bg-obsidian-950 border-4 border-gold-500/40 flex flex-col items-center justify-center shadow-inner flex-shrink-0">
              <span className="font-lora text-3xl font-extrabold text-gold-400">{percentage}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Нәтиже</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-obsidian-950 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-slate-400 text-xs font-sans">Жалпы сұрақтар</span>
              <div className="font-lora text-2xl font-bold text-slate-100">{totalQuestions}</div>
            </div>

            <div className="p-4 bg-obsidian-950 rounded-2xl border border-emerald-500/20 text-center space-y-1">
              <span className="text-emerald-400 text-xs font-sans">Дұрыс жауаптар</span>
              <div className="font-lora text-2xl font-bold text-emerald-400">{correctCount}</div>
            </div>

            <div className="p-4 bg-obsidian-950 rounded-2xl border border-rose-500/20 text-center space-y-1">
              <span className="text-rose-400 text-xs font-sans">Қате жауаптар</span>
              <div className="font-lora text-2xl font-bold text-rose-400">{incorrectCount}</div>
            </div>

            <div className="p-4 bg-obsidian-950 rounded-2xl border border-gold-500/20 text-center space-y-1">
              <span className="text-gold-400 text-xs font-sans">Жиналған ұпай</span>
              <div className="font-lora text-2xl font-bold text-gold-400">{correctCount * 10}</div>
            </div>
          </div>

          <div className="p-5 bg-obsidian-950 rounded-2xl border border-gold-500/20 space-y-3">
            <h4 className="font-lora text-base font-bold text-gold-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Ашылған тарихи бейнелер мен бейнелік жетістіктер:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-obsidian-900 rounded-xl border border-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Сақ-Скиф зерттеушісі</span>
              </div>
              <div className="p-3 bg-obsidian-900 rounded-xl border border-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Ғұн Империясы сарапшысы</span>
              </div>
              <div className="p-3 bg-obsidian-900 rounded-xl border border-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Үйсін & Қаңлы дипломатиясы</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleConfetti}
              className="px-6 py-3 bg-gold-500/20 border border-gold-500/40 text-gold-300 font-bold rounded-xl text-xs hover:bg-gold-500/30 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Жетістікті атап өту 🎉</span>
            </button>

            <button
              onClick={onReset}
              className="px-6 py-3 bg-obsidian-950 border border-slate-800 hover:border-gold-500/40 text-slate-300 hover:text-gold-400 font-bold rounded-xl text-xs transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Тестті қайта тапсыру</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
