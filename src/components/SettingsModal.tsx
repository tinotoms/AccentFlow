import React, { useState } from 'react';
import { AppSettings } from '../types';
import { X, Upload, Trash2, RotateCcw, Check, Sparkles } from './Icons';
import {
  exportUserDataJSON,
  importUserDataJSON,
  resetAllProgress,
} from '../services/storage';
import { deleteAllRecordings } from '../services/db';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  onDataReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onDataReset,
}) => {
  const [startDate, setStartDate] = useState(settings.challengeStartDate);
  const [theme, setTheme] = useState<'light' | 'dark'>(settings.theme);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [confirmResetProgress, setConfirmResetProgress] = useState(false);
  const [confirmDeleteRecordings, setConfirmDeleteRecordings] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings({
      ...settings,
      challengeStartDate: startDate,
      theme,
    });
    onClose();
  };

  const handleExportJSON = () => {
    const jsonStr = exportUserDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accentflow_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importUserDataJSON(content);
      if (success) {
        setImportStatus('Backup restored successfully!');
        onDataReset();
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('Failed to restore backup: Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetProgressAction = () => {
    resetAllProgress();
    setConfirmResetProgress(false);
    onDataReset();
    onClose();
  };

  const handleDeleteRecordingsAction = async () => {
    await deleteAllRecordings();
    setConfirmDeleteRecordings(false);
    onDataReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            App Settings & Preferences
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>

        {/* Challenge Start Date */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Challenge Start Date
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Establishes Day 1 of your 30-day curriculum. Today's lesson is calculated from this date.
          </p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 font-mono"
          />
        </div>

        {/* Theme Preference */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Appearance
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                theme === 'light'
                  ? 'bg-accent-600 border-accent-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              ☀️ Light Theme (Default)
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-accent-600 border-accent-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              🌙 Dark Theme
            </button>
          </div>
        </div>

        {/* Backup and Data Export / Import */}
        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Data Backup & Transfer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Export your completed lesson records, ratings, and notes as a portable JSON file.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload size={14} className="rotate-180" /> Export JSON Backup
            </button>

            <label className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
              <Upload size={14} /> Restore JSON Backup
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleImportJSON}
              />
            </label>
          </div>

          {importStatus && (
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {importStatus}
            </p>
          )}
        </div>

        {/* Reset & Privacy (Danger Zone) */}
        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Data Reset Options
          </h3>

          <div className="space-y-2">
            {!confirmResetProgress ? (
              <button
                type="button"
                onClick={() => setConfirmResetProgress(true)}
                className="w-full py-2.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-medium text-left flex items-center justify-between"
              >
                <span>Reset Learning Progress & Scores</span>
                <RotateCcw size={14} />
              </button>
            ) : (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 space-y-2">
                <p className="text-xs text-rose-900 dark:text-rose-200 font-medium">
                  Are you sure you want to reset all 30 lesson completions and ratings?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleResetProgressAction}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                  >
                    Confirm Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmResetProgress(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {!confirmDeleteRecordings ? (
              <button
                type="button"
                onClick={() => setConfirmDeleteRecordings(true)}
                className="w-full py-2.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-medium text-left flex items-center justify-between"
              >
                <span>Delete All Saved Voice Recordings</span>
                <Trash2 size={14} />
              </button>
            ) : (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 space-y-2">
                <p className="text-xs text-rose-900 dark:text-rose-200 font-medium">
                  Are you sure you want to delete all audio recordings from IndexedDB?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDeleteRecordingsAction}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                  >
                    Confirm Delete Recordings
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteRecordings(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
          🔒 <span className="font-semibold text-slate-600 dark:text-slate-300">Privacy Guarantee:</span> AccentFlow stores all recordings in your browser's IndexedDB and progress in LocalStorage. No audio or personal metrics are ever transmitted to any external server or AI API. Clearing browser cache or site cookies may delete local storage unless exported.
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
