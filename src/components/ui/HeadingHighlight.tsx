import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const HIGHLIGHT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SectionKickerProps {
  children: ReactNode;
  index?: string;
  tone?: 'on-paper' | 'on-dark' | 'on-coral';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionKicker({
  children,
  index,
  tone = 'on-paper',
  align = 'left',
  className = '',
}: SectionKickerProps) {
  const prefersReducedMotion = useReducedMotion();

  const isCoralBg = tone === 'on-coral';
  const blockBg = isCoralBg
    ? 'bg-[#090909] text-white'
    : 'bg-[linear-gradient(95deg,#FF9D7E_0%,#FF7A91_52%,#FF9EB5_100%)] text-[#090909]';
  const indexColor = isCoralBg ? 'text-[#FF9D7E]' : 'text-[#090909]/75';
  const ruleColorRight = isCoralBg
    ? 'bg-[#090909]/35'
    : tone === 'on-dark'
      ? 'bg-gradient-to-r from-[#FF957A]/70 to-transparent'
      : 'bg-gradient-to-r from-[#C41E45]/55 to-transparent';
  const ruleColorLeft = isCoralBg
    ? 'bg-[#090909]/35'
    : tone === 'on-dark'
      ? 'bg-gradient-to-l from-[#FF957A]/70 to-transparent'
      : 'bg-gradient-to-l from-[#C41E45]/55 to-transparent';

  return (
    <div
      className={`inline-flex items-center gap-3 ${
        align === 'center' ? 'justify-center' : ''
      } ${className}`}
    >
      {align === 'center' ? (
        <motion.span
          aria-hidden="true"
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.12, ease: HIGHLIGHT_EASE }}
          className={`h-[1.5px] w-8 sm:w-12 origin-right ${ruleColorLeft}`}
        />
      ) : null}

      <motion.span
        initial={
          prefersReducedMotion
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: align === 'center' ? 0 : -10, y: align === 'center' ? 8 : 0 }
        }
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: HIGHLIGHT_EASE }}
        className={`inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 font-display text-xs sm:text-sm font-semibold tracking-tight shadow-[0_8px_20px_-8px_rgba(9,9,9,0.28)] ${blockBg}`}
      >
        {index ? (
          <span className={`font-mono text-[11px] tabular-nums ${indexColor}`}>
            {index}
          </span>
        ) : null}
        <span>{children}</span>
      </motion.span>

      <motion.span
        aria-hidden="true"
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.12, ease: HIGHLIGHT_EASE }}
        className={`h-[1.5px] ${
          align === 'center' ? 'w-8 sm:w-12' : 'w-10 sm:w-14'
        } origin-left ${ruleColorRight}`}
      />
    </div>
  );
}

interface HeadingHighlightProps {
  children: ReactNode;
  variant?: 'coral' | 'obsidian';
  surface?: 'light' | 'dark';
  delay?: number;
}

export function HeadingHighlight({
  children,
  variant = 'coral',
  surface = 'light',
  delay = 0.16,
}: HeadingHighlightProps) {
  const prefersReducedMotion = useReducedMotion();

  const isObsidian = variant === 'obsidian';
  const activeTextColor = isObsidian ? '#ffffff' : '#090909';
  const startTextColor = isObsidian
    ? '#090909'
    : surface === 'dark'
      ? '#ffffff'
      : '#090909';

  const bgGradient = isObsidian
    ? 'bg-[linear-gradient(95deg,#090909_0%,#18181b_100%)]'
    : 'bg-[linear-gradient(95deg,#FF9D7E_0%,#FF7A91_52%,#FF9EB5_100%)]';

  const glowClass = isObsidian
    ? 'bg-[#090909]/25'
    : 'bg-gradient-to-r from-[#FF9B7D]/30 via-[#FF7A91]/30 to-[#FF9EB5]/30';

  const shadowClass = isObsidian
    ? 'shadow-[0_14px_30px_-12px_rgba(9,9,9,0.5)]'
    : 'shadow-[0_12px_32px_-10px_rgba(255,142,163,0.5)]';

  return (
    <span className="relative inline-block">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-2xl blur-xl ${glowClass}`}
      />
      <motion.span
        initial={
          prefersReducedMotion
            ? { backgroundSize: '100% 100%', color: activeTextColor }
            : { backgroundSize: '0% 100%', color: startTextColor }
        }
        whileInView={{ backgroundSize: '100% 100%', color: activeTextColor }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.7,
          delay,
          ease: HIGHLIGHT_EASE,
        }}
        className={`relative box-decoration-clone rounded-xl px-3 py-0.5 bg-no-repeat bg-left ${bgGradient} ${shadowClass}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
