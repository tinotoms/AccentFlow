import React from 'react';
import { ScoreRating, SkillCategory } from '../types';
import { SKILL_LABELS } from '../services/recommendationEngine';

interface ScorecardProps {
  ratings: Record<SkillCategory, ScoreRating>;
  onRatingChange: (category: SkillCategory, rating: ScoreRating) => void;
  reflectionHardest: string;
  onHardestChange: (val: string) => void;
  reflectionFocusNext: string;
  onFocusNextChange: (val: string) => void;
  isReadOnly?: boolean;
}

const RATING_LEVELS: { score: 1 | 2 | 3 | 4 | 5; label: string }[] = [
  { score: 1, label: 'Needs work' },
  { score: 2, label: 'Difficult' },
  { score: 3, label: 'Getting there' },
  { score: 4, label: 'Good' },
  { score: 5, label: 'Comfortable' },
];

const CATEGORIES: SkillCategory[] = ['american_r', 'vowels', 't_th', 'rhythm', 'fluency'];

export const Scorecard: React.FC<ScorecardProps> = ({
  ratings,
  onRatingChange,
  reflectionHardest,
  onHardestChange,
  reflectionFocusNext,
  onFocusNextChange,
  isReadOnly = false,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Manual Pronunciation Scorecard
          </h3>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            Self-Assessment (No AI)
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Assign your honest rating (1–5) based on your recording playback. Leave unassessed if not evaluated today.
        </p>
      </div>

      {/* 5 Categories */}
      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const currentRating = ratings[cat];

          return (
            <div key={cat} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {SKILL_LABELS[cat]}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {currentRating !== null ? (
                    <span className="font-semibold text-accent-600 dark:text-accent-400">
                      {currentRating}/5 — {RATING_LEVELS.find((l) => l.score === currentRating)?.label}
                    </span>
                  ) : (
                    <span className="italic text-slate-400">Not assessed</span>
                  )}
                </span>
              </div>

              {/* 1-5 Button Scale + Not Assessed */}
              <div className="grid grid-cols-6 gap-1 sm:gap-1.5">
                {RATING_LEVELS.map((lvl) => {
                  const isSelected = currentRating === lvl.score;

                  return (
                    <button
                      key={lvl.score}
                      type="button"
                      disabled={isReadOnly}
                      onClick={() => onRatingChange(cat, isSelected ? null : lvl.score)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all border text-center ${
                        isSelected
                          ? 'bg-accent-600 border-accent-600 text-white shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                      } ${isReadOnly ? 'cursor-default opacity-75' : 'cursor-pointer active:scale-95'}`}
                      title={`${lvl.score} - ${lvl.label}`}
                    >
                      <span className="block text-sm">{lvl.score}</span>
                      <span className="hidden sm:block text-[9px] font-normal truncate mt-0.5">
                        {lvl.label}
                      </span>
                    </button>
                  );
                })}

                {/* Not assessed toggle */}
                <button
                  type="button"
                  disabled={isReadOnly}
                  onClick={() => onRatingChange(cat, null)}
                  className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-medium transition-all border text-center ${
                    currentRating === null
                      ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold'
                      : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500'
                  } ${isReadOnly ? 'cursor-default opacity-75' : 'cursor-pointer'}`}
                  title="Clear rating (Not assessed)"
                >
                  Skip
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reflection Questions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            What was hardest today?
          </label>
          <input
            type="text"
            disabled={isReadOnly}
            value={reflectionHardest}
            onChange={(e) => onHardestChange(e.target.value)}
            placeholder="e.g. Keeping R resonant at the ends of words, tongue felt tight..."
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            What will you focus on next time?
          </label>
          <input
            type="text"
            disabled={isReadOnly}
            value={reflectionFocusNext}
            onChange={(e) => onFocusNextChange(e.target.value)}
            placeholder="e.g. Relaxing my jaw more on short vowels and taking slower breaths..."
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
      </div>
    </div>
  );
};
