import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { HeadingHighlight, SectionKicker } from '../../components/ui/HeadingHighlight';
import { Reveal } from '../../components/ui/Reveal';
import { studioConfig } from '../../config/studio';
import { FounderProfileCard } from './FounderProfileCard';

const SCROLL_SPRING = { stiffness: 130, damping: 24, mass: 0.45 };

const STUDIO_STANDARDS = [
  {
    title: 'Custom-built front ends',
    description:
      'Websites engineered cleanly with semantic HTML, modern CSS, and TypeScript—never bloated page-builder templates.',
  },
  {
    title: 'Responsive across devices',
    description:
      'Every layout is checked for mobile, tablet, and desktop usability with clear navigation and readable typography.',
  },
  {
    title: 'Technical SEO hygiene',
    description:
      'Clean heading hierarchy, metadata, schema markup, and fast loading structure built directly into the site.',
  },
  {
    title: 'Direct studio communication',
    description:
      'Work straight with the builders scoping, designing, and implementing your project from start to launch.',
  },
  {
    title: 'Conversion-focused structure',
    description:
      'Clear page hierarchy, focused messaging, and straightforward enquiry flows built around business goals.',
  },
  {
    title: 'Clean handover & clarity',
    description:
      'Centralized configuration and readable structure so content, links, and campaigns stay simple to maintain.',
  },
];

export function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null);
  const standardsRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const publishedFounders = studioConfig.founders.filter(
    (founder) => founder.published && founder.name
  );

  // Opposing angled convergence for the two side-by-side founder cards
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ['start 0.95', 'start 0.35'],
  });
  const smoothAbout = useSpring(aboutProgress, SCROLL_SPRING);
  const leftFounderX = useTransform(smoothAbout, [0, 1], [-22, 0]);
  const leftFounderRotate = useTransform(smoothAbout, [0, 1], [-1.6, 0]);
  const rightFounderX = useTransform(smoothAbout, [0, 1], [22, 0]);
  const rightFounderRotate = useTransform(smoothAbout, [0, 1], [1.6, 0]);

  // Architectural expansion & hairline draw-across for the "What you get" dark slab
  const { scrollYProgress: standardsProgress } = useScroll({
    target: standardsRef,
    offset: ['start 0.95', 'start 0.35'],
  });
  const smoothStandards = useSpring(standardsProgress, SCROLL_SPRING);
  const slabScale = useTransform(smoothStandards, [0, 1], [0.93, 1]);
  const slabY = useTransform(smoothStandards, [0, 1], [32, 0]);
  const dividerScaleX = useTransform(smoothStandards, [0.15, 1], [0, 1]);

  return (
    <>
      {/* Concise Studio Intro + Side-by-Side Founder Cards */}
      <section
        ref={aboutRef}
        id="about"
        aria-labelledby="about-heading"
        className="bg-[#f4f4ec] pt-16 pb-12 sm:pt-24 sm:pb-16 border-t border-black/[0.08] overflow-x-clip"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <SectionKicker index="02" tone="on-paper">
              About Automate_Zero
            </SectionKicker>
            <h2
              id="about-heading"
              className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.14] text-[#090909]"
            >
              An independent studio run{' '}
              <HeadingHighlight variant="coral" surface="light">
                directly by two builders.
              </HeadingHighlight>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#58584F] max-w-2xl">
              {studioConfig.brandName} handles website design, front-end
              development, digital marketing, and SEO—scoped and shipped
              directly by the people building your project.
            </p>
          </Reveal>

          {publishedFounders.length > 0 ? (
            <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9 pr-2.5 pb-2.5">
              {publishedFounders.map((founder, idx) => {
                const isFirst = idx % 2 === 0;
                return (
                  <motion.div
                    key={founder.id}
                    style={
                      prefersReducedMotion
                        ? undefined
                        : {
                            x: isFirst ? leftFounderX : rightFounderX,
                            rotate: isFirst
                              ? leftFounderRotate
                              : rightFounderRotate,
                          }
                    }
                    className="h-full will-change-transform"
                  >
                    <FounderProfileCard founder={founder} index={idx} />
                  </motion.div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      {/* Framed Dark Editorial "What you get" Section with scroll scale expansion */}
      <section
        ref={standardsRef}
        aria-label="Studio standards"
        data-nav-surface="dark"
        className="bg-[#f4f4ec] px-4 sm:px-8 pb-16 sm:pb-24 overflow-x-clip"
      >
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { scale: slabScale, y: slabY }
          }
          className="max-w-6xl mx-auto bg-[#090909] text-white px-7 py-12 sm:px-14 sm:py-16 lg:px-16 lg:py-20 origin-center will-change-transform"
        >
          {/* Top Split Header + Right Action Button */}
          <Reveal className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-xl">
              <SectionKicker index="03" tone="on-dark">
                What you get
              </SectionKicker>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] text-white">
                Built carefully,{' '}
                <HeadingHighlight variant="coral" surface="dark">
                  communicated clearly.
                </HeadingHighlight>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60 max-w-lg">
                No templates. No outsourcing. Direct engineering, focused
                marketing, and technical SEO handled end to end.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 self-start bg-gradient-to-r from-[#FF9B7D] to-[#FF879B] hover:from-[#FFAC93] hover:to-[#FF9AAC] px-6 py-3.5 text-sm font-semibold text-[#090909] transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Reveal>

          {/* Scroll-drawn Hairline Horizontal Divider */}
          <motion.div
            aria-hidden="true"
            style={
              prefersReducedMotion ? undefined : { scaleX: dividerScaleX }
            }
            className="mt-10 sm:mt-12 border-t border-white/12 origin-left will-change-transform"
          />

          {/* 3x2 Clean Typographic Grid (No icons, no inner card boxes) */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 sm:gap-y-12">
            {STUDIO_STANDARDS.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.04}>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Centered Quiet Bottom Caption */}
          <Reveal delay={0.12}>
            <p className="mt-14 sm:mt-16 text-center text-xs text-white/45">
              Custom websites, digital marketing, and technical SEO · Direct builder collaboration from scope to launch.
            </p>
          </Reveal>
        </motion.div>
      </section>
    </>
  );
}
