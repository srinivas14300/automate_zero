import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

const STACK_ITEMS = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'Node.js',
  'Vite',
  'Technical SEO',
  'Schema Markup',
  'Web Design',
  'Digital Marketing',
  'Responsive UI',
];

const SCROLL_SPRING = { stiffness: 120, damping: 24, mass: 0.4 };

function MarqueeSequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
    >
      {STACK_ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-8 sm:gap-12">
          <span className="font-display text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-[#6E6E74] hover:text-[#FF957A] transition-colors duration-200 whitespace-nowrap">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="h-3.5 w-px bg-white/[0.12] select-none"
          />
        </span>
      ))}
    </div>
  );
}

export function TechStackStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, SCROLL_SPRING);
  const scrollDriftX = useTransform(smoothScroll, [0, 1], [32, -120]);

  return (
    <section
      ref={sectionRef}
      aria-label="Technologies and capabilities"
      data-nav-surface="dark"
      className="relative overflow-hidden bg-[#090909] border-t border-b border-white/[0.08] py-7 sm:py-9"
    >
      {/* Left & right soft edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-36 bg-gradient-to-r from-[#090909] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-36 bg-gradient-to-l from-[#090909] to-transparent"
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { x: scrollDriftX }}
        className="group flex overflow-hidden select-none will-change-transform"
      >
        <div className="az-marquee-track flex shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused]">
          <MarqueeSequence />
          <MarqueeSequence hidden />
        </div>
      </motion.div>
    </section>
  );
}
