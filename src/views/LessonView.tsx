import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  Lightbulb, 
  HelpCircle, 
  Sparkles 
} from 'lucide-react';
import { Lesson, Question, QuestionType } from '../types';
import { sound } from '../utils/audio';

interface LessonViewProps {
  lesson: Lesson;
  hearts: number;
  soundEnabled: boolean;
  onLoseHeart: () => void;
  onFinishLesson: (xpGained: number, gemsGained: number) => void;
  onClose: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  hearts,
  soundEnabled,
  onLoseHeart,
  onFinishLesson,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [dragOrder, setDragOrder] = useState<string[]>([]);
  const [scoreCount, setScoreCount] = useState(0);

  const question: Question = lesson.questions[currentIdx];
  const totalQuestions = lesson.questions.length;
  const progressPercent = Math.round(((currentIdx) / totalQuestions) * 100);

  // Initialize drag order if drag_rank question
  React.useEffect(() => {
    if (question.type === 'drag_rank' && question.options) {
      // Shuffle initial options for drag_rank
      setDragOrder([...question.options].sort(() => Math.random() - 0.5));
    } else {
      setSelectedAnswer(null);
    }
    setIsChecked(false);
    setIsCorrect(null);
  }, [currentIdx, question]);

  const handleCheckAnswer = () => {
    if (isChecked) return;

    let correct = false;

    if (question.type === 'multiple_choice' || question.type === 'spot_mistake' || question.type === 'true_false' || question.type === 'rewrite_prompt') {
      correct = selectedAnswer === question.correctAnswer;
    } else if (question.type === 'fill_blank') {
      correct = String(selectedAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
    } else if (question.type === 'drag_rank') {
      // Compare arrays
      const targetOrder = question.correctAnswer as string[];
      correct = JSON.stringify(dragOrder) === JSON.stringify(targetOrder);
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      sound.playCorrect(soundEnabled);
      setScoreCount((prev) => prev + 1);
    } else {
      sound.playWrong(soundEnabled);
      onLoseHeart();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Lesson Complete! Calculate XP based on accuracy
      const accuracyMultiplier = scoreCount / totalQuestions >= 0.8 ? 1.2 : 1.0;
      const finalXp = Math.round(lesson.xpReward * accuracyMultiplier);
      const finalGems = lesson.gemReward;
      onFinishLesson(finalXp, finalGems);
    }
  };

  // Helper to reorder items in drag_rank
  const moveItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= dragOrder.length) return;
    const updated = [...dragOrder];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setDragOrder(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      
      {/* Top Header */}
      <header className="max-w-3xl mx-auto w-full p-4 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Heart Count */}
        <div className="flex items-center gap-1 font-extrabold text-rose-500 text-sm">
          <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          <span>{hearts}</span>
        </div>
      </header>

      {/* Question Container */}
      <main className="max-w-2xl mx-auto w-full p-4 sm:p-6 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Question Category / Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {question.type.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Main Question Prompt */}
            <h2 className="text-xl sm:text-2xl font-black leading-snug">
              {question.prompt}
            </h2>

            {/* Optional Context Box */}
            {question.context && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-sm font-mono text-slate-700 dark:text-slate-300">
                {question.context}
              </div>
            )}

            {/* QUESTION TYPES INPUT UI */}

            {/* 1. Multiple Choice / Spot Mistake / True False / Rewrite Prompt */}
            {(question.type === 'multiple_choice' || question.type === 'spot_mistake' || question.type === 'true_false' || question.type === 'rewrite_prompt') && question.options && (
              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  let borderStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';

                  if (isChecked) {
                    if (idx === question.correctAnswer) {
                      borderStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      borderStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                    }
                  } else if (isSelected) {
                    borderStyle = 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100 shadow-md ring-2 ring-indigo-500/20';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isChecked}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full p-4 rounded-2xl border text-left font-semibold text-sm transition-all cursor-pointer flex items-center justify-between ${borderStyle}`}
                    >
                      <span>{opt}</span>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Fill In The Blank */}
            {question.type === 'fill_blank' && question.options && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium text-lg leading-relaxed text-center">
                  {question.blankPrefix}
                  <span className="inline-block px-4 py-1 mx-2 rounded-xl border-2 border-dashed border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-extrabold">
                    {selectedAnswer || '________'}
                  </span>
                  {question.blankSuffix}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {question.options.map((opt) => (
                    <button
                      key={opt}
                      disabled={isChecked}
                      onClick={() => setSelectedAnswer(opt)}
                      className={`p-3.5 rounded-2xl border font-bold text-sm transition-all cursor-pointer ${
                        selectedAnswer === opt
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Drag-to-Rank / Order Steps */}
            {question.type === 'drag_rank' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Use the arrows to rank the items in correct sequence:
                </p>
                {dragOrder.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
                  >
                    <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs text-slate-600 dark:text-slate-400 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="flex-1 font-semibold text-xs text-slate-800 dark:text-slate-200">{item}</span>
                    <div className="flex flex-col gap-1">
                      <button
                        disabled={isChecked || idx === 0}
                        onClick={() => moveItem(idx, idx - 1)}
                        className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={isChecked || idx === dragOrder.length - 1}
                        onClick={() => moveItem(idx, idx + 1)}
                        className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Instant Feedback Footer / Action Bar */}
      <footer className={`sticky bottom-0 left-0 right-0 p-4 border-t transition-colors ${
        isChecked
          ? isCorrect
            ? 'bg-emerald-500 text-white border-emerald-600'
            : 'bg-rose-500 text-white border-rose-600'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {isChecked ? (
            <div className="flex items-start gap-3 w-full">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-white shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-white shrink-0" />
              )}
              <div>
                <h4 className="font-extrabold text-base">
                  {isCorrect ? 'Nicely Done!' : 'Not Quite'}
                </h4>
                <p className="text-xs text-white/90 font-medium leading-relaxed">
                  {question.explanation}
                </p>
                {question.tip && (
                  <p className="text-[11px] text-white/80 mt-1 italic flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-yellow-300" /> {question.tip}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Select your answer to verify.
            </div>
          )}

          {/* Action Button */}
          {!isChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null && question.type !== 'drag_rank'}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 disabled:opacity-40 transition-all cursor-pointer"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>
      </footer>

    </div>
  );
};
