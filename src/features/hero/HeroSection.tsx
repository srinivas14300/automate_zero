import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Reveal, TextLineReveal } from '../../components/ui/Reveal';
import { HeroSideCards } from './HeroSideCards';

const HERO_SCROLL_SPRING = { stiffness: 130, damping: 24, mass: 0.45 };

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, HERO_SCROLL_SPRING);

  // Differential vertical offsets create depth across background layers while scrolling
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Center heading & copy zoom-out effect when scrolling down
  const centerScale = useTransform(smoothScroll, [0, 0.85], [1, 0.78]);
  const centerY = useTransform(smoothScroll, [0, 0.85], [0, 24]);
  const centerOpacity = useTransform(smoothScroll, [0, 0.55, 0.92], [1, 0.85, 0.12]);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-nav-surface="dark"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#090909] text-white lg:min-h-[690px] flex items-center"
    >
      {/* Background Layer 1: Subtle architectural dot-grid */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: gridY }}
        className="pointer-events-none absolute -inset-y-16 inset-x-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_42%,black_30%,transparent_100%)] will-change-transform"
      />

      {/* Background Layer 2: Soft ambient coral-peach & baby-pink horizon wash */}
      <motion.div
        aria-hidden="true"
        style={
          prefersReducedMotion
            ? undefined
            : { y: glowY, opacity: glowOpacity }
        }
        className="pointer-events-none absolute -top-28 inset-x-0 h-[36rem] bg-[radial-gradient(ellipse_62%_56%_at_50%_38%,rgba(255,155,125,0.13),rgba(255,142,163,0.07)_46%,transparent_76%)] will-change-transform"
      />

      {/* Background Layer 3: Precision architectural hairline rings */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: ringsY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <div className="h-[34rem] w-[34rem] sm:h-[46rem] sm:w-[46rem] rounded-full border border-white/[0.045]" />
        <div className="absolute h-[23rem] w-[23rem] sm:h-[31rem] sm:w-[31rem] rounded-full border border-[#FF957A]/[0.07]" />
      </motion.div>

      {/* Floating Tilted Side Cards (4 corner cards framing the center text) */}
      <HeroSideCards scrollYProgress={scrollYProgress} />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-36 pb-24 sm:pt-44 sm:pb-32 border-[#ffffff]">
        {/* Centered editorial hero headline with scroll-linked zoom */}
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  scale: centerScale,
                  y: centerY,
                  opacity: centerOpacity,
                }
          }
          className="max-w-2xl lg:max-w-[520px] xl:max-w-[600px] mx-auto text-center origin-center will-change-transform"
        >
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.3rem,4.2vw,4rem)] font-bold tracking-tight leading-[1.08] text-white"
          >
            <TextLineReveal delay={0.08}>
              Websites, marketing, and SEO
            </TextLineReveal>
            <TextLineReveal delay={0.16} className="py-2 -my-1 px-2 -mx-2">
              <span>built for </span>
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-2xl bg-gradient-to-r from-[#FF9B7D]/30 via-[#FF7A91]/30 to-[#FF9EB5]/30 blur-xl"
                />
                <motion.span
                  initial={
                    prefersReducedMotion
                      ? { backgroundSize: '100% 100%', color: '#090909' }
                      : { backgroundSize: '0% 100%', color: '#ffffff' }
                  }
                  animate={{ backgroundSize: '100% 100%', color: '#090909' }}
                  transition={{
                    duration: 0.75,
                    delay: 0.36,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative box-decoration-clone rounded-xl px-3 py-0.5 bg-[linear-gradient(95deg,#FF9D7E_0%,#FF7A91_52%,#FF9EB5_100%)] bg-no-repeat bg-left shadow-[0_12px_32px_-10px_rgba(255,142,163,0.55)]"
                >
                  growing businesses.
                </motion.span>
              </span>
            </TextLineReveal>
          </h1>

          <Reveal immediate delay={0.24}>
            <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white/65 max-w-2xl mx-auto">
              Automate_Zero designs and builds fast custom websites, practical
              digital marketing campaigns, and technical SEO foundations.
            </p>
          </Reveal>

          <Reveal
            immediate
            delay={0.3}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-[#090909] bg-gradient-to-r from-[#FF9B7D] to-[#FF879B] hover:from-[#FFAC93] hover:to-[#FF9AAC] transition-all duration-150 whitespace-nowrap"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25 transition-colors duration-150 whitespace-nowrap"
            >
              <span>Explore Services</span>
            </a>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
