import React, { useState } from 'react';
import {
  RotateCcw,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  Volume2,
  VolumeX,
  ArrowLeft,
  Star,
} from 'lucide-react';
import {
  ACHIEVEMENT_BADGES,
  QUEST_QUESTIONS,
  getHighestBadge,
  getPerformanceMessage,
} from '../data/questions';
import { AnsweredRecord } from './GamePlayScreen';
import { AmeowzingCat } from './AmeowzingCat';
import { CelebrationConfetti } from './ComicEffects';

interface ResultsScreenProps {
  xp: number;
  records: AnsweredRecord[];
  muted: boolean;
  onToggleMute: () => void;
  onPlayAgain: () => void;
}

const BACKDROP_URL = '/src/assets/images/superhero_sky_backdrop_1795691645839.jpg';

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  xp,
  records,
  muted,
  onToggleMute,
  onPlayAgain,
}) => {
  const [reviewing, setReviewing] = useState(false);

  const correctCount = records.filter((r) => r.isCorrect).length;
  const incorrectCount = records.length - correctCount;
  const highestBadge = getHighestBadge(xp);
  const performanceMsg = getPerformanceMessage(xp);

  return (
    <div className="relative min-h-screen w-full bg-blue-950 flex flex-col">
      <img
        src={BACKDROP_URL}
        alt="Superhero town celebration sky"
        referrerPolicy="no-referrer"
        className="pointer-events-none fixed inset-0 w-full h-full object-cover object-bottom opacity-35"
      />
      <div
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-blue-950/75 via-violet-950/75 to-indigo-950/90"
        aria-hidden="true"
      />

      <CelebrationConfetti active={!reviewing && xp >= 200} />

      {/* Top Utility Row */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 flex items-center justify-between">
        <div className="comic-panel-sm bg-amber-300 text-slate-950 px-4 py-1.5 rounded-xl font-display font-extrabold text-sm sm:text-base">
          GRATITUDE QUEST · MISSION COMPLETE
        </div>
        <button
          type="button"
          onClick={onToggleMute}
          className="comic-btn bg-white text-slate-900 px-3.5 py-2 rounded-xl inline-flex items-center gap-2 text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
          aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
        >
          {muted ? (
            <>
              <VolumeX className="w-4 h-4 text-rose-600" />
              <span>Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-blue-700" />
              <span>Sound On</span>
            </>
          )}
        </button>
      </header>

      <main className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex-1 flex items-center">
        {!reviewing ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Large Celebratory Ameowzing */}
            <div className="lg:col-span-5 comic-panel bg-gradient-to-b from-blue-600 to-violet-700 text-white rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="comic-panel-sm bg-amber-300 text-slate-950 px-4 py-1.5 rounded-xl font-display font-extrabold text-sm sm:text-base mb-2">
                Kindness is your greatest superpower!
              </div>

              <div className="w-56 h-56 sm:w-64 sm:h-64 my-1">
                <AmeowzingCat pose="celebrating" />
              </div>

              <div className="font-display text-2xl font-extrabold text-amber-300">
                AMEOWZING
              </div>
              <p className="mt-1 text-sm text-blue-100 max-w-xs">
                GRATITUDE QUEST: UNLOCK YOUR SUPERPOWER OF APPRECIATION!
              </p>
            </div>

            {/* Right: Final Score, Performance & Badges */}
            <section className="lg:col-span-7 comic-panel bg-white text-slate-900 rounded-3xl p-6 sm:p-8 comic-halftone">
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 text-balance">
                {performanceMsg}
              </h1>

              {/* Score Breakdown Grid */}
              <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="comic-panel-sm bg-amber-300 text-slate-950 rounded-2xl p-3.5 text-center">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                    Total XP
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums mt-0.5">
                    {xp}
                    <span className="text-sm sm:text-base font-bold text-slate-700">
                      /1,000
                    </span>
                  </div>
                </div>

                <div className="comic-panel-sm bg-emerald-100 text-emerald-950 rounded-2xl p-3.5 text-center">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">
                    Correct
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums mt-0.5">
                    {correctCount}
                  </div>
                </div>

                <div className="comic-panel-sm bg-rose-100 text-rose-950 rounded-2xl p-3.5 text-center">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-rose-800">
                    Needs Practice
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums mt-0.5">
                    {incorrectCount}
                  </div>
                </div>
              </div>

              {/* Highest Achievement Badge Earned */}
              <div className="mt-5 comic-panel-sm bg-blue-900 text-white rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-300 border-2 border-slate-950 flex items-center justify-center shrink-0">
                  <Award className="w-8 h-8 text-slate-950" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                    Achievement Badge Earned
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-extrabold">
                    {highestBadge
                      ? highestBadge.title
                      : 'Kindness Apprentice (Keep Going!)'}
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100">
                    {highestBadge
                      ? highestBadge.subtitle
                      : 'Reach 200 XP on your next run to unlock Kindness Rookie!'}
                  </p>
                </div>
              </div>

              {/* All 4 Superhero Badges Shelf */}
              <div className="mt-5">
                <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-600 mb-2.5">
                  Superhero Badge Ladder
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ACHIEVEMENT_BADGES.map((badge) => {
                    const unlocked = xp >= badge.xpRequired;
                    return (
                      <div
                        key={badge.title}
                        className={`rounded-xl border-2 p-2.5 text-center transition-colors ${
                          unlocked
                            ? `${badge.colorClass} border-slate-900`
                            : 'bg-slate-100 text-slate-400 border-slate-300'
                        }`}
                      >
                        <Star
                          className={`w-5 h-5 mx-auto mb-1 ${
                            unlocked ? 'fill-current' : 'opacity-40'
                          }`}
                        />
                        <div className="font-display font-extrabold text-xs leading-tight">
                          {badge.title}
                        </div>
                        <div className="text-[11px] font-bold tabular-nums mt-0.5 opacity-90">
                          {badge.xpRequired} XP
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onPlayAgain}
                  className="comic-btn bg-amber-300 hover:bg-amber-200 text-slate-950 font-display font-extrabold text-lg px-6 py-3.5 rounded-2xl inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>PLAY AGAIN</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReviewing(true)}
                  className="comic-btn bg-blue-700 hover:bg-blue-600 text-white font-display font-extrabold text-lg px-6 py-3.5 rounded-2xl inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>REVIEW ANSWERS</span>
                </button>
              </div>
            </section>
          </div>
        ) : (
          /* Review Answers View */
          <section className="w-full comic-panel bg-white text-slate-900 rounded-3xl p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Mission Review · Your 10 Answers
                </h1>
                <p className="text-sm text-slate-600 mt-0.5">
                  A true superhero learns from every kindness mission!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReviewing(false)}
                  className="comic-btn bg-slate-100 hover:bg-slate-200 text-slate-900 font-display font-bold text-sm sm:text-base px-4 py-2.5 rounded-xl inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Results</span>
                </button>
                <button
                  type="button"
                  onClick={onPlayAgain}
                  className="comic-btn bg-amber-300 hover:bg-amber-200 text-slate-950 font-display font-extrabold text-sm sm:text-base px-4 py-2.5 rounded-xl inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>PLAY AGAIN</span>
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-4 max-h-[68vh] overflow-y-auto pr-1">
              {QUEST_QUESTIONS.map((q) => {
                const record = records.find((r) => r.questionId === q.id);
                const selectedLetters = record ? record.selected : [];
                const isCorrect = record ? record.isCorrect : false;

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border-2 p-4 sm:p-5 ${
                      isCorrect
                        ? 'bg-emerald-50/70 border-emerald-600'
                        : 'bg-amber-50/70 border-amber-500'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display font-extrabold text-sm text-blue-900">
                        Question {q.id}: {q.title}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-1 rounded-lg border ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-600'
                            : 'bg-rose-100 text-rose-900 border-rose-500'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>+100 XP · Correct</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>+0 XP · Learned together</span>
                          </>
                        )}
                      </span>
                    </div>

                    <p className="mt-2 font-bold text-slate-950 text-base">
                      {q.prompt}
                    </p>

                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="bg-white border border-slate-300 rounded-xl p-2.5">
                        <span className="font-bold text-slate-600 block text-xs">
                          Your Answer:
                        </span>
                        <span className="font-semibold text-slate-900">
                          {selectedLetters
                            .map((l) => {
                              const opt = q.options.find((o) => o.letter === l);
                              return `${l}. ${opt?.text ?? ''}`;
                            })
                            .join(' | ')}
                        </span>
                      </div>

                      <div className="bg-white border border-emerald-400 rounded-xl p-2.5">
                        <span className="font-bold text-emerald-800 block text-xs">
                          Correct Answer:
                        </span>
                        <span className="font-semibold text-emerald-950">
                          {q.correctAnswers
                            .map((l) => {
                              const opt = q.options.find((o) => o.letter === l);
                              return `${l}. ${opt?.text ?? ''}`;
                            })
                            .join(' | ')}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2.5 text-sm text-slate-700 leading-relaxed">
                      <strong className="text-blue-900">Explanation:</strong>{' '}
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
