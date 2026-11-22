import { ArrowUpRight, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { FounderProfile } from '../../types/studio';

interface FounderProfileCardProps {
  founder: FounderProfile;
  index: number;
}

const VIEWPORT_OPTS = { once: true, amount: 0.2 } as const;

export function FounderProfileCard({
  founder,
  index,
}: FounderProfileCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const linkedin = founder.socials?.find(
    (social) => social.label === 'LinkedIn' && social.published && social.url
  );

  return (
    <motion.article
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 18 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_OPTS}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-full"
    >
      {/* Offset coral-peach to baby-pink frame accent matching site signature */}
      <div
        aria-hidden="true"
        className="absolute inset-0 top-2.5 left-2.5 rounded-2xl bg-gradient-to-br from-[#FF9B7D] via-[#FF8897] to-[#FF9EB5] opacity-85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      />

      {/* Compact Side-by-Side Team Member Card */}
      <div className="relative h-full rounded-2xl border border-black/12 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-[0_14px_32px_-20px_rgba(9,9,9,0.22)]">
        <div>
          {/* Top Identity Row: Portrait + Name, Role & LinkedIn */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-[#e8e8de]">
              {founder.photoSrc ? (
                <img
                  src={founder.photoSrc}
                  alt={founder.name ?? 'Automate_Zero Team Member'}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#090909] leading-tight">
                {founder.name}
              </h3>

              {founder.role ? (
                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#C41E45]">
                  {founder.role}
                </p>
              ) : null}

              {linkedin?.url ? (
                <div className="mt-3">
                  <a
                    href={linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      founder.name
                        ? `Automate_Zero on LinkedIn (${founder.name})`
                        : 'Automate_Zero on LinkedIn'
                    }
                    className="inline-flex items-center gap-1.5 min-h-[40px] rounded-lg bg-[#090909] px-4 py-2 text-xs font-semibold text-white hover:bg-gradient-to-r hover:from-[#FF9B7D] hover:to-[#FF879B] hover:text-[#090909] transition-all duration-150 whitespace-nowrap"
                  >
                    <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* Concise Bio */}
          {founder.bio ? (
            <p className="mt-4 pt-4 border-t border-black/10 text-sm leading-relaxed text-[#58584F]">
              {founder.bio}
            </p>
          ) : null}
        </div>

        {/* Concise Focus Areas */}
        {founder.focusAreas && founder.focusAreas.length > 0 ? (
          <div className="mt-4 pt-3.5 border-t border-black/[0.07]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#58584F]">
              Focus Areas
            </p>
            <p className="mt-1.5 text-xs sm:text-[13px] font-medium leading-relaxed text-[#090909]">
              {founder.focusAreas.join(' · ')}
            </p>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
