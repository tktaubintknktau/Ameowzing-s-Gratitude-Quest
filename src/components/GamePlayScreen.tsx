import React, { useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  Heart,
  ArrowRight,
  Award,
  AlertCircle,
} from 'lucide-react';
import {
  QuestQuestion,
  OptionLetter,
  ACHIEVEMENT_BADGES,
  getHighestBadge,
} from '../data/questions';
import { AmeowzingCat, AmeowzingPose } from './AmeowzingCat';
import { FloatingXpBurst, FlyingAmeowzing } from './ComicEffects';

export interface AnsweredRecord {
  questionId: number;
  selected: OptionLetter[];
  isCorrect: boolean;
  xpEarned: number;
}

interface GamePlayScreenProps {
  question: QuestQuestion;
  questionIndex: number;
  totalQuestions: number;
  xp: number;
  selectedOptions: OptionLetter[];
  submittedRecord: AnsweredRecord | null;
  feedbackBannerMessage: string;
  showXpBurst: boolean;
  showFlyingCat: boolean;
  newlyUnlockedBadgeTitle: string | null;
  muted: boolean;
  onToggleMute: () => void;
  onToggleOption: (letter: OptionLetter) => void;
  onSubmit: () => void;
  onContinue: () => void;
}

const BACKDROP_URL = '/src/assets/images/superhero_sky_backdrop_1795691645839.jpg';

