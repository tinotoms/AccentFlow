import React, { useState, useEffect, useRef } from 'react';
import { VoiceRecording } from '../types';
import { Mic, Square, Play, Pause, Trash2, Star, RotateCcw } from './Icons';
import {
  saveVoiceRecording,
  getRecordingsForLesson,
  setPreferredRecording,
  deleteRecording,
} from '../services/db';

interface VoiceRecorderProps {
  lessonId: string;
  step: 'shadowing' | 'speaking';
  onPreferredChange?: (recording: VoiceRecording | null) => void;
  maxAttempts?: number;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  lessonId,
  step,
  onPreferredChange,
  maxAttempts = 3,
}) => {
  const [recordings, setRecordings] = useState<VoiceRecording[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Playback state for saved attempts
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Refs for recording machinery
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load existing recordings from IndexedDB on mount or lesson change
  const loadRecordings = async () => {
    try {
      const list = await getRecordingsForLesson(lessonId, step);
      setRecordings(list);
      const preferred = list.find((r) => r.isPreferred) || list[0] || null;
      if (onPreferredChange) onPreferredChange(preferred);
    } catch (e) {
      console.error('Failed to load recordings:', e);
    }
  };

  useEffect(() => {
    loadRecordings();
    return () => {
      stopRecordingCleanup();
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
      }
    };
  }, [lessonId, step]);

  const stopRecordingCleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  // Live waveform visualizer via AnalyserNode
  const startVisualizer = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasCtx = canvas.getContext('2d');
      if (!canvasCtx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          canvasCtx.fillStyle = '#6366f1';
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
          x += barWidth;
        }
      };
      draw();
    } catch (e) {
      console.warn('Web Audio visualizer unavailable:', e);
    }
  };

  const startRecording = async () => {
    setErrorMessage(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionState('denied');
      setErrorMessage(
        'Audio recording is not supported in this browser environment. Voice recording requires MediaRecorder and HTTPS or localhost.'
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionState('granted');

      // Determine supported mime type
      const mimeTypes = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
      let selectedMime = '';
      for (const m of mimeTypes) {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) {
          selectedMime = m;
          break;
        }
      }

      const recorder = selectedMime
        ? new MediaRecorder(stream, { mimeType: selectedMime })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: selectedMime || 'audio/webm',
        });
        const attemptNumber = recordings.length + 1;
        const newRecording: VoiceRecording = {
          id: `rec-${lessonId}-${step}-${Date.now()}`,
          lessonId,
          attemptNumber,
          timestamp: Date.now(),
          durationSeconds: recordingSeconds,
          audioBlob,
          mimeType: selectedMime || 'audio/webm',
          isPreferred: recordings.length === 0, // First attempt default preferred
          step,
        };

        try {
          await saveVoiceRecording(newRecording);
          await loadRecordings();
        } catch (err) {
          console.error('Error saving voice recording to IndexedDB:', err);
        }
      };

      recorder.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);

      // Start duration counter
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      startVisualizer(stream);
    } catch (err: unknown) {
      console.error('Microphone error:', err);
      setPermissionState('denied');
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(
        `Microphone access was denied or is unavailable (${msg}). Please allow microphone access in your browser settings to record your voice.`
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    stopRecordingCleanup();
  };

  const handlePlayAttempt = (rec: VoiceRecording) => {
    if (playingId === rec.id && activeAudioRef.current) {
      activeAudioRef.current.pause();
      setPlayingId(null);
      return;
    }

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
    }

    if (!rec.audioBlob) return;
    const url = URL.createObjectURL(rec.audioBlob);
    const audio = new Audio(url);
    activeAudioRef.current = audio;
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

  const handleDeleteAttempt = async (id: string) => {
    if (playingId === id && activeAudioRef.current) {
      activeAudioRef.current.pause();
      setPlayingId(null);
    }
    await deleteRecording(id);
    await loadRecordings();
  };

  const handleSetPreferred = async (id: string) => {
    await setPreferredRecording(lessonId, id);
    await loadRecordings();
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Mic size={18} className="text-accent-600 dark:text-accent-400" />
          <h3 className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
            {step === 'shadowing' ? 'Shadowing Attempt' : 'Voice Recording & Review'}
          </h3>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {recordings.length} of {maxAttempts} attempts saved
        </span>
      </div>

      {/* Permission warning if denied */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-xl text-xs text-rose-800 dark:text-rose-300">
          <p className="font-semibold mb-1">Microphone Access Required</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Active Recording State */}
      {isRecording ? (
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-accent-200 dark:border-accent-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
              </span>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                Recording...
              </span>
            </div>
            <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">
              {formatSeconds(recordingSeconds)}
            </span>
          </div>

          {/* Visualizer Canvas */}
          <canvas
            ref={canvasRef}
            width={320}
            height={48}
            className="w-full h-12 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
          />

          {/* Stop Button */}
          <button
            type="button"
            onClick={stopRecording}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Square size={16} /> Stop Recording
          </button>
        </div>
      ) : (
        /* Idle Recording State */
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            {recordings.length === 0
              ? 'Tap record to capture your voice. Stored locally in your browser.'
              : `${recordings.length} attempt(s) saved. You can record up to ${maxAttempts}.`}
          </div>

          <button
            type="button"
            onClick={startRecording}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <Mic size={16} />
            {recordings.length === 0 ? 'Record Voice' : 'Record New Attempt'}
          </button>
        </div>
      )}

      {/* List of Saved Attempts */}
      {recordings.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Saved Attempts
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
            {recordings.map((rec, idx) => (
              <div
                key={rec.id}
                className={`p-3 flex items-center justify-between gap-2 transition-colors ${
                  rec.isPreferred
                    ? 'bg-indigo-50/40 dark:bg-indigo-950/20'
                    : 'bg-white dark:bg-slate-900'
                }`}
              >
                {/* Left: Play button & Attempt info */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePlayAttempt(rec)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all focus:outline-none"
                    aria-label={playingId === rec.id ? 'Pause attempt' : 'Play attempt'}
                  >
                    {playingId === rec.id ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Attempt {recordings.length - idx}
                      </span>
                      {rec.isPreferred && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">
                          <Star size={10} className="fill-current" /> Preferred
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      {formatSeconds(rec.durationSeconds)} • {new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Right: Actions (Mark preferred, Delete) */}
                <div className="flex items-center gap-1">
                  {!rec.isPreferred && (
                    <button
                      type="button"
                      onClick={() => handleSetPreferred(rec.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Set as preferred recording"
                      aria-label="Set as preferred recording"
                    >
                      <Star size={14} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteAttempt(rec.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Delete recording"
                    aria-label="Delete recording"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
