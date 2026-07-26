import React from 'react';
import { motion } from 'motion/react';
import { Heart, Gem, Dumbbell, X, Sparkles } from 'lucide-react';

interface HeartModalProps {
  isOpen: boolean;
  onClose: () => void;
  hearts: number;
  gems: number;
  onRefillWithGems: () => void;
  onStartPractice: () => void;
}

export const HeartModal: React.FC<HeartModalProps> = ({
  isOpen,
  onClose,
  hearts,
  gems,
  onRefillWithGems,
  onStartPractice
}) => {
  if (!isOpen) return null;

  const canAfford = gems >= 50;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-500 shadow-md shadow-rose-500/20">
          <Heart className="w-8 h-8 fill-rose-500 animate-pulse" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
          {hearts === 0 ? 'Out of Hearts!' : 'Refill Hearts'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Hearts protect you from wrong answers during lessons. Refill instantly or earn hearts back by practicing!
        </p>

        <div className="space-y-3">
          {/* Option 1: Refill with Gems */}
          <button
            onClick={() => {
              if (canAfford) {
                onRefillWithGems();
                onClose();
              }
            }}
            disabled={!canAfford || hearts >= 5}
            className={`w-full py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-between transition-all cursor-pointer ${
              canAfford && hearts < 5
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:brightness-110'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-white" /> Refill Full Hearts (5/5)
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-xl text-xs">
              <Gem className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" /> 50
            </span>
          </button>

          {/* Option 2: Free Practice Mode */}
          <button
            onClick={() => {
              onStartPractice();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-2xl font-bold text-sm border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Dumbbell className="w-4 h-4" /> Practice Weak Skills (+1 Heart)
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500">
          Hearts also refill automatically over time (1 heart every 30 minutes).
        </p>
      </motion.div>
    </div>
  );
};
