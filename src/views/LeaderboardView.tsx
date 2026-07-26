import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame, Shield, ArrowUp, ArrowDown, Award, Crown } from 'lucide-react';
import { UserState, LeaderboardUser } from '../types';

interface LeaderboardViewProps {
  userState: UserState;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ userState }) => {
  const [activeLeague, setActiveLeague] = useState<'Bronze' | 'Silver' | 'Gold' | 'Diamond'>('Bronze');

  const leagues = ['Bronze', 'Silver', 'Gold', 'Diamond'] as const;

  const mockUsers: LeaderboardUser[] = [
    { id: '1', name: 'Sophia Chen', avatar: '👩‍💻', xp: 840, streak: 12, league: 'Bronze' as const },
    { id: '2', name: 'Alex Rivera', avatar: '🚀', xp: 720, streak: 9, league: 'Bronze' as const },
    { id: 'user', name: 'You (AI Citizen)', avatar: '⚡', xp: userState.xp, streak: userState.streak, league: 'Bronze' as const, isUser: true },
    { id: '3', name: 'Devon Vance', avatar: '🤖', xp: 510, streak: 6, league: 'Bronze' as const },
    { id: '4', name: 'Elena Rostova', avatar: '✨', xp: 480, streak: 4, league: 'Bronze' as const },
    { id: '5', name: 'Marcus Brody', avatar: '🎓', xp: 390, streak: 3, league: 'Bronze' as const },
    { id: '6', name: 'Priya Sharma', avatar: '🎨', xp: 310, streak: 2, league: 'Bronze' as const },
    { id: '7', name: 'Liam O\'Connor', avatar: '🧠', xp: 240, streak: 1, league: 'Bronze' as const }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-1">
          <Trophy className="w-4 h-4" /> Weekly Leagues
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Leaderboard
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Compete against fellow AI learners weekly. Top 3 promote to the next league tier!
        </p>
      </div>

      {/* League Tiers Selector */}
      <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
        {leagues.map((lg) => {
          const isActive = activeLeague === lg;
          return (
            <button
              key={lg}
              onClick={() => setActiveLeague(lg)}
              className={`py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {lg}
            </button>
          );
        })}
      </div>

      {/* League Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white shadow-xl shadow-indigo-600/20 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-white mb-1 inline-block">
            {activeLeague} League
          </span>
          <h2 className="text-xl font-black">Weekly Sprint</h2>
          <p className="text-xs text-white/80 font-medium mt-0.5">
            Resetting in 3 days, 14 hours
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
          <Trophy className="w-8 h-8 fill-amber-300" />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Rank & Learner</span>
          <span>Weekly XP</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockUsers.map((usr, idx) => {
            const rank = idx + 1;
            const isPromoteZone = rank <= 3;

            return (
              <div
                key={usr.id}
                className={`p-4 flex items-center justify-between transition-all ${
                  usr.isUser
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/60 font-bold border-l-4 border-l-indigo-600'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                    rank === 1
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                      : rank === 2
                      ? 'bg-slate-300 text-slate-950'
                      : rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {rank === 1 ? <Crown className="w-4 h-4 fill-slate-950" /> : `#${rank}`}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{usr.avatar}</span>
                    <div>
                      <span className={`text-sm block ${usr.isUser ? 'font-black text-indigo-600 dark:text-indigo-400' : 'font-extrabold text-slate-800 dark:text-slate-200'}`}>
                        {usr.name}
                      </span>
                      {isPromoteZone && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                          <ArrowUp className="w-2.5 h-2.5" /> Promotion Zone
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* XP */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" /> {usr.streak}d
                  </span>
                  <span className="font-black text-sm text-slate-900 dark:text-white">
                    {usr.xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
