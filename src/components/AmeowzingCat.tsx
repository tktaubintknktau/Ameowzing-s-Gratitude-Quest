import React from 'react';

export type AmeowzingPose =
  | 'hero'
  | 'companion'
  | 'pawUp'
  | 'excited'
  | 'flying'
  | 'supportive'
  | 'celebrating';

interface AmeowzingCatProps {
  pose: AmeowzingPose;
  className?: string;
}

export const AmeowzingCat: React.FC<AmeowzingCatProps> = ({
  pose,
  className = '',
}) => {
  const isJumping = pose === 'excited' || pose === 'celebrating';
  const isFlying = pose === 'flying';
  const isSupportive = pose === 'supportive';
  const isPawUp = pose === 'pawUp' || pose === 'hero';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        isJumping
          ? 'animate-hero-jump'
          : isFlying
          ? ''
          : 'animate-hero-float'
      } ${className}`}
      aria-label={`Ameowzing the Superhero Cat (${pose} pose)`}
    >
      <svg
        viewBox="0 0 260 260"
        className={`w-full h-full drop-shadow-[0_8px_0_rgba(15,23,42,0.22)] ${
          isFlying ? '-rotate-12 scale-105' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="suitBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="55%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="capePurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="60%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient id="furCream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="goldStar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Speed / Power Aura for Excited, Celebrating, or Flying */}
        {(pose === 'excited' || pose === 'celebrating' || pose === 'hero') && (
          <g>
            <path
              d="M36 52 L43 38 L50 52 L64 59 L50 66 L43 80 L36 66 L22 59 Z"
              fill="#FBBF24"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            <path
              d="M214 42 L219 32 L224 42 L234 47 L224 52 L219 62 L214 52 L204 47 Z"
              fill="#FDE047"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            <path
              d="M220 142 L225 133 L230 142 L239 147 L230 152 L225 161 L220 152 L211 147 Z"
              fill="#A855F7"
              stroke="#0F172A"
              strokeWidth="2.2"
            />
          </g>
        )}

        {isFlying && (
          <g stroke="#FBBF24" strokeWidth="4" strokeLinecap="round">
            <line x1="8" y1="88" x2="48" y2="96" />
            <line x1="4" y1="128" x2="42" y2="134" />
            <line x1="16" y1="168" x2="56" y2="170" />
          </g>
        )}

        {/* Flowing Purple Superhero Cape */}
        <g className="animate-cape-wave">
          <path
            d={
              isFlying
                ? 'M95 112 C48 104, 16 122, 10 158 C34 166, 62 154, 88 168 C108 176, 128 165, 138 152 Z'
                : 'M84 114 C50 132, 34 176, 44 218 C78 210, 104 222, 130 220 C160 222, 186 210, 214 218 C224 176, 206 132, 174 114 Z'
            }
            fill="url(#capePurple)"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Inner cape highlight */}
          <path
            d={
              isFlying
                ? 'M90 124 C56 120, 32 134, 24 152'
                : 'M72 134 C58 160, 56 186, 60 204'
            }
            stroke="#C084FC"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* Cute Cat Tail peeking out */}
        <path
          d="M174 188 C206 184, 224 160, 212 138 C206 128, 194 134, 196 144 C198 156, 188 170, 168 174"
          fill="url(#furCream)"
          stroke="#0F172A"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Legs & Hero Boots */}
        <g>
          <rect
            x="96"
            y="186"
            width="24"
            height="36"
            rx="12"
            fill="url(#suitBlue)"
            stroke="#0F172A"
            strokeWidth="4"
          />
          <rect
            x="138"
            y="186"
            width="24"
            height="36"
            rx="12"
            fill="url(#suitBlue)"
            stroke="#0F172A"
            strokeWidth="4"
          />
          {/* Golden Superhero Boots */}
          <path
            d="M92 212 C92 206, 122 206, 122 214 L122 224 C122 230, 88 230, 88 222 Z"
            fill="url(#goldStar)"
            stroke="#0F172A"
            strokeWidth="4"
          />
          <path
            d="M136 214 C136 206, 166 206, 166 212 L170 222 C170 230, 136 230, 136 224 Z"
            fill="url(#goldStar)"
            stroke="#0F172A"
            strokeWidth="4"
          />
        </g>

        {/* Royal Blue Superhero Body */}
        <rect
          x="86"
          y="112"
          width="88"
          height="86"
          rx="34"
          fill="url(#suitBlue)"
          stroke="#0F172A"
          strokeWidth="4"
        />

        {/* Golden Utility Belt */}
        <rect
          x="88"
          y="168"
          width="84"
          height="13"
          rx="6"
          fill="#FBBF24"
          stroke="#0F172A"
          strokeWidth="3.5"
        />
        <circle
          cx="130"
          cy="174.5"
          r="8"
          fill="#FEF08A"
          stroke="#0F172A"
          strokeWidth="3"
        />

        {/* Golden Star Emblem on Chest */}
        <circle
          cx="130"
          cy="142"
          r="20"
          fill="#1E3A8A"
          stroke="#FBBF24"
          strokeWidth="3"
        />
        <path
          d="M130 125 L134.8 135.4 L146.2 136.8 L137.8 144.6 L140 156 L130 150.4 L120 156 L122.2 144.6 L113.8 136.8 L125.2 135.4 Z"
          fill="url(#goldStar)"
          stroke="#0F172A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Purple Cape Collar Clasp */}
        <path
          d="M94 114 Q130 126 166 114"
          stroke="#7C3AED"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="96" cy="115" r="5" fill="#FBBF24" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="164" cy="115" r="5" fill="#FBBF24" stroke="#0F172A" strokeWidth="2.5" />

        {/* Left & Right Arms + Cute Paws based on Pose */}
        {/* Left Arm */}
        {pose === 'excited' || pose === 'celebrating' ? (
          <g>
            <path
              d="M90 126 C66 106, 56 88, 62 72"
              stroke="#2563EB"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M90 126 C66 106, 56 88, 62 72"
              stroke="#0F172A"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="62" cy="70" r="12" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
            <circle cx="62" cy="72" r="4.5" fill="#F472B6" />
          </g>
        ) : isFlying ? (
          <g>
            <path
              d="M92 126 L58 140"
              stroke="#2563EB"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <circle cx="56" cy="141" r="11" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
          </g>
        ) : (
          <g>
            {/* Confident hero paw on hip */}
            <path
              d="M88 128 C66 138, 68 158, 86 164"
              stroke="#2563EB"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle cx="85" cy="164" r="11" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
          </g>
        )}

        {/* Right Arm */}
        {pose === 'excited' || pose === 'celebrating' ? (
          <g>
            <path
              d="M170 126 C194 106, 204 88, 198 72"
              stroke="#2563EB"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <circle cx="198" cy="70" r="12" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
            <circle cx="198" cy="72" r="4.5" fill="#F472B6" />
          </g>
        ) : isFlying ? (
          <g>
            {/* Forward superhero flying paw */}
            <path
              d="M168 124 L216 96"
              stroke="#2563EB"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <circle cx="218" cy="94" r="12" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
          </g>
        ) : isSupportive ? (
          <g>
            {/* Gentle comforting paw holding out a golden heart */}
            <path
              d="M170 130 C194 132, 206 120, 210 108"
              stroke="#2563EB"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <circle cx="210" cy="108" r="12" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
            <path
              d="M214 82 C214 75, 224 72, 227 79 C230 72, 240 75, 240 82 C240 91, 227 98, 227 98 C227 98, 214 91, 214 82 Z"
              fill="#F43F5E"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
          </g>
        ) : isPawUp ? (
          <g>
            {/* Paw-Up / Thumbs-Up gesture */}
            <path
              d="M170 128 C196 122, 204 102, 200 84"
              stroke="#2563EB"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <circle cx="200" cy="84" r="12" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
            {/* Thumbs-up toe bean */}
            <ellipse
              cx="198"
              cy="69"
              rx="5"
              ry="8"
              fill="url(#furCream)"
              stroke="#0F172A"
              strokeWidth="3"
            />
          </g>
        ) : (
          <g>
            <path
              d="M170 130 C190 142, 192 158, 178 164"
              stroke="#2563EB"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle cx="176" cy="164" r="11" fill="url(#furCream)" stroke="#0F172A" strokeWidth="3.5" />
          </g>
        )}

        {/* Cute Cat Head */}
        <g>
          {/* Left & Right Cat Ears */}
          <path
            d="M78 68 L70 24 L110 46 Z"
            fill="url(#furCream)"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M81 60 L77 35 L101 49 Z" fill="#F9A8D4" />

          <path
            d="M182 68 L190 24 L150 46 Z"
            fill="url(#furCream)"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M179 60 L183 35 L159 49 Z" fill="#F9A8D4" />

          {/* Main Face Circle */}
          <ellipse
            cx="130"
            cy="78"
            rx="54"
            ry="44"
            fill="url(#furCream)"
            stroke="#0F172A"
            strokeWidth="4"
          />

          {/* Cute Forehead Tuft */}
          <path
            d="M120 35 L128 24 L134 34 L142 26 L140 37"
            fill="#FDE68A"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Superhero Domino Mask */}
          <path
            d="M80 72 C84 56, 114 56, 130 66 C146 56, 176 56, 180 72 C182 86, 158 92, 138 84 C133 82, 127 82, 122 84 C102 92, 78 86, 80 72 Z"
            fill="#1E3A8A"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Big Expressive Eyes */}
          {pose === 'excited' || pose === 'celebrating' ? (
            <>
              {/* Joyful starry bright eyes */}
              <circle cx="106" cy="73" r="11" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="154" cy="73" r="11" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="107" cy="73" r="6.5" fill="#0F172A" />
              <circle cx="155" cy="73" r="6.5" fill="#0F172A" />
              <circle cx="104" cy="69" r="3" fill="#FFFFFF" />
              <circle cx="152" cy="69" r="3" fill="#FFFFFF" />
              <circle cx="110" cy="76" r="1.8" fill="#FDE047" />
              <circle cx="158" cy="76" r="1.8" fill="#FDE047" />
            </>
          ) : isSupportive ? (
            <>
              {/* Warm supportive eyes */}
              <circle cx="106" cy="74" r="10.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="154" cy="74" r="10.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="106" cy="75" r="6" fill="#0F172A" />
              <circle cx="154" cy="75" r="6" fill="#0F172A" />
              <circle cx="103" cy="71" r="2.8" fill="#FFFFFF" />
              <circle cx="151" cy="71" r="2.8" fill="#FFFFFF" />
              {/* Gentle empathetic brows */}
              <path d="M96 60 Q106 56 114 61" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
              <path d="M146 61 Q154 56 164 60" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Confident bright superhero eyes */}
              <circle cx="106" cy="73" r="10.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="154" cy="73" r="10.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="107" cy="73" r="6" fill="#0F172A" />
              <circle cx="155" cy="73" r="6" fill="#0F172A" />
              <circle cx="104" cy="69.5" r="2.8" fill="#FFFFFF" />
              <circle cx="152" cy="69.5" r="2.8" fill="#FFFFFF" />
            </>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="90" cy="91" rx="7" ry="4" fill="#FDA4AF" opacity="0.7" />
          <ellipse cx="170" cy="91" rx="7" ry="4" fill="#FDA4AF" opacity="0.7" />

          {/* Cute Pink Nose */}
          <path
            d="M125 89 L135 89 L130 95 Z"
            fill="#F472B6"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Friendly Smile / Open Cheer Mouth */}
          {pose === 'excited' || pose === 'celebrating' ? (
            <path
              d="M118 96 Q124 102 130 95 Q136 102 142 96 C142 108, 118 108, 118 96 Z"
              fill="#FB7185"
              stroke="#0F172A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M118 97 Q124 104 130 96 Q136 104 142 97"
              stroke="#0F172A"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Cat Whiskers */}
          <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round">
            <line x1="68" y1="84" x2="86" y2="88" />
            <line x1="66" y1="95" x2="86" y2="95" />
            <line x1="192" y1="84" x2="174" y2="88" />
            <line x1="194" y1="95" x2="174" y2="95" />
          </g>
        </g>

        {/* Celebration Golden Trophy / Sparkle for Celebrating pose */}
        {pose === 'celebrating' && (
          <g>
            <path
              d="M214 26 L220 12 L226 26 L240 32 L226 38 L220 52 L214 38 L200 32 Z"
              fill="#FBBF24"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            <path
              d="M34 26 L39 14 L44 26 L56 31 L44 36 L39 48 L34 36 L22 31 Z"
              fill="#FDE047"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
