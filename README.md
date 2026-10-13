# AccentFlow: 30-Day General American Accent Training App

AccentFlow is a mobile-first, zero-backend Progressive Web Application (PWA) designed to guide intermediate English speakers to master General American pronunciation, natural rhythm, and connected speech over a structured 30-day program with a daily 20-minute commitment.

---

## Key Features

1. **Complete 30-Day Curriculum**:
   - **Week 1: Sound Foundations** (American R, Flap T, /ɪ/ vs /iː/, /æ/ in CAT, Voiced/Unvoiced TH, Foundation Review).
   - **Week 2: Vowels, Endings & Stress** (BED/BAD/BUT vowel triangle, /ʌ/ in CUP/LOVE, R-colored vowels in BIRD/WORK, -ed past tense endings, word stress shifts, reductions like wanna/gonna/hafta, 2-minute personal story).
   - **Week 3: Natural American Rhythm** (Sentence stress, consonant-to-vowel linking, Flap T across word boundaries, contractions like didn't/wouldn't, falling vs rising intonation contours, speech shadowing, unscripted explanation).
   - **Week 4: Real-World Fluency** (Professional elevator pitch, technical project rationale, mock job interview, unscripted video retelling, casual small talk, explaining complex ideas simply, 3-minute persuasive monologue, targeted persistent error drill, Day 30 capstone vs Day 1 comparison).

2. **Guided 4-Step Daily Routine (20 Minutes)**:
   - **Step A: Listen & Notice (4 min)**: Target sound breakdown, authentic audio clip, exact transcript, and specific listening cues.
   - **Step B: Sound Drills (5 min)**: 5–8 target words, minimal pairs, mouth posture (Jaw, Lips, Tongue), and common non-native mistake warnings.
   - **Step C: Shadowing (6 min)**: Reference sentence playback, speed control (0.75x, 1.0x, 1.25x), voice recording, and side-by-side A/B audio comparison.
   - **Step D: Speaking Challenge & Review (5 min)**: Unscripted speaking prompt, multi-attempt voice recorder (up to 3 saved in IndexedDB), manual 5-category pronunciation scorecard, deterministic recommendations, and lesson completion.

3. **Audio System & Manifest**:
   - Centralized audio manifest (`src/data/audioManifest.ts`) separating audio sources from UI components.
   - Supports local files (MP3, WAV, M4A), direct URLs, start/end playback bounding, and speaker attribution.
   - User-supplied authentic clips from Steve Jobs' 2005 Stanford address integrated for Day 1, 7, 14, 15, 16, 19, 20, 25, and 30.
   - Clearly labeled fallback state for pending clips: Web Speech API synthesis (`en-US`) with playback speed controls, plus in-app custom audio upload allowing learners to attach their own audio files directly into IndexedDB.

4. **In-Browser Voice Recording (MediaRecorder API)**:
   - Microphone permission detection with actionable guidance for iOS/Safari/Android/HTTPS.
   - Real-time recording duration timer and live audio waveform visualizer.
   - Saves up to 3 attempts locally per lesson in IndexedDB (`accentflow_db`).
   - Ability to mark an attempt as "Preferred" (starred) and delete unneeded attempts.
   - Side-by-side A/B player to alternate between the reference audio and personal attempt.

5. **Manual Scorecard (Zero AI Evaluation)**:
   - 100% human self-assessment with 5 core categories on a 1–5 scale:
     1. American R accuracy
     2. Vowel clarity
     3. T and TH accuracy
     4. Word stress and rhythm
     5. Fluency and natural delivery
   - "Not assessed" option to prevent forced zeros.
   - Qualitative reflection prompts: *"What was hardest today?"* and *"What will you focus on next time?"*.
   - Allows updating ratings on revisited lessons without duplicating completion.

6. **Deterministic Recommendation Engine**:
   - Evaluates manually entered scores without AI or external analytics.
   - Maps lowest-rated skills to verified resources from **Rachel's English** and **BBC Learning English**.
   - Handles ties fairly by rotating across sessions.
   - Prioritizes current lesson's target skill if it is among the lowest.
   - Tracks historical rating improvements and provides immediate 5-minute action exercises.

