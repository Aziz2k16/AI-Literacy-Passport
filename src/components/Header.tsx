import React from 'react';
import { Flame, Gem, Heart, Volume2, VolumeX, Shield, Award } from 'lucide-react';
import { UserState } from '../types';
import { calculateLevel } from '../utils/storage';

interface HeaderProps {
  userState: UserState;
  onOpenHeartModal: () => void;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userState,
  onOpenHeartModal,
  onToggleSound
}) => {
  const { level, currentXp, nextLevelXp } = calculateLevel(userState.xp);
  const xpPercentage = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-2.5 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand / Level Badge */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" title={`Level ${level}: ${currentXp}/${nextLevelXp} XP`}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20">
              Lvl {level}
            </div>
            {/* Circular XP Progress bar simulation */}
            <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 leading-tight">
              AI Literacy Passport
              {userState.streakFreezeActive && (
                <span className="bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-sky-300 dark:border-sky-700 flex items-center gap-0.5">
                  <Shield className="w-2.5 h-2.5" /> Frozen
                </span>
              )}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {userState.xp} Total XP • Level {level}
            </p>
          </div>
        </div>

        {/* Core Gamification Meters */}
        <div className="flex items-center gap-2 sm:gap-4 font-bold text-sm">
          
          {/* Flame Streak */}
          <div 
            id="header-streak-badge"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60 shadow-xs"
            title={`${userState.streak} Day Learning Streak`}
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{userState.streak}</span>
          </div>

          {/* Gems */}
          <div 
            id="header-gems-badge"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200/60 dark:border-cyan-800/60 shadow-xs"
            title={`${userState.gems} Gems`}
          >
            <Gem className="w-4 h-4 text-cyan-500 fill-cyan-500" />
            <span>{userState.gems}</span>
          </div>

          {/* Hearts */}
          <button
            id="header-hearts-button"
            onClick={onOpenHeartModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border transition-all cursor-pointer ${
              userState.hearts <= 1
                ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700 animate-bounce'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60'
            }`}
            title="Click to Refill Hearts"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>{userState.hearts}</span>
          </button>

          {/* Sound Effect Toggle */}
          <button
            id="header-sound-toggle"
            onClick={onToggleSound}
            className="p-2 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={userState.soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {userState.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
