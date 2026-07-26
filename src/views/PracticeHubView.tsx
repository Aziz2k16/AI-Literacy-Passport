import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Calendar, Sparkles, CheckCircle2, XCircle, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { UserState, DailyChallenge } from '../types';
import { sound } from '../utils/audio';

interface PracticeHubViewProps {
  userState: UserState;
  onStartWeakSkillsPractice: () => void;
  onCompleteDailyChallenge: (xp: number, gems: number) => void;
}

export const PracticeHubView: React.FC<PracticeHubViewProps> = ({
  userState,
  onStartWeakSkillsPractice,
  onCompleteDailyChallenge
}) => {
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    fetchDailyChallenge();
  }, []);

  const fetchDailyChallenge = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/daily-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setDailyChallenge(data);
    } catch (e) {
      console.error('Failed to load daily challenge', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitChallenge = () => {
    if (selectedOption === null || !dailyChallenge || submitted) return;

    const correct = selectedOption === dailyChallenge.correctIndex;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      sound.playCorrect(userState.soundEnabled);
      onCompleteDailyChallenge(30, 20); // 30 XP, 20 Gems
    } else {
      sound.playWrong(userState.soundEnabled);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 space-y-8">
      
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-1">
          <Dumbbell className="w-4 h-4" /> Practice Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Reinforce & Master
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Spaced-repetition review of weak concepts + live Gemini AI Daily News Byte quiz.
        </p>
      </div>

      {/* Card 1: Spaced Repetition Weak Skills Review */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white shadow-xl shadow-indigo-600/20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-xs">
            Spaced Repetition
          </span>
          <Dumbbell className="w-6 h-6 text-white/80" />
        </div>

        <h2 className="text-xl font-black mb-1">Targeted Weak Skill Practice</h2>
        <p className="text-xs text-white/90 mb-4 font-medium">
          Review concept areas where you previously missed questions. Earn back lost hearts and double XP!
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {userState.weakSkills.map((tag) => (
            <span key={tag} className="text-xs font-bold bg-black/30 border border-white/20 px-3 py-1 rounded-xl text-white">
              • {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onStartWeakSkillsPractice}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-indigo-600" /> Start Weak Skill Quiz (+1 Heart)
        </button>
      </div>

      {/* Card 2: Daily AI Challenge (Gemini Generated) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">Daily AI Challenge</h2>
              <span className="text-[11px] text-slate-400 font-medium">Generated live via Gemini API</span>
            </div>
          </div>

          <button
            onClick={fetchDailyChallenge}
            disabled={loading}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title="Refresh Challenge"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs font-bold animate-pulse">
            Generating today's AI challenge with Gemini...
          </div>
        ) : dailyChallenge ? (
          <div className="space-y-4">
            
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider block mb-0.5">
                {dailyChallenge.topic}
              </span>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                {dailyChallenge.headline}
              </h3>
            </div>

            <p className="font-bold text-sm text-slate-900 dark:text-white">
              {dailyChallenge.question}
            </p>

            <div className="space-y-2">
              {dailyChallenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

                if (submitted) {
                  if (idx === dailyChallenge.correctIndex) {
                    btnStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-extrabold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200 font-extrabold';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 text-indigo-900 dark:text-indigo-100 font-extrabold shadow-sm';
                }

                return (
                  <button
                    key={idx}
                    disabled={submitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {submitted ? (
              <div className={`p-4 rounded-2xl text-xs font-medium space-y-1 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}>
                <div className="font-extrabold flex items-center gap-1.5">
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                  {isCorrect ? 'Correct! Earned +30 XP & +20 Gems' : 'Incorrect'}
                </div>
                <p>{dailyChallenge.explanation}</p>
              </div>
            ) : (
              <button
                onClick={handleSubmitChallenge}
                disabled={selectedOption === null}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                Submit Answer
              </button>
            )}

          </div>
        ) : null}

      </div>

    </div>
  );
};
