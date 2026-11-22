import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { HeadingHighlight, SectionKicker } from '../../components/ui/HeadingHighlight';
import { Reveal } from '../../components/ui/Reveal';
import { publishedProjects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

const SCROLL_SPRING = { stiffness: 135, damping: 26, mass: 0.45 };

interface ScrollZoomCardProps {
  children: ReactNode;
  exitStart?: number;
  exitEnd?: number;
  className?: string;
}

function ScrollZoomCard({
  children,
  exitStart = 0.76,
  exitEnd = 0.98,
  className = '',
}: ScrollZoomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.96', 'end 0.0'],
  });
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  // Settle cleanly into view, stay full-scale while reading, then zoom out as the card exits upward
  const scale = useTransform(
    smoothProgress,
    [0, 0.18, exitStart, exitEnd],
    [0.94, 1, 1, 0.8]
  );
  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, exitStart, exitEnd],
    [0.45, 1, 1, 0.05]
  );
  const y = useTransform(
    smoothProgress,
    [0, 0.18, exitStart, exitEnd],
    [28, 0, 0, -18]
  );

  return (
    <div ref={cardRef} className={className}>
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { scale, opacity, y }
        }
        className="h-full origin-center will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SelectedWorkSection() {
  if (publishedProjects.length === 0) {
    return null;
  }

  const [featuredProject, ...secondaryProjects] = publishedProjects;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-[#f4f4ec] py-20 sm:py-28 border-t border-black/[0.08] overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionKicker tone="on-paper">Selected Work</SectionKicker>
            <h2
              id="work-heading"
              className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.14] text-[#090909]"
            >
              Websites built for{' '}
              <HeadingHighlight variant="coral" surface="light">
                real businesses.
              </HeadingHighlight>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#58584F]">
            Recent client and studio web builds spanning retail jewellery,
            photography portfolios, and automotive sales and service.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-14 space-y-8 lg:space-y-10">
          {featuredProject ? (
            <ScrollZoomCard exitStart={0.76} exitEnd={0.98}>
              <ProjectCard
                project={featuredProject}
                index={0}
                variant="featured"
              />
            </ScrollZoomCard>
          ) : null}

          {secondaryProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {secondaryProjects.map((project, idx) => (
                <ScrollZoomCard
                  key={project.id}
                  exitStart={idx % 2 === 0 ? 0.72 : 0.77}
                  exitEnd={idx % 2 === 0 ? 0.95 : 1}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    index={idx + 1}
                    variant="editorial"
                  />
                </ScrollZoomCard>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
