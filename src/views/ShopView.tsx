import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Gem, Heart, Shield, Award, Check } from 'lucide-react';
import { UserState } from '../types';

interface ShopViewProps {
  userState: UserState;
  onBuyHeartRefill: () => void;
  onBuyStreakFreeze: () => void;
  onBuyPassportCover: (coverName: string, cost: number) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  userState,
  onBuyHeartRefill,
  onBuyStreakFreeze,
  onBuyPassportCover
}) => {
  const cosmeticCovers = [
    { name: 'Golden Traveler', cost: 300, gradient: 'from-amber-950 via-yellow-900 to-amber-950', desc: 'Luxury gold foil passport cover' },
    { name: 'Neon Hologram', cost: 300, gradient: 'from-cyan-950 via-indigo-900 to-fuchsia-950', desc: 'Futuristic metallic iridescent cover' },
    { name: 'Retro Sepia', cost: 300, gradient: 'from-stone-900 via-stone-800 to-stone-950', desc: 'Classic vintage leather diplomat cover' }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" /> Gamification Shop
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Passport Store
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Spend your earned gems on power-ups, heart refills, and custom passport covers.
          </p>
        </div>

        {/* Gems Balance Card */}
        <div className="flex items-center gap-2 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 px-4 py-2 rounded-2xl text-cyan-600 dark:text-cyan-300 font-extrabold text-sm">
          <Gem className="w-5 h-5 fill-cyan-400 text-cyan-400" />
          <span>{userState.gems} Gems</span>
        </div>
      </div>

      {/* Power-ups Section */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
          Power-ups & Refills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Heart Refill Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-500">
                <Heart className="w-6 h-6 fill-rose-500" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Full Heart Refill</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  Instantly restore your hearts back to 5/5 so you can keep practicing.
                </p>
              </div>
            </div>

            <button
              disabled={userState.gems < 50 || userState.hearts >= 5}
              onClick={onBuyHeartRefill}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 disabled:opacity-40 text-white font-extrabold text-xs shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{userState.hearts >= 5 ? 'Hearts Full (5/5)' : 'Refill Hearts'}</span>
              <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-lg">
                <Gem className="w-3 h-3 fill-white" /> 50
              </span>
            </button>
          </div>

          {/* Streak Freeze Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-500">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Streak Freeze</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  Protects your daily streak for 1 full day if you miss a lesson.
                </p>
              </div>
            </div>

            <button
              disabled={userState.gems < 200 || userState.streakFreezeActive}
              onClick={onBuyStreakFreeze}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 disabled:opacity-40 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{userState.streakFreezeActive ? 'Streak Shield Active' : 'Equip Streak Freeze'}</span>
              <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-lg">
                <Gem className="w-3 h-3 fill-white" /> 200
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Cosmetic Passport Covers */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
          Cosmetic Passport Covers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cosmeticCovers.map((cover) => {
            const isUnlocked = userState.unlockedCovers.includes(cover.name);

            return (
              <div
                key={cover.name}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className={`h-16 rounded-2xl bg-gradient-to-r ${cover.gradient} mb-3 shadow-inner flex items-center justify-center text-white font-black text-xs`}>
                    {cover.name}
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{cover.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{cover.desc}</p>
                </div>

                {isUnlocked ? (
                  <div className="w-full py-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-extrabold text-xs text-center flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Unlocked
                  </div>
                ) : (
                  <button
                    disabled={userState.gems < cover.cost}
                    onClick={() => onBuyPassportCover(cover.name, cover.cost)}
                    className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Unlock Cover</span>
                    <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-lg">
                      <Gem className="w-3 h-3 fill-cyan-400" /> {cover.cost}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
