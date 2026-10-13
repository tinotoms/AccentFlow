import React, { useState, useEffect } from 'react';
import { Lesson, AudioEntry, LessonProgress, SkillCategory, ScoreRating, VoiceRecording } from '../types';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft, Volume2, Mic, Sparkles, BookOpen } from './Icons';
import { AudioPlayer } from './AudioPlayer';
import { VoiceRecorder } from './VoiceRecorder';
import { ComparisonPlayer } from './ComparisonPlayer';
import { Scorecard } from './Scorecard';
import { RecommendationCard } from './RecommendationCard';
import { getProgress, saveLessonProgress, markLessonComplete } from '../services/storage';
import { generateRecommendation } from '../services/recommendationEngine';
import { getRecordingsForLesson } from '../services/db';

interface DailyLessonProps {
  lesson: Lesson;
  audioEntry?: AudioEntry;
  onBackToCalendar: () => void;
  onGoToNextLesson?: (nextDayNumber: number) => void;
}

const STEPS = [
  { id: 1, name: 'A. Listen & Notice', duration: '4 min', icon: Volume2 },
  { id: 2, name: 'B. Sound Drills', duration: '5 min', icon: BookOpen },
  { id: 3, name: 'C. Shadowing', duration: '6 min', icon: Mic },
  { id: 4, name: 'D. Speaking & Review', duration: '5 min', icon: Sparkles },
];

