import { RecommendationResult, RecommendationResource, ScoreRating, SkillCategory, LessonProgress } from '../types';
import { RESOURCE_MAPPINGS } from '../data/resourceMappings';
import { getAllProgress, getSessionCount } from './storage';

export const SKILL_LABELS: Record<SkillCategory, string> = {
  american_r: 'American R',
  vowels: 'Vowel Clarity',
  t_th: 'T and TH Accuracy',
  rhythm: 'Word Stress & Rhythm',
  fluency: 'Fluency & Natural Delivery',
};

export const getSkillAverages = (
  allProgress: Record<string, LessonProgress>
): Record<SkillCategory, { avg: number | null; count: number; latest: number | null; history: number[] }> => {
  const categories: SkillCategory[] = ['american_r', 'vowels', 't_th', 'rhythm', 'fluency'];
  const result: Record<SkillCategory, { avg: number | null; count: number; latest: number | null; history: number[] }> = {
    american_r: { avg: null, count: 0, latest: null, history: [] },
    vowels: { avg: null, count: 0, latest: null, history: [] },
    t_th: { avg: null, count: 0, latest: null, history: [] },
    rhythm: { avg: null, count: 0, latest: null, history: [] },
    fluency: { avg: null, count: 0, latest: null, history: [] },
  };

  // Sort lessons chronologically by day
  const sortedLessons = Object.values(allProgress).sort((a, b) => {
    const dayA = parseInt(a.lessonId.replace('day-', ''), 10) || 0;
    const dayB = parseInt(b.lessonId.replace('day-', ''), 10) || 0;
    return dayA - dayB;
  });

  for (const prog of sortedLessons) {
    for (const cat of categories) {
      const val = prog.ratings?.[cat];
      if (typeof val === 'number' && val >= 1 && val <= 5) {
        result[cat].history.push(val);
        result[cat].latest = val;
      }
    }
  }

  for (const cat of categories) {
    const history = result[cat].history;
    if (history.length > 0) {
      const sum = history.reduce((acc, curr) => acc + curr, 0);
      result[cat].avg = Math.round((sum / history.length) * 10) / 10;
      result[cat].count = history.length;
    }
  }

  return result;
};

export const generateRecommendation = (
  currentLessonSkillCategory?: SkillCategory,
  currentRatings?: Record<SkillCategory, ScoreRating>
): RecommendationResult => {
  const allProgress = getAllProgress();
  const skillStats = getSkillAverages(allProgress);

  // If current ratings were just submitted in the lesson, merge them into latest consideration
  if (currentRatings) {
    for (const cat of Object.keys(currentRatings) as SkillCategory[]) {
      const val = currentRatings[cat];
      if (typeof val === 'number') {
        skillStats[cat].latest = val;
        if (!skillStats[cat].history.includes(val)) {
          skillStats[cat].history.push(val);
        }
      }
    }
  }

  // Filter skills that have been assessed
  const assessedSkills: { category: SkillCategory; score: number; count: number }[] = [];
  const unassessedSkills: SkillCategory[] = [];

  const categories: SkillCategory[] = ['american_r', 'vowels', 't_th', 'rhythm', 'fluency'];

  for (const cat of categories) {
    const stats = skillStats[cat];
    // Use latest score if available, or average
    const score = stats.latest !== null ? stats.latest : stats.avg;
    if (score !== null) {
      assessedSkills.push({ category: cat, score, count: stats.count });
    } else {
      unassessedSkills.push(cat);
    }
  }

  // Rule 8: If all skills are unassessed, recommend baseline assessment
  if (assessedSkills.length === 0) {
    const fallbackRes = RESOURCE_MAPPINGS.find(r => r.skillCategory === 'fluency') || RESOURCE_MAPPINGS[0];
    return {
      primary: fallbackRes,
      targetSkill: 'fluency',
      skillName: 'Baseline Speech Fluency',
      lowestRating: null,
      explanation: 'No pronunciation skills assessed yet. Complete your Day 1 baseline introduction to establish your starting scores.',
    };
  }

  // Rule 1: Find lowest assessed score
  assessedSkills.sort((a, b) => a.score - b.score);
  const minScore = assessedSkills[0].score;
  const lowestGroup = assessedSkills.filter(s => s.score === minScore);

  let chosenCategory: SkillCategory;

  // Rule 4: Prefer current lesson's target skill if it is among the lowest
  if (currentLessonSkillCategory && lowestGroup.some(s => s.category === currentLessonSkillCategory)) {
    chosenCategory = currentLessonSkillCategory;
  } else if (lowestGroup.length > 1) {
    // Rule 3: Tie-breaking: rotate fairly among tied skills based on session count
    const sessionCount = getSessionCount();
    const index = sessionCount % lowestGroup.length;
    chosenCategory = lowestGroup[index].category;
  } else {
    chosenCategory = lowestGroup[0].category;
  }

  // Fetch curated resources for chosen category
  const matchingResources = RESOURCE_MAPPINGS.filter(r => r.skillCategory === chosenCategory);
  const primaryResource = matchingResources[0] || RESOURCE_MAPPINGS[0];
  const alternativeResource = matchingResources.length > 1 ? matchingResources[1] : undefined;

  // Rule 5: Highlight historical improvement if any
  const history = skillStats[chosenCategory].history;
  let historicalTrend: string | undefined = undefined;
  if (history.length >= 2) {
    const first = history[0];
    const latest = history[history.length - 1];
    if (latest > first) {
      historicalTrend = `Your ${SKILL_LABELS[chosenCategory]} rating improved from ${first}/5 to ${latest}/5 over past sessions. Keep building consistency!`;
    } else if (latest === first) {
      historicalTrend = `You've maintained a steady ${latest}/5 in ${SKILL_LABELS[chosenCategory]}. Focus on the micro-adjustments below.`;
    }
  }

  // Compose user-friendly explanation
  const skillName = SKILL_LABELS[chosenCategory];
  const explanation = `Your ${skillName} score is currently your lowest assessed rating (${minScore}/5). Spending five focused minutes on this target sound will yield the fastest noticeable improvement in your overall accent.`;

  return {
    primary: primaryResource,
    alternative: alternativeResource,
    targetSkill: chosenCategory,
    skillName,
    lowestRating: minScore,
    explanation,
    historicalTrend,
  };
};
