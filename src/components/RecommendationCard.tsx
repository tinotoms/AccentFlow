import React, { useState } from 'react';
import { RecommendationResult, RecommendationResource } from '../types';
import { Sparkles, ExternalLink, BookOpen, RefreshCw } from './Icons';

interface RecommendationCardProps {
  recommendation: RecommendationResult;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const [showAlt, setShowAlt] = useState(false);

  const activeRes: RecommendationResource =
    showAlt && recommendation.alternative ? recommendation.alternative : recommendation.primary;

  return (
    <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wider">
              Targeted Recommendation
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Deterministic rule engine • Powered by your self-ratings
            </span>
          </div>
        </div>

        {recommendation.alternative && (
          <button
            type="button"
            onClick={() => setShowAlt(!showAlt)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
          >
            <RefreshCw size={12} />
            {showAlt ? 'Show Primary' : 'Alternative'}
          </button>
        )}
      </div>

      {/* Rationale explanation */}
      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {recommendation.explanation}
      </p>

      {/* Historical Trend Note if improved */}
      {recommendation.historicalTrend && (
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
          🌱 <span className="font-semibold">{recommendation.historicalTrend}</span>
        </div>
      )}

      {/* Resource Box */}
      <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {activeRes.provider}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Verified Learning Resource
              </span>
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
              {activeRes.title}
            </h5>
          </div>

          <a
            href={activeRes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shrink-0 transition-colors shadow-xs"
          >
            Explore <ExternalLink size={12} />
          </a>
        </div>

        {/* Search Guidance */}
        <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
          <span className="font-medium text-slate-700 dark:text-slate-300">Recommended Topic Search:</span>{' '}
          <span className="font-mono text-accent-700 dark:text-accent-300">{activeRes.searchTopic}</span>
        </div>

        {/* Immediate 5-minute practice activity */}
        <div className="text-xs space-y-1">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <BookOpen size={14} className="text-indigo-600 dark:text-indigo-400" />
            Immediate 5-Minute Practice Action:
          </div>
          <p className="text-slate-600 dark:text-slate-400 pl-5 leading-relaxed">
            {activeRes.practiceActivity}
          </p>
        </div>
      </div>
    </div>
  );
};
