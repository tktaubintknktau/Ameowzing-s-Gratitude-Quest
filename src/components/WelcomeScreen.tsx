import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Star, Shield, Award } from 'lucide-react';
import { AmeowzingCat } from './AmeowzingCat';
import { ACHIEVEMENT_BADGES } from '../data/questions';

interface WelcomeScreenProps {
  onStart: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

const BACKDROP_URL = '/src/assets/images/superhero_sky_backdrop_1795691645839.jpg';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  muted,
  onToggleMute,
}) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== 'BUTTON') {
          e.preventDefault();
          onStart();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStart]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-700 via-blue-600 to-amber-200 flex flex-col justify-between">
      {/* Illustrated Superhero Skyline Backdrop */}
      <img
        src={BACKDROP_URL}
        alt="Bright comic-book superhero town and school at sunrise"
        referrerPolicy="no-referrer"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-bottom"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-950/65 via-blue-900/40 to-amber-950/55"
        aria-hidden="true"
      />

      {/* Minimal Top Utility Bar (Mute Control Only) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 flex items-center justify-between">
        <div className="comic-panel-sm bg-amber-300 text-slate-950 px-3.5 py-1.5 rounded-xl font-display font-extrabold text-sm tracking-wide">
          KSSR UNIT 2 · APPRECIATING OTHERS
        </div>

        <button
          type="button"
          onClick={onToggleMute}
          className="comic-btn bg-white text-slate-900 px-3.5 py-2 rounded-xl inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
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
      </div>

      {/* Center Hero Arena */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title Lockup, Core Message & Start CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-amber-300 comic-text-shadow leading-[1.02] text-balance">
              GRATITUDE QUEST
            </h1>
            <p className="mt-3 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white comic-text-shadow-sm text-balance max-w-xl">
              Become a Hero Through Kindness and Appreciation!
            </p>

            {/* Superhero Identity Banner */}
            <div className="mt-5 comic-panel bg-white/95 text-slate-900 rounded-2xl p-4 sm:p-5 max-w-xl">
              <p className="font-display font-bold text-base sm:text-lg text-blue-900 leading-snug">
                &ldquo;A TRUE SUPERHERO DOESN&apos;T NEED SUPERPOWERS. A TRUE
                SUPERHERO SHOWS KINDNESS, GRATITUDE AND APPRECIATION!&rdquo;
              </p>
            </div>

            {/* How to Earn XP Panel */}
            <div className="mt-5 comic-panel bg-slate-900/90 text-white rounded-2xl p-4 sm:p-5 w-full max-w-xl">
              <h2 className="font-display text-lg font-bold text-amber-300 mb-3">
                How to Earn XP &amp; Superhero Badges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-blue-800/80 border-2 border-blue-400/50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300 shrink-0" />
                    <span>10 Missions</span>
                  </div>
                  <p className="text-blue-100 leading-snug">
                    Read each story and choose the kindest superhero action.
                  </p>
                </div>

                <div className="bg-violet-800/80 border-2 border-violet-400/50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                    <Shield className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>+100 XP Each</span>
                  </div>
                  <p className="text-violet-100 leading-snug">
                    Earn 100 XP per mission up to 1,000 XP total!
                  </p>
                </div>

                <div className="bg-blue-900/80 border-2 border-amber-400/50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                    <Award className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>4 Hero Ranks</span>
                  </div>
                  <p className="text-blue-100 leading-snug">
                    Unlock badges at 200, 400, 700 and 1,000 XP.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-amber-200 font-medium">
                {ACHIEVEMENT_BADGES.map((b, i) => (
                  <span key={b.title} className="tabular-nums">
                    {b.xpRequired} XP: {b.title}
                    {i < ACHIEVEMENT_BADGES.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Start Action */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="button"
                onClick={onStart}
                className="comic-btn bg-amber-300 hover:bg-amber-200 text-slate-950 font-display font-extrabold text-xl sm:text-2xl px-8 py-4 rounded-2xl inline-flex items-center justify-center gap-3 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Play className="w-6 h-6 fill-slate-950" />
                <span>START GAME</span>
              </button>
              <span className="text-sm font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                Click Start or press Enter to begin
              </span>
            </div>
          </div>

          {/* Right Column: Ameowzing Superhero Entrance */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className={`relative flex flex-col items-center transition-all duration-700 ease-out ${
                entered
                  ? 'translate-y-0 scale-100 opacity-100'
                  : '-translate-y-16 scale-75 opacity-0'
              }`}
            >
              {/* Comic Starburst Behind Ameowzing */}
              <div
                className="absolute inset-0 -z-10 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-amber-300/30 blur-2xl" />
              </div>

              {/* Speech Bubble */}
              <div className="comic-panel bg-white text-slate-900 rounded-2xl px-5 py-3 mb-2 max-w-xs text-center relative">
                <p className="font-display font-bold text-base sm:text-lg text-blue-900">
                  &ldquo;Meow! Ready to unlock your superpower of appreciation?&rdquo;
                </p>
              </div>

              {/* Ameowzing Hero Pose */}
              <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                <AmeowzingCat pose="hero" />
              </div>

              <div className="comic-panel-sm bg-violet-700 text-amber-300 px-5 py-1.5 rounded-xl font-display font-extrabold text-base sm:text-lg tracking-wide -mt-3">
                AMEOWZING · SUPERHERO OF KINDNESS
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
