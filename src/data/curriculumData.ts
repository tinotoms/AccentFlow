import { Lesson } from "../types";

export const CURRICULUM: Lesson[] = [
  {
    "id": "day-01",
    "day": 1,
    "week": 1,
    "title": "Baseline Assessment & Intro",
    "objective": "Record a 60-second baseline introduction to benchmark your starting pronunciation, rhythm, and intonation.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Baseline Assessment",
    "skillCategory": "fluency",
    "explanation": "Before focusing on individual phonemes, we capture your natural speech baseline. Speak at your normal conversational pace without forcing an accent. We will compare this recording with Day 30.",
    "articulationGuidance": {
      "jaw": "Relaxed and neutral, opening comfortably on stressed vowels.",
      "lips": "Neutral, avoiding excessive tension or over-rounding.",
      "tongue": "Resting comfortably behind lower front teeth when not articulating consonants."
    },
    "commonMistakeWarning": "Do not attempt to artificially mimic an accent on Day 1. Focus on speaking naturally and clearly so your baseline is an honest diagnostic.",
    "targetWords": [
      "college",
      "dropout",
      "decision",
      "unexpected",
      "curiosity",
      "future"
    ],
    "minimalPairs": [
      {
        "wordA": "dropout",
        "wordB": "drop in",
        "focus": "Compound noun stress vs phrasal verb stress"
      },
      {
        "wordA": "born",
        "wordB": "burn",
        "focus": "/\u0254\u02d0r/ vs /\u025c\u02d0r/ vowel distinction"
      }
    ],
    "referenceSentence": "I dropped out of college after the first six months, but then stayed around before I really quit.",
    "audioManifestId": "audio-day-01",
    "listeningFocus": "Listen to Steve Jobs' natural conversational cadence, vowel lengths, and how unstressed words (of, after, the) are reduced.",
    "drillInstructions": "Read each target word aloud 3 times. Focus on keeping the primary stressed syllable crisp while relaxing secondary syllables.",
    "shadowingInstructions": "Listen to the reference sentence twice. Then shadow along in real-time, matching the rhythm and breath pauses.",
    "speakingPrompt": "Introduce yourself in 60 seconds: Share where you are from, what you do, and why you want to master General American English. Speak continuously without reading from a script.",
    "completionCriteria": "Complete all 4 steps, save your Day 1 baseline voice recording, and assign initial self-ratings."
  },
  {
    "id": "day-02",
    "day": 2,
    "week": 1,
    "title": "The American 'R' Sound",
    "objective": "Master the rhotic American /r/ in initial, medial, and final positions without flapping or trilling.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "American R",
    "skillCategory": "american_r",
    "explanation": "General American is rhotic: every 'r' is pronounced. The American R is produced either bunched (tongue body pulled back and up) or retroflex (tongue tip curled slightly up and back). The tongue never touches the roof of the mouth.",
    "articulationGuidance": {
      "jaw": "Slightly dropped, mid-open position.",
      "lips": "Slightly flared or gently rounded at the corners, especially in word-initial position.",
      "tongue": "Sides of the tongue press against the upper back molars; tongue tip stays free in mid-mouth, never touching the gums or teeth."
    },
    "commonMistakeWarning": "Tapping or rolling the tongue tip against the front ridge like a Spanish, Russian, or Hindi 'r', or omitting final 'r' like British RP.",
    "targetWords": [
      "right",
      "car",
      "work",
      "around",
      "first",
      "really",
      "hard"
    ],
    "minimalPairs": [
      {
        "wordA": "right",
        "wordB": "light",
        "focus": "/r/ vs /l/ tongue contact (R is free, L touches ridge)"
      },
      {
        "wordA": "car",
        "wordB": "calm",
        "focus": "Rhotic final /\u0251\u02d0r/ vs non-rhotic /\u0251\u02d0m/"
      },
      {
        "wordA": "first",
        "wordB": "fast",
        "focus": "R-colored /\u025c\u02d0r/ vs flat /\u00e6/"
      }
    ],
    "referenceSentence": "I really started working right around the first year.",
    "audioManifestId": "audio-day-02",
    "listeningFocus": "Notice how the 'r' in 'really', 'started', and 'working' has a deep, resonant vowel quality where the tongue never taps the roof.",
    "drillInstructions": "Hold the 'rrr' sound continuously for 3 seconds before transitioning into the vowel: 'rrr-ight', 'c-arrr', 'w-rrr-k'.",
    "shadowingInstructions": "Shadow the reference sentence. Focus on keeping contact strictly between the sides of your tongue and back molars.",
    "speakingPrompt": "Describe three things you do regularly during your workday or study routine. Use at least five words containing the American R sound.",
    "completionCriteria": "Drill all 7 words, record shadowing attempt, and rate American R accuracy on the scorecard."
  },
  {
    "id": "day-03",
    "day": 3,
    "week": 1,
    "title": "The American Flap T",
    "objective": "Learn to produce the voiced flap T [\u027e] between vowels so your English flows smoothly.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "American Flap T",
    "skillCategory": "t_th",
    "explanation": "In General American, when /t/ or /d/ occurs between two vowels (and the following syllable is unstressed), it transforms into a voiced flap [\u027e]. The tongue tip quickly taps the alveolar ridge without stopping airflow.",
    "articulationGuidance": {
      "jaw": "Relaxed and moderately open.",
      "lips": "Neutral and relaxed.",
      "tongue": "A rapid, light flick of the tongue tip against the tooth ridge behind the upper front teeth. Keep vocal cords vibrating."
    },
    "commonMistakeWarning": "Releasing a sharp aspirated 't' (like 'wa-T-er') or substituting a glottal stop. It should sound almost like a light, fast 'd'.",
    "targetWords": [
      "water",
      "better",
      "city",
      "little",
      "meeting",
      "writer",
      "bottle"
    ],
    "minimalPairs": [
      {
        "wordA": "writer",
        "wordB": "rider",
        "focus": "Flap T vs Flap D (vowel before flap D is slightly longer)"
      },
      {
        "wordA": "latter",
        "wordB": "ladder",
        "focus": "Neutralized flap [\u027e] sounds identical in rapid speech"
      },
      {
        "wordA": "metal",
        "wordB": "medal",
        "focus": "Both tap with voiced alveolar flap"
      }
    ],
    "referenceSentence": "The city has a little better water meeting scheduled today.",
    "audioManifestId": "audio-day-03",
    "listeningFocus": "Listen to how 'city', 'little', and 'better' bounce forward without crisp 't' puffs of air.",
    "drillInstructions": "Repeat 'better, butter, bitter' 5 times as a continuous loop, feeling the tongue tip bounce like a basketball.",
    "shadowingInstructions": "Shadow the sentence maintaining continuous vocal cord vibration through the flap T words.",
    "speakingPrompt": "Talk about your favorite city and what makes it better or worse than other places you have visited.",
    "completionCriteria": "Drill flap T target words, record your speaking practice, and complete the manual scorecard."
  },
  {
    "id": "day-04",
    "day": 4,
    "week": 1,
    "title": "Short & Long Vowel Contrasts (/\u026a/ vs /i\u02d0/)",
    "objective": "Differentiate between the lax short /\u026a/ and tense long /i\u02d0/ to avoid common misunderstanding pairs.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Vowel Contrasts (/\u026a/ vs /i\u02d0/)",
    "skillCategory": "vowels",
    "explanation": "The difference between /i\u02d0/ (fleece) and /\u026a/ (kit) is not just duration, but muscle tension and tongue height. /i\u02d0/ is tense with high tongue and smile lips. /\u026a/ is lax with slightly lowered tongue and relaxed facial muscles.",
    "articulationGuidance": {
      "jaw": "/i\u02d0/ has narrow jaw opening; /\u026a/ drops jaw roughly 5mm lower.",
      "lips": "/i\u02d0/ corners spread into a slight smile; /\u026a/ lips completely relaxed.",
      "tongue": "/i\u02d0/ front of tongue arches high toward hard palate; /\u026a/ tongue body slightly lowers and centers."
    },
    "commonMistakeWarning": "Pronouncing /\u026a/ as a short /i\u02d0/. This makes 'ship' sound like 'sheep' or 'bitch' sound like 'beach'.",
    "targetWords": [
      "ship",
      "sheep",
      "sit",
      "seat",
      "live",
      "leave",
      "fit",
      "feet"
    ],
    "minimalPairs": [
      {
        "wordA": "ship",
        "wordB": "sheep",
        "focus": "Lax /\u026a/ vs Tense /i\u02d0/"
      },
      {
        "wordA": "sit",
        "wordB": "seat",
        "focus": "Relaxed jaw vs High arched tongue"
      },
      {
        "wordA": "live",
        "wordB": "leave",
        "focus": "Short lax vowel vs Tense spread vowel"
      },
      {
        "wordA": "fit",
        "wordB": "feet",
        "focus": "Drop jaw slightly for fit"
      }
    ],
    "referenceSentence": "Please sit in this seat and see if the new shoes fit your feet.",
    "audioManifestId": "audio-day-04",
    "listeningFocus": "Notice how 'sit' and 'fit' sound deeper and more relaxed, while 'seat' and 'feet' are higher and tenser.",
    "drillInstructions": "Alternate between pair words: 'sit - seat', 'ship - sheep'. Hold your hand under your chin to feel the jaw drop on /\u026a/.",
    "shadowingInstructions": "Shadow the sentence maintaining the contrast between alternating lax and tense vowels.",
    "speakingPrompt": "Describe where you live, where you like to sit when working, and what brings you peace during a busy week.",
    "completionCriteria": "Practice minimal pairs, record the speaking challenge, and score vowel clarity."
  },
  {
    "id": "day-05",
    "day": 5,
    "week": 1,
    "title": "The American Flat 'A' Vowel (/\u00e6/ in CAT)",
    "objective": "Produce the open, resonant American /\u00e6/ sound with wide jaw opening and tongue low.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "The /\u00e6/ Vowel (CAT)",
    "skillCategory": "vowels",
    "explanation": "The American /\u00e6/ (as in cat, bat, man) is unique: the jaw drops wide, the tongue lies flat with the back slightly raised and front touching lower teeth. Before nasal consonants (m, n, ng), it undergoes '\u00e6-tensing', adding a brief schwa glide.",
    "articulationGuidance": {
      "jaw": "Wide drop\u2014roughly two fingers width between teeth.",
      "lips": "Corners pulled back slightly, revealing top front teeth.",
      "tongue": "Tongue body pressed low and flat; tongue tip firmly against bottom front teeth."
    },
    "commonMistakeWarning": "Substituting /e/ (as in bed) or /\u0251\u02d0/ (as in father). 'Bad' must not sound like 'bed' or 'bod'.",
    "targetWords": [
      "cat",
      "man",
      "plan",
      "happy",
      "matter",
      "stand",
      "action",
      "family"
    ],
    "minimalPairs": [
      {
        "wordA": "bad",
        "wordB": "bed",
        "focus": "/\u00e6/ (wide jaw) vs /\u025b/ (mid jaw)"
      },
      {
        "wordA": "cat",
        "wordB": "cut",
        "focus": "/\u00e6/ vs /\u028c/ (central relaxed)"
      },
      {
        "wordA": "man",
        "wordB": "men",
        "focus": "/\u00e6/ tense before nasal vs /\u025b/"
      }
    ],
    "referenceSentence": "That happy man had a fantastic plan for his family.",
    "audioManifestId": "audio-day-05",
    "listeningFocus": "Listen to the bright, open twang of the vowel in 'happy', 'had', and 'plan'.",
    "drillInstructions": "Drop your jaw open wide and say: 'aah... cat, m-a-n, p-l-a-n'. Keep the tongue tip resting on your lower gums.",
    "shadowingInstructions": "Shadow the sentence emphasizing the wide mouth aperture on all target words.",
    "speakingPrompt": "Explain a recent plan you made that turned out really well, or describe a family tradition you enjoy.",
    "completionCriteria": "Record speaking drill, check vowel mouth position, and log self-evaluation."
  },
  {
    "id": "day-06",
    "day": 6,
    "week": 1,
    "title": "Voiced & Unvoiced 'TH' (/\u03b8/ & /\u00f0/)",
    "objective": "Master the dental fricatives /\u03b8/ (think) and /\u00f0/ (this) without substituting /s/, /z/, /t/, or /d/.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Voiced and Unvoiced TH",
    "skillCategory": "t_th",
    "explanation": "American TH sounds require the tongue tip to protrude slightly between the upper and lower teeth, allowing air to escape continuously over the tongue. /\u03b8/ is voiceless (no vocal cord vibration); /\u00f0/ is voiced (vocal cords buzz).",
    "articulationGuidance": {
      "jaw": "Slightly open to let tongue tip extend.",
      "lips": "Relaxed and open.",
      "tongue": "Tongue tip gently rests between the cutting edges of front teeth. Do not bite down; let air hiss smoothly."
    },
    "commonMistakeWarning": "Substituting 't' or 's' for unvoiced TH (saying 'sink' or 'tink' for 'think'), or 'd'/'z' for voiced TH (saying 'dis' for 'this').",
    "targetWords": [
      "think",
      "three",
      "this",
      "those",
      "weather",
      "breathe",
      "breath",
      "together"
    ],
    "minimalPairs": [
      {
        "wordA": "think",
        "wordB": "sink",
        "focus": "Interdental /\u03b8/ vs Alveolar /s/"
      },
      {
        "wordA": "thick",
        "wordB": "tick",
        "focus": "Continuous fricative vs stopped /t/"
      },
      {
        "wordA": "breathe",
        "wordB": "breeze",
        "focus": "Voiced /\u00f0/ vs voiced alveolar /z/"
      },
      {
        "wordA": "then",
        "wordB": "den",
        "focus": "Voiced /\u00f0/ vs stop /d/"
      }
    ],
    "referenceSentence": "I think that this weather brings those three friends together.",
    "audioManifestId": "audio-day-06",
    "listeningFocus": "Distinguish the whispered friction of 'think' and 'three' from the buzzing friction of 'this', 'that', 'those'.",
    "drillInstructions": "Hold the unvoiced /\u03b8/ for 3 seconds: 'thhhhh-ink'. Then buzz the voiced /\u00f0/ on your teeth: 'thhhhh-is'.",
    "shadowingInstructions": "Shadow the sentence maintaining continuous friction through all TH transitions.",
    "speakingPrompt": "Share your thoughts on three things that make good weather for outdoor activities.",
    "completionCriteria": "Record speaking exercise, evaluate T/TH accuracy on scorecard, and review feedback."
  },
  {
    "id": "day-07",
    "day": 7,
    "week": 1,
    "title": "Week 1 Review & Diagnostic Comparison",
    "objective": "Consolidate Week 1 foundations (R, Flap T, /\u026a/ vs /i\u02d0/, /\u00e6/, and TH) and re-record your diagnostic speech.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Foundation Synthesis & Diagnostic",
    "skillCategory": "fluency",
    "explanation": "Consistency in connected speech requires combining sounds without reverting to native habits under cognitive load. Today we revisit our hardest sounds and re-record our introduction.",
    "articulationGuidance": {
      "jaw": "Maintain dynamic jaw movement\u2014dropping for /\u00e6/, relaxing for /\u026a/ and flaps.",
      "lips": "Keep neutral except slight flare for initial R.",
      "tongue": "Sides anchored for R; tip agile for flap T and TH."
    },
    "commonMistakeWarning": "Focusing so intensely on single sounds that sentence rhythm becomes choppy or mechanical.",
    "targetWords": [
      "really",
      "water",
      "sheep",
      "happy",
      "together",
      "first",
      "city"
    ],
    "minimalPairs": [
      {
        "wordA": "right",
        "wordB": "light",
        "focus": "American R verification"
      },
      {
        "wordA": "water",
        "wordB": "waiter",
        "focus": "Flap T in /\u0251\u02d0/ vs /e\u026a/"
      },
      {
        "wordA": "think",
        "wordB": "sink",
        "focus": "Unvoiced TH verification"
      }
    ],
    "referenceSentence": "I really think that cleaner water in this city will make everyone happy.",
    "audioManifestId": "audio-day-07",
    "listeningFocus": "Listen to the flow across all 5 foundation sounds within a single natural American sentence.",
    "drillInstructions": "Read all 7 target words back-to-back, verifying distinct tongue placements for each sound.",
    "shadowingInstructions": "Shadow the compound reference sentence at normal speed (1.0x) and slightly slowed (0.75x).",
    "speakingPrompt": "Re-record your 60-second introduction from Day 1. Notice what feels more natural and identify the two sounds that still feel most challenging.",
    "completionCriteria": "Re-record introduction, identify top 2 difficulties in reflection notes, and update all 5 scorecard categories."
  },
  {
    "id": "day-08",
    "day": 8,
    "week": 2,
    "title": "Vowel Triangle: BED, BAD, and BUT (/\u025b/, /\u00e6/, /\u028c/)",
    "objective": "Distinguish between the mid-front /\u025b/, low-front /\u00e6/, and central-relaxed /\u028c/ vowels.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Vowels in BED, BAD, BUT",
    "skillCategory": "vowels",
    "explanation": "These three short vowels are frequently merged by non-native speakers. /\u025b/ (bed) is mid-open. /\u00e6/ (bad) drops wide and forward. /\u028c/ (but) is a relaxed central grunt with minimal jaw effort.",
    "articulationGuidance": {
      "jaw": "/\u025b/ medium drop; /\u00e6/ wide drop; /\u028c/ small relaxed drop.",
      "lips": "Neutral, relaxed without rounding.",
      "tongue": "/\u025b/ front mid; /\u00e6/ front low; /\u028c/ central resting position."
    },
    "commonMistakeWarning": "Pronouncing 'bad' and 'bed' identically, or over-opening the mouth on 'but' so it sounds like 'bot'.",
    "targetWords": [
      "bed",
      "bad",
      "but",
      "head",
      "had",
      "hut",
      "pen",
      "pan",
      "pun"
    ],
    "minimalPairs": [
      {
        "wordA": "bed",
        "wordB": "bad",
        "focus": "/\u025b/ vs /\u00e6/ jaw height"
      },
      {
        "wordA": "bad",
        "wordB": "but",
        "focus": "/\u00e6/ front open vs /\u028c/ central relaxed"
      },
      {
        "wordA": "pen",
        "wordB": "pan",
        "focus": "Mid vowel vs Low open vowel"
      }
    ],
    "referenceSentence": "The man had a bad cut on his head, but rested in bed.",
    "audioManifestId": "audio-day-08",
    "listeningFocus": "Track the stepwise jaw opening: 'bed' (mid) -> 'bad' (wide) -> 'but' (relaxed center).",
    "drillInstructions": "Cycle through triplets: 'bed - bad - but', 'head - had - hut', 'pen - pan - pun'. Feel the jaw drop then reset.",
    "shadowingInstructions": "Shadow the sentence maintaining the three distinct vowel postures.",
    "speakingPrompt": "Tell a brief story about a time something seemed bad at first, but turned out for the best.",
    "completionCriteria": "Complete triplet drill, record speaking response, and rate vowel clarity."
  },
  {
    "id": "day-09",
    "day": 9,
    "week": 2,
    "title": "The Stressed Schwa (/\u028c/ in CUP, LUCK, MONEY, LOVE)",
    "objective": "Master the short stressed vowel /\u028c/ across varied spellings (u, o, ou).",
    "estimatedDurationMinutes": 20,
    "targetSkill": "The /\u028c/ Vowel (CUP, LOVE)",
    "skillCategory": "vowels",
    "explanation": "In English orthography, the /\u028c/ sound is spelled with 'u' (cup, luck), 'o' (love, money, mother), and 'ou' (country, enough). The mouth does almost no work: neutral jaw, neutral tongue, relaxed throat.",
    "articulationGuidance": {
      "jaw": "Relaxed drop of about one finger width.",
      "lips": "Completely relaxed, never rounded.",
      "tongue": "Rests flat in the middle of the mouth, not pushed forward or pulled back."
    },
    "commonMistakeWarning": "Rounding the lips when seeing 'o' in words like 'love' or 'money', making them sound like 'loave' or 'maw-ney'.",
    "targetWords": [
      "cup",
      "luck",
      "money",
      "love",
      "mother",
      "company",
      "country",
      "enough"
    ],
    "minimalPairs": [
      {
        "wordA": "luck",
        "wordB": "lock",
        "focus": "/\u028c/ (central relaxed) vs /\u0251\u02d0/ (back open)"
      },
      {
        "wordA": "cup",
        "wordB": "cap",
        "focus": "/\u028c/ (relaxed) vs /\u00e6/ (wide jaw)"
      },
      {
        "wordA": "cut",
        "wordB": "coat",
        "focus": "/\u028c/ vs diphthong /o\u028a/"
      }
    ],
    "referenceSentence": "My mother loved running the company and had enough money for the trip.",
    "audioManifestId": "audio-day-09",
    "listeningFocus": "Notice how 'mother', 'loved', 'company', and 'money' all share the exact same short, unrounded vowel.",
    "drillInstructions": "Practice saying: 'Love, money, mother, company' with a completely relaxed, deadpan face.",
    "shadowingInstructions": "Shadow the reference sentence without any lip rounding on the 'o' words.",
    "speakingPrompt": "Describe what brings you luck, or what kind of company you would love to build in the future.",
    "completionCriteria": "Drill unrounded /\u028c/ words, record your practice attempt, and save your scorecard."
  },
  {
    "id": "day-10",
    "day": 10,
    "week": 2,
    "title": "R-Colored Vowels (BIRD, LEARN, WORD, WORK)",
    "objective": "Produce the unified American /\u025c\u02d0r/ vowel seamlessly without inserting extra syllables.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "R-Colored Vowel (/\u025c\u02d0r/)",
    "skillCategory": "american_r",
    "explanation": "The vowel /\u025c\u02d0r/ is an 'er' sound where the vowel and the R are simultaneous. It appears in bird, learn, word, work, and turn. The tongue maintains the American R posture for the entire duration of the vowel.",
    "articulationGuidance": {
      "jaw": "Slightly dropped, steady.",
      "lips": "Slightly flared corners, no tight puckering.",
      "tongue": "Sides held firmly against upper molars, center hollowed, tongue tip floating back."
    },
    "commonMistakeWarning": "Pronouncing 'word' with an 'o' sound, or 'work' with an 'or' sound. 'Work' and 'word' rhyme with 'bird' and 'heard'.",
    "targetWords": [
      "bird",
      "learn",
      "word",
      "work",
      "first",
      "early",
      "person",
      "service"
    ],
    "minimalPairs": [
      {
        "wordA": "work",
        "wordB": "walk",
        "focus": "/\u025c\u02d0r/ (r-colored) vs /\u0254\u02d0/ (open back)"
      },
      {
        "wordA": "bird",
        "wordB": "bard",
        "focus": "/\u025c\u02d0r/ vs /\u0251\u02d0r/"
      },
      {
        "wordA": "first",
        "wordB": "fast",
        "focus": "/\u025c\u02d0r/ vs /\u00e6/"
      }
    ],
    "referenceSentence": "The first person to learn that word started work early.",
    "audioManifestId": "audio-day-10",
    "listeningFocus": "Listen to the steady, uninterrupted resonance in 'first', 'person', 'learn', 'word', 'work', 'early'.",
    "drillInstructions": "Hold the continuous sound 'errrr' for 5 seconds. Then blend directly into: 'w-err-k', 'b-err-d', 'l-err-n'.",
    "shadowingInstructions": "Shadow the sentence maintaining firm molar contact throughout all /\u025c\u02d0r/ syllables.",
    "speakingPrompt": "Talk about a skill or subject you worked hard to learn early in your career or life.",
    "completionCriteria": "Record speaking practice, review R-sound resonance, and update ratings."
  },
  {
    "id": "day-11",
    "day": 11,
    "week": 2,
    "title": "Final Consonants & Past Tense Endings",
    "objective": "Articulate final consonant clusters and past-tense '-ed' endings (/t/, /d/, /\u026ad/) cleanly.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Final Consonants & -ED Endings",
    "skillCategory": "t_th",
    "explanation": "The regular past tense '-ed' has three pronunciations: /t/ after voiceless sounds (worked, helped, asked); /d/ after voiced sounds (lived, played); and /\u026ad/ only after /t/ or /d/ (wanted, needed). Don't add an extra syllable where none belongs.",
    "articulationGuidance": {
      "jaw": "Close enough to allow tongue and lips to form crisp stops.",
      "lips": "Firm closure for /p/ (helped) and /b/.",
      "tongue": "Snap tongue tip against tooth ridge immediately after the preceding consonant without inserting a vowel."
    },
    "commonMistakeWarning": "Saying 'work-ed' or 'ask-ed' as two syllables instead of one single syllable ('workt', 'askt').",
    "targetWords": [
      "worked",
      "asked",
      "helped",
      "wanted",
      "needed",
      "stopped",
      "changed",
      "expected"
    ],
    "minimalPairs": [
      {
        "wordA": "work",
        "wordB": "worked",
        "focus": "Single stop /k/ vs cluster /kt/"
      },
      {
        "wordA": "help",
        "wordB": "helped",
        "focus": "Single stop /p/ vs cluster /pt/"
      },
      {
        "wordA": "want",
        "wordB": "wanted",
        "focus": "One syllable /w\u0251\u02d0nt/ vs two syllables /w\u0251\u02d0nt\u026ad/"
      }
    ],
    "referenceSentence": "She worked hard, asked questions, and helped whenever they needed support.",
    "audioManifestId": "audio-day-11",
    "listeningFocus": "Hear how 'worked' (/w\u025c\u02d0rkt/), 'asked' (/\u00e6skt/), and 'helped' (/h\u025blpt/) stay strictly one tight syllable each.",
    "drillInstructions": "Tap your finger once on the table for one-syllable verbs: 'worked!', 'helped!', 'asked!'. Tap twice only for 'needed!'.",
    "shadowingInstructions": "Shadow the sentence ensuring final consonant clusters are complete without ghost vowels.",
    "speakingPrompt": "Describe a project you worked on recently: what happened, who you helped, and what unexpected challenges arose.",
    "completionCriteria": "Record speaking prompt, evaluate T/TH and rhythm accuracy, and mark complete."
  },
  {
    "id": "day-12",
    "day": 12,
    "week": 2,
    "title": "Word Stress & Syllable Shifting",
    "objective": "Master shifting stress in word families and reduce unstressed syllables to schwa /\u0259/.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Word Stress & Syllable Shifts",
    "skillCategory": "rhythm",
    "explanation": "In English, adding suffixes shifts the primary stress and changes vowel qualities. In 'PHOtograph' the first syllable is stressed. In 'phoTOGraphy' stress shifts to the second. In 'photoGRAPHic' it shifts to the third. Unstressed vowels become /\u0259/.",
    "articulationGuidance": {
      "jaw": "Opens wider and stays open longer on the stressed syllable.",
      "lips": "Engaged on stressed vowel; relaxed on unstressed vowels.",
      "tongue": "Crisp articulation on stressed vowels; relaxes to neutral center on unstressed schwas."
    },
    "commonMistakeWarning": "Pronouncing every syllable with equal duration, volume, and pitch, creating robotic or flat delivery.",
    "targetWords": [
      "photograph",
      "photography",
      "photographic",
      "economy",
      "economic",
      "compete",
      "competition",
      "decision"
    ],
    "minimalPairs": [
      {
        "wordA": "PHOtograph",
        "wordB": "phoTOGraphy",
        "focus": "First syllable stress vs Second syllable stress"
      },
      {
        "wordA": "eCONomy",
        "wordB": "ecoNOMic",
        "focus": "Second syllable stress vs Third syllable stress"
      },
      {
        "wordA": "comPETE",
        "wordB": "compeTItion",
        "focus": "Two syllables vs Four syllables with stress shift"
      }
    ],
    "referenceSentence": "Her photography showed great photographic detail, not just a simple photograph.",
    "audioManifestId": "audio-day-12",
    "listeningFocus": "Notice how the pitch rises and vowel elongates on 'TOG' in photography, while 'pho' becomes a quick, quiet schwa /f\u0259/.",
    "drillInstructions": "Exaggerate the stress: make stressed syllables LONGER, LOUDER, and HIGHER PITCH: 'PHO-to-graph', 'pho-TOG-ra-phy'.",
    "shadowingInstructions": "Shadow the reference sentence matching the rhythmic peaks and reductions.",
    "speakingPrompt": "Discuss how technology has changed modern photography or the global economy in recent years.",
    "completionCriteria": "Drill word families, record speaking challenge, and score word stress and rhythm."
  },
  {
    "id": "day-13",
    "day": 13,
    "week": 2,
    "title": "Natural Reductions: GONNA, WANNA, HAFTA",
    "objective": "Recognize and naturally use American reduced modal forms in casual spoken English.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Reduced Forms (Gonna, Wanna, Hafta)",
    "skillCategory": "rhythm",
    "explanation": "In spontaneous General American speech, common function word combinations reduce: 'want to' becomes 'wanna' /\u02c8w\u0251\u02d0n\u0259/, 'going to' becomes 'gonna' /\u02c8\u0261\u028cn\u0259/, and 'have to' becomes 'hafta' /\u02c8h\u00e6ft\u0259/. These are standard spoken features, not slang.",
    "articulationGuidance": {
      "jaw": "Minimal jaw movement during reductions.",
      "lips": "Neutral relaxation.",
      "tongue": "Glides swiftly through the unstressed schwa endings without pausing."
    },
    "commonMistakeWarning": "Over-enunciating 'I am go-ing to...' in informal conversation, which sounds stiff and slows speech down.",
    "targetWords": [
      "wanna",
      "gonna",
      "hafta",
      "gotta",
      "coulda",
      "shoulda",
      "kinda",
      "outta"
    ],
    "minimalPairs": [
      {
        "wordA": "want to",
        "wordB": "wanna",
        "focus": "Full citation form vs connected speech reduction"
      },
      {
        "wordA": "going to",
        "wordB": "gonna",
        "focus": "Three syllables vs two quick beats"
      },
      {
        "wordA": "have to",
        "wordB": "hafta",
        "focus": "Voiced /v/ assimilates to voiceless /f/ before /t/"
      }
    ],
    "referenceSentence": "I'm gonna figure out what I wanna do because I hafta make a decision.",
    "audioManifestId": "audio-day-13",
    "listeningFocus": "Listen to how smoothly Steve Jobs says 'what I wanted to do' and how native speakers naturally use 'gonna' and 'wanna'.",
    "drillInstructions": "Say this phrase 5 times smoothly without stopping between words: 'I wanna go... I'm gonna go... I hafta go'.",
    "shadowingInstructions": "Shadow the reference sentence focusing on forward momentum and natural reductions.",
    "speakingPrompt": "What are three things you are gonna do this coming weekend that you really wanna make time for?",
    "completionCriteria": "Record speaking practice, assess rhythm and connected speech, and complete review."
  },
  {
    "id": "day-14",
    "day": 14,
    "week": 2,
    "title": "Two-Minute Personal Story & Week 2 Review",
    "objective": "Integrate vowel accuracy, consonant endings, and natural reductions into a 2-minute unscripted personal narrative.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Narrative Fluency & Vowel Review",
    "skillCategory": "fluency",
    "explanation": "Telling a personal story requires coordinating pronunciation while retrieving vocabulary and structuring ideas. Use natural American pauses, reductions, and clear vowel contrasts.",
    "articulationGuidance": {
      "jaw": "Flexible and relaxed.",
      "lips": "Responsive to content word stress.",
      "tongue": "Maintain firm molar contact for R-colored words and relaxed tongue for reductions."
    },
    "commonMistakeWarning": "Rushing through sentences without pausing at natural thought groups or breathing intervals.",
    "targetWords": [
      "decision",
      "college",
      "interesting",
      "curiosity",
      "typography",
      "beautiful",
      "worked"
    ],
    "minimalPairs": [
      {
        "wordA": "bad",
        "wordB": "bed",
        "focus": "Week 2 vowel verification"
      },
      {
        "wordA": "worked",
        "wordB": "work",
        "focus": "Past tense ending verification"
      },
      {
        "wordA": "wanna",
        "wordB": "want to",
        "focus": "Natural reduction rhythm"
      }
    ],
    "referenceSentence": "Looking back, dropping in on that class was one of the best decisions I ever made.",
    "audioManifestId": "audio-day-14",
    "listeningFocus": "Listen to the reference clip of Steve Jobs telling his college story: notice his conversational rhythm, pauses, and emphasis.",
    "drillInstructions": "Practice reading the reference sentence with deliberate thought-group pauses: 'Looking back... dropping in on that class... was one of the best decisions I ever made.'",
    "shadowingInstructions": "Shadow the clip focusing on matching the speaker's emotional delivery and natural pacing.",
    "speakingPrompt": "Tell a 2-minute personal story about an unexpected choice you made that turned out to be important or memorable. Do not read from notes.",
    "completionCriteria": "Record 2-minute story attempt, log reflections on hardest sounds, and assign scorecard ratings."
  },
  {
    "id": "day-15",
    "day": 15,
    "week": 3,
    "title": "Sentence Stress & Information Focus",
    "objective": "Use pitch and vowel lengthening to highlight key content words while compressing function words.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Sentence Stress & Emphasis",
    "skillCategory": "rhythm",
    "explanation": "General American is stress-timed. Content words (nouns, main verbs, adjectives) are stressed: vowels are longer, louder, and higher in pitch. Function words (pronouns, prepositions, auxiliaries) are compressed and reduced.",
    "articulationGuidance": {
      "jaw": "Drops noticeably on the peak focus word.",
      "lips": "Engage fully on focus syllables.",
      "tongue": "Give full vowel quality to stressed syllables; compress unstressed syllables."
    },
    "commonMistakeWarning": "Stressing every word equally, which makes speech sound robotic and exhausting to follow.",
    "targetWords": [
      "connect",
      "forward",
      "backward",
      "future",
      "destiny",
      "confidence",
      "difference"
    ],
    "minimalPairs": [
      {
        "wordA": "I CAN do it",
        "wordB": "I can DO it",
        "focus": "Emphasizing modal ability vs main action verb"
      },
      {
        "wordA": "looking FORWARD",
        "wordB": "looking BACKWARD",
        "focus": "Contrasting directional focus words"
      }
    ],
    "referenceSentence": "You can't connect the dots looking forward; you can only connect them looking backwards.",
    "audioManifestId": "audio-day-15",
    "listeningFocus": "Notice how 'can't', 'connect', 'forward', and 'backwards' ring out with clear pitch peaks, while 'the', 'them', and 'you' are fast and quiet.",
    "drillInstructions": "Tap with your hand on the desk only on the stressed beats: 'You CAN'T... connect the DOTS... looking FOR-ward'.",
    "shadowingInstructions": "Shadow the sentence, mimicking the melody and pitch peaks of the reference speaker.",
    "speakingPrompt": "State an important principle or piece of advice you believe in, emphasizing the key takeaway words clearly.",
    "completionCriteria": "Record speaking exercise, rate Word Stress & Rhythm on the scorecard, and review tips."
  },
  {
    "id": "day-16",
    "day": 16,
    "week": 3,
    "title": "Linking Words Across Word Boundaries",
    "objective": "Link consonant-to-vowel, vowel-to-vowel, and consonant-to-consonant smoothly across word boundaries.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Word Linking & Connected Speech",
    "skillCategory": "rhythm",
    "explanation": "American English flows in continuous streams of sound within each thought group. When a word ends with a consonant and the next begins with a vowel, the consonant shifts forward ('read a book' -> 'ree-da-book'). Vowel-to-vowel adds a gentle /w/ or /j/ glide.",
    "articulationGuidance": {
      "jaw": "Maintains continuous fluidity between word transitions.",
      "lips": "Smooth transitions without abrupt closures.",
      "tongue": "Carries the final consonant directly into the starting vowel of the next word without a glottal stop."
    },
    "commonMistakeWarning": "Inserting a glottal stop (a tiny throat catch) between words, breaking speech into disconnected fragments.",
    "targetWords": [
      "turn out",
      "fall in",
      "stand out",
      "drop in",
      "wake up",
      "give up",
      "pick it up"
    ],
    "minimalPairs": [
      {
        "wordA": "drop in",
        "wordB": "dropping",
        "focus": "Linked phrase sounds identical to single word"
      },
      {
        "wordA": "stand out",
        "wordB": "stand now",
        "focus": "Consonant-to-vowel link vs consonant stop"
      }
    ],
    "referenceSentence": "Turn it on, pick it up, and see how it all works out in the end.",
    "audioManifestId": "audio-day-16",
    "listeningFocus": "Notice how 'Turn it on' sounds like one single word: 'Tur-ni-ton'. Listen for the seamless audio ribbon.",
    "drillInstructions": "Read these linked blocks as single words: 'tur-ni-ton', 'pi-ki-tup', 'wor-k-sout'.",
    "shadowingInstructions": "Shadow the sentence without stopping breath between words in each clause.",
    "speakingPrompt": "Describe your morning routine from the moment you wake up until you start working, focusing on linking words together.",
    "completionCriteria": "Record speaking prompt, check linking smoothness, and save scorecard."
  },
  {
    "id": "day-17",
    "day": 17,
    "week": 3,
    "title": "Flap T Across Word Boundaries",
    "objective": "Apply the flap T between words (e.g., 'get it', 'put it away', 'what if') in natural connected speech.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Flap T in Connected Speech",
    "skillCategory": "t_th",
    "explanation": "A word-final /t/ or /d/ followed by a vowel in the next word flaps just like an internal flap T. 'Get it' sounds like 'geddit' [\u02c8\u0261\u025b\u027e\u026at]. 'Put it away' becomes [\u02c8p\u028a\u027e\u026a\u027e\u0259\u02c8we\u026a] with two consecutive flaps.",
    "articulationGuidance": {
      "jaw": "Relaxed and easy.",
      "lips": "Neutral.",
      "tongue": "Two rapid light taps of the tongue tip against the tooth ridge in quick succession."
    },
    "commonMistakeWarning": "Stopping airflow on the final 't' of 'get' or 'put' before pronouncing 'it'. The tap must be continuous and voiced.",
    "targetWords": [
      "get it",
      "put it away",
      "what if",
      "not at all",
      "let it go",
      "at eight",
      "that is"
    ],
    "minimalPairs": [
      {
        "wordA": "get it",
        "wordB": "get out",
        "focus": "Both flap: 'ge-dit' and 'ge-dout'"
      },
      {
        "wordA": "put it away",
        "wordB": "put them away",
        "focus": "Flap before vowel vs unvoiced stop before consonant"
      }
    ],
    "referenceSentence": "If you get it now, put it away so we can start at eight.",
    "audioManifestId": "audio-day-17",
    "listeningFocus": "Listen to the double flap in 'put it away' [p\u028a-\u027e\u026a-\u027e\u0259-we\u026a] and the smooth glide in 'start at eight'.",
    "drillInstructions": "Say 'put it away' 5 times smoothly: 'pu-di-da-way'. Then 'get it': 'ge-dit'.",
    "shadowingInstructions": "Shadow the reference sentence maintaining quick, effortless tongue taps.",
    "speakingPrompt": "Explain how you organize files or tools in your workspace so that you can easily put things away and find them later.",
    "completionCriteria": "Record speaking exercise, rate T/TH and rhythm, and log practice notes."
  },
  {
    "id": "day-18",
    "day": 18,
    "week": 3,
    "title": "Natural Contractions (I'M, I'VE, DON'T, WOULDN'T, THEY'RE)",
    "objective": "Pronounce common negative and pronoun contractions smoothly without hesitation.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Natural Contractions",
    "skillCategory": "rhythm",
    "explanation": "Contractions are essential to natural American rhythm. They streamline pronouns and auxiliary verbs so sentences fit the natural stress-timing pattern. In negative contractions like 'wouldn't' or 'didn't', Americans often use a nasal tap or hold.",
    "articulationGuidance": {
      "jaw": "Compact, efficient jaw movement.",
      "lips": "Swift transition into next sound.",
      "tongue": "For 'didn't' / 'wouldn't', tongue stays on the alveolar ridge while releasing air through the nose (nasal release)."
    },
    "commonMistakeWarning": "Unpacking contractions in casual speech (saying 'I would not have' instead of 'I wouldn't've'), which disrupts rhythm.",
    "targetWords": [
      "I'm",
      "I've",
      "don't",
      "wouldn't",
      "they're",
      "we'd",
      "couldn't",
      "it's"
    ],
    "minimalPairs": [
      {
        "wordA": "they're",
        "wordB": "there",
        "focus": "Exact homophones in General American (/\u00f0\u025br/)"
      },
      {
        "wordA": "can",
        "wordB": "can't",
        "focus": "Reduced /k\u0259n/ vs stressed /k\u00e6nt/ with held T"
      }
    ],
    "referenceSentence": "They're sure that I wouldn't have known if they hadn't told me.",
    "audioManifestId": "audio-day-18",
    "listeningFocus": "Listen to how contractions collapse syllables without losing clarity in the rest of the sentence.",
    "drillInstructions": "Practice transitioning: 'I'm... I've... they're... we'd... wouldn't'. Make each one a single crisp syllable.",
    "shadowingInstructions": "Shadow the sentence maintaining natural pace through multiple contractions.",
    "speakingPrompt": "Talk about something you wouldn't have believed five years ago that is now a regular part of your life.",
    "completionCriteria": "Record challenge, assess rhythm and fluency, and complete scorecard."
  },
  {
    "id": "day-19",
    "day": 19,
    "week": 3,
    "title": "American Intonation: Statements vs Questions",
    "objective": "Master falling intonation for statements and WH-questions, and rising intonation for yes/no questions.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Intonation Contours",
    "skillCategory": "rhythm",
    "explanation": "General American statements and WH-questions finish with a clear downward pitch glide (falling intonation), conveying confidence and finality. Yes/no questions end with an upward pitch glide. Rising intonation at the end of statements ('uptalk') should be controlled.",
    "articulationGuidance": {
      "jaw": "Relax on final downward pitch glide.",
      "lips": "Natural.",
      "tongue": "Vocal pitch drops into your chest register on the final stressed syllable of statements."
    },
    "commonMistakeWarning": "Finishing every statement with rising pitch ('uptalk'), making statements sound like hesitant questions.",
    "targetWords": [
      "really",
      "certainly",
      "why",
      "where",
      "could you",
      "is that right",
      "absolutely"
    ],
    "minimalPairs": [
      {
        "wordA": "You're coming.",
        "wordB": "You're coming?",
        "focus": "Falling intonation (statement) vs Rising pitch (question)"
      },
      {
        "wordA": "He did it.",
        "wordB": "Did he do it?",
        "focus": "Definitive fall vs Inquisitive rise"
      }
    ],
    "referenceSentence": "So why did I drop out? It started before I was born.",
    "audioManifestId": "audio-day-19",
    "listeningFocus": "Listen to Steve Jobs ask 'So why'd I drop out?' (WH-question with downward slope) followed by 'It started before I was born' (definitive falling statement).",
    "drillInstructions": "Say 'I like it.' with a firm downward melody 3 times. Then say 'Do you like it?' with an upward melody 3 times.",
    "shadowingInstructions": "Shadow the reference question and statement, reproducing the exact pitch contours.",
    "speakingPrompt": "Ask two thoughtful questions about how someone chooses their career, then answer both questions with firm statements.",
    "completionCriteria": "Record speaking exercise, rate intonation and delivery, and review feedback."
  },
  {
    "id": "day-20",
    "day": 20,
    "week": 3,
    "title": "Shadowing an American Speech Clip",
    "objective": "Shadow an authentic 30-second speech excerpt in real-time, matching pace, pitch, pauses, and accent.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Full-Length Shadowing",
    "skillCategory": "fluency",
    "explanation": "Shadowing trains your brain to coordinate tongue, jaw, and breath simultaneously without translating or overthinking. Today we shadow a continuous passage from Steve Jobs' Stanford Commencement address.",
    "articulationGuidance": {
      "jaw": "Loose and agile, following the speaker's rhythm.",
      "lips": "Responsive.",
      "tongue": "Anchor molars on R sounds; flap effortlessly on intervocalic T."
    },
    "commonMistakeWarning": "Pausing the audio every few words instead of speaking alongside the voice with a 0.5-second lag.",
    "targetWords": [
      "impossible",
      "connect",
      "forward",
      "backwards",
      "destiny",
      "confidence",
      "difference"
    ],
    "minimalPairs": [
      {
        "wordA": "forward",
        "wordB": "backward",
        "focus": "R-colored vowel balance"
      },
      {
        "wordA": "dots",
        "wordB": "dates",
        "focus": "/\u0251\u02d0/ in dots vs /e\u026a/ in dates"
      }
    ],
    "referenceSentence": "You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.",
    "audioManifestId": "audio-day-20",
    "listeningFocus": "Listen to the complete audio clip twice through before shadowing. Notice where the speaker takes breaths.",
    "drillInstructions": "Shadow the first sentence 3 times until you can speak simultaneously with the reference audio.",
    "shadowingInstructions": "Record your shadowing attempt while listening to the reference audio. Then play back both to compare.",
    "speakingPrompt": "Summarize the core message of the speech clip in your own words in 60 seconds without pausing.",
    "completionCriteria": "Record full shadowing attempt, use A/B playback to compare, and assign all 5 scorecard ratings."
  },
  {
    "id": "day-21",
    "day": 21,
    "week": 3,
    "title": "Two-Minute Unscripted Explanation & Week 3 Review",
    "objective": "Explain a familiar topic for 2 minutes without reading a script, maintaining connected speech and American rhythm.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Unscripted Rhythm & Delivery",
    "skillCategory": "fluency",
    "explanation": "Unscripted speaking is the ultimate test of accent acquisition. When focus shifts to content, accent habits tend to slip. Today we focus on maintaining American R, flap T, and linked vowels while speaking spontaneously.",
    "articulationGuidance": {
      "jaw": "Stay relaxed to prevent throat tension.",
      "lips": "Keep mobile and relaxed.",
      "tongue": "Keep sides anchored near molars so R sounds occur naturally."
    },
    "commonMistakeWarning": "Speaking faster than your pronunciation can keep up with. A deliberate, rhythmic pace sounds much more native than rushed speech.",
    "targetWords": [
      "connect",
      "system",
      "process",
      "important",
      "actually",
      "example",
      "result"
    ],
    "minimalPairs": [
      {
        "wordA": "get it",
        "wordB": "got it",
        "focus": "Flap T in connected phrases"
      },
      {
        "wordA": "really",
        "wordB": "rarely",
        "focus": "Rhotic fluency"
      }
    ],
    "referenceSentence": "When you explain a complex idea simply, people immediately connect with your message.",
    "audioManifestId": "audio-day-21",
    "listeningFocus": "Notice how clear sentence stress guides the listener's attention effortlessly.",
    "drillInstructions": "Outline 3 bullet points in your head before speaking: Introduction, Mechanism, Result.",
    "shadowingInstructions": "Shadow the reference sentence with deliberate focus on clarity over speed.",
    "speakingPrompt": "Explain how something you know well works (e.g. how a search engine works, how coffee is brewed, or how you organize your day) for two continuous minutes.",
    "completionCriteria": "Record 2-minute unscripted explanation, rate all 5 categories, and review historical trends."
  },
  {
    "id": "day-22",
    "day": 22,
    "week": 4,
    "title": "Professional Self-Introduction",
    "objective": "Deliver a polished, professional 90-second introduction with confident American cadence and clear vowels.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Professional Cadence & Articulation",
    "skillCategory": "fluency",
    "explanation": "In professional contexts, General American relies on steady pace, resonant chest resonance, and clear consonant finishes. Avoid uptalk at the end of credentials; finish statements with a decisive downward cadence.",
    "articulationGuidance": {
      "jaw": "Moderate opening on content words; do not mutter.",
      "lips": "Form crisp consonants without exaggerated movements.",
      "tongue": "Maintain high precision on R and L distinctions."
    },
    "commonMistakeWarning": "Trailing off at the ends of sentences or letting volume drop on unstressed syllables.",
    "targetWords": [
      "experience",
      "background",
      "currently",
      "leadership",
      "results",
      "collaborate",
      "deliver"
    ],
    "minimalPairs": [
      {
        "wordA": "lead",
        "wordB": "read",
        "focus": "L vs R precision in professional verbs"
      },
      {
        "wordA": "career",
        "wordB": "Korea",
        "focus": "Second syllable stress in ca-REER"
      }
    ],
    "referenceSentence": "Over the past several years, I've worked across multiple teams to deliver scalable solutions.",
    "audioManifestId": "audio-day-22",
    "listeningFocus": "Listen to the calm, steady authority of downward statement endings and smooth linking in 'I've worked across'.",
    "drillInstructions": "Practice saying: 'Over the past several years...' pausing cleanly after 'years' before delivering the main verb.",
    "shadowingInstructions": "Shadow the sentence maintaining professional poise and rhythmic emphasis.",
    "speakingPrompt": "Deliver your 90-second professional elevator pitch: who you are, what you specialize in, and what value you bring.",
    "completionCriteria": "Record professional pitch, complete scorecard, and review recommendations."
  },
  {
    "id": "day-23",
    "day": 23,
    "week": 4,
    "title": "Describing a Project & Rationale",
    "objective": "Explain design or technical decisions using American transitional phrases and contrastive stress.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Contrastive Stress & Explanations",
    "skillCategory": "rhythm",
    "explanation": "When justifying choices, American speakers use contrastive stress to highlight alternatives: 'We didn't choose the FASTEST option; we chose the most RELIABLE one.' Emphasize key differences cleanly.",
    "articulationGuidance": {
      "jaw": "Opens wider on contrastive words.",
      "lips": "Responsive.",
      "tongue": "Quick and agile on transitions like 'instead of', 'rather than'."
    },
    "commonMistakeWarning": "Equalizing stress across contrasting words, obscuring the reasoning behind your decisions.",
    "targetWords": [
      "decision",
      "instead",
      "rather than",
      "priority",
      "architecture",
      "simplicity",
      "trade-off"
    ],
    "minimalPairs": [
      {
        "wordA": "rather than",
        "wordB": "other than",
        "focus": "Voiced TH in transitions"
      },
      {
        "wordA": "priority",
        "wordB": "majority",
        "focus": "Flap T in priority [pra\u026a\u02c8\u0254\u02d0r\u0259\u027ei]"
      }
    ],
    "referenceSentence": "We decided to prioritize simplicity rather than adding unnecessary complexity.",
    "audioManifestId": "audio-day-23",
    "listeningFocus": "Listen to how 'simplicity' and 'complexity' stand in clear sonic contrast.",
    "drillInstructions": "Drill contrastive pairs: 'NOT this... but THAT', 'NOT fast... but STEADY'.",
    "shadowingInstructions": "Shadow the reference sentence emphasizing the decision rationale.",
    "speakingPrompt": "Describe a project you worked on and explain two major decisions you made, detailing why you chose them over alternatives.",
    "completionCriteria": "Record project description, rate word stress and fluency, and complete review."
  },
  {
    "id": "day-24",
    "day": 24,
    "week": 4,
    "title": "Mock Job Interview Response",
    "objective": "Answer a challenging interview prompt with poise, natural reductions, and crisp consonant endings.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Interview Fluency & Poise",
    "skillCategory": "fluency",
    "explanation": "Behavioral interview questions require the STAR method (Situation, Task, Action, Result). Delivering this in General American means avoiding hesitant filler sounds ('uhhh', 'ummm') and using clean thought-group pauses instead.",
    "articulationGuidance": {
      "jaw": "Keep jaw loose; breathe through your nose during pauses.",
      "lips": "Neutral relaxation.",
      "tongue": "Keep tongue relaxed on pauses instead of hovering tensely."
    },
    "commonMistakeWarning": "Filling silence with prolonged vowels. A silent breath pause sounds confident and gives you time to articulate.",
    "targetWords": [
      "situation",
      "challenge",
      "specifically",
      "accomplished",
      "impact",
      "perspective",
      "feedback"
    ],
    "minimalPairs": [
      {
        "wordA": "specifically",
        "wordB": "specific",
        "focus": "Syllable rhythm in longer adverbs"
      },
      {
        "wordA": "impact",
        "wordB": "compact",
        "focus": "First-syllable noun stress"
      }
    ],
    "referenceSentence": "When that challenge came up, I stepped in, coordinated with the team, and resolved it quickly.",
    "audioManifestId": "audio-day-24",
    "listeningFocus": "Notice how clean pauses separate the three actions ('stepped in... coordinated... resolved it').",
    "drillInstructions": "Practice replacing 'uhhh' with a 1-second silent breath between thought groups.",
    "shadowingInstructions": "Shadow the sentence maintaining energetic delivery and clean past-tense finishes.",
    "speakingPrompt": "Answer: 'Tell me about a time you faced a difficult deadline or conflict at work and how you handled it.' Speak for two minutes.",
    "completionCriteria": "Record mock interview answer, assess fluency and confidence, and log scorecard."
  },
  {
    "id": "day-25",
    "day": 25,
    "week": 4,
    "title": "Retelling a Story Without a Script",
    "objective": "Retell the key points of an American talk or video from memory, keeping natural linking and pacing.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Memory Retelling & Linking",
    "skillCategory": "fluency",
    "explanation": "Retelling content from memory mirrors everyday conversations where you relay information you heard. Focus on maintaining forward momentum, linking consonants to vowels, and using contractions naturally.",
    "articulationGuidance": {
      "jaw": "Flexible and rhythmic.",
      "lips": "Mobile and relaxed.",
      "tongue": "Smooth glides across word boundaries."
    },
    "commonMistakeWarning": "Pausing mid-phrase to search for an exact word. Paraphrase using simpler words to keep your rhythm moving.",
    "targetWords": [
      "basically",
      "mentioned",
      "pointed out",
      "eventually",
      "turned out",
      "fascinating",
      "lesson"
    ],
    "minimalPairs": [
      {
        "wordA": "turned out",
        "wordB": "turning out",
        "focus": "Linked phrase vs single word"
      },
      {
        "wordA": "pointed out",
        "wordB": "point out",
        "focus": "Flap T in pointed [\u02c8p\u0254\u026an\u026a\u027e a\u028at]"
      }
    ],
    "referenceSentence": "He pointed out that you can't connect the dots looking forward, but only looking backward.",
    "audioManifestId": "audio-day-25",
    "listeningFocus": "Hear how indirect speech transitions ('He pointed out that...') blend smoothly into the main quote.",
    "drillInstructions": "Say 'He pointed out that...' 3 times smoothly as a single rhythmic lead-in.",
    "shadowingInstructions": "Shadow the reference sentence maintaining momentum through the transition.",
    "speakingPrompt": "Retell the story Steve Jobs shared about calligraphy at Reed College in your own words in 90 seconds.",
    "completionCriteria": "Record retelling practice, evaluate linking and rhythm, and save ratings."
  },
  {
    "id": "day-26",
    "day": 26,
    "week": 4,
    "title": "Casual Small Talk & Follow-Up Questions",
    "objective": "Master the relaxed, warm tone of American conversational small talk with natural question intonation.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Casual Conversational Tone",
    "skillCategory": "rhythm",
    "explanation": "American small talk is characterized by friendly pitch range, open vowels, informal contractions ('How's it going?', 'What have you been up to?'), and showing engagement with vocal variety.",
    "articulationGuidance": {
      "jaw": "Relaxed and easy.",
      "lips": "Warm, slight smiling posture helps brighten vowel pitch.",
      "tongue": "Agile and light."
    },
    "commonMistakeWarning": "Monotone or overly formal delivery in social settings, which can sound distant or uninterested.",
    "targetWords": [
      "how's it going",
      "what've you been",
      "sounds great",
      "definitely",
      "by the way",
      "catch up",
      "take care"
    ],
    "minimalPairs": [
      {
        "wordA": "How are you?",
        "wordB": "How're you doing?",
        "focus": "Formal greeting vs relaxed conversational reduction"
      },
      {
        "wordA": "Sounds good.",
        "wordB": "Sounds good?",
        "focus": "Agreement fall vs verification rise"
      }
    ],
    "referenceSentence": "How've you been doing lately? We definitely need to catch up over coffee sometime.",
    "audioManifestId": "audio-day-26",
    "listeningFocus": "Listen to the cheerful, open pitch contour and the relaxed reduction of 'How've you been doing'.",
    "drillInstructions": "Practice saying: 'Sounds great!', 'Definitely!', 'Totally!' with genuine, warm vocal inflection.",
    "shadowingInstructions": "Shadow the reference invitation with friendly, natural American energy.",
    "speakingPrompt": "Imagine running into a colleague or acquaintance you haven't seen in six months. Have a 90-second spontaneous conversation.",
    "completionCriteria": "Record small talk roleplay, rate fluency and natural delivery, and save scorecard."
  },
  {
    "id": "day-27",
    "day": 27,
    "week": 4,
    "title": "Explaining Complex Topics in Simple English",
    "objective": "Break down an advanced subject using clear syllable stress, analogies, and accessible articulation.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Clarity & Syllable Pacing",
    "skillCategory": "rhythm",
    "explanation": "Explaining complex concepts clearly requires crisp syllable timing on technical terms, balanced by relaxed, conversational pacing on connective language. Don't rush through long words.",
    "articulationGuidance": {
      "jaw": "Deliberate movement to articulate multi-syllabic terminology.",
      "lips": "Clean stops and fricatives.",
      "tongue": "Precision placement on R, L, and T phonemes."
    },
    "commonMistakeWarning": "Slurring unstressed syllables in technical words (like 'infrastructure' or 'methodology').",
    "targetWords": [
      "essentially",
      "fundamental",
      "specifically",
      "mechanism",
      "analogy",
      "clarity",
      "concept"
    ],
    "minimalPairs": [
      {
        "wordA": "fund-a-MEN-tal",
        "wordB": "fun-da-MENT-al-ly",
        "focus": "Stress shifts on adverb extension"
      },
      {
        "wordA": "con-CEPT",
        "wordB": "con-cep-tual",
        "focus": "Noun vs adjective syllable count"
      }
    ],
    "referenceSentence": "Essentially, the mechanism works just like a filter, removing unnecessary noise.",
    "audioManifestId": "audio-day-27",
    "listeningFocus": "Notice how the technical word 'mechanism' has crisp internal consonants while the rest flows like water.",
    "drillInstructions": "Tap out the 4 syllables of 'e-ssen-tial-ly' and 3 of 'me-cha-nism' with steady pacing.",
    "shadowingInstructions": "Shadow the sentence maintaining clarity across both technical and conversational words.",
    "speakingPrompt": "Explain a complex concept from your field (e.g. cloud computing, photosynthesis, compound interest) to a 10-year-old in two minutes.",
    "completionCriteria": "Record explanation, assess vowel clarity and word stress, and review recommendations."
  },
  {
    "id": "day-28",
    "day": 28,
    "week": 4,
    "title": "Three-Minute Opinion Monologue",
    "objective": "Deliver a sustained 3-minute persuasive opinion with confident intonation and varied sentence structures.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Sustained Monologue Fluency",
    "skillCategory": "fluency",
    "explanation": "A longer monologue tests vocal stamina and accent consistency. Maintain rhotic R resonance, smooth flap T, and downward statement endings throughout all three minutes.",
    "articulationGuidance": {
      "jaw": "Stay relaxed to prevent throat fatigue.",
      "lips": "Engaged without strain.",
      "tongue": "Keep sides anchored near molars for consistent R resonance."
    },
    "commonMistakeWarning": "Allowing your accent to revert to native habits in minute 2 and 3 as cognitive fatigue sets in.",
    "targetWords": [
      "perspective",
      "fundamentally",
      "evidence",
      "convincing",
      "counterargument",
      "ultimately",
      "worthwhile"
    ],
    "minimalPairs": [
      {
        "wordA": "convincing",
        "wordB": "convinced",
        "focus": "Continuous participle vs past stop"
      },
      {
        "wordA": "ultimately",
        "wordB": "intimately",
        "focus": "Clear initial vowel distinction"
      }
    ],
    "referenceSentence": "Ultimately, the evidence clearly shows that taking thoughtful risks is worth the effort.",
    "audioManifestId": "audio-day-28",
    "listeningFocus": "Hear how strong rhetorical statements end on a powerful, low downward pitch glide.",
    "drillInstructions": "Take a deep breath and deliver: 'In my view... ultimately... the evidence is clear.'",
    "shadowingInstructions": "Shadow the persuasive reference statement with conviction and vocal resonance.",
    "speakingPrompt": "Give a 3-minute opinion on a topic you care about (e.g., remote work vs office, AI in education, or city living vs rural life). Speak for the full 3 minutes.",
    "completionCriteria": "Record full 3-minute monologue, assign all 5 scorecard categories, and review historical trends."
  },
  {
    "id": "day-29",
    "day": 29,
    "week": 4,
    "title": "Persistent Error Targeted Drill",
    "objective": "Review your historical scores to pinpoint and eradicate your top 2-3 most persistent pronunciation errors.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Targeted Error Eradication",
    "skillCategory": "fluency",
    "explanation": "Based on your 4-week scorecard history, your recommendation engine identifies your lowest-rated skills. Today is dedicated to targeted repair drills on those specific phonemes or rhythm patterns.",
    "articulationGuidance": {
      "jaw": "Fine-tune according to your weakest sound category.",
      "lips": "Focus on deliberate target shapes.",
      "tongue": "Strict self-monitoring of tongue placement."
    },
    "commonMistakeWarning": "Skipping sound drills because 'you already know the theory'. Physical muscle memory requires repetitive motor drilling.",
    "targetWords": [
      "really",
      "water",
      "think",
      "photography",
      "wanna",
      "world",
      "comfortable"
    ],
    "minimalPairs": [
      {
        "wordA": "world",
        "wordB": "word",
        "focus": "/\u025c\u02d0rld/ cluster with L and D"
      },
      {
        "wordA": "comfortable",
        "wordB": "comfort",
        "focus": "American 3-syllable reduction /\u02c8k\u028cmft\u0259rb\u0259l/"
      }
    ],
    "referenceSentence": "Practicing the hardest sounds with patience makes every word feel comfortable and natural.",
    "audioManifestId": "audio-day-29",
    "listeningFocus": "Focus exclusively on your personal trouble phoneme as it appears in connected context.",
    "drillInstructions": "Select the sound you rated lowest this month. Drill its minimal pairs 10 times in front of a mirror or while recording.",
    "shadowingInstructions": "Shadow the reference sentence with 100% conscious attention on your target improvement area.",
    "speakingPrompt": "Reflect on how your speaking has changed over the past 29 days: what sounds have become second nature, and what still requires active focus?",
    "completionCriteria": "Complete personalized drills, record reflection attempt, and update scorecard ratings."
  },
  {
    "id": "day-30",
    "day": 30,
    "week": 4,
    "title": "Final 3-Minute Assessment & Day 1 Comparison",
    "objective": "Record your final 3-minute capstone speech, compare it side-by-side with Day 1, and celebrate your progress.",
    "estimatedDurationMinutes": 20,
    "targetSkill": "Capstone Speech & Final Comparison",
    "skillCategory": "fluency",
    "explanation": "Congratulations on reaching Day 30! Today you record a final 3-minute monologue and compare it directly against your Day 1 baseline. Listen for American R resonance, smooth flap T, clear vowel contrasts, and confident rhythm.",
    "articulationGuidance": {
      "jaw": "Naturally relaxed and expressive.",
      "lips": "Clear and confident.",
      "tongue": "Mastery of anchored R and agile flap T placement."
    },
    "commonMistakeWarning": "Do not judge yourself against native perfection. Celebrate the massive leap in clarity, rhythm, and confidence you've built in 30 days.",
    "targetWords": [
      "confidence",
      "curiosity",
      "journey",
      "accomplished",
      "future",
      "difference",
      "perspective"
    ],
    "minimalPairs": [
      {
        "wordA": "Day 1 Baseline",
        "wordB": "Day 30 Capstone",
        "focus": "A/B comparison of natural rhythm, vowel clarity, and confidence"
      }
    ],
    "referenceSentence": "Believing that the dots will connect down the road will give you the confidence to follow your heart, and that will make all the difference.",
    "audioManifestId": "audio-day-30",
    "listeningFocus": "Listen to the inspiring conclusion of Steve Jobs' address. Notice how passion, clarity, and rhythm combine into unforgettable communication.",
    "drillInstructions": "Take a moment to listen back to your Day 1 recording before you start. Notice your starting point.",
    "shadowingInstructions": "Shadow the final reference sentence, letting yourself speak with full conviction.",
    "speakingPrompt": "Deliver your final 3-minute capstone talk: Introduce yourself, share what you've learned on this 30-day journey, and describe your vision for how you will use your voice in the future.",
    "completionCriteria": "Record final 3-minute capstone speech, play back Day 1 vs Day 30 side-by-side, complete final scorecard, and review total challenge stats!"
  }
];

export const getLessonById = (id: string): Lesson | undefined => {
  return CURRICULUM.find(lesson => lesson.id === id);
};

export const getLessonByDay = (day: number): Lesson | undefined => {
  return CURRICULUM.find(lesson => lesson.day === day);
};
