import React, { useState, useRef, useEffect } from 'react';
import { VoiceRecording, AudioEntry } from '../types';
import { Play, Pause, Volume2, Mic } from './Icons';

interface ComparisonPlayerProps {
  audioEntry?: AudioEntry;
  recording: VoiceRecording | null;
}

export const ComparisonPlayer: React.FC<ComparisonPlayerProps> = ({ audioEntry, recording }) => {
  const [activeSource, setActiveSource] = useState<'ref' | 'user' | null>(null);

  const refAudioRef = useRef<HTMLAudioElement | null>(null);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (recording?.audioBlob) {
      const url = URL.createObjectURL(recording.audioBlob);
      setUserAudioUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setUserAudioUrl(null);
    }
  }, [recording]);

  const stopAll = () => {
    if (refAudioRef.current) refAudioRef.current.pause();
    if (userAudioRef.current) userAudioRef.current.pause();
    setActiveSource(null);
  };

  const playRef = () => {
    if (activeSource === 'ref') {
      stopAll();
      return;
    }
    stopAll();
    if (refAudioRef.current) {
      if (audioEntry?.startTime) {
        refAudioRef.current.currentTime = audioEntry.startTime;
      } else {
        refAudioRef.current.currentTime = 0;
      }
      refAudioRef.current.play().then(() => {
        setActiveSource('ref');
      }).catch(err => console.warn(err));
    }
  };

  const playUser = () => {
    if (activeSource === 'user') {
      stopAll();
      return;
    }
    stopAll();
    if (userAudioRef.current) {
      userAudioRef.current.currentTime = 0;
      userAudioRef.current.play().then(() => {
        setActiveSource('user');
      }).catch(err => console.warn(err));
    }
  };

  const handleRefTimeUpdate = () => {
    if (refAudioRef.current && audioEntry?.endTime) {
      if (refAudioRef.current.currentTime >= audioEntry.endTime) {
        refAudioRef.current.pause();
        setActiveSource(null);
      }
    }
  };

  if (!recording && !audioEntry?.src) {
    return null;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
          A/B Audio Comparison
        </h4>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Listen back-to-back to check rhythm & pitch
        </span>
      </div>

      {/* Hidden audio tags */}
      {audioEntry?.src && (
        <audio
          ref={refAudioRef}
          src={audioEntry.src}
          onTimeUpdate={handleRefTimeUpdate}
          onEnded={() => setActiveSource(null)}
        />
      )}
      {userAudioUrl && (
        <audio
          ref={userAudioRef}
          src={userAudioUrl}
          onEnded={() => setActiveSource(null)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Reference Button */}
        <button
          type="button"
          onClick={playRef}
          disabled={!audioEntry?.src}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
            activeSource === 'ref'
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
          } ${!audioEntry?.src ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-98'}`}
        >
          <div className="flex items-center gap-2.5">
            <Volume2 size={18} className={activeSource === 'ref' ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'} />
            <div>
              <div className="text-xs font-bold leading-tight">1. Reference Audio</div>
              <div className={`text-[11px] ${activeSource === 'ref' ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                {audioEntry?.speaker || 'Reference speaker'}
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10">
            {activeSource === 'ref' ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
          </div>
        </button>

        {/* User Recording Button */}
        <button
          type="button"
          onClick={playUser}
          disabled={!userAudioUrl}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
            activeSource === 'user'
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
          } ${!userAudioUrl ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-98'}`}
        >
          <div className="flex items-center gap-2.5">
            <Mic size={18} className={activeSource === 'user' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'} />
            <div>
              <div className="text-xs font-bold leading-tight">2. Your Recording</div>
              <div className={`text-[11px] ${activeSource === 'user' ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>
                {recording ? `Attempt ${recording.attemptNumber} (${recording.durationSeconds}s)` : 'No recording yet'}
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10">
            {activeSource === 'user' ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
          </div>
        </button>
      </div>
    </div>
  );
};
