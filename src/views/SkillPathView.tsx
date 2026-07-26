import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Lock, 
  Play, 
  Star, 
  Gift, 
  Sparkles, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  Scale, 
  Briefcase, 
  Compass, 
  Bot, 
  Layers 
} from 'lucide-react';
import { UserState } from '../types';
import { CURRICULUM } from '../data/curriculum';
import { MascotByte } from '../components/MascotByte';

interface SkillPathViewProps {
  userState: UserState;
  onSelectLesson: (unitId: number, lessonId: string) => void;
  onOpenPromptCoach: () => void;
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

export const SkillPathView: React.FC<SkillPathViewProps> = ({
  userState,
  onSelectLesson,
  onOpenPromptCoach
}) => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 space-y-8">
      
      {/* Byte Mascot Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white shadow-xl shadow-indigo-600/20 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <MascotByte
          mood="cheerful"
          message={`Welcome back! You're on Unit ${userState.currentUnitId}. Keep your ${userState.streak}-day streak alive!`}
          size="md"
        />
        <button
          onClick={onOpenPromptCoach}
          className="shrink-0 px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" /> Try AI Prompt Coach
        </button>
      </motion.div>

      {/* Units List Winding Map */}
      <div className="space-y-12">
        {CURRICULUM.map((unit, unitIdx) => {
          const isUnitUnlocked = unit.id <= userState.currentUnitId;
          const isUnitCompleted = userState.completedUnits.includes(unit.id);
          const UnitBadgeIcon = IconMap[unit.badgeIcon] || Cpu;

          return (
            <div key={unit.id} className="relative">
              
              {/* Unit Header Card */}
              <div className={`p-5 rounded-3xl bg-gradient-to-r ${unit.color} text-white shadow-lg mb-8 transition-all ${
                !isUnitUnlocked ? 'opacity-60 grayscale' : ''
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full text-white backdrop-blur-xs">
                      Unit {unit.id}
                    </span>
                    {isUnitCompleted && (
                      <span className="text-xs font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-slate-950" /> Mastered
                      </span>
                    )}
                  </div>
                  <UnitBadgeIcon className="w-6 h-6 text-white/80" />
                </div>

                <h2 className="text-xl font-black mb-1">{unit.title}</h2>
                <p className="text-xs text-white/90 font-medium mb-3">{unit.description}</p>

                {/* Stamp Award preview */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/20 text-[11px] text-white/80">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Unlocks Passport Stamp: <strong className="text-white">{unit.badgeTitle}</strong></span>
                </div>
              </div>

              {/* Lessons Winding Path Nodes */}
              <div className="relative flex flex-col items-center space-y-6">
                
                {unit.lessons.map((lesson, lessonIdx) => {
                  const isLessonCompleted = userState.completedLessons.includes(lesson.id);
                  const isCurrentTarget = isUnitUnlocked && !isLessonCompleted && (
                    lessonIdx === 0 || userState.completedLessons.includes(unit.lessons[lessonIdx - 1]?.id)
                  );
                  const isLessonLocked = !isUnitUnlocked || (!isLessonCompleted && !isCurrentTarget);

                  // Calculate sinusoidal horizontal alignment for winding path effect!
                  const offsetAlign = ['self-center', 'self-start sm:ml-24', 'self-center', 'self-end sm:mr-24'][lessonIdx % 4];

                  return (
                    <div key={lesson.id} className={`flex flex-col items-center z-10 ${offsetAlign}`}>
                      <motion.button
                        whileHover={!isLessonLocked ? { scale: 1.1 } : {}}
                        whileTap={!isLessonLocked ? { scale: 0.95 } : {}}
                        onClick={() => {
                          if (!isLessonLocked) {
                            onSelectLesson(unit.id, lesson.id);
                          }
                        }}
                        className={`relative w-16 h-16 rounded-full flex items-center justify-center font-black text-lg transition-all cursor-pointer shadow-lg ${
                          isLessonCompleted
                            ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-900 border-4 border-amber-300 shadow-amber-500/30'
                            : isCurrentTarget
                            ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white border-4 border-cyan-400 ring-4 ring-cyan-400/30 shadow-indigo-600/40 animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-4 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                        }`}
                      >
                        {isLessonCompleted ? (
                          <Check className="w-8 h-8 stroke-[3]" />
                        ) : isCurrentTarget ? (
                          <Play className="w-7 h-7 fill-white ml-0.5" />
                        ) : (
                          <Lock className="w-6 h-6" />
                        )}

                        {/* Current Lesson Pulsating Label */}
                        {isCurrentTarget && (
                          <span className="absolute -top-3 bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md animate-bounce">
                            START
                          </span>
                        )}
                      </motion.button>

                      {/* Lesson Title Label */}
                      <div className="mt-2 text-center max-w-[140px]">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 block">
                          {lesson.title}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          +{lesson.xpReward} XP • {lesson.durationMinutes}m
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Bonus Gem Chest Node after Unit */}
                <div className="flex flex-col items-center pt-2">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    isUnitCompleted
                      ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-600 border-cyan-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}>
                    <Gift className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">Unit Chest</span>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
