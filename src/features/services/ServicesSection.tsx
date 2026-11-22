import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { HeadingHighlight, SectionKicker } from '../../components/ui/HeadingHighlight';
import { Reveal } from '../../components/ui/Reveal';
import { services } from '../../data/services';
import type { ServiceSlug } from '../../types/studio';

interface ServicesSectionProps {
  activeService: Exclude<ServiceSlug, 'multiple'>;
  onSelectService: (slug: Exclude<ServiceSlug, 'multiple'>) => void;
  onEnquireService: (slug: ServiceSlug) => void;
}

const SCROLL_SPRING = { stiffness: 130, damping: 24, mass: 0.45 };

export function ServicesSection({
  activeService,
  onSelectService,
  onEnquireService,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const currentService =
    services.find((item) => item.slug === activeService) ?? services[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.32'],
  });
  const smoothScroll = useSpring(scrollYProgress, SCROLL_SPRING);

  // Counter-parallax overlap: header gently settles while dark detail panel rises into place
  const headerY = useTransform(smoothScroll, [0, 1], [-18, 0]);
  const panelY = useTransform(smoothScroll, [0, 1], [54, 0]);
  const panelScale = useTransform(smoothScroll, [0, 1], [0.95, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#f4f4ec] overflow-x-clip"
    >
      {/* Coral-peach to baby-pink header band + pill switcher */}
      <div className="bg-gradient-to-br from-[#FFA88C] via-[#FF8EA3] to-[#FFA6B8] px-5 sm:px-8 pt-16 pb-24 sm:pt-20 sm:pb-28">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: headerY }}
          className="max-w-5xl mx-auto text-center will-change-transform"
        >
          <Reveal>
            <SectionKicker index="01" tone="on-coral" align="center">
              What We Build
            </SectionKicker>
            <h2
              id="services-heading"
              className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#090909]"
            >
              Three disciplines{' '}
              <HeadingHighlight variant="obsidian">
                built to work as one system.
              </HeadingHighlight>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-[#090909]/75">
              Pick the service your business needs first, or combine website
              design, digital marketing, and SEO into a cohesive online presence.
            </p>
          </Reveal>

          {/* Interactive service tab bar */}
          <Reveal delay={0.08} className="mt-8">
            <div
              role="tablist"
              aria-label="Core studio services"
              className="inline-flex flex-wrap items-center justify-center gap-2.5"
            >
              {services.map((service) => {
                const isSelected = service.slug === currentService.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    role="tab"
                    id={`tab-${service.slug}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${service.slug}`}
                    onClick={() => onSelectService(service.slug)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#090909] text-white shadow-sm'
                        : 'bg-white text-[#090909] hover:bg-white/90 shadow-[0_1px_2px_rgba(9,9,9,0.06)]'
                    }`}
                  >
                    {service.title}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </motion.div>
      </div>

      {/* Overlapping dark #0d0d0d detail card with scroll-depth elevation */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { y: panelY, scale: panelScale }
        }
        className="max-w-6xl mx-auto px-5 sm:px-8 -mt-14 sm:-mt-16 pb-20 sm:pb-28 origin-top will-change-transform"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.slug}
            role="tabpanel"
            id={`panel-${currentService.slug}`}
            aria-labelledby={`tab-${currentService.slug}`}
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }
            }
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-[#0d0d0d] text-white border border-white/[0.1] p-7 sm:p-11 shadow-[0_28px_70px_-24px_rgba(9,9,9,0.45)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left side: Service overview, audience fit & CTA */}
              <div className="lg:col-span-6">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.12] text-white">
                  {currentService.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {currentService.summary}
                </p>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-sm leading-relaxed text-white/60">
                    <span className="font-semibold text-white">Best for: </span>
                    {currentService.suitableFor}
                  </p>
                </div>

                <div className="mt-7">
                  <a
                    href="#contact"
                    onClick={() => onEnquireService(currentService.slug)}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#090909] bg-gradient-to-r from-[#FF9B7D] to-[#FF879B] hover:from-[#FFAC93] hover:to-[#FF9AAC] transition-all duration-150 whitespace-nowrap"
                  >
                    <span>{currentService.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right side: Deliverables breakdown */}
              <div className="lg:col-span-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
                <div className="pb-4 border-b border-white/[0.08]">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Included Scope
                  </span>
                </div>

                <ul className="mt-5 space-y-4">
                  {currentService.scope.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-3.5 text-sm sm:text-[15px] leading-relaxed text-white/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#FF957A]/35 bg-[#FF957A]/12 text-[#FF957A]"
                      >
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
