import React, { useState } from 'react';
import { QUIZ_QUESTIONS, MATCHING_TASKS, TRUE_FALSE_TASKS } from '../data/historyData';
import { CheckCircle, HelpCircle, Award, CheckCircle2, XCircle, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizSection({ userAnswers, setUserAnswers, onQuizComplete }) {
  const [activeQuizTab, setActiveQuizTab] = useState('quiz'); // 'quiz', 'matching', 'tf'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Matching state
  const [matchingState, setMatchingState] = useState({});
  const [matchingResults, setMatchingStateResults] = useState(null);

  // True/False state
  const [tfAnswers, setTfAnswers] = useState({});
  const [tfSubmitted, setTfSubmitted] = useState(false);

  // Current Question
  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  // Handle Option Click for Multiple Choice Quiz
  const handleOptionSelect = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    const isCorrect = selectedOption === currentQ.correct;

    const newAnswers = {
      ...userAnswers,
      [currentQ.id]: {
        selected: selectedOption,
        correct: currentQ.correct,
        isCorrect: isCorrect
      }
    };
    setUserAnswers(newAnswers);

    // Calculate score
    const scoreCount = Object.values(newAnswers).filter(a => a.isCorrect).length;
    onQuizComplete(scoreCount, QUIZ_QUESTIONS.length);

    if (isCorrect && currentQuestionIndex === QUIZ_QUESTIONS.length - 1) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevAns = userAnswers[QUIZ_QUESTIONS[currentQuestionIndex - 1]?.id];
      if (prevAns) {
        setSelectedOption(prevAns.selected);
        setIsSubmitted(true);
      } else {
        setSelectedOption(null);
        setIsSubmitted(false);
      }
    }
  };

  // Reset Multiple Choice Quiz
  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  // Handle Matching Submit
  const handleMatchingSelect = (taskId, stateName, target) => {
    setMatchingState(prev => ({
      ...prev,
      [`${taskId}-${stateName}`]: target
    }));
  };

  const handleVerifyMatching = (taskId) => {
    const task = MATCHING_TASKS.find(t => t.id === taskId);
    let correctCount = 0;
    task.pairs.forEach(pair => {
      const userSel = matchingState[`${taskId}-${pair.state}`];
      if (userSel === pair.target) {
        correctCount++;
      }
    });
    setMatchingStateResults({
      taskId,
      score: correctCount,
      total: task.pairs.length
    });
  };

  // Handle True/False Submit
  const handleTfSelect = (id, val) => {
    if (tfSubmitted) return;
    setTfAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleVerifyTf = () => {
    setTfSubmitted(true);
  };

  return (
    <section id="quiz" className="py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Интерактивті Тапсырмалар Жүйесі</span>
          </div>
          <h2 className="font-lora text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Білімді тексеру және Бекіту
          </h2>
          <p className="text-slate-300 text-sm font-sans">
            PDF материалы бойынша жасалған тесттер, сәйкестендіру тапсырмалары және Дұрыс/Бұрыс сұрақтары.
          </p>
        </div>

        {/* Task Category Tabs */}
        <div className="flex bg-obsidian-900 p-1.5 rounded-2xl border border-gold-500/20 mb-8 text-xs sm:text-sm font-semibold max-w-md mx-auto shadow-xl">
          <button
            onClick={() => setActiveQuizTab('quiz')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeQuizTab === 'quiz'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-gold-400'
            }`}
          >
            Тест Сұрақтары ({QUIZ_QUESTIONS.length})
          </button>
          <button
            onClick={() => setActiveQuizTab('matching')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeQuizTab === 'matching'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-gold-400'
            }`}
          >
            Сәйкестендіру
          </button>
          <button
            onClick={() => setActiveQuizTab('tf')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeQuizTab === 'tf'
                ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-gold-400'
            }`}
          >
            Дұрыс / Бұрыс
          </button>
        </div>

        {/* Tab 1: Multiple Choice Quiz */}
        {activeQuizTab === 'quiz' && (
          <div className="bg-obsidian-900 border border-gold-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Progress Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
              <span className="px-3 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/30 rounded-full font-bold">
                Сұрақ {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-slate-400">Бөлім: <strong className="text-slate-200">{currentQ.category}</strong></span>
            </div>

            {/* Question Text */}
            <h3 className="font-lora text-lg sm:text-xl font-bold text-slate-100 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((optText, idx) => {
                let btnStyle = "bg-obsidian-950 border-slate-800 text-slate-200 hover:border-gold-500/40";
                
                if (selectedOption === idx) {
                  btnStyle = "bg-gold-500/20 border-gold-500 text-gold-300 font-bold";
                }

                if (isSubmitted) {
                  if (idx === currentQ.correct) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  } else if (selectedOption === idx && idx !== currentQ.correct) {
                    btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isSubmitted}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{optText}</span>
                    {isSubmitted && idx === currentQ.correct && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isSubmitted && selectedOption === idx && idx !== currentQ.correct && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box on Submitted */}
            {isSubmitted && (
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1 animate-fadeIn ${
                selectedOption === currentQ.correct
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  {selectedOption === currentQ.correct ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Дұрыс жауап!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" /> Қате! Дұрыс жауап: {currentQ.options[currentQ.correct]}
                    </>
                  )}
                </div>
                <p className="text-slate-300 font-sans mt-1">{currentQ.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-obsidian-950 border border-slate-800 rounded-xl text-xs text-slate-300 disabled:opacity-40"
              >
                Алдыңғысы
              </button>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-gold-500 text-obsidian-950 font-bold rounded-xl text-xs hover:opacity-95 transition-opacity disabled:opacity-40"
                >
                  Жауапты тексеру
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
                  className="px-6 py-2.5 bg-gold-500 text-obsidian-950 font-bold rounded-xl text-xs hover:opacity-95 transition-opacity flex items-center gap-1.5 disabled:opacity-40"
                >
                  <span>Келесі сұрақ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Matching Tasks */}
        {activeQuizTab === 'matching' && (
          <div className="space-y-6">
            {MATCHING_TASKS.map((task) => (
              <div key={task.id} className="bg-obsidian-900 border border-gold-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <h3 className="font-lora text-lg font-bold text-gold-400">
                  {task.title}
                </h3>

                <div className="space-y-4">
                  {task.pairs.map((pair, idx) => (
                    <div key={idx} className="p-4 bg-obsidian-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm">
                      <span className="font-bold text-slate-100 font-lora sm:w-1/3">{pair.state}</span>
                      
                      <select
                        value={matchingState[`${task.id}-${pair.state}`] || ''}
                        onChange={(e) => handleMatchingSelect(task.id, pair.state, e.target.value)}
                        className="w-full sm:w-2/3 p-2.5 bg-obsidian-900 border border-slate-700 rounded-xl text-slate-200 focus:border-gold-500 outline-none text-xs"
                      >
                        <option value="">-- Тиісті орталықты/сипаттаманы таңдаңыз --</option>
                        {task.pairs.map((p, pIdx) => (
                          <option key={pIdx} value={p.target}>{p.target}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => handleVerifyMatching(task.id)}
                    className="px-6 py-2.5 bg-gold-500 text-obsidian-950 font-bold rounded-xl text-xs hover:opacity-95"
                  >
                    Сәйкестікті тексеру
                  </button>

                  {matchingResults && matchingResults.taskId === task.id && (
                    <span className="text-xs font-bold text-gold-400">
                      Нәтиже: {matchingResults.score} / {matchingResults.total} дұрыс
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: True / False */}
        {activeQuizTab === 'tf' && (
          <div className="bg-obsidian-900 border border-gold-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="font-lora text-xl font-bold text-gold-400 mb-4">
              Тарихи Тұжырымдар (Дұрыс немесе Бұрыс)
            </h3>

            <div className="space-y-4">
              {TRUE_FALSE_TASKS.map((item) => {
                const userChoice = tfAnswers[item.id];
                const isCorrect = tfSubmitted && userChoice === item.isTrue;

                return (
                  <div key={item.id} className="p-4 bg-obsidian-950 rounded-2xl border border-slate-800 space-y-3 text-xs sm:text-sm">
                    <p className="text-slate-100 font-sans font-medium">{item.statement}</p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleTfSelect(item.id, true)}
                        disabled={tfSubmitted}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          userChoice === true
                            ? 'bg-emerald-500 text-obsidian-950 border-emerald-500'
                            : 'bg-obsidian-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        ДҰРЫС
                      </button>
                      <button
                        onClick={() => handleTfSelect(item.id, false)}
                        disabled={tfSubmitted}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          userChoice === false
                            ? 'bg-rose-500 text-obsidian-950 border-rose-500'
                            : 'bg-obsidian-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        БҰРЫС
                      </button>
                    </div>

                    {tfSubmitted && (
                      <div className={`p-3 rounded-xl border text-xs ${
                        isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}>
                        <p className="font-semibold">{item.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={handleVerifyTf}
                disabled={tfSubmitted}
                className="px-6 py-2.5 bg-gold-500 text-obsidian-950 font-bold rounded-xl text-xs hover:opacity-95 disabled:opacity-40"
              >
                Тұжырымдарды Тексеру
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
