import { VoiceRecording } from '../types';

const DB_NAME = 'accentflow_db';
const DB_VERSION = 2;
const RECORDINGS_STORE = 'recordings';
const CUSTOM_AUDIO_STORE = 'custom_audio';

let dbInstance: IDBDatabase | null = null;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(RECORDINGS_STORE)) {
        const store = db.createObjectStore(RECORDINGS_STORE, { keyPath: 'id' });
        store.createIndex('lessonId', 'lessonId', { unique: false });
        store.createIndex('lesson_step', ['lessonId', 'step'], { unique: false });
      }
      if (!db.objectStoreNames.contains(CUSTOM_AUDIO_STORE)) {
        db.createObjectStore(CUSTOM_AUDIO_STORE, { keyPath: 'lessonId' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const saveVoiceRecording = async (recording: VoiceRecording): Promise<string> => {
  const db = await initDB();

  // Enforce sensible attempt limit (e.g. maximum 3 per lesson/step)
  const existing = await getRecordingsForLesson(recording.lessonId, recording.step);
  if (existing.length >= 3) {
    // Find the oldest non-preferred recording to remove
    const candidates = existing.filter(r => !r.isPreferred);
    const toDelete = candidates.length > 0
      ? candidates.sort((a, b) => a.timestamp - b.timestamp)[0]
      : existing.sort((a, b) => a.timestamp - b.timestamp)[0];
    if (toDelete) {
      await deleteRecording(toDelete.id);
    }
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readwrite');
    const store = transaction.objectStore(RECORDINGS_STORE);
    const request = store.put(recording);

    request.onsuccess = () => resolve(recording.id);
    request.onerror = () => reject(request.error);
  });
};

export const getRecordingsForLesson = async (
  lessonId: string,
  step?: 'shadowing' | 'speaking'
): Promise<VoiceRecording[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readonly');
    const store = transaction.objectStore(RECORDINGS_STORE);
    const index = store.index('lessonId');
    const request = index.getAll(lessonId);

    request.onsuccess = () => {
      let results: VoiceRecording[] = request.result || [];
      if (step) {
        results = results.filter(r => r.step === step);
      }
      results.sort((a, b) => b.timestamp - a.timestamp);
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

export const setPreferredRecording = async (lessonId: string, recordingId: string): Promise<void> => {
  const db = await initDB();
  const recordings = await getRecordingsForLesson(lessonId);

  const transaction = db.transaction([RECORDINGS_STORE], 'readwrite');
  const store = transaction.objectStore(RECORDINGS_STORE);

  for (const rec of recordings) {
    rec.isPreferred = (rec.id === recordingId);
    store.put(rec);
  }

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const deleteRecording = async (id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readwrite');
    const store = transaction.objectStore(RECORDINGS_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const deleteAllRecordings = async (): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readwrite');
    const store = transaction.objectStore(RECORDINGS_STORE);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getTotalRecordingsCount = async (): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readonly');
    const store = transaction.objectStore(RECORDINGS_STORE);
    const request = store.count();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Custom user-uploaded reference audio per lesson
export interface CustomAudioItem {
  lessonId: string;
  blob: Blob;
  fileName: string;
  updatedAt: number;
}

export const saveCustomAudio = async (lessonId: string, blob: Blob, fileName: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CUSTOM_AUDIO_STORE], 'readwrite');
    const store = transaction.objectStore(CUSTOM_AUDIO_STORE);
    const request = store.put({ lessonId, blob, fileName, updatedAt: Date.now() });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getCustomAudio = async (lessonId: string): Promise<CustomAudioItem | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CUSTOM_AUDIO_STORE], 'readonly');
    const store = transaction.objectStore(CUSTOM_AUDIO_STORE);
    const request = store.get(lessonId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

export const deleteCustomAudio = async (lessonId: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CUSTOM_AUDIO_STORE], 'readwrite');
    const store = transaction.objectStore(CUSTOM_AUDIO_STORE);
    const request = store.delete(lessonId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
