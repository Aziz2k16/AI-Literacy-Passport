export type QuestionType = 
  | 'multiple_choice' 
  | 'spot_mistake' 
  | 'drag_rank' 
  | 'fill_blank' 
  | 'true_false' 
  | 'rewrite_prompt';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  context?: string;
  options?: string[]; // For multiple choice, spot mistake, fill blank
  correctAnswer: string | number | string[]; // string/index for MC, index for spot_mistake, ordered array for drag_rank
  explanation: string;
  tip?: string;
  blankPrefix?: string; // For fill_blank
  blankSuffix?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  gemReward: number;
  questions: Question[];
}

export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badgeTitle: string;
  badgeIcon: string; // lucide icon identifier
  lessons: Lesson[];
  color: string; // Tailwind gradient/color class
}

export interface Stamp {
  unitId: number;
  title: string;
  category: string;
  unlockedAt: string | null;
  description: string;
  iconName: string;
  color: string;
}

export interface UserState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  hearts: number; // Max 5
  maxHearts: number;
  lastHeartLossTimestamp: number | null;
  gems: number;
  completedLessons: string[]; // lesson ids
  completedUnits: number[]; // unit ids
  currentUnitId: number;
  currentLessonId: string | null;
  stamps: Stamp[];
  activePassportCover: string;
  unlockedCovers: string[];
  streakFreezeActive: boolean;
  dailyGoalMinutes: number;
  soundEnabled: boolean;
  onboardingCompleted: boolean;
  placementCompleted: boolean;
  weakSkills: string[]; // topic tags for review
}

export interface PromptCoachRequest {
  userPrompt: string;
}

export interface PromptCoachResponse {
  scores: {
    clarity: number; // 1-5
    specificity: number; // 1-5
    context: number; // 1-5
  };
  overallScore: number;
  rewrittenPrompt: string;
  explanation: string;
  encouragingTip: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  headline: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  league: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  isUser?: boolean;
}
