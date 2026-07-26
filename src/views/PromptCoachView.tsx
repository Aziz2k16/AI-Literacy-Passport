import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, Copy, Check, Send, Lightbulb, RefreshCw, Bot, ArrowRight } from 'lucide-react';
import { PromptCoachResponse } from '../types';
import { MascotByte } from '../components/MascotByte';

export const PromptCoachView: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PromptCoachResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const samplePrompts = [
    'Write an email asking for a raise',
    'Explain how neural networks work simply',
    'Give me a python script for web scraping',
    'Draft 3 marketing taglines for a coffee shop'
  ];

  const handleAnalyzePrompt = async (promptText?: string) => {
    const textToAnalyze = promptText || userPrompt;
    if (!textToAnalyze.trim()) return;

    if (promptText) {
      setUserPrompt(promptText);
    }

    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch('/api/prompt-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: textToAnalyze })
      });

      const data = await res.json();
      if (!res.ok && !data.fallback) {
        throw new Error(data.error || 'Failed to analyze prompt');
      }

      setResult(data.fallback || data);
    } catch (err: any) {
      console.error('Prompt coach error:', err);
      setErrorMsg('Unable to reach AI Coach right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 space-y-8">
      
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" /> AI-Powered Feature
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          AI Prompt Coach
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Type any draft prompt below. Gemini will rate it, rewrite it for maximum performance, and give you an encouraging tip!
        </p>
      </div>

      {/* Input Form Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          Enter your draft prompt:
        </label>

        <div className="relative">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="e.g. Write an email to my manager explaining why my project deadline was delayed..."
            rows={3}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden transition-all resize-none"
          />
        </div>

        {/* Preset Prompt Shortcuts */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 block">Or try a sample draft:</span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sample) => (
              <button
                key={sample}
                onClick={() => handleAnalyzePrompt(sample)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition-all cursor-pointer"
              >
                "{sample}"
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Action Button */}
        <button
          onClick={() => handleAnalyzePrompt()}
          disabled={loading || !userPrompt.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:brightness-110 disabled:opacity-40 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Coaching your prompt with Gemini...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-300" /> Grade & Improve My Prompt
            </>
          )}
        </button>

      </div>

      {/* Loading Mascot State */}
      {loading && (
        <div className="flex justify-center my-8">
          <MascotByte
            mood="thinking"
            message="Analyzing your prompt for clarity, specificity, and contextual constraints..."
            size="md"
          />
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Results Section */}
      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Scores Breakdown Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white shadow-xl shadow-indigo-600/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">{result.overallScore}</span>
                <span className="text-xs text-indigo-200 font-bold uppercase tracking-wider">/ 5 Overall Score</span>
              </div>
              <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-xs">
                Gemini Feedback
              </span>
            </div>

            {/* Dimension Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10">
                <div className="flex items-center justify-between text-xs font-extrabold mb-1.5">
                  <span>Clarity</span>
                  <span className="text-cyan-300">{result.scores.clarity}/5</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${(result.scores.clarity / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10">
                <div className="flex items-center justify-between text-xs font-extrabold mb-1.5">
                  <span>Specificity</span>
                  <span className="text-purple-300">{result.scores.specificity}/5</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-300 rounded-full"
                    style={{ width: `${(result.scores.specificity / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10">
                <div className="flex items-center justify-between text-xs font-extrabold mb-1.5">
                  <span>Context</span>
                  <span className="text-pink-300">{result.scores.context}/5</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-400 rounded-full"
                    style={{ width: `${(result.scores.context / 5) * 100}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Rewritten Stronger Prompt Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Rewritten Stronger Version
              </h3>

              <button
                onClick={() => copyToClipboard(result.rewrittenPrompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>

            {/* Prompt Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-slate-800 dark:text-slate-200 font-mono text-xs leading-relaxed">
              "{result.rewrittenPrompt}"
            </div>

            {/* Explanation */}
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              <strong className="text-indigo-600 dark:text-indigo-400">Why this is stronger:</strong> {result.explanation}
            </p>

            {/* Encouragement Tip */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-800 dark:text-amber-300 mb-0.5">Coach's Tip:</strong>
                {result.encouragingTip}
              </div>
            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
};
