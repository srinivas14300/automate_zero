import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { ProjectEntry } from '../../types/studio';

interface ProjectCardProps {
  project: ProjectEntry;
  index: number;
  variant?: 'featured' | 'editorial';
}

const MEDIA_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProjectCard({
  project,
  index,
  variant = 'editorial',
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const displayIndex = String(index + 1).padStart(2, '0');
  const isFeatured = variant === 'featured';

  const mediaNode = (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.name} website in a new tab`}
      className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF957A] focus-visible:ring-inset"
    >
      {project.screenshotSrc && !imageError ? (
        <motion.img
          src={project.screenshotSrc}
          alt={project.screenshotAlt || `${project.name} website preview`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0.9, scale: 1.02 }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: MEDIA_EASE }}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div className="w-full h-full min-h-[260px] flex flex-col justify-between p-8 bg-[#0d0d0d] text-white">
          <span className="font-mono text-xs tabular-nums text-[#FF957A]">
            {displayIndex}
          </span>
          <div>
            <p className="font-display text-2xl font-semibold">{project.name}</p>
            <p className="mt-1 text-xs text-white/60">
              {project.projectType || project.category}
            </p>
          </div>
        </div>
      )}
    </a>
  );

  if (isFeatured) {
    return (
      <div className="group relative pr-2.5 pb-2.5">
        {/* Automate_Zero signature offset coral-peach to baby-pink frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0 top-2.5 left-2.5 rounded-3xl bg-gradient-to-br from-[#FF9B7D]/70 via-[#FF8897]/55 to-[#FF9EB5]/70 opacity-75 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        />

        {/* Subtle light gradient border shell */}
        <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-[#FF9B7D]/65 via-[#FF8EA3]/45 to-white/25 shadow-[0_28px_70px_-28px_rgba(9,9,9,0.45)]">
          <article className="relative rounded-[calc(1.5rem-1.5px)] bg-[#0d0d0d] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-[#141414] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#FF957A]/20">
              {mediaNode}
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 lg:p-11 flex flex-col justify-between gap-7">
              <div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/60">
                  <span className="font-mono tabular-nums font-medium text-[#FF957A]">
                    {displayIndex}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span>{project.category}</span>
                  {project.projectType ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{project.projectType}</span>
                    </>
                  ) : null}
                </div>

                <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.12] text-white">
                  {project.name}
                </h3>

                {project.verifiedDescription ? (
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                    {project.verifiedDescription}
                  </p>
                ) : null}

                {project.statusLabel || project.attributionNote ? (
                  <p className="mt-4 text-xs leading-relaxed text-[#FF957A]">
                    {project.statusLabel ? `${project.statusLabel}` : ''}
                    {project.statusLabel && project.attributionNote ? ' — ' : ''}
                    {project.attributionNote ? project.attributionNote : ''}
                  </p>
                ) : null}
              </div>

              <div className="pt-5 border-t border-white/12 flex items-center">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF9B7D] to-[#FF879B] hover:from-[#FFAC93] hover:to-[#FF9AAC] px-6 py-2.5 min-h-[44px] text-sm font-semibold text-[#090909] transition-all duration-200 whitespace-nowrap shrink-0"
                >
                  <span>View Website</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-full pr-2.5 pb-2.5">
      {/* Automate_Zero signature offset coral-peach to baby-pink light accent frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 top-2.5 left-2.5 rounded-3xl bg-gradient-to-br from-[#FF9B7D]/65 via-[#FF8897]/50 to-[#FF9EB5]/65 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      />

      {/* Light coral-pink gradient hairline border shell */}
      <div className="relative h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-[#FF9B7D]/65 via-[#FF8EA3]/45 to-black/15 shadow-[0_18px_46px_-26px_rgba(9,9,9,0.22)]">
        <article className="relative h-full rounded-[calc(1.5rem-1.5px)] bg-white overflow-hidden flex flex-col justify-between">
          <div className="aspect-[16/10] w-full bg-[#141414] overflow-hidden border-b border-[#FF957A]/20">
            {mediaNode}
          </div>

          <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#58584F]">
                <span className="font-mono tabular-nums font-medium text-[#C41E45]">
                  {displayIndex}
                </span>
                <span aria-hidden="true">/</span>
                <span>{project.category}</span>
                {project.projectType ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{project.projectType}</span>
                  </>
                ) : null}
              </div>

              <h3 className="mt-3.5 font-display text-2xl sm:text-[28px] font-semibold tracking-tight leading-[1.16] text-[#090909]">
                {project.name}
              </h3>

              {project.verifiedDescription ? (
                <p className="mt-3.5 text-[15px] leading-relaxed text-[#58584F]">
                  {project.verifiedDescription}
                </p>
              ) : null}

              {project.statusLabel || project.attributionNote ? (
                <p className="mt-4 pt-3.5 border-t border-black/[0.08] text-xs leading-relaxed text-[#58584F]">
                  {project.statusLabel ? (
                    <span className="font-mono font-medium text-[#C41E45]">
                      {project.statusLabel}
                    </span>
                  ) : null}
                  {project.statusLabel && project.attributionNote ? ' · ' : ''}
                  {project.attributionNote ? project.attributionNote : ''}
                </p>
              ) : null}
            </div>

            <div className="pt-5 border-t border-black/10 flex items-center">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#090909] px-6 py-2.5 min-h-[44px] text-sm font-semibold text-white hover:bg-gradient-to-r hover:from-[#FF9B7D] hover:to-[#FF879B] hover:text-[#090909] transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <span>View Website</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
