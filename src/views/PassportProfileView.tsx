import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Sparkles, Flame, Gem, Shield, Cpu, Terminal, ShieldCheck, Scale, Briefcase, Compass, Bot, Layers, Check } from 'lucide-react';
import { UserState, Stamp } from '../types';

interface PassportProfileViewProps {
  userState: UserState;
  onSelectCoverTheme: (coverName: string) => void;
}

const IconMap: Record<string, React.ElementType> = {
  Cpu,
  Terminal,
  Sparkles,
  ShieldCheck,
  Scale,
  Briefcase,
  Compass,
  Bot,
  Layers
};

export const PassportProfileView: React.FC<PassportProfileViewProps> = ({
  userState,
  onSelectCoverTheme
}) => {
  const unlockedCount = userState.stamps.filter((s) => s.unlockedAt !== null).length;

  const coverThemes = [
    { name: 'Cyber Violet', gradient: 'from-indigo-900 via-purple-900 to-slate-900', border: 'border-purple-500/40' },
    { name: 'Golden Traveler', gradient: 'from-amber-950 via-yellow-900 to-amber-950', border: 'border-amber-500/40' },
    { name: 'Neon Hologram', gradient: 'from-cyan-950 via-indigo-900 to-fuchsia-950', border: 'border-cyan-500/40' },
    { name: 'Retro Sepia', gradient: 'from-stone-900 via-stone-800 to-stone-950', border: 'border-stone-500/40' }
  ];

  const activeCoverTheme = coverThemes.find((c) => c.name === userState.activePassportCover) || coverThemes[0];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 space-y-8">
      
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" /> Digital Passport
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          AI Literacy Passport
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Your official stamped record of mastered AI units, level achievements, and active learning streaks.
        </p>
      </div>

      {/* Passport Book Visual Container */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${activeCoverTheme.gradient} border ${activeCoverTheme.border} text-white shadow-2xl space-y-8 relative overflow-hidden`}>
        
        {/* Decorative Passport Watermark */}
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64 text-white" />
        </div>

        {/* Passport Header Information */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xl text-cyan-300">
                AI
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 block mb-0.5">
                OFFICIAL DIPLOMATIC PASSPORT
              </span>
              <h2 className="text-xl font-black text-white">AI Citizen #4029</h2>
              <p className="text-xs text-slate-300 font-medium">
                Level {userState.level} • {unlockedCount} / 9 Passport Stamps Unlocked
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-2 rounded-2xl text-xs font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Theme: {userState.activePassportCover}</span>
          </div>
        </div>

        {/* Passport Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">TOTAL XP</span>
            <span className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 fill-amber-400" /> {userState.xp}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">CURRENT STREAK</span>
            <span className="text-lg font-black text-orange-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-orange-400" /> {userState.streak}d
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">GEMS BALANCE</span>
            <span className="text-lg font-black text-cyan-400 flex items-center justify-center gap-1">
              <Gem className="w-4 h-4 fill-cyan-400" /> {userState.gems}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">STAMPS</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1">
              <Award className="w-4 h-4" /> {unlockedCount}/9
            </span>
          </div>
        </div>

        {/* Stamp Gallery Section */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-indigo-300 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4" /> Visas & Official Stamps
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {userState.stamps.map((stamp) => {
              const isUnlocked = stamp.unlockedAt !== null;
              const IconComp = IconMap[stamp.iconName] || Award;

              return (
                <div
                  key={stamp.unitId}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-indigo-900/80 to-purple-900/80 border-cyan-400/50 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-black/40 border-white/10 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
                      Unit {stamp.unitId}
                    </span>
                    <IconComp className={`w-5 h-5 ${isUnlocked ? 'text-amber-300' : 'text-slate-600'}`} />
                  </div>

                  <h4 className="font-extrabold text-sm text-white mb-1">{stamp.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 mb-3">
                    {stamp.description}
                  </p>

                  <div className="text-[10px] font-bold border-t border-white/10 pt-2 flex items-center justify-between">
                    <span>{stamp.category}</span>
                    <span className={isUnlocked ? 'text-emerald-400 font-extrabold' : 'text-slate-500'}>
                      {isUnlocked ? `STAMPED ${stamp.unlockedAt}` : 'LOCKED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Passport Cover Customization Theme Options */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
          Passport Cover Themes
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
          Select your active passport theme or unlock new covers in the Shop:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {coverThemes.map((theme) => {
            const isUnlocked = userState.unlockedCovers.includes(theme.name);
            const isActive = userState.activePassportCover === theme.name;

            return (
              <button
                key={theme.name}
                disabled={!isUnlocked}
                onClick={() => onSelectCoverTheme(theme.name)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                    : isUnlocked
                    ? 'border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 opacity-40 cursor-not-allowed'
                }`}
              >
                <div className={`h-8 rounded-xl bg-gradient-to-r ${theme.gradient} mb-2 shadow-inner`} />
                <div className="font-extrabold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>{theme.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
