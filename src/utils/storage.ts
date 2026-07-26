import { UserState } from '../types';
import { INITIAL_STAMPS } from '../data/stamps';

const STORAGE_KEY = 'ai_passport_user_state_v1';

export const INITIAL_USER_STATE: UserState = {
  xp: 0,
  level: 1,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  hearts: 5,
  maxHearts: 5,
  lastHeartLossTimestamp: null,
  gems: 100,
  completedLessons: [],
  completedUnits: [],
  currentUnitId: 1,
  currentLessonId: null,
  stamps: INITIAL_STAMPS,
  activePassportCover: 'Cyber Violet',
  unlockedCovers: ['Cyber Violet'],
  streakFreezeActive: false,
  dailyGoalMinutes: 5,
  soundEnabled: true,
  onboardingCompleted: false,
  placementCompleted: false,
  weakSkills: ['Tokens', 'Prompt Context', 'Hallucinations']
};

export function loadUserState(): UserState {
  if (typeof window === 'undefined') return INITIAL_USER_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_USER_STATE;
    const parsed = JSON.parse(raw);
    
    // Calculate streak check
    const today = new Date().toISOString().split('T')[0];
    const lastActive = parsed.lastActiveDate || today;
    
    const diffDays = Math.floor(
      (new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 3600 * 24)
    );

    let currentStreak = parsed.streak || 1;
    let freezeActive = parsed.streakFreezeActive;

    if (diffDays === 1) {
      // Worked yesterday, streak maintained
    } else if (diffDays > 1) {
      if (freezeActive) {
        // Protected by streak freeze
        freezeActive = false;
      } else {
        // Reset streak
        currentStreak = 0;
      }
    }

    // Auto-refill heart if 30 mins passed per heart
    let currentHearts = parsed.hearts ?? 5;
    const lastLoss = parsed.lastHeartLossTimestamp;
    if (currentHearts < 5 && lastLoss) {
      const minsPassed = Math.floor((Date.now() - lastLoss) / (1000 * 60));
      const heartsToAdd = Math.floor(minsPassed / 30);
      if (heartsToAdd > 0) {
        currentHearts = Math.min(5, currentHearts + heartsToAdd);
      }
    }

    return {
      ...INITIAL_USER_STATE,
      ...parsed,
      streak: currentStreak,
      streakFreezeActive: freezeActive,
      hearts: currentHearts,
      stamps: parsed.stamps || INITIAL_STAMPS
    };
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return INITIAL_USER_STATE;
  }
}

export function saveUserState(state: UserState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

export function calculateLevel(xp: number): { level: number; currentXp: number; nextLevelXp: number } {
  // Each level requires Level * 100 XP
  let level = 1;
  let xpNeeded = 100;
  let remainingXp = xp;

  while (remainingXp >= xpNeeded) {
    remainingXp -= xpNeeded;
    level++;
    xpNeeded = level * 100;
  }

  return {
    level,
    currentXp: remainingXp,
    nextLevelXp: xpNeeded
  };
}
