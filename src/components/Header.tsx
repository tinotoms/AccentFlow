import React from 'react';
import { Calendar as CalendarIcon, BarChart3, Settings, Sparkles } from './Icons';

interface HeaderProps {
  currentView: 'calendar' | 'dashboard';
  onViewChange: (view: 'calendar' | 'dashboard') => void;
  onOpenSettings: () => void;
  todayDayNumber: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenSettings,
  todayDayNumber,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div
          onClick={() => onViewChange('calendar')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-accent-600 flex items-center justify-center text-white font-black text-lg shadow-xs">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                AccentFlow
              </span>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-accent-700 dark:text-accent-300 border border-indigo-200/50 dark:border-indigo-800/50">
                Day {todayDayNumber}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
              General American • 30 Days
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Settings */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onViewChange('calendar')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentView === 'calendar'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarIcon size={15} />
            <span className="hidden sm:inline">Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('dashboard')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentView === 'dashboard'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 size={15} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Settings & Data Management"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
