import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { approachSteps } from '../../data/approach';

export function ApproachSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const currentStep = approachSteps[activeIndex] ?? approachSteps[0];

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="bg-[#e8e8de] py-20 sm:py-28 border-t border-black/[0.08]"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Repeatless-style 2-card editorial comparison */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 rounded-3xl bg-[#0d0d0d] text-white p-8 sm:p-10 border border-white/[0.1] flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#FF957A]">
                  Studio Architecture
                </p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  One cohesive presence. Not disconnected vendors.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/65 max-w-xl">
                  When website design, digital marketing, and SEO are handled by
                  separate disconnected hands, messaging drifts and technical
                  foundations suffer. We structure all three around one clear
                  business goal.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white/60">
                <div>
                  <span className="font-mono text-[#FF957A] block">01</span>
                  <span className="mt-1 block text-white/85 font-medium">
                    Website architecture
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[#FF957A] block">02</span>
                  <span className="mt-1 block text-white/85 font-medium">
                    Campaign alignment
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[#FF957A] block">03</span>
                  <span className="mt-1 block text-white/85 font-medium">
                    Search fundamentals
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl bg-[#f4f4ec] text-[#090909] p-8 sm:p-10 border border-black/10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#C41E45]">
                  Direct Studio Craft
                </p>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                  Scoped with you. Built directly.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#58584F]">
                  No hand-off layers between sales and execution—the same studio
                  that scopes your site builds and refines it.
                </p>
              </div>

              <ul className="mt-8 space-y-3 border-t border-black/10 pt-6 text-sm">
                <li className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-[#090909]">Scope</span>
                  <span className="text-[#58584F] text-right">
                    Aligned on real business goals
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-[#090909]">Build</span>
                  <span className="text-[#58584F] text-right">
                    Clean responsive front-end code
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-[#090909]">Handover</span>
                  <span className="text-[#58584F] text-right">
                    Clear structure &amp; documentation
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Interactive 4-Phase Process Showcase */}
        <div className="mt-20 sm:mt-24">
          <SectionHeader
            eyebrow="How We Work"
            title="Four practical steps from discovery to launch."
            description="A transparent workflow so every layout decision, SEO structure, and marketing page is reviewed before it ships."
            tone="paper"
          />

          <div
            id="approach-heading"
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Interactive Phase Selector */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {approachSteps.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={step.index}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-pressed={isActive}
                    className={`text-left rounded-2xl p-5 border transition-all duration-150 cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#090909] text-white border-[#090909]'
                        : 'bg-[#f4f4ec] text-[#090909] border-black/10 hover:border-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs tabular-nums font-medium ${
                          isActive ? 'text-[#FF957A]' : 'text-[#58584F]'
                        }`}
                      >
                        {step.index}
                      </span>
                      <span className="font-display text-lg font-semibold tracking-tight">
                        {step.title}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`font-mono text-xs ${
                        isActive ? 'text-[#FF957A]' : 'text-[#58584F]'
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Detail Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.index}
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }
                  }
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-3xl bg-[#0d0d0d] text-white border border-white/[0.12] p-8 sm:p-10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <span className="font-mono text-xs tabular-nums text-[#FF957A]">
                        Stage {currentStep.index} of 0{approachSteps.length}
                      </span>
                      <span className="text-xs text-white/45">
                        Automate_Zero Process
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                      {currentStep.title}
                    </h3>

                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/70 max-w-xl">
                      {currentStep.description}
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {approachSteps.map((step, idx) => (
                        <button
                          key={step.index}
                          type="button"
                          aria-label={`View stage ${step.index}: ${step.title}`}
                          onClick={() => setActiveIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                            idx === activeIndex
                              ? 'w-8 bg-gradient-to-r from-[#FF9B7D] to-[#FF879B]'
                              : 'w-2 bg-white/25 hover:bg-white/45'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-xs text-white/50">
                      Clear milestones · No inflated promises
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
