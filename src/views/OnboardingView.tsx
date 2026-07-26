import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Target, Award, Sparkles, Check, ArrowRight } from 'lucide-react';
import { MascotByte } from '../components/MascotByte';

interface OnboardingViewProps {
  onCompleteOnboarding: (dailyGoalMins: number, takesPlacement: boolean) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onCompleteOnboarding }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGoal, setSelectedGoal] = useState<number>(5);

  const goalOptions = [
    { mins: 3, label: 'Casual', desc: '3 min / day • 1 quick lesson', icon: '⚡' },
    { mins: 5, label: 'Regular', desc: '5 min / day • Perfect daily habit', icon: '🔥', recommended: true },
    { mins: 10, label: 'Serious', desc: '10 min / day • Rapid AI fluency', icon: '🚀' },
    { mins: 15, label: 'Intensive', desc: '15 min / day • Master prompt engineer', icon: '👑' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Step {step} of 2
          </span>
          <div className="flex gap-1.5">
            <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? 'bg-indigo-500' : 'bg-slate-700'}`} />
            <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? 'bg-indigo-500' : 'bg-slate-700'}`} />
          </div>
        </div>

        {step === 1 ? (
          <div>
            <div className="mb-6 flex justify-center">
              <MascotByte mood="cheerful" message="What is your daily learning goal?" size="md" />
            </div>

            <h2 className="text-2xl font-black text-white text-center mb-2">Choose your pace</h2>
            <p className="text-xs text-slate-400 text-center mb-6">
              Consistency is king! You can change your daily commitment anytime in settings.
            </p>

            <div className="space-y-3 mb-8">
              {goalOptions.map((opt) => {
                const isSelected = selectedGoal === opt.mins;
                return (
                  <button
                    key={opt.mins}
                    onClick={() => setSelectedGoal(opt.mins)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          {opt.label}
                          {opt.recommended && (
                            <span className="text-[10px] font-black uppercase bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/40">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">{opt.desc}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-sm text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-center">
              <MascotByte mood="thinking" message="How experienced are you with AI?" size="md" />
            </div>

            <h2 className="text-2xl font-black text-white text-center mb-2">Find your starting point</h2>
            <p className="text-xs text-slate-400 text-center mb-6">
              Start from Unit 1 basics or take a 3-question placement test to unlock advanced levels immediately!
            </p>

            <div className="space-y-4 mb-8">
              <button
                onClick={() => onCompleteOnboarding(selectedGoal, false)}
                className="w-full p-5 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-indigo-500 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm text-white group-hover:text-indigo-300">
                    🌱 I'm new to AI (Start from Unit 1)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Build strong fundamentals from scratch: tokens, prompt basics, and model limitations.
                </p>
              </button>

              <button
                onClick={() => onCompleteOnboarding(selectedGoal, true)}
                className="w-full p-5 rounded-2xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/50 hover:border-indigo-400 text-left transition-all group cursor-pointer shadow-lg shadow-indigo-500/10"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Take Placement Quiz
                  </span>
                  <span className="text-[10px] font-bold bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    Skip Content
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Answer 3 quick questions. Prove your AI knowledge to unlock Unit 2/3 & bonus XP!
                </p>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
