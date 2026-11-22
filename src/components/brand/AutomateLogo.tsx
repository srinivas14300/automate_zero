import { useId } from 'react';
import { studioConfig } from '../../config/studio';

interface AutomateLogoProps {
  className?: string;
  tone?: 'on-dark' | 'on-light';
}

export function AutomateLogo({
  className = '',
  tone = 'on-dark',
}: AutomateLogoProps) {
  const gradientId = useId();
  const primaryText = tone === 'on-light' ? 'text-[#090909]' : 'text-white';
  const secondaryText =
    tone === 'on-light' ? 'text-[#090909]/85' : 'text-white/90';

  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 transition-colors duration-200 ${className}`}
      aria-label={studioConfig.brandName}
    >
      <svg
        viewBox="0 0 42 42"
        fill="none"
        aria-hidden="true"
        className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="20"
            y1="4"
            x2="20"
            y2="39"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FF9575" />
            <stop offset="55%" stopColor="#FF475C" />
            <stop offset="100%" stopColor="#F72551" />
          </linearGradient>
        </defs>
        <circle cx="6.5" cy="34.5" r="4.2" fill="#F72551" />
        <line
          x1="11.5"
          y1="25"
          x2="20.5"
          y2="9"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line
          x1="20.5"
          y1="34.5"
          x2="28.5"
          y2="20.3"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="34.5" cy="34.5" r="4.2" fill="#F72551" />
      </svg>

      <span className="inline-flex items-baseline gap-1.5 leading-none">
        <span
          className={`font-sans text-lg sm:text-[1.22rem] font-semibold tracking-tight transition-colors duration-200 ${primaryText}`}
        >
          Automate
        </span>
        <span
          className={`font-sans text-xs sm:text-[0.82rem] font-normal tracking-[0.08em] uppercase transition-colors duration-200 ${secondaryText}`}
        >
          ZERO
        </span>
      </span>
    </span>
  );
}
