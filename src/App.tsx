/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  QUEST_QUESTIONS,
  CORRECT_MESSAGES,
  ENCOURAGEMENT_MESSAGES,
  OptionLetter,
  getHighestBadge,
} from './data/questions';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GamePlayScreen, AnsweredRecord } from './components/GamePlayScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { soundEngine } from './utils/sound';

type ScreenState = 'WELCOME' | 'PLAYING' | 'RESULTS';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('WELCOME');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<OptionLetter[]>([]);
  const [records, setRecords] = useState<AnsweredRecord[]>([]);
  const [feedbackBannerMessage, setFeedbackBannerMessage] = useState('');
  const [showXpBurst, setShowXpBurst] = useState(false);
  const [showFlyingCat, setShowFlyingCat] = useState(false);
  const [newlyUnlockedBadgeTitle, setNewlyUnlockedBadgeTitle] = useState<
    string | null
  >(null);
  const [muted, setMuted] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const currentQuestion = QUEST_QUESTIONS[questionIndex];
  const currentRecord =
    records.find((r) => r.questionId === currentQuestion?.id) ?? null;

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      soundEngine.setMuted(next);
      return next;
    });
  }, []);

  const handleStartGame = useCallback(() => {
    clearTimers();
    setQuestionIndex(0);
    setXp(0);
    setSelectedOptions([]);
    setRecords([]);
    setFeedbackBannerMessage('');
    setShowXpBurst(false);
    setShowFlyingCat(false);
    setNewlyUnlockedBadgeTitle(null);
    setScreen('PLAYING');
    soundEngine.playHeroEntrance();
  }, [clearTimers]);

  const handleToggleOption = useCallback(
    (letter: OptionLetter) => {
      // Lock selection once the question has been submitted
      if (currentRecord !== null || !currentQuestion) return;

      soundEngine.playSelect();

      setSelectedOptions((prev) => {
        if (currentQuestion.requiredSelections === 1) {
          return [letter];
        }
        // Two-answer selection (Questions 3 and 10)
        if (prev.includes(letter)) {
          return prev.filter((item) => item !== letter);
        }
        if (prev.length >= 2) {
          // Replace the earliest choice so kids never feel stuck
          return [prev[1], letter];
        }
        return [...prev, letter];
      });
    },
    [currentQuestion, currentRecord]
  );

  const handleSubmit = useCallback(() => {
    if (!currentQuestion) return;
    // Prevent repeated XP rewards for the same question
    if (records.some((r) => r.questionId === currentQuestion.id)) return;
    if (selectedOptions.length !== currentQuestion.requiredSelections) return;

    const sortedSelected = [...selectedOptions].sort();
    const sortedCorrect = [...currentQuestion.correctAnswers].sort();
    const isCorrect =
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((val, idx) => val === sortedCorrect[idx]);

    const xpEarned = isCorrect ? 100 : 0;
    const prevBadge = getHighestBadge(xp);
    const nextXp = xp + xpEarned;
    const nextBadge = getHighestBadge(nextXp);

    const unlockedNewBadge =
      nextBadge && (!prevBadge || nextBadge.xpRequired > prevBadge.xpRequired)
        ? nextBadge.title
        : null;

    setXp(nextXp);
    setRecords((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: selectedOptions,
        isCorrect,
        xpEarned,
      },
    ]);
    setNewlyUnlockedBadgeTitle(unlockedNewBadge);

    if (isCorrect) {
      const msg =
        CORRECT_MESSAGES[questionIndex % CORRECT_MESSAGES.length];
      setFeedbackBannerMessage(msg);
      setShowXpBurst(true);

      // Show flying Ameowzing fly-by on even-indexed correct questions or badge unlocks
      if (questionIndex % 2 === 1 || unlockedNewBadge) {
        setShowFlyingCat(true);
        const flyTimer = window.setTimeout(
          () => setShowFlyingCat(false),
          2200
        );
        timersRef.current.push(flyTimer);
      }

      const burstTimer = window.setTimeout(() => setShowXpBurst(false), 1650);
      timersRef.current.push(burstTimer);

      if (unlockedNewBadge) {
        soundEngine.playBadgeUnlock();
      } else {
        soundEngine.playCorrect();
      }
    } else {
      const msg =
        ENCOURAGEMENT_MESSAGES[questionIndex % ENCOURAGEMENT_MESSAGES.length];
      setFeedbackBannerMessage(msg);
      soundEngine.playIncorrect();
    }
  }, [currentQuestion, questionIndex, records, selectedOptions, xp]);

  const handleContinue = useCallback(() => {
    clearTimers();
    setShowXpBurst(false);
    setShowFlyingCat(false);
    setNewlyUnlockedBadgeTitle(null);
    setFeedbackBannerMessage('');
    setSelectedOptions([]);

    if (questionIndex + 1 < QUEST_QUESTIONS.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setScreen('RESULTS');
      soundEngine.playVictory();
    }
  }, [clearTimers, questionIndex]);

  if (screen === 'WELCOME') {
    return (
      <WelcomeScreen
        onStart={handleStartGame}
        muted={muted}
        onToggleMute={handleToggleMute}
      />
    );
  }

  if (screen === 'PLAYING' && currentQuestion) {
    return (
      <GamePlayScreen
        question={currentQuestion}
        questionIndex={questionIndex}
        totalQuestions={QUEST_QUESTIONS.length}
        xp={xp}
        selectedOptions={selectedOptions}
        submittedRecord={currentRecord}
        feedbackBannerMessage={feedbackBannerMessage}
        showXpBurst={showXpBurst}
        showFlyingCat={showFlyingCat}
        newlyUnlockedBadgeTitle={newlyUnlockedBadgeTitle}
        muted={muted}
        onToggleMute={handleToggleMute}
        onToggleOption={handleToggleOption}
        onSubmit={handleSubmit}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <ResultsScreen
      xp={xp}
      records={records}
      muted={muted}
      onToggleMute={handleToggleMute}
      onPlayAgain={handleStartGame}
    />
  );
}
