import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, HeartHandshake, Smile, Zap, HelpCircle } from 'lucide-react';

export type MascotMood = 'cheerful' | 'thinking' | 'celebrating' | 'encouraging' | 'surprised';

interface MascotByteProps {
  mood?: MascotMood;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
}

export const MascotByte: React.FC<MascotByteProps> = ({
  mood = 'cheerful',
  message,
  size = 'md',
  showSpeechBubble = true
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-20 h-20 text-sm',
    lg: 'w-28 h-28 text-base'
  };

  const MoodIcon = {
    cheerful: Smile,
    thinking: HelpCircle,
    celebrating: Zap,
    encouraging: HeartHandshake,
    surprised: Sparkles
  }[mood];

  const moodGradients = {
    cheerful: 'from-blue-500 via-indigo-500 to-purple-500',
    thinking: 'from-amber-500 via-orange-500 to-yellow-500',
    celebrating: 'from-fuchsia-500 via-pink-500 to-rose-500',
    encouraging: 'from-emerald-500 via-teal-500 to-cyan-500',
    surprised: 'from-purple-500 via-indigo-500 to-cyan-500'
  }[mood];

  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: mood === 'celebrating' ? [0, 8, -8, 0] : [0, 2, -2, 0]
        }}
        transition={{
          duration: mood === 'celebrating' ? 1.2 : 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`relative flex items-center justify-center rounded-3xl bg-gradient-to-tr ${moodGradients} p-3 text-white shadow-lg shadow-indigo-500/25 ${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]}`}
      >
        <Bot className="w-2/3 h-2/3 text-white drop-shadow-md" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
          <MoodIcon className="w-3 h-3" />
        </span>
      </motion.div>

      {showSpeechBubble && message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative max-w-xs rounded-2xl bg-white dark:bg-slate-800 p-3.5 shadow-md border border-slate-100 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 font-medium text-sm leading-relaxed"
        >
          <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white dark:border-r-slate-800 border-b-8 border-b-transparent" />
          <div className="flex items-start gap-1.5">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-wider block mb-0.5">Byte says:</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200">{message}</p>
        </motion.div>
      )}
    </div>
  );
};
