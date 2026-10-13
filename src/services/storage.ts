import { AppSettings, LessonProgress, ScoreRating, SkillCategory } from '../types';

const SETTINGS_KEY = 'accentflow_settings';
const PROGRESS_KEY = 'accentflow_progress';
const SESSIONS_KEY = 'accentflow_sessions';

export const getTodayISODate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDefaultSettings = (): AppSettings => {
  return {
    challengeStartDate: getTodayISODate(),
    theme: 'light',
    soundEffects: true,
    defaultAudioSpeed: 1.0,
  };
};

export const getSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      const defaults = getDefaultSettings();
      saveSettings(defaults);
      return defaults;
    }
    return { ...getDefaultSettings(), ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading settings from localStorage:', e);
    return getDefaultSettings();
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Apply theme class to document
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    console.error('Error saving settings to localStorage:', e);
  }
};

export const calculateChallengeDay = (startDateStr: string): number => {
  try {
    const start = new Date(startDateStr);
    const today = new Date(getTodayISODate());
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const calculatedDay = diffDays + 1;
    if (calculatedDay < 1) return 1;
    if (calculatedDay > 30) return 30;
    return calculatedDay;
  } catch (e) {
    return 1;
  }
};

export const getAllProgress = (): Record<string, LessonProgress> => {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading progress:', e);
    return {};
  }
};

export const getProgress = (lessonId: string): LessonProgress => {
  const all = getAllProgress();
  if (all[lessonId]) {
    return all[lessonId];
  }
  return {
    lessonId,
    isCompleted: false,
    lastVisitedStep: 1,
    ratings: {
      american_r: null,
      vowels: null,
      t_th: null,
      rhythm: null,
      fluency: null,
    },
    reflectionHardest: '',
    reflectionFocusNext: '',
    updatedAt: new Date().toISOString(),
  };
};

export const saveLessonProgress = (progress: LessonProgress): void => {
  try {
    const all = getAllProgress();
    all[progress.lessonId] = {
      ...progress,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving lesson progress:', e);
  }
};

export const markLessonComplete = (lessonId: string): LessonProgress => {
  const current = getProgress(lessonId);
  current.isCompleted = true;
  if (!current.completedAt) {
    current.completedAt = new Date().toISOString();
  }
  saveLessonProgress(current);
  incrementSessionCount();
  return current;
};

export const getCompletedCount = (): number => {
  const all = getAllProgress();
  return Object.values(all).filter(p => p.isCompleted).length;
};

export const getSessionCount = (): number => {
  try {
    const val = localStorage.getItem(SESSIONS_KEY);
    return val ? parseInt(val, 10) : 0;
  } catch (e) {
    return 0;
  }
};

export const incrementSessionCount = (): number => {
  try {
    const current = getSessionCount();
    const next = current + 1;
    localStorage.setItem(SESSIONS_KEY, String(next));
    return next;
  } catch (e) {
    return 0;
  }
};

export const resetAllProgress = (): void => {
  try {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(SESSIONS_KEY);
  } catch (e) {
    console.error('Error resetting progress:', e);
  }
};

export const exportUserDataJSON = (): string => {
  const data = {
    settings: getSettings(),
    progress: getAllProgress(),
    sessions: getSessionCount(),
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
  };
  return JSON.stringify(data, null, 2);
};

export const importUserDataJSON = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.settings) {
      saveSettings(parsed.settings);
    }
    if (parsed.progress) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(parsed.progress));
    }
    if (typeof parsed.sessions === 'number') {
      localStorage.setItem(SESSIONS_KEY, String(parsed.sessions));
    }
    return true;
  } catch (e) {
    console.error('Failed to import user data:', e);
    return false;
  }
};