export const DailyLesson: React.FC<DailyLessonProps> = ({
  lesson,
  audioEntry,
  onBackToCalendar,
  onGoToNextLesson,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [progress, setProgress] = useState<LessonProgress>(() => getProgress(lesson.id));
  const [preferredRecording, setPreferredRecording] = useState<VoiceRecording | null>(null);
  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  // Load progress and preferred recordings on lesson load
  useEffect(() => {
    const saved = getProgress(lesson.id);
    setProgress(saved);
    if (saved.lastVisitedStep && saved.lastVisitedStep >= 1 && saved.lastVisitedStep <= 4) {
      setCurrentStep(saved.lastVisitedStep);
    }

    getRecordingsForLesson(lesson.id).then((recs) => {
      const pref = recs.find((r) => r.isPreferred) || recs[0] || null;
      setPreferredRecording(pref);
    });
  }, [lesson.id]);

  const handleStepChange = (newStep: number) => {
    setCurrentStep(newStep);
    const updated: LessonProgress = {
      ...progress,
      lastVisitedStep: newStep,
    };
    setProgress(updated);
    saveLessonProgress(updated);
  };

  const handleRatingChange = (cat: SkillCategory, rating: ScoreRating) => {
    const updated: LessonProgress = {
      ...progress,
      ratings: {
        ...progress.ratings,
        [cat]: rating,
      },
    };
    setProgress(updated);
    saveLessonProgress(updated);
  };

  const handleHardestChange = (val: string) => {
    const updated: LessonProgress = {
      ...progress,
      reflectionHardest: val,
    };
    setProgress(updated);
    saveLessonProgress(updated);
  };

  const handleFocusNextChange = (val: string) => {
    const updated: LessonProgress = {
      ...progress,
      reflectionFocusNext: val,
    };
    setProgress(updated);
    saveLessonProgress(updated);
  };

  const handleCompleteLesson = () => {
    const updated = markLessonComplete(lesson.id);
    setProgress(updated);
    setJustCompleted(true);
  };

  const recommendation = generateRecommendation(lesson.skillCategory, progress.ratings);

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToCalendar}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to 30-Day Calendar
        </button>

        <div className="flex items-center gap-2">
          {progress.isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 size={13} /> Completed
            </span>
          )}
          <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500">
            Day {lesson.day} of 30
          </span>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent-600 dark:text-accent-400 uppercase tracking-wide mb-1">
          <span>Week {lesson.week}</span>
          <span>•</span>
          <span>{lesson.targetSkill}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {lesson.objective}
        </p>
      </div>

      {/* 4-Step Routine Indicator Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xs">
        <div className="grid grid-cols-4 gap-1">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id || progress.isCompleted;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepChange(step.id)}
                className={`py-2 px-1 rounded-xl text-center transition-all ${
                  isActive
                    ? 'bg-accent-600 text-white font-bold shadow-xs'
                    : isDone
                    ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-medium'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 font-normal'
                }`}
              >
                <div className="text-[11px] sm:text-xs truncate">{step.name.split(' ')[0]}</div>
                <div className="text-[9px] sm:text-[10px] opacity-80">{step.duration}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="space-y-5">
        {/* STEP A: Listen and Notice */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step A: Listen & Notice (4 mins)
              </h2>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <div className="font-semibold text-accent-700 dark:text-accent-300">
                  Target Sound & What to Notice:
                </div>
                <p className="leading-relaxed">{lesson.listeningFocus}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs pt-1 border-t border-slate-200 dark:border-slate-700">
                  {lesson.explanation}
                </p>
              </div>

              {/* Reference Audio Player */}
              <AudioPlayer
                audioEntry={audioEntry}
                fallbackText={lesson.referenceSentence}
              />
            </div>
          </div>
        )}

        {/* STEP B: Sound Drills */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step B: Sound Drills & Articulation (5 mins)
              </h2>

              {/* Articulation Guidance: Jaw, Lips, Tongue */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Mouth Positioning Guide
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">👄 Lips</span>
                    <span className="text-slate-600 dark:text-slate-400">{lesson.articulationGuidance.lips}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">👅 Tongue</span>
                    <span className="text-slate-600 dark:text-slate-400">{lesson.articulationGuidance.tongue}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">🦷 Jaw</span>
                    <span className="text-slate-600 dark:text-slate-400">{lesson.articulationGuidance.jaw}</span>
                  </div>
                </div>
              </div>

              {/* Common Mistake Warning */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold block mb-0.5">⚠️ Common Non-Native Mistake:</span>
                {lesson.commonMistakeWarning}
              </div>

              {/* Target Words Practice */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Target Practice Words
                </div>
                <div className="flex flex-wrap gap-2">
                  {lesson.targetWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-700"
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lesson.drillInstructions}
                </p>
              </div>

              {/* Minimal Pairs Table */}
              {lesson.minimalPairs.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Minimal Pairs Distinction
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    {lesson.minimalPairs.map((pair, idx) => (
                      <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                        <div className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white">
                          <span className="text-accent-600 dark:text-accent-400">{pair.wordA}</span>
                          <span className="text-slate-400">vs</span>
                          <span className="text-slate-700 dark:text-slate-300">{pair.wordB}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{pair.focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP C: Shadowing */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step C: Shadowing Practice (6 mins)
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lesson.shadowingInstructions}
              </p>

              {/* Reference Sentence Audio */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Reference Sentence
                </div>
                <AudioPlayer
                  audioEntry={audioEntry}
                  fallbackText={lesson.referenceSentence}
                />
              </div>

              {/* Shadowing Recording Tool */}
              <VoiceRecorder
                lessonId={lesson.id}
                step="shadowing"
                onPreferredChange={(rec) => setPreferredRecording(rec)}
              />

              {/* A/B Comparison Player */}
              <ComparisonPlayer
                audioEntry={audioEntry}
                recording={preferredRecording}
              />
            </div>
          </div>
        )}

        {/* STEP D: Speaking Challenge & Review */}
        {currentStep === 4 && (
          <div className="space-y-5">
            {/* Practical Speaking Prompt Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step D: Speaking Challenge & Scorecard (5 mins)
              </h2>

              <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm">
                <span className="font-bold text-indigo-950 dark:text-indigo-200 block mb-1">
                  Practical Speaking Challenge:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {lesson.speakingPrompt}
                </p>
              </div>

              {/* Voice Recorder for Speaking Challenge */}
              <VoiceRecorder
                lessonId={lesson.id}
                step="speaking"
                onPreferredChange={(rec) => setPreferredRecording(rec)}
              />
            </div>

            {/* Manual Pronunciation Scorecard */}
            <Scorecard
              ratings={progress.ratings}
              onRatingChange={handleRatingChange}
              reflectionHardest={progress.reflectionHardest}
              onHardestChange={handleHardestChange}
              reflectionFocusNext={progress.reflectionFocusNext}
              onFocusNextChange={handleFocusNextChange}
            />

            {/* Deterministic Recommendation Engine Card */}
            <RecommendationCard recommendation={recommendation} />

            {/* Complete Lesson Confirmation Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              {justCompleted && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                  🎉 <span className="font-semibold">Lesson {lesson.day} successfully completed!</span> Progress has been saved to your calendar and dashboard.
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCompleteLesson}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-600 hover:bg-accent-700 active:scale-98 text-white font-bold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <CheckCircle2 size={18} />
                  {progress.isCompleted ? 'Update Saved Completion' : 'Complete Today\'s Lesson'}
                </button>

                {lesson.day < 30 && onGoToNextLesson && (
                  <button
                    type="button"
                    onClick={() => onGoToNextLesson(lesson.day + 1)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
                  >
                    <span>Continue to Day {lesson.day + 1}</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => handleStepChange(currentStep - 1)}
          className={`inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold ${
            currentStep === 1
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ChevronLeft size={16} /> Previous Step
        </button>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => handleStepChange(currentStep + 1)}
            className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold shadow-xs"
          >
            <span>Next Step</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onBackToCalendar}
            className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold shadow-xs"
          >
            Return to Calendar
          </button>
        )}
      </div>
    </div>
  );
};
