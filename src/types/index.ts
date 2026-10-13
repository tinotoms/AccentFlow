export type SkillCategory = 'american_r' | 'vowels' | 't_th' | 'rhythm' | 'fluency';

export type ScoreRating = 1 | 2 | 3 | 4 | 5 | null;

export interface MinimalPair {
  wordA: string;
  wordB: string;
  focus: string;
}

export interface ArticulationGuidance {
  jaw: string;
  lips: string;
  tongue: string;
}

export interface Lesson {
  id: string;
  day: number;
  week: number;
  title: string;
  objective: string;
  estimatedDurationMinutes: number;
  targetSkill: string;
  skillCategory: SkillCategory;
  explanation: string;
  articulationGuidance: ArticulationGuidance;
  commonMistakeWarning: string;
  targetWords: string[];
  minimalPairs: MinimalPair[];
  referenceSentence: string;
  audioManifestId: string;
  listeningFocus: string;
  drillInstructions: string;
  shadowingInstructions: string;
  speakingPrompt: string;
  completionCriteria: string;
}

export type AudioSourceType = 'local' | 'external' | 'tts_fallback' | 'custom_uploaded';

export interface AudioEntry {
  id: string;
  lessonId: string;
  sourceType: AudioSourceType;
  src: string | null;
  transcript: string;
  speaker: string;
  attribution?: string | null;
  attributionUrl?: string | null;
  startTime?: number | null;
  endTime?: number | null;
  status: 'available' | 'audio_pending_upload';
  notes?: string;
}

export interface VoiceRecording {
  id: string;
  lessonId: string;
  attemptNumber: number;
  timestamp: number;
  durationSeconds: number;
  audioBlob?: Blob;
  dataUrl?: string;
  mimeType: string;
  isPreferred: boolean;
  step: 'shadowing' | 'speaking';
}

export interface LessonProgress {
  lessonId: string;
  isCompleted: boolean;
  completedAt?: string;
  lastVisitedStep: number;
  ratings: Record<SkillCategory, ScoreRating>;
  reflectionHardest: string;
  reflectionFocusNext: string;
  updatedAt: string;
}

export interface RecommendationResource {
  id: string;
  skillCategory: SkillCategory;
  title: string;
  provider: string;
  url: string;
  searchTopic: string;
  reason: string;
  practiceActivity: string;
}

export interface RecommendationResult {
  primary: RecommendationResource;
  alternative?: RecommendationResource;
  targetSkill: SkillCategory;
  skillName: string;
  lowestRating: number | null;
  explanation: string;
  historicalTrend?: string;
}

export interface AppSettings {
  challengeStartDate: string;
  theme: 'light' | 'dark';
  soundEffects: boolean;
  defaultAudioSpeed: number;
}
