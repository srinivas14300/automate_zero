import { Globe, Layers, LayoutGrid, Search } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

interface HeroSideCardsProps {
  scrollYProgress: MotionValue<number>;
}

const SCROLL_SPRING = { stiffness: 130, damping: 24, mass: 0.45 };
const INTERNAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSideCards({ scrollYProgress }: HeroSideCardsProps) {
  const prefersReducedMotion = useReducedMotion();
  const smoothScroll = useSpring(scrollYProgress, SCROLL_SPRING);

  // Outward dispersal on scroll: 4 corner cards start close inside around center text and glide outward
  const leftTopX = useTransform(smoothScroll, [0, 0.85], [0, -165]);
  const leftTopY = useTransform(smoothScroll, [0, 0.85], [0, -60]);
  const leftTopRotate = useTransform(smoothScroll, [0, 0.85], [-4, -12]);

  const leftBottomX = useTransform(smoothScroll, [0, 0.85], [0, -165]);
  const leftBottomY = useTransform(smoothScroll, [0, 0.85], [0, 55]);
  const leftBottomRotate = useTransform(smoothScroll, [0, 0.85], [4, 12]);

  const rightTopX = useTransform(smoothScroll, [0, 0.85], [0, 165]);
  const rightTopY = useTransform(smoothScroll, [0, 0.85], [0, -60]);
  const rightTopRotate = useTransform(smoothScroll, [0, 0.85], [4, 12]);

  const rightBottomX = useTransform(smoothScroll, [0, 0.85], [0, 165]);
  const rightBottomY = useTransform(smoothScroll, [0, 0.85], [0, 55]);
  const rightBottomRotate = useTransform(smoothScroll, [0, 0.85], [-4, -12]);

  const scrollOpacity = useTransform(smoothScroll, [0, 0.45, 0.9], [1, 0.85, 0.15]);
  const scrollScale = useTransform(smoothScroll, [0, 0.85], [1, 0.92]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden lg:block absolute inset-0 z-10 overflow-hidden"
    >
      {/* Centered coordinate frame so the 4 cards hug closely around the center hero copy */}
      <div className="relative w-full h-full max-w-6xl mx-auto">
        {/* Top-Left: Web Design Wireframe Card */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, x: 24, y: 16, scale: 0.92 }
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.18, ease: INTERNAL_EASE }}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: leftTopX,
                  y: leftTopY,
                  rotate: leftTopRotate,
                  opacity: scrollOpacity,
                  scale: scrollScale,
                }
          }
          className="pointer-events-auto absolute top-28 left-6 xl:left-12 w-[180px] xl:w-[200px] will-change-transform"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-white/[0.13] bg-[#111111]/92 backdrop-blur-md p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.9)] hover:border-[#FF957A]/60 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#FF957A]/35 bg-[#FF957A]/12 text-[#FF957A]">
                <LayoutGrid className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#FF957A]">
                  Web Design
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-white/60">
                  Custom UI &amp; responsive grid.
                </p>
              </div>
            </div>

            {/* Logical internal animation: responsive header + layout blocks cycling focus */}
            <div className="mt-3 rounded-xl border border-white/[0.07] bg-black/50 p-2.5 space-y-1.5 overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scaleX: [0.65, 1, 0.8, 0.65], opacity: [0.65, 1, 0.85, 0.65] }
                  }
                  transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-8 origin-left rounded-full bg-[#FF957A]/80"
                />
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.2, 0.65, 0.2] }
                  }
                  transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-4 rounded-full bg-white/30"
                />
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: [0.55, 1, 0.6, 0.55],
                          borderColor: [
                            'rgba(255,149,122,0.2)',
                            'rgba(255,149,122,0.65)',
                            'rgba(255,149,122,0.2)',
                            'rgba(255,149,122,0.2)',
                          ],
                        }
                  }
                  transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="col-span-2 h-7 rounded-md border border-[#FF957A]/25 bg-[#FF957A]/10 p-1.5 flex flex-col justify-center gap-1"
                >
                  <motion.span
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { scaleX: [0.45, 1, 0.45] }
                    }
                    transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="block h-1 w-4/5 origin-left rounded-full bg-[#FF957A]/70"
                  />
                  <span className="block h-1 w-1/2 rounded-full bg-white/20" />
                </motion.div>

                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: [0.45, 0.5, 1, 0.45],
                          borderColor: [
                            'rgba(255,255,255,0.1)',
                            'rgba(255,255,255,0.1)',
                            'rgba(255,142,163,0.55)',
                            'rgba(255,255,255,0.1)',
                          ],
                        }
                  }
                  transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="col-span-1 h-7 rounded-md border border-white/10 bg-white/[0.04] p-1 flex flex-col justify-between"
                >
                  <span className="block h-1.5 w-full rounded-sm bg-white/15" />
                  <span className="block h-1.5 w-2/3 rounded-sm bg-[#FF8EA3]/40" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom-Left: Direct Launch Connected Pipeline Card */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, x: 24, y: -12, scale: 0.92 }
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.3, ease: INTERNAL_EASE }}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: leftBottomX,
                  y: leftBottomY,
                  rotate: leftBottomRotate,
                  opacity: scrollOpacity,
                  scale: scrollScale,
                }
          }
          className="pointer-events-auto absolute bottom-16 left-8 xl:left-14 w-[180px] xl:w-[200px] will-change-transform"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 6.7, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-white/[0.13] bg-[#111111]/92 backdrop-blur-md p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.9)] hover:border-[#FF957A]/60 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#FF957A]/35 bg-[#FF957A]/12 text-[#FF957A]">
                <Layers className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#FF957A]">
                  Direct Launch
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-white/60">
                  Built hands-on end to end.
                </p>
              </div>
            </div>

            {/* Logical internal animation: sequential 01 -> 02 -> 03 launch pipeline */}
            <div className="mt-3 rounded-xl border border-white/[0.07] bg-black/50 px-3 py-2.5 flex items-center justify-between">
              <motion.span
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: [1, 1.08, 1, 1],
                        borderColor: [
                          'rgba(255,149,122,0.95)',
                          'rgba(255,149,122,0.95)',
                          'rgba(255,149,122,0.35)',
                          'rgba(255,149,122,0.35)',
                        ],
                        backgroundColor: [
                          'rgba(255,149,122,0.24)',
                          'rgba(255,149,122,0.24)',
                          'rgba(255,149,122,0.08)',
                          'rgba(255,149,122,0.08)',
                        ],
                      }
                }
                transition={{
                  duration: 3.6,
                  times: [0, 0.22, 0.4, 1],
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-[#FF957A]/40 bg-[#FF957A]/12 font-mono text-[9px] tabular-nums text-[#FF957A]"
              >
                01
              </motion.span>

              <span className="relative h-px flex-1 mx-1.5 bg-white/15 overflow-hidden">
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scaleX: [0, 1, 1, 0], opacity: [0.3, 1, 0.4, 0.3] }
                  }
                  transition={{
                    duration: 3.6,
                    times: [0, 0.32, 0.65, 1],
                    repeat: Infinity,
                    ease: INTERNAL_EASE,
                  }}
                  className="block h-full w-full origin-left bg-gradient-to-r from-[#FF957A] to-[#FF8EA3]"
                />
              </span>

              <motion.span
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: [1, 1, 1.08, 1],
                        borderColor: [
                          'rgba(255,142,163,0.35)',
                          'rgba(255,142,163,0.95)',
                          'rgba(255,142,163,0.95)',
                          'rgba(255,142,163,0.35)',
                        ],
                        backgroundColor: [
                          'rgba(255,142,163,0.08)',
                          'rgba(255,142,163,0.26)',
                          'rgba(255,142,163,0.26)',
                          'rgba(255,142,163,0.08)',
                        ],
                      }
                }
                transition={{
                  duration: 3.6,
                  times: [0, 0.34, 0.56, 1],
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-[#FF8EA3]/45 bg-[#FF8EA3]/15 font-mono text-[9px] tabular-nums text-[#FF8EA3]"
              >
                02
              </motion.span>

              <span className="relative h-px flex-1 mx-1.5 bg-white/15 overflow-hidden">
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scaleX: [0, 0, 1, 0], opacity: [0.2, 0.2, 1, 0.2] }
                  }
                  transition={{
                    duration: 3.6,
                    times: [0, 0.38, 0.68, 1],
                    repeat: Infinity,
                    ease: INTERNAL_EASE,
                  }}
                  className="block h-full w-full origin-left bg-gradient-to-r from-[#FF8EA3] to-[#FF957A]"
                />
              </span>

              <motion.span
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: [1, 1, 1, 1.1],
                        borderColor: [
                          'rgba(255,149,122,0.35)',
                          'rgba(255,149,122,0.35)',
                          'rgba(255,149,122,0.95)',
                          'rgba(255,149,122,0.35)',
                        ],
                        backgroundColor: [
                          'rgba(255,149,122,0.08)',
                          'rgba(255,149,122,0.08)',
                          'rgba(255,149,122,0.28)',
                          'rgba(255,149,122,0.08)',
                        ],
                      }
                }
                transition={{
                  duration: 3.6,
                  times: [0, 0.6, 0.78, 1],
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-[#FF957A]/40 bg-[#FF957A]/12 font-mono text-[9px] tabular-nums text-[#FF957A]"
              >
                03
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Top-Right: Technical SEO Trend Line Card */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, x: -24, y: 16, scale: 0.92 }
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.22, ease: INTERNAL_EASE }}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: rightTopX,
                  y: rightTopY,
                  rotate: rightTopRotate,
                  opacity: scrollOpacity,
                  scale: scrollScale,
                }
          }
          className="pointer-events-auto absolute top-28 right-6 xl:right-12 w-[180px] xl:w-[200px] will-change-transform"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-white/[0.13] bg-[#111111]/92 backdrop-blur-md p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.9)] hover:border-[#FF8EA3]/60 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#FF8EA3]/35 bg-[#FF8EA3]/12 text-[#FF8EA3]">
                <Search className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#FF8EA3]">
                  Technical SEO
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-white/60">
                  Clean markup &amp; search ready.
                </p>
              </div>
            </div>

            {/* Logical internal animation: search visibility line drawing left-to-right + peak ping */}
            <div className="mt-3 rounded-xl border border-white/[0.07] bg-black/50 p-2">
              <svg viewBox="0 0 140 44" className="w-full h-10 overflow-visible">
                <defs>
                  <linearGradient id="az-hero-seo-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF9B7D" />
                    <stop offset="100%" stopColor="#FF8EA3" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="14" x2="140" y2="14" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="0" y1="30" x2="140" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <path
                  d="M 4 36 C 34 32, 52 22, 78 19 C 102 16, 118 9, 136 6"
                  fill="none"
                  stroke="rgba(255,142,163,0.16)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M 4 36 C 34 32, 52 22, 78 19 C 102 16, 118 9, 136 6"
                  fill="none"
                  stroke="url(#az-hero-seo-stroke)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={
                    prefersReducedMotion
                      ? { pathLength: 1 }
                      : { pathLength: [0, 1, 1, 0] }
                  }
                  transition={{
                    duration: 4.2,
                    times: [0, 0.45, 0.85, 1],
                    repeat: Infinity,
                    ease: INTERNAL_EASE,
                  }}
                />
                {!prefersReducedMotion ? (
                  <motion.circle
                    cx="136"
                    cy="6"
                    r="6"
                    fill="none"
                    stroke="#FF8EA3"
                    strokeWidth="1.2"
                    animate={{ scale: [0.5, 1.5], opacity: [0, 0.65, 0] }}
                    transition={{
                      duration: 4.2,
                      times: [0.42, 0.65, 0.86],
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ) : null}
                <motion.circle
                  cx="136"
                  cy="6"
                  r="3"
                  fill="#FF8EA3"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scale: [0.6, 1.15, 1, 0.6], opacity: [0.35, 1, 1, 0.35] }
                  }
                  transition={{
                    duration: 4.2,
                    times: [0, 0.46, 0.85, 1],
                    repeat: Infinity,
                    ease: INTERNAL_EASE,
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom-Right: Digital Marketing Growth Card */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, x: -24, y: -12, scale: 0.92 }
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.34, ease: INTERNAL_EASE }}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: rightBottomX,
                  y: rightBottomY,
                  rotate: rightBottomRotate,
                  opacity: scrollOpacity,
                  scale: scrollScale,
                }
          }
          className="pointer-events-auto absolute bottom-16 right-8 xl:right-14 w-[180px] xl:w-[200px] will-change-transform"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 6.9, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-white/[0.13] bg-[#111111]/92 backdrop-blur-md p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.9)] hover:border-[#FF8EA3]/60 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#FF8EA3]/35 bg-[#FF8EA3]/12 text-[#FF8EA3]">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#FF8EA3]">
                  Digital Marketing
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-white/60">
                  Campaigns &amp; conversion focus.
                </p>
              </div>
            </div>

            {/* Logical internal animation: campaign growth fill & trajectory sweep */}
            <div className="mt-3 rounded-xl border border-white/[0.07] bg-black/50 p-2">
              <svg viewBox="0 0 140 44" className="w-full h-10 overflow-visible">
                <defs>
                  <linearGradient id="az-hero-growth-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF8EA3" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#FF8EA3" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="14" x2="140" y2="14" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="0" y1="30" x2="140" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <motion.path
                  d="M 4 36 Q 42 34, 72 20 T 136 7 L 136 42 L 4 42 Z"
                  fill="url(#az-hero-growth-fill)"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.25, 0.95, 0.95, 0.25] }
                  }
                  transition={{
                    duration: 4.5,
                    times: [0, 0.45, 0.85, 1],
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <path
                  d="M 4 36 Q 42 34, 72 20 T 136 7"
                  fill="none"
                  stroke="rgba(255,142,163,0.16)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M 4 36 Q 42 34, 72 20 T 136 7"
                  fill="none"
                  stroke="#FF8EA3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={
                    prefersReducedMotion
                      ? { pathLength: 1 }
                      : { pathLength: [0, 1, 1, 0] }
                  }
                  transition={{
                    duration: 4.5,
                    times: [0, 0.48, 0.86, 1],
                    repeat: Infinity,
                    ease: INTERNAL_EASE,
                  }}
                />
                <motion.circle
                  cx="72"
                  cy="20"
                  r="2.2"
                  fill="#FF9B7D"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0, 1, 1, 0], scale: [0.5, 1.15, 1, 0.5] }
                  }
                  transition={{
                    duration: 4.5,
                    times: [0.18, 0.34, 0.86, 1],
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.circle
                  cx="136"
                  cy="7"
                  r="2.6"
                  fill="#FF8EA3"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.5] }
                  }
                  transition={{
                    duration: 4.5,
                    times: [0.42, 0.58, 0.86, 1],
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