export const GamePlayScreen: React.FC<GamePlayScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  xp,
  selectedOptions,
  submittedRecord,
  feedbackBannerMessage,
  showXpBurst,
  showFlyingCat,
  newlyUnlockedBadgeTitle,
  muted,
  onToggleMute,
  onToggleOption,
  onSubmit,
  onContinue,
}) => {
  const isSubmitted = submittedRecord !== null;
  const isMultiSelect = question.requiredSelections === 2;
  const canSubmit =
    !isSubmitted && selectedOptions.length === question.requiredSelections;
  const currentBadge = getHighestBadge(xp);
  const progressPercent = Math.min(100, Math.round((xp / 1000) * 100));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!isSubmitted && canSubmit) {
          e.preventDefault();
          onSubmit();
        } else if (isSubmitted) {
          e.preventDefault();
          onContinue();
        }
        return;
      }

      if (!isSubmitted) {
        const keyMap: Record<string, OptionLetter> = {
          '1': 'A',
          a: 'A',
          A: 'A',
          '2': 'B',
          b: 'B',
          B: 'B',
          '3': 'C',
          c: 'C',
          C: 'C',
          '4': 'D',
          d: 'D',
          D: 'D',
        };
        const mapped = keyMap[e.key];
        if (mapped && question.options.some((opt) => opt.letter === mapped)) {
          e.preventDefault();
          onToggleOption(mapped);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isSubmitted,
    canSubmit,
    onSubmit,
    onContinue,
    onToggleOption,
    question.options,
  ]);

  let amewPose: AmeowzingPose = isMultiSelect ? 'pawUp' : 'companion';
  let speechText = isMultiSelect
    ? 'Careful, hero! Choose TWO super actions for this mission!'
    : 'Read closely and pick the kindest superhero choice!';

  if (isSubmitted && submittedRecord) {
    if (submittedRecord.isCorrect) {
      amewPose = 'excited';
      speechText = feedbackBannerMessage;
    } else {
      amewPose = 'supportive';
      speechText = feedbackBannerMessage;
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-blue-950 flex flex-col">
      {/* Subtle Atmospheric Backdrop */}
      <img
        src={BACKDROP_URL}
        alt="Superhero city skyline backdrop"
        referrerPolicy="no-referrer"
        className="pointer-events-none fixed inset-0 w-full h-full object-cover object-bottom opacity-35"
      />
      <div
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-blue-950/80 via-indigo-950/75 to-violet-950/85"
        aria-hidden="true"
      />

      {/* Celebratory Overlays */}
      <FloatingXpBurst show={showXpBurst} label="+100 XP!" />
      <FlyingAmeowzing active={showFlyingCat} />

      {/* Top HUD Bar */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div className="comic-panel bg-white text-slate-900 rounded-2xl px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Game Identity & Question Counter */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-violet-700">
                GRATITUDE QUEST
              </div>
              <div className="font-display text-lg sm:text-xl font-extrabold text-slate-950 tabular-nums">
                Question {questionIndex + 1} of {totalQuestions}
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleMute}
              className="md:hidden comic-btn bg-slate-100 text-slate-900 px-3 py-2 rounded-xl inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-rose-600" />
              ) : (
                <Volume2 className="w-4 h-4 text-blue-700" />
              )}
              <span>{muted ? 'Muted' : 'Sound'}</span>
            </button>
          </div>

          {/* Center: Animated XP Progress Bar & Badge Milestones */}
          <div className="flex-1 max-w-md w-full">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>
                Rank:{' '}
                <strong className="text-blue-800">
                  {currentBadge ? currentBadge.title : 'Hero in Training'}
                </strong>
              </span>
              <span className="tabular-nums text-slate-600">
                {xp} / 1,000 XP
              </span>
            </div>
            <div className="relative h-5 w-full bg-slate-200 rounded-lg border-2 border-slate-900 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-violet-600 to-amber-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Milestone Ticks at 200, 400, 700 XP */}
              {ACHIEVEMENT_BADGES.slice(0, 3).map((b) => (
                <div
                  key={b.xpRequired}
                  title={`${b.xpRequired} XP: ${b.title}`}
                  style={{ left: `${(b.xpRequired / 1000) * 100}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900/40"
                />
              ))}
            </div>
          </div>

          {/* Right: Prominent XP Plaque + Desktop Mute */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            <div className="comic-panel-sm bg-amber-300 text-slate-950 px-4 py-1.5 rounded-xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-900 shrink-0" />
              <span className="font-display font-extrabold text-lg sm:text-xl tabular-nums whitespace-nowrap">
                {xp} XP
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleMute}
              className="hidden md:inline-flex comic-btn bg-slate-100 hover:bg-slate-200 text-slate-900 px-3 py-2 rounded-xl items-center gap-1.5 text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
            >
              {muted ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600" />
                  <span>Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-blue-700" />
                  <span>On</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Play Stage */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Companion Column: Ameowzing */}
          <aside className="lg:col-span-4 comic-panel bg-gradient-to-b from-blue-600 to-violet-700 text-white rounded-3xl p-5 flex flex-col items-center text-center">
            <div className="comic-panel-sm bg-white text-slate-900 rounded-2xl p-3.5 w-full mb-3">
              <p className="font-display font-bold text-base leading-snug text-blue-950">
                {speechText}
              </p>
            </div>

            <div className="w-44 h-44 sm:w-52 sm:h-52 my-1">
              <AmeowzingCat pose={amewPose} />
            </div>

            <div className="mt-1 font-display font-extrabold text-lg text-amber-300 tracking-wide">
              AMEOWZING
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              Kindness is your greatest superpower!
            </p>
          </aside>

          {/* Question & Answer Challenge Card */}
          <section className="lg:col-span-8 comic-panel bg-white text-slate-900 rounded-3xl p-5 sm:p-7 comic-halftone">
            {/* Mission Title */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-slate-200">
              <span className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wide text-blue-800">
                Mission {question.id} · {question.title}
              </span>
              {isMultiSelect ? (
                <span className="font-bold text-xs sm:text-sm text-violet-800 bg-violet-100 border-2 border-violet-700 px-3 py-1 rounded-lg tabular-nums">
                  Select TWO answers ({selectedOptions.length}/2 selected)
                </span>
              ) : (
                <span className="font-bold text-xs sm:text-sm text-slate-600">
                  Choose ONE answer
                </span>
              )}
            </div>

            {/* Question Prompt */}
            <h2 className="mt-4 font-display text-xl sm:text-2xl lg:text-[26px] font-extrabold text-slate-950 leading-snug text-balance">
              {question.prompt}
            </h2>

            {/* Answer Buttons */}
            <div className="mt-5 grid grid-cols-1 gap-3">
              {question.options.map((option) => {
                const isSelected = selectedOptions.includes(option.letter);
                const isCorrectOption = question.correctAnswers.includes(
                  option.letter
                );

                let cardStyle =
                  'bg-white hover:bg-blue-50 text-slate-900 border-slate-900';
                let letterStyle = 'bg-blue-700 text-white';
                let statusTag: React.ReactNode = null;

                if (!isSubmitted) {
                  if (isSelected) {
                    cardStyle =
                      'bg-amber-200 text-slate-950 border-slate-950 ring-2 ring-blue-700';
                    letterStyle = 'bg-slate-950 text-amber-300';
                    statusTag = (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-950 whitespace-nowrap shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        Selected
                      </span>
                    );
                  }
                } else {
                  if (isCorrectOption) {
                    cardStyle =
                      'bg-emerald-100 text-emerald-950 border-emerald-700';
                    letterStyle = 'bg-emerald-600 text-white';
                    statusTag = (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-900 whitespace-nowrap shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        Correct answer
                      </span>
                    );
                  } else if (isSelected && !isCorrectOption) {
                    cardStyle = 'bg-rose-100 text-rose-950 border-rose-600';
                    letterStyle = 'bg-rose-600 text-white';
                    statusTag = (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-900 whitespace-nowrap shrink-0">
                        <AlertCircle className="w-4 h-4 text-rose-700" />
                        Your pick
                      </span>
                    );
                  } else {
                    cardStyle = 'bg-slate-100 text-slate-500 border-slate-300';
                    letterStyle = 'bg-slate-400 text-white';
                  }
                }

                return (
                  <button
                    key={option.letter}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => onToggleOption(option.letter)}
                    className={`comic-btn w-full text-left rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default disabled:transform-none disabled:shadow-[2px_2px_0px_#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-slate-900 font-display font-extrabold text-lg flex items-center justify-center shrink-0 ${letterStyle}`}
                      >
                        {option.letter}
                      </span>
                      <span className="font-semibold text-base sm:text-lg leading-snug">
                        {option.text}
                      </span>
                    </div>
                    {statusTag}
                  </button>
                );
              })}
            </div>

            {/* Submit Button (Screen 2) */}
            {!isSubmitted && (
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  {isMultiSelect
                    ? selectedOptions.length < 2
                      ? `Pick ${2 - selectedOptions.length} more answer${
                          2 - selectedOptions.length === 1 ? '' : 's'
                        } to submit`
                      : '2 answers ready! Click Submit Answer!'
                    : selectedOptions.length === 1
                    ? 'Ready! Click Submit Answer or press Enter'
                    : 'Choose an option above (keys A-D or 1-4)'}
                </span>

                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={onSubmit}
                  className={`comic-btn px-7 py-3.5 rounded-2xl font-display font-extrabold text-lg inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
                    canSubmit
                      ? 'bg-amber-300 hover:bg-amber-200 text-slate-950 cursor-pointer'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-75'
                  }`}
                >
                  <span>SUBMIT ANSWER</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Answer Feedback Panel (Screen 3) */}
            {isSubmitted && submittedRecord && (
              <div
                className={`mt-6 animate-burst-pop rounded-2xl border-3 border-slate-900 p-5 ${
                  submittedRecord.isCorrect
                    ? 'bg-emerald-50'
                    : 'bg-amber-50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {submittedRecord.isCorrect ? (
                      <Sparkles className="w-6 h-6 text-emerald-700 shrink-0" />
                    ) : (
                      <Heart className="w-6 h-6 text-rose-600 fill-rose-500 shrink-0" />
                    )}
                    <h3
                      className={`font-display text-xl sm:text-2xl font-extrabold ${
                        submittedRecord.isCorrect
                          ? 'text-emerald-900'
                          : 'text-blue-950'
                      }`}
                    >
                      {feedbackBannerMessage}
                    </h3>
                  </div>

                  <span
                    className={`comic-panel-sm px-3.5 py-1 rounded-xl font-display font-extrabold text-base tabular-nums whitespace-nowrap shrink-0 ${
                      submittedRecord.isCorrect
                        ? 'bg-amber-300 text-slate-950'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    +{submittedRecord.xpEarned} XP
                  </span>
                </div>

                {/* Specific Incorrect Answer Explanation(s) */}
                {!submittedRecord.isCorrect && (
                  <div className="mt-3 space-y-2 bg-white border-2 border-rose-300 rounded-xl p-3.5">
                    {submittedRecord.selected
                      .filter(
                        (letter) => !question.correctAnswers.includes(letter)
                      )
                      .map((wrongLetter) => (
                        <p
                          key={wrongLetter}
                          className="text-sm sm:text-base text-rose-900 font-medium leading-relaxed"
                        >
                          <strong className="font-extrabold">
                            Why Option {wrongLetter} is not the best choice:
                          </strong>{' '}
                          {question.incorrectFeedback[wrongLetter]}
                        </p>
                      ))}
                    {isMultiSelect &&
                      submittedRecord.selected.some((l) =>
                        question.correctAnswers.includes(l)
                      ) &&
                      submittedRecord.selected.every((l) =>
                        question.correctAnswers.includes(l)
                      ) === false && (
                        <p className="text-sm text-emerald-800 font-semibold">
                          Good catch spotting one of the right actions! Both{' '}
                          {question.correctAnswers.join(' and ')} are needed for
                          this mission.
                        </p>
                      )}
                  </div>
                )}

                {/* Moral Explanation of the Correct Answer */}
                <div className="mt-3 bg-white border-2 border-slate-900/15 rounded-xl p-3.5">
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                    <strong className="font-extrabold text-blue-900">
                      Hero Lesson ({question.correctAnswers.join(' & ')}):
                    </strong>{' '}
                    {question.explanation}
                  </p>
                </div>

                {/* Newly Unlocked Achievement Badge Notification */}
                {newlyUnlockedBadgeTitle && (
                  <div className="mt-3 comic-panel-sm bg-gradient-to-r from-amber-300 to-yellow-200 text-slate-950 rounded-xl p-3.5 flex items-center gap-3">
                    <Award className="w-7 h-7 text-blue-900 shrink-0" />
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-blue-900">
                        New Achievement Badge Unlocked!
                      </div>
                      <div className="font-display font-extrabold text-lg">
                        {newlyUnlockedBadgeTitle}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={onContinue}
                    className="comic-btn bg-blue-700 hover:bg-blue-600 text-white font-display font-extrabold text-lg px-7 py-3.5 rounded-2xl inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                  >
                    <span>
                      {questionIndex + 1 === totalQuestions
                        ? 'SEE FINAL RESULTS'
                        : 'CONTINUE'}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};