7. **Interactive Dashboard**:
   - Completion progress (X of 30 lessons).
   - Challenge day indicator based on configurable start date.
   - Total practice sessions and minutes logged.
   - Category average scores and trend bars.
   - Day 1 Baseline vs Day 30 Capstone recording comparison player.

8. **Privacy & Offline PWA**:
   - 100% on-device storage (LocalStorage + IndexedDB). No user accounts, tracking, or cloud uploads.
   - PWA web manifest (`manifest.webmanifest`) and service worker (`sw.js`) for offline caching and home-screen install.
   - JSON export and import for seamless progress backup.

---

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 (mobile-first, calm minimalist theme, dark mode support)
- **Icons**: Lucide-inspired accessible SVG icons
- **Audio & Media**: HTMLAudioElement, Web Audio API (AnalyserNode), Web Speech API
- **Recording & Storage**: MediaRecorder API, IndexedDB, LocalStorage
- **Offline / PWA**: Service Worker (`sw.js`), Web App Manifest

---

## Quick Start (Running Locally)

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Development
```bash
# 1. Navigate to the project directory
cd accentflow

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```
The output will be generated in `dist/`.

---

## Deployment Instructions

AccentFlow is a static single-page application with no server dependencies. It can be deployed to any static host over HTTPS (HTTPS is required for `getUserMedia` microphone access).

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages
1. Set `base: '/<repository-name>/'` in `vite.config.ts`.
2. Build the project: `npm run build`.
3. Push the `dist/` directory to your `gh-pages` branch.

### Deploy to Cloudflare Pages
1. Connect your Git repository to Cloudflare Pages.
2. Set build command: `npm run build`.
3. Set output directory: `dist`.

---

## How to Add or Replace Audio Clips

Reference audio is managed through `src/data/audioManifest.ts`.

### 1. Adding a Local Audio File
1. Place your audio file in `public/audio/` (e.g. `public/audio/day-02-american-r.mp3`).
2. Open `src/data/audioManifest.ts`.
3. Locate the entry for the target lesson (e.g. `audio-day-02`):
```typescript
{
  id: "audio-day-02",
  lessonId: "day-02",
  sourceType: "local",
  src: "/audio/day-02-american-r.mp3",
  transcript: "I really started working right around the first year.",
  speaker: "Rachel Smith",
  attribution: "Rachel's English Practice Drills",
  attributionUrl: "https://rachelsenglish.com",
  startTime: null,
  endTime: null,
  status: "available",
  notes: "Authentic studio recording"
}
```

### 2. Using Timestamped Segments
For longer speeches or interviews, set `startTime` and `endTime` in seconds:
```typescript
{
  id: "audio-day-20",
  lessonId: "day-20",
  sourceType: "local",
  src: "/audio/interview.mp3",
  startTime: 45.0,
  endTime: 75.0,
  status: "available"
}
```
The player will automatically cue to `startTime` and stop playback at `endTime`.

### 3. In-App User Audio Upload
You can also upload a reference audio clip directly inside the running app:
- On any lesson screen, tap **"Upload Clip (MP3/WAV)"** in the Audio Player.
- The file is saved directly into IndexedDB for that lesson and plays immediately.

---

## Voice Recording & Microphone Access

- **Permissions**: The browser will request microphone permission on the first recording attempt.
- **HTTPS Requirement**: Modern browsers restrict `navigator.mediaDevices.getUserMedia` to `https://` URLs or `http://localhost`.
- **iOS / Safari**: Ensure iOS settings allow microphone permissions in Safari Settings > Microphone > Allow.

---

## Privacy & Limitations

1. **Storage Lifetime**: Data is stored inside browser LocalStorage and IndexedDB. If you clear browser history and site cookies, local progress may be erased. Use **Settings > Export JSON Backup** to preserve your progress.
2. **Audio File Formats**: Supported audio formats depend on the browser. Modern Chrome, Safari, and Firefox support MP3, WAV, and M4A/AAC.
3. **No Automated Accent Scoring**: In strict adherence to pedagogical guidelines, AccentFlow intentionally does NOT use AI or automated speech recognition to score accents, avoiding hallucinated phonetic ratings and promoting deliberate self-listening skills.
