import React, { useState, useEffect } from 'react';
import { AppSettings, LessonProgress, Lesson } from './types';
import {
  getSettings,
  saveSettings,
  getAllProgress,
  calculateChallengeDay,
} from './services/storage';
import { CURRICULUM, getLessonById, getLessonByDay } from './data/curriculumData';
import { getAudioForLesson } from './data/audioManifest';
import { Header } from './components/Header';
import { CalendarView } from './components/CalendarView';
import { DailyLesson } from './components/DailyLesson';
import { Dashboard } from './components/Dashboard';
import { SettingsModal } from './components/SettingsModal';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(() => getSettings());
  const [allProgress, setAllProgress] = useState<Record<string, LessonProgress>>(() => getAllProgress());
  const [currentView, setCurrentView] = useState<'calendar' | 'dashboard' | 'lesson'>('calendar');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize theme on initial mount
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Refresh progress when coming back to calendar or dashboard
  const refreshProgress = () => {
    setAllProgress(getAllProgress());
  };

  const todayDayNumber = calculateChallengeDay(settings.challengeStartDate);

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCalendar = () => {
    refreshProgress();
    setCurrentView('calendar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToNextLesson = (nextDayNumber: number) => {
    const nextLesson = getLessonByDay(nextDayNumber);
    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
      setCurrentView('lesson');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleBackToCalendar();
    }
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleDataReset = () => {
    setSettings(getSettings());
    setAllProgress(getAllProgress());
  };

  const activeLesson: Lesson | undefined = activeLessonId
    ? getLessonById(activeLessonId)
    : undefined;
  const activeAudio = activeLessonId ? getAudioForLesson(activeLessonId) : undefined;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Application Header */}
      <Header
        currentView={currentView === 'lesson' ? 'calendar' : currentView}
        onViewChange={(v) => {
          refreshProgress();
          setCurrentView(v);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        todayDayNumber={todayDayNumber}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-6 sm:py-8">
        {currentView === 'calendar' && (
          <CalendarView
            todayDayNumber={todayDayNumber}
            allProgress={allProgress}
            onSelectLesson={handleSelectLesson}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            todayDayNumber={todayDayNumber}
            allProgress={allProgress}
            onGoToLesson={handleSelectLesson}
          />
        )}

        {currentView === 'lesson' && activeLesson && (
          <DailyLesson
            lesson={activeLesson}
            audioEntry={activeAudio}
            onBackToCalendar={handleBackToCalendar}
            onGoToNextLesson={handleGoToNextLesson}
          />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        onDataReset={handleDataReset}
      />
    </div>
  );
};
