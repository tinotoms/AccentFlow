import React from 'react';
import { Lesson, LessonProgress } from '../types';
import { CURRICULUM } from '../data/curriculumData';
import { CheckCircle2, ChevronRight, Play, Calendar as CalendarIcon, Sparkles } from './Icons';

interface CalendarViewProps {
  todayDayNumber: number;
  allProgress: Record<string, LessonProgress>;
  onSelectLesson: (lessonId: string) => void;
  onOpenSettings: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  todayDayNumber,
  allProgress,
  onSelectLesson,
}) => {
  const completedCount = Object.values(allProgress).filter((p) => p.isCompleted).length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  // Group lessons by week
  const week1 = CURRICULUM.filter((l) => l.week === 1);
  const week2 = CURRICULUM.filter((l) => l.week === 2);
  const week3 = CURRICULUM.filter((l) => l.week === 3);
  const week4 = CURRICULUM.filter((l) => l.week === 4);

  const weeks = [
    { number: 1, title: 'Sound Foundations', days: week1 },
    { number: 2, title: 'Vowels, Endings & Stress', days: week2 },
    { number: 3, title: 'Natural American Rhythm', days: week3 },
    { number: 4, title: 'Real-World Fluency', days: week4 },
  ];

  const todayLesson = CURRICULUM.find((l) => l.day === todayDayNumber) || CURRICULUM[0];
  const isTodayCompleted = allProgress[todayLesson.id]?.isCompleted || false;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Hero Header */}
      <div className="text-center sm:text-left space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Your American Accent Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          30-day guided pronunciation routine • 20 minutes daily commitment
        </p>
      </div>

      {/* Prominent "Continue Today's Lesson" Card */}
      <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-850 border border-indigo-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-md">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-accent-600 text-white uppercase tracking-wider">
                Today • Day {todayDayNumber}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ~20 mins
              </span>
              {isTodayCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} /> Completed
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {todayLesson.title}
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              Target: <span className="font-semibold text-slate-800 dark:text-slate-200">{todayLesson.targetSkill}</span> — {todayLesson.objective}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectLesson(todayLesson.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-accent-600 hover:bg-accent-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 shrink-0"
          >
            <Play size={16} className="translate-x-0.5" />
            <span>{isTodayCompleted ? 'Practice Day ' + todayDayNumber + ' Again' : 'Continue Today\'s Lesson'}</span>
          </button>
        </div>
      </div>

      {/* Progress Overview Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">
              Overall Progress
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              • {completedCount} of 30 lessons completed
            </span>
          </div>
          <span className="font-mono font-bold text-accent-600 dark:text-accent-400">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-accent-600 dark:bg-accent-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Compact Weekly Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          {weeks.map((w) => {
            const weekCompleted = w.days.filter((d) => allProgress[d.id]?.isCompleted).length;
            const weekTotal = w.days.length;
            const isFull = weekCompleted === weekTotal;

            return (
              <div key={w.number} className="text-center space-y-0.5">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Week {w.number}
                </div>
                <div className={`text-xs font-bold ${isFull ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {weekCompleted}/{weekTotal}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 30-DAY MONTHLY CALENDAR GRID */}
      <div className="space-y-6">
        {weeks.map((week) => (
          <div key={week.number} className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Week {week.number}: {week.title}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                {week.days[0].day} – {week.days[week.days.length - 1].day}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {week.days.map((lesson) => {
                const isCompleted = allProgress[lesson.id]?.isCompleted || false;
                const isToday = lesson.day === todayDayNumber;
                const isPast = lesson.day < todayDayNumber;
                const isUpcoming = lesson.day > todayDayNumber;

                // Ratings snippet if completed
                const ratings = allProgress[lesson.id]?.ratings;
                const assessedCount = ratings
                  ? Object.values(ratings).filter((v) => typeof v === 'number').length
                  : 0;

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-2 ${
                      isToday
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-accent-500 dark:border-accent-400 ring-2 ring-accent-500/20 shadow-xs'
                        : isCompleted
                        ? 'bg-white dark:bg-slate-900 border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-300'
                        : isPast
                        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600'
                    } active:scale-98 cursor-pointer`}
                  >
                    {/* Top Row: Day Pill + Status Pill */}
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Day {lesson.day}
                      </span>

                      {/* State Badges */}
                      {isToday ? (
                        <span className="text-[10px] font-bold text-accent-700 dark:text-accent-300 bg-accent-100 dark:bg-accent-950 px-2 py-0.5 rounded-full uppercase">
                          Today
                        </span>
                      ) : isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={11} /> Done
                        </span>
                      ) : isPast ? (
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                          Upcoming
                        </span>
                      )}
                    </div>

                    {/* Middle: Title & Target Skill */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                        {lesson.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {lesson.targetSkill}
                      </div>
                    </div>

                    {/* Bottom: Estimated time & Ratings summary */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      <span>20 min routine</span>
                      {assessedCount > 0 ? (
                        <span className="text-accent-600 dark:text-accent-400 font-medium">
                          {assessedCount} skills scored
                        </span>
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
