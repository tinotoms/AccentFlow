import React, { useState, useEffect } from 'react';
import { LessonProgress, SkillCategory, VoiceRecording } from '../types';
import {
  SKILL_LABELS,
  getSkillAverages,
} from '../services/recommendationEngine';
import { getRecordingsForLesson, getTotalRecordingsCount } from '../services/db';
import { getSessionCount } from '../services/storage';
import { Play, Pause, BarChart3, Mic, CheckCircle2, Sparkles, Volume2 } from './Icons';

interface DashboardProps {
  todayDayNumber: number;
  allProgress: Record<string, LessonProgress>;
  onGoToLesson: (lessonId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  todayDayNumber,
  allProgress,
  onGoToLesson,
}) => {
  const [totalRecordings, setTotalRecordings] = useState<number>(0);
  const [day1Rec, setDay1Rec] = useState<VoiceRecording | null>(null);
  const [day30Rec, setDay30Rec] = useState<VoiceRecording | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);

  const completedCount = Object.values(allProgress).filter((p) => p.isCompleted).length;
  const sessions = getSessionCount();
  const totalMinutes = sessions * 20;

  useEffect(() => {
    getTotalRecordingsCount().then(setTotalRecordings);

    getRecordingsForLesson('day-01').then((recs) => {
      const pref = recs.find((r) => r.isPreferred) || recs[0] || null;
      setDay1Rec(pref);
    });

    getRecordingsForLesson('day-30').then((recs) => {
      const pref = recs.find((r) => r.isPreferred) || recs[0] || null;
      setDay30Rec(pref);
    });

    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
    };
  }, []);

  const playRecording = (rec: VoiceRecording) => {
    if (playingId === rec.id && activeAudio) {
      activeAudio.pause();
      setPlayingId(null);
      return;
    }

    if (activeAudio) {
      activeAudio.pause();
    }

    if (!rec.audioBlob) return;
    const url = URL.createObjectURL(rec.audioBlob);
    const audio = new Audio(url);
    setActiveAudio(audio);
    setPlayingId(rec.id);

    audio.onended = () => {
      setPlayingId(null);
      URL.revokeObjectURL(url);
    };
    audio.onerror = () => {
      setPlayingId(null);
      URL.revokeObjectURL(url);
    };
    audio.play().catch(() => setPlayingId(null));
  };

  // Skill Averages and Trends
  const skillStats = getSkillAverages(allProgress);
  const categories: SkillCategory[] = ['american_r', 'vowels', 't_th', 'rhythm', 'fluency'];

  const assessedCategories = categories
    .filter((c) => skillStats[c].avg !== null)
    .map((c) => ({
      category: c,
      name: SKILL_LABELS[c],
      avg: skillStats[c].avg as number,
      latest: skillStats[c].latest,
      count: skillStats[c].count,
      history: skillStats[c].history,
    }));

  assessedCategories.sort((a, b) => b.avg - a.avg);
  const strongest = assessedCategories.length > 0 ? assessedCategories[0] : null;
  const weakest = assessedCategories.length > 0 ? assessedCategories[assessedCategories.length - 1] : null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Progress Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Personal progress metrics and manual rating trends
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Completed
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {completedCount} <span className="text-xs font-normal text-slate-400">/ 30</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {Math.round((completedCount / 30) * 100)}% challenge
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Challenge Day
          </div>
          <div className="text-xl font-bold text-accent-600 dark:text-accent-400">
            Day {todayDayNumber}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Scheduled today
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Practice Time
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {totalMinutes} <span className="text-xs font-normal text-slate-400">min</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {sessions} sessions logged
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Voice Recordings
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {totalRecordings}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            In local storage
          </div>
        </div>
      </div>

      {/* Strongest & Weakest Overview */}
      {assessedCategories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {strongest && (
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Strongest Assessed Skill
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {strongest.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Average rating: <span className="font-semibold">{strongest.avg} / 5</span> ({strongest.count} evaluations)
              </p>
            </div>
          )}

          {weakest && (
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Priority Focus Area
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {weakest.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Average rating: <span className="font-semibold">{weakest.avg} / 5</span> ({weakest.count} evaluations)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pronunciation Category Breakdown & Trends */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Pronunciation Category Averages
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Computed strictly from your manual self-ratings (1.0–5.0 scale)
            </span>
          </div>
          <BarChart3 size={18} className="text-accent-600 dark:text-accent-400" />
        </div>

        {assessedCategories.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500 dark:text-slate-400">
            No categories assessed yet. Complete lessons and rate your pronunciation to see skill trends.
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => {
              const stat = skillStats[cat];
              const score = stat.avg;
              const pct = score !== null ? (score / 5) * 100 : 0;

              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {SKILL_LABELS[cat]}
                    </span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">
                      {score !== null ? `${score.toFixed(1)} / 5.0` : 'Not assessed'}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        score === null
                          ? 'w-0'
                          : score >= 4
                          ? 'bg-emerald-500'
                          : score >= 3
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DAY 1 vs DAY 30 TRANSFORMATION COMPARISON */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Day 1 vs Day 30 Transformation
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare your Day 1 baseline introduction with your final Day 30 capstone speech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Day 1 Box */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Day 1: Baseline Intro
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                60-second self-intro
              </span>
            </div>

            {day1Rec ? (
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => playRecording(day1Rec)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold"
                >
                  {playingId === day1Rec.id ? <Pause size={14} /> : <Play size={14} />}
                  <span>{playingId === day1Rec.id ? 'Pause Baseline' : 'Play Baseline'}</span>
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {day1Rec.durationSeconds}s
                </span>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-400 italic">No recording saved yet for Day 1.</p>
                <button
                  type="button"
                  onClick={() => onGoToLesson('day-01')}
                  className="text-xs font-semibold text-accent-600 dark:text-accent-400 hover:underline"
                >
                  Record Day 1 Baseline →
                </button>
              </div>
            )}
          </div>

          {/* Day 30 Box */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Day 30: Capstone Speech
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Final 3-minute monologue
              </span>
            </div>

            {day30Rec ? (
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => playRecording(day30Rec)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                >
                  {playingId === day30Rec.id ? <Pause size={14} /> : <Play size={14} />}
                  <span>{playingId === day30Rec.id ? 'Pause Capstone' : 'Play Capstone'}</span>
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {day30Rec.durationSeconds}s
                </span>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-400 italic">Unlocks on Day 30 of your challenge.</p>
                <button
                  type="button"
                  onClick={() => onGoToLesson('day-30')}
                  className="text-xs font-semibold text-accent-600 dark:text-accent-400 hover:underline"
                >
                  Preview Day 30 →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
