import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame, Gem, Sparkles, ArrowRight, Award, CheckCircle } from 'lucide-react';
import { MascotByte } from '../components/MascotByte';
import { Stamp } from '../types';
import { sound } from '../utils/audio';

interface LessonCompleteViewProps {
  xpGained: number;
  gemsGained: number;
  streak: number;
  unlockedStamp: Stamp | null;
  soundEnabled: boolean;
  onContinue: () => void;
}

export const LessonCompleteView: React.FC<LessonCompleteViewProps> = ({
  xpGained,
  gemsGained,
  streak,
  unlockedStamp,
  soundEnabled,
  onContinue
}) => {
  useEffect(() => {
    sound.playLevelUp(soundEnabled);
    if (unlockedStamp) {
      setTimeout(() => sound.playStamp(soundEnabled), 800);
    }
  }, [soundEnabled, unlockedStamp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-black text-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6"
      >
        
        {/* Mascot Celebrating */}
        <div className="flex justify-center">
          <MascotByte
            mood="celebrating"
            message={unlockedStamp ? `WOAH! You unlocked the ${unlockedStamp.title} Stamp!` : "Lesson complete! Outstanding progress today!"}
            size="lg"
          />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300">
            {unlockedStamp ? 'Unit Mastered!' : 'Lesson Complete!'}
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Consistency pays off! Here are your rewards:
          </p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-3 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs font-bold text-slate-400 mb-1">TOTAL XP</div>
            <div className="font-black text-lg text-amber-400 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 fill-amber-400" /> +{xpGained}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs font-bold text-slate-400 mb-1">STREAK</div>
            <div className="font-black text-lg text-orange-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-orange-400" /> {streak}d
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs font-bold text-slate-400 mb-1">GEMS</div>
            <div className="font-black text-lg text-cyan-400 flex items-center justify-center gap-1">
              <Gem className="w-4 h-4 fill-cyan-400" /> +{gemsGained}
            </div>
          </div>

        </div>

        {/* Unlocked Passport Stamp Showcase Card */}
        {unlockedStamp && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="p-5 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30 border border-white/20 relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
            
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full w-max mx-auto mb-3">
              <Award className="w-4 h-4 text-yellow-300" /> New Passport Stamp
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center mx-auto mb-3 text-white text-2xl font-black shadow-inner">
              <Award className="w-8 h-8 text-yellow-300" />
            </div>

            <h3 className="text-lg font-black mb-1">{unlockedStamp.title}</h3>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              {unlockedStamp.description}
            </p>
          </motion.div>
        )}

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          Continue to Skill Path <ArrowRight className="w-4 h-4" />
        </button>

      </motion.div>
    </div>
  );
};
