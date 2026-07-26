import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Flame, Shield, ArrowRight, CheckCircle2, BookOpen, Bot } from 'lucide-react';
import { MascotByte } from '../components/MascotByte';

interface LandingViewProps {
  onStart: () => void;
  onSkipToApp: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart, onSkipToApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-slate-900 to-black text-white flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400 font-black text-sm">
              AI
            </div>
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
            AI Literacy Passport
          </span>
        </div>

        <button
          onClick={onSkipToApp}
          className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
        >
          I have an account
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto w-full text-center my-auto py-12 px-4">
        
        {/* Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-semibold text-xs mb-6 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Powered by Gemini 3.6 Flash & Gamified Pedagogy
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-cyan-300"
        >
          Your stamped passport to becoming fluent in AI.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Bite-sized 3–5 minute daily lessons, interactive prompt coaching, streaks, and collectible stamps. From "AI-curious" to "AI-fluent" in minutes a day.
        </motion.p>

        {/* Mascot Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <MascotByte
            mood="cheerful"
            message="Hi there! I'm Byte. Ready to earn your first AI Passport Stamp today?"
            size="md"
          />
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-lg shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            Get Started — It's Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-left">
          <div className="p-5 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">9 Visual Units</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Master LLMs, prompt engineering, chain-of-thought, hallucination spotting, bias, workplace productivity, and AI agents.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">AI Prompt Coach</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Live feedback powered by Gemini API. Score your draft prompts on Clarity, Specificity, and Context with instant rewrites.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-3">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">Passport & Stamps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earn XP, maintain daily streaks, climb weekly leagues, and collect custom visual stamps for every unit mastered.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center py-4 text-xs text-slate-500 border-t border-slate-800/50">
        AI Literacy Passport • Built with Gemini API & React • Duolingo-inspired AI Education
      </footer>
    </div>
  );
};
