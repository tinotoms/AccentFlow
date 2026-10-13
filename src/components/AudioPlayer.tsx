import React, { useState, useEffect, useRef } from 'react';
import { AudioEntry } from '../types';
import { Play, Pause, RotateCcw, Volume2, Upload, Trash2, ExternalLink } from './Icons';
import { getCustomAudio, saveCustomAudio, deleteCustomAudio, CustomAudioItem } from '../services/db';

interface AudioPlayerProps {
  audioEntry?: AudioEntry;
  fallbackText?: string;
  onAudioEnded?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioEntry, fallbackText, onAudioEnded }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [customAudio, setCustomAudio] = useState<CustomAudioItem | null>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const transcript = audioEntry?.transcript || fallbackText || '';
  const startTime = audioEntry?.startTime ?? 0;
  const endTime = audioEntry?.endTime ?? null;

  // Load custom audio if any
  useEffect(() => {
    let active = true;
    if (audioEntry?.lessonId) {
      getCustomAudio(audioEntry.lessonId).then((item) => {
        if (active && item) {
          setCustomAudio(item);
          const url = URL.createObjectURL(item.blob);
          setCustomAudioUrl(url);
        }
      });
    }
    return () => {
      active = false;
      if (customAudioUrl) {
        URL.revokeObjectURL(customAudioUrl);
      }
    };
  }, [audioEntry?.lessonId]);

  // Determine active audio source
  const hasCustom = Boolean(customAudio && customAudioUrl);
  const hasLocal = Boolean(audioEntry?.src && audioEntry.status === 'available');
  const activeSrc = hasCustom ? customAudioUrl : (hasLocal ? audioEntry?.src : null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Handle timeupdate to enforce start and end time boundaries
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    setCurrentTime(cur);

    if (endTime && cur >= endTime) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onAudioEnded) onAudioEnded();
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
    if (startTime > 0 && !hasCustom) {
      audioRef.current.currentTime = startTime;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !activeSrc) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (startTime > 0 && !hasCustom && audioRef.current.currentTime < startTime) {
        audioRef.current.currentTime = startTime;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    }
  };

  const handleReplay = () => {
    if (!audioRef.current || !activeSrc) return;
    audioRef.current.currentTime = hasCustom ? 0 : startTime;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    });
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Web Speech API fallback handler
  const playTTS = () => {
    if (!('speechSynthesis' in window)) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = 'en-US';
    utterance.rate = playbackRate;

    // Try to pick an en-US voice
    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en-US'));
    if (usVoice) {
      utterance.voice = usVoice;
    }

    utterance.onstart = () => setIsTTSPlaying(true);
    utterance.onend = () => {
      setIsTTSPlaying(false);
      if (onAudioEnded) onAudioEnded();
    };
    utterance.onerror = () => setIsTTSPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsTTSPlaying(false);
    }
  };

  // Custom audio file upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !audioEntry?.lessonId) return;
    setIsUploading(true);
    try {
      await saveCustomAudio(audioEntry.lessonId, file, file.name);
      const item = await getCustomAudio(audioEntry.lessonId);
      if (item) {
        setCustomAudio(item);
        if (customAudioUrl) URL.revokeObjectURL(customAudioUrl);
        setCustomAudioUrl(URL.createObjectURL(item.blob));
      }
    } catch (err) {
      console.error('Error saving custom audio:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveCustomAudio = async () => {
    if (!audioEntry?.lessonId) return;
    await deleteCustomAudio(audioEntry.lessonId);
    setCustomAudio(null);
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
      setCustomAudioUrl(null);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Hidden audio element */}
      {activeSrc && (
        <audio
          ref={audioRef}
          src={activeSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            if (onAudioEnded) onAudioEnded();
          }}
        />
      )}

      {/* Header and Source Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Volume2 size={18} className="text-accent-600 dark:text-accent-400" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
            {hasCustom ? 'Custom Reference Clip' : (hasLocal ? 'Authentic Reference Clip' : 'Reference Audio')}
          </span>
        </div>

        {/* Source Badge */}
        {hasCustom ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Uploaded: {customAudio?.fileName}
          </span>
        ) : hasLocal ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {audioEntry?.speaker}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Speech Synthesis Fallback
          </span>
        )}
      </div>

      {/* Attribution notice if authentic */}
      {hasLocal && !hasCustom && audioEntry?.attribution && (
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Source: {audioEntry.attribution}</span>
          {audioEntry.attributionUrl && (
            <a
              href={audioEntry.attributionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 dark:text-accent-400 hover:underline flex items-center gap-1"
            >
              Original Source <ExternalLink size={12} />
            </a>
          )}
        </div>
      )}

      {/* Transcript Box */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 sm:p-4 border border-slate-100 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          Exact Transcript
        </div>
        <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
          "{transcript}"
        </p>
      </div>

      {/* Playback Controls if audio file is available */}
      {activeSrc ? (
        <div className="space-y-3">
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 font-mono">
              <span>{formatSeconds(currentTime)}</span>
              <span>{formatSeconds(endTime || duration)}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden cursor-pointer"
              onClick={(e) => {
                if (!audioRef.current) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = clickX / rect.width;
                const start = hasCustom ? 0 : startTime;
                const end = endTime || duration;
                audioRef.current.currentTime = start + pct * (end - start);
              }}
            >
              <div
                className="bg-accent-600 dark:bg-accent-500 h-2 rounded-full transition-all"
                style={{
                  width: `${
                    duration > 0
                      ? Math.min(100, Math.max(0, ((currentTime - (hasCustom ? 0 : startTime)) / ((endTime || duration) - (hasCustom ? 0 : startTime))) * 100))
                      : 0
                  }%`
                }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent-600 hover:bg-accent-700 active:scale-95 text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                aria-label={isPlaying ? 'Pause reference audio' : 'Play reference audio'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="translate-x-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-label="Replay from start"
                title="Replay from start"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Playback speed selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                    playbackRate === speed
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Delete custom clip if active */}
          {hasCustom && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleRemoveCustomAudio}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} /> Remove custom clip & restore default
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Honest fallback when authentic audio is pending upload */
        <div className="space-y-3 pt-2">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <span className="font-semibold block mb-0.5">Authentic Audio Status: Pending Upload</span>
            An authentic reference audio file has not been supplied for this specific drill yet. You can play an explicitly labeled Web Speech API synthesis below, or upload your own audio file to attach to this lesson.
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!isTTSPlaying ? (
              <button
                type="button"
                onClick={playTTS}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <Play size={16} /> Play Browser Speech (TTS)
              </button>
            ) : (
              <button
                type="button"
                onClick={stopTTS}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <Pause size={16} /> Stop Speech Synthesis
              </button>
            )}

            {/* Playback speed for TTS */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setPlaybackRate(speed)}
                  className={`px-2 py-1 rounded-md font-medium transition-all ${
                    playbackRate === speed
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* User Custom Clip Upload Button */}
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all">
              <Upload size={14} />
              <span>{isUploading ? 'Attaching...' : 'Upload Clip (MP3/WAV)'}</span>
              <input
                type="file"
                accept="audio/*,.mp3,.wav,.m4a"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
