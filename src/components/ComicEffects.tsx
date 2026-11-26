import React from 'react';
import { AmeowzingCat } from './AmeowzingCat';

interface FloatingXpBurstProps {
  show: boolean;
  label?: string;
}

export const FloatingXpBurst: React.FC<FloatingXpBurstProps> = ({
  show,
  label = '+100 XP!',
}) => {
  if (!show) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="animate-xp-rise flex flex-col items-center">
        <div className="comic-panel bg-amber-300 text-slate-950 px-6 py-3 rounded-2xl rotate-[-3deg]">
          <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

interface FlyingAmeowzingProps {
  active: boolean;
}

export const FlyingAmeowzing: React.FC<FlyingAmeowzingProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-20 z-40 overflow-hidden h-44"
      aria-hidden="true"
    >
      <div className="animate-fly-across inline-flex items-center gap-3">
        <div className="w-32 h-32">
          <AmeowzingCat pose="flying" />
        </div>
        <div className="comic-panel-sm bg-amber-300 text-slate-950 px-4 py-1.5 rounded-xl font-display font-extrabold text-lg rotate-[-4deg]">
          MEOW-GNIFICENT!
        </div>
      </div>
    </div>
  );
};

interface CelebrationConfettiProps {
  active: boolean;
}

const CONFETTI_ITEMS = [
  { left: '6%', delay: '0s', duration: '3.2s', color: '#FBBF24' },
  { left: '14%', delay: '0.4s', duration: '3.6s', color: '#3B82F6' },
  { left: '22%', delay: '0.2s', duration: '2.9s', color: '#9333EA' },
  { left: '31%', delay: '0.7s', duration: '3.5s', color: '#10B981' },
  { left: '40%', delay: '0.1s', duration: '3.1s', color: '#F59E0B' },
  { left: '49%', delay: '0.5s', duration: '3.4s', color: '#EC4899' },
  { left: '58%', delay: '0.3s', duration: '2.8s', color: '#60A5FA' },
  { left: '67%', delay: '0.8s', duration: '3.7s', color: '#A855F7' },
  { left: '76%', delay: '0.15s', duration: '3.0s', color: '#FACC15' },
  { left: '85%', delay: '0.6s', duration: '3.3s', color: '#34D399' },
  { left: '93%', delay: '0.35s', duration: '3.1s', color: '#FBBF24' },
];

export const CelebrationConfetti: React.FC<CelebrationConfettiProps> = ({
  active,
}) => {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {CONFETTI_ITEMS.map((item, idx) => (
        <span
          key={idx}
          style={{
            left: item.left,
            backgroundColor: item.color,
            animation: `confetti-fall ${item.duration} linear ${item.delay} infinite`,
          }}
          className="absolute -top-6 w-3.5 h-5 rounded-sm border-2 border-slate-900"
        />
      ))}
    </div>
  );
};
