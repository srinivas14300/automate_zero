import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const STUDIO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  immediate = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay, ease: STUDIO_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: STUDIO_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TextLineRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function TextLineReveal({
  children,
  delay = 0,
  className = '',
}: TextLineRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.72, delay, ease: STUDIO_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface MaskedMediaRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MaskedMediaReveal({
  children,
  delay = 0,
  className = '',
}: MaskedMediaRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.6 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: STUDIO_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
