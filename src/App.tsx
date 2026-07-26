/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserState, Stamp, Lesson } from './types';
import { loadUserState, saveUserState, calculateLevel } from './utils/storage';
import { CURRICULUM } from './data/curriculum';
import { Header } from './components/Header';
import { Navbar, ActiveTab } from './components/Navbar';
import { HeartModal } from './components/HeartModal';
import { LandingView } from './views/LandingView';
import { OnboardingView } from './views/OnboardingView';
import { SkillPathView } from './views/SkillPathView';
import { LessonView } from './views/LessonView';
import { LessonCompleteView } from './views/LessonCompleteView';
import { PracticeHubView } from './views/PracticeHubView';
import { PromptCoachView } from './views/PromptCoachView';
import { PassportProfileView } from './views/PassportProfileView';
import { LeaderboardView } from './views/LeaderboardView';
import { ShopView } from './views/ShopView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [currentView, setCurrentView] = useState<'landing' | 'onboarding' | 'main' | 'lesson' | 'lesson_complete'>(() => {
    const loaded = loadUserState();
    return loaded.onboardingCompleted ? 'main' : 'landing';
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('path');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeUnitId, setActiveUnitId] = useState<number>(1);
  const [completedLessonXp, setCompletedLessonXp] = useState(0);
  const [completedLessonGems, setCompletedLessonGems] = useState(0);
  const [unlockedStamp, setUnlockedStamp] = useState<Stamp | null>(null);
  const [heartModalOpen, setHeartModalOpen] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  // Handlers
  const handleStartLanding = () => {
    if (userState.onboardingCompleted) {
      setCurrentView('main');
    } else {
      setCurrentView('onboarding');
    }
  };

  const handleCompleteOnboarding = (dailyGoalMins: number, takesPlacement: boolean) => {
    let updatedUnitId = 1;
    let initialXp = userState.xp;
    let initialCompletedLessons = [...userState.completedLessons];

    if (takesPlacement) {
      // Placement test skips to Unit 2 + awards 50 XP bonus!
      updatedUnitId = 2;
      initialXp += 50;
      initialCompletedLessons.push('u1-l1', 'u1-l2');
    }

    const updatedState: UserState = {
      ...userState,
      dailyGoalMinutes: dailyGoalMins,
      onboardingCompleted: true,
      placementCompleted: takesPlacement,
      currentUnitId: updatedUnitId,
      xp: initialXp,
      completedLessons: initialCompletedLessons
    };

    setUserState(updatedState);
    setCurrentView('main');
  };

  const handleSelectLesson = (unitId: number, lessonId: string) => {
    if (userState.hearts <= 0) {
      setHeartModalOpen(true);
      return;
    }

    const unit = CURRICULUM.find((u) => u.id === unitId);
    if (!unit) return;
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    setActiveUnitId(unitId);
    setActiveLesson(lesson);
    setCurrentView('lesson');
  };

  const handleLoseHeart = () => {
    setUserState((prev) => {
      const newHearts = Math.max(0, prev.hearts - 1);
      return {
        ...prev,
        hearts: newHearts,
        lastHeartLossTimestamp: newHearts < prev.maxHearts ? Date.now() : prev.lastHeartLossTimestamp
      };
    });
  };

  const handleFinishLesson = (xpGained: number, gemsGained: number) => {
    if (!activeLesson) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const newCompletedLessons = Array.from(new Set([...userState.completedLessons, activeLesson.id]));

    // Check if entire unit is now completed
    const currentUnit = CURRICULUM.find((u) => u.id === activeUnitId);
    let newlyUnlockedStamp: Stamp | null = null;
    let updatedCompletedUnits = [...userState.completedUnits];
    let updatedCurrentUnitId = userState.currentUnitId;

    if (currentUnit) {
      const allLessonsCompleted = currentUnit.lessons.every((l) => newCompletedLessons.includes(l.id));
      if (allLessonsCompleted && !updatedCompletedUnits.includes(currentUnit.id)) {
        updatedCompletedUnits.push(currentUnit.id);
        updatedCurrentUnitId = Math.min(9, currentUnit.id + 1);

        // Unlock Passport Stamp
        const stampIndex = userState.stamps.findIndex((s) => s.unitId === currentUnit.id);
        if (stampIndex !== -1) {
          const updatedStamps = [...userState.stamps];
          updatedStamps[stampIndex] = {
            ...updatedStamps[stampIndex],
            unlockedAt: todayStr
          };
          newlyUnlockedStamp = updatedStamps[stampIndex];
          setUserState((prev) => ({ ...prev, stamps: updatedStamps }));
        }
      }
    }

    // Update state
    setUserState((prev) => ({
      ...prev,
      xp: prev.xp + xpGained,
      gems: prev.gems + gemsGained,
      streak: prev.lastActiveDate !== todayStr ? prev.streak + 1 : prev.streak,
      lastActiveDate: todayStr,
      completedLessons: newCompletedLessons,
      completedUnits: updatedCompletedUnits,
      currentUnitId: updatedCurrentUnitId
    }));

    setCompletedLessonXp(xpGained);
    setCompletedLessonGems(gemsGained);
    setUnlockedStamp(newlyUnlockedStamp);
    setCurrentView('lesson_complete');
  };

  // Shop & Modals
  const handleRefillHeartsWithGems = () => {
    setUserState((prev) => ({
      ...prev,
      hearts: 5,
      gems: Math.max(0, prev.gems - 50)
    }));
  };

  const handleBuyStreakFreeze = () => {
    setUserState((prev) => ({
      ...prev,
      streakFreezeActive: true,
      gems: Math.max(0, prev.gems - 200)
    }));
  };

  const handleBuyPassportCover = (coverName: string, cost: number) => {
    setUserState((prev) => ({
      ...prev,
      gems: Math.max(0, prev.gems - cost),
      unlockedCovers: [...prev.unlockedCovers, coverName],
      activePassportCover: coverName
    }));
  };

  const handleToggleSound = () => {
    setUserState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleResetProgress = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* 1. Landing View */}
      {currentView === 'landing' && (
        <LandingView
          onStart={handleStartLanding}
          onSkipToApp={() => {
            setUserState((prev) => ({ ...prev, onboardingCompleted: true }));
            setCurrentView('main');
          }}
        />
      )}

      {/* 2. Onboarding Flow */}
      {currentView === 'onboarding' && (
        <OnboardingView onCompleteOnboarding={handleCompleteOnboarding} />
      )}

      {/* 3. Interactive Lesson Session */}
      {currentView === 'lesson' && activeLesson && (
        <LessonView
          lesson={activeLesson}
          hearts={userState.hearts}
          soundEnabled={userState.soundEnabled}
          onLoseHeart={handleLoseHeart}
          onFinishLesson={handleFinishLesson}
          onClose={() => setCurrentView('main')}
        />
      )}

      {/* 4. Lesson Complete Celebration Screen */}
      {currentView === 'lesson_complete' && (
        <LessonCompleteView
          xpGained={completedLessonXp}
          gemsGained={completedLessonGems}
          streak={userState.streak}
          unlockedStamp={unlockedStamp}
          soundEnabled={userState.soundEnabled}
          onContinue={() => {
            setCurrentView('main');
            setActiveTab('path');
          }}
        />
      )}

      {/* 5. Main App Workspace */}
      {currentView === 'main' && (
        <>
          <Header
            userState={userState}
            onOpenHeartModal={() => setHeartModalOpen(true)}
            onToggleSound={handleToggleSound}
          />

          <div className="flex-1 flex max-w-6xl mx-auto w-full">
            <Navbar activeTab={activeTab} onChangeTab={setActiveTab} />

            <main className="flex-1 min-w-0">
              {activeTab === 'path' && (
                <SkillPathView
                  userState={userState}
                  onSelectLesson={handleSelectLesson}
                  onOpenPromptCoach={() => setActiveTab('coach')}
                />
              )}

              {activeTab === 'practice' && (
                <PracticeHubView
                  userState={userState}
                  onStartWeakSkillsPractice={() => {
                    // Launch weak skill practice lesson (Unit 1, Lesson 1)
                    handleSelectLesson(1, 'u1-l1');
                  }}
                  onCompleteDailyChallenge={(xp, gems) => {
                    setUserState((prev) => ({
                      ...prev,
                      xp: prev.xp + xp,
                      gems: prev.gems + gems
                    }));
                  }}
                />
              )}

              {activeTab === 'coach' && <PromptCoachView />}

              {activeTab === 'leaderboard' && <LeaderboardView userState={userState} />}

              {activeTab === 'passport' && (
                <PassportProfileView
                  userState={userState}
                  onSelectCoverTheme={(coverName) => {
                    setUserState((prev) => ({ ...prev, activePassportCover: coverName }));
                  }}
                />
              )}

              {activeTab === 'shop' && (
                <ShopView
                  userState={userState}
                  onBuyHeartRefill={handleRefillHeartsWithGems}
                  onBuyStreakFreeze={handleBuyStreakFreeze}
                  onBuyPassportCover={handleBuyPassportCover}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  userState={userState}
                  onUpdateDailyGoal={(goalMins) => {
                    setUserState((prev) => ({ ...prev, dailyGoalMinutes: goalMins }));
                  }}
                  onToggleSound={handleToggleSound}
                  onResetProgress={handleResetProgress}
                />
              )}
            </main>
          </div>
        </>
      )}

      {/* Global Heart Refill Modal */}
      <HeartModal
        isOpen={heartModalOpen}
        onClose={() => setHeartModalOpen(false)}
        hearts={userState.hearts}
        gems={userState.gems}
        onRefillWithGems={handleRefillHeartsWithGems}
        onStartPractice={() => {
          setHeartModalOpen(false);
          setActiveTab('practice');
        }}
      />

    </div>
  );
}
