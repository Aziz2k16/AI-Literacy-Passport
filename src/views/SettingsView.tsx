import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, VolumeX, Target, RotateCcw, ShieldCheck, Sun, Moon } from 'lucide-react';
import { UserState } from '../types';

interface SettingsViewProps {
  userState: UserState;
  onUpdateDailyGoal: (goalMins: number) => void;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userState,
  onUpdateDailyGoal,
  onToggleSound,
  onResetProgress
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const goalOptions = [3, 5, 10, 15];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-1">
          <SettingsIcon className="w-4 h-4" /> Account Settings
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Preferences & Goals
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Manage your daily learning targets, sound effects, and account progress.
        </p>
      </div>

      {/* Daily Goal Commitment */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
          <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Daily Learning Goal
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          How many minutes per day do you want to dedicate to AI literacy?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {goalOptions.map((mins) => {
            const isSelected = userState.dailyGoalMinutes === mins;
            return (
              <button
                key={mins}
                onClick={() => onUpdateDailyGoal(mins)}
                className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {mins} Minutes / day
              </button>
            );
          })}
        </div>
      </div>

      {/* Sound & Audio Effects */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Sound Effects</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Play chime audio feedback for correct/wrong answers and celebrations.
          </p>
        </div>

        <button
          onClick={onToggleSound}
          className={`p-3 rounded-2xl border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            userState.soundEnabled
              ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
          }`}
        >
          {userState.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <span>{userState.soundEnabled ? 'Enabled' : 'Muted'}</span>
        </button>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 shadow-md space-y-4">
        <div>
          <h3 className="font-extrabold text-sm text-rose-600 dark:text-rose-400">Reset All Progress</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This will permanently reset your XP, level, daily streak, completed lessons, and unlocked passport stamps.
          </p>
        </div>

        {confirmReset ? (
          <div className="flex gap-3">
            <button
              onClick={onResetProgress}
              className="px-5 py-2.5 rounded-2xl bg-rose-600 text-white font-extrabold text-xs shadow-md shadow-rose-600/30 hover:bg-rose-500 cursor-pointer"
            >
              Confirm Reset Data
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="px-5 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="px-5 py-2.5 rounded-2xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Reset My Passport Data
          </button>
        )}
      </div>

    </div>
  );
};
