import { useRef, useState } from 'react';
import { ArrowUpRight, MapPin, Send } from 'lucide-react';
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
import type { ServiceSlug } from '../../types/studio';
import { buildWhatsAppUrl, getServiceLabel } from '../../utils/validation';

interface ContactSectionProps {
  preselectedService: ServiceSlug;
}

const SCROLL_SPRING = { stiffness: 130, damping: 24, mass: 0.45 };

function WhatsAppOutlineIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.004 3.2c-7.06 0-12.8 5.736-12.8 12.796 0 2.256.592 4.46 1.716 6.4L3.08 29.12l6.892-1.804a12.75 12.75 0 0 0 6.032 1.516h.004c7.056 0 12.792-5.736 12.792-12.8 0-3.42-1.332-6.636-3.752-9.052A12.72 12.72 0 0 0 16.004 3.2Zm0 2.4c5.732 0 10.392 4.66 10.392 10.4 0 5.736-4.66 10.396-10.392 10.396a10.35 10.35 0 0 1-5.268-1.436l-.38-.224-3.94 1.032 1.052-3.84-.248-.396a10.35 10.35 0 0 1-1.612-5.536c0-5.74 4.66-10.396 10.396-10.396Zm5.32 13.792c-.288-.144-1.712-.844-1.976-.94-.264-.096-.456-.144-.648.144-.192.288-.744.94-.912 1.132-.168.192-.336.216-.624.072-.288-.144-1.22-.448-2.324-1.432-.86-.764-1.44-1.708-1.608-1.996-.168-.288-.016-.444.128-.588.128-.128.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.232-.56-.472-.484-.648-.492l-.552-.008c-.192 0-.504.072-.768.36-.264.288-1.008.984-1.008 2.4s1.032 2.784 1.176 2.976c.144.192 2.028 3.096 4.916 4.34.688.296 1.224.472 1.64.604.692.22 1.32.188 1.816.116.556-.084 1.712-.7 1.952-1.376.24-.676.24-1.256.168-1.376-.072-.12-.264-.192-.552-.336Z" />
    </svg>
  );
}

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [note, setNote] = useState('');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.35'],
  });
  const smoothScroll = useSpring(scrollYProgress, SCROLL_SPRING);

  // Split converge + dual-layer offset coral frame lock-in on scroll
  const leftColY = useTransform(smoothScroll, [0, 1], [30, 0]);
  const cardScale = useTransform(smoothScroll, [0, 1], [0.96, 1]);
  const cardY = useTransform(smoothScroll, [0, 1], [38, 0]);
  const frameOffsetX = useTransform(smoothScroll, [0, 1], [16, 0]);
  const frameOffsetY = useTransform(smoothScroll, [0, 1], [18, 0]);

  const composedMessage = [
    `Hello Automate_Zero, I would like to enquire about ${getServiceLabel(preselectedService)}.`,
    name.trim() ? `Name: ${name.trim()}` : null,
    email.trim() ? `Email: ${email.trim()}` : null,
    businessName.trim() ? `Company: ${businessName.trim()}` : null,
    note.trim() ? `Details: ${note.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappHref =
    buildWhatsAppUrl(studioConfig.contact.whatsappNumber, composedMessage) ??
    'https://api.whatsapp.com/send?phone=919347521582';

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#f4f4ec] py-20 sm:py-28 border-t border-black/[0.08] overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left column: Editorial headline & inline WhatsApp link */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: leftColY }}
            className="lg:col-span-5 will-change-transform"
          >
            <Reveal>
              <SectionKicker index="04" tone="on-paper">
                Let&apos;s Talk
              </SectionKicker>
              <h2
                id="contact-heading"
                className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight leading-[1.1] text-[#090909]"
              >
                Ready to build a{' '}
                <HeadingHighlight variant="coral" surface="light">
                  sharper online presence?
                </HeadingHighlight>
              </h2>
              <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-[#58584F] max-w-md">
                Tell us what your business is working on. We&apos;ll map out
                practical next steps across web design, marketing, and SEO: no
                pitch, no commitment.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold text-[#090909]">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 hover:text-[#C41E45] transition-colors whitespace-nowrap"
                >
                  <WhatsAppOutlineIcon className="w-4 h-4" />
                  <span>WhatsApp us</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#58584F] whitespace-nowrap">
                  <MapPin className="w-4 h-4 text-[#C41E45] shrink-0" aria-hidden="true" />
                  <span>Hyderabad</span>
                </span>
              </div>
            </Reveal>
          </motion.div>

          {/* Right column: Sharp white card with independent coral-pink shadow frame scroll lock-in */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { y: cardY, scale: cardScale }
            }
            className="lg:col-span-7 origin-center will-change-transform"
          >
            <div className="relative pb-3.5 pr-3.5">
              {/* Offset coral-peach to baby-pink backdrop block */}
              <motion.div
                aria-hidden="true"
                style={
                  prefersReducedMotion
                    ? undefined
                    : { x: frameOffsetX, y: frameOffsetY }
                }
                className="absolute inset-0 top-3.5 left-3.5 bg-gradient-to-br from-[#FF9B7D] via-[#FF8897] to-[#FF9EB5] will-change-transform"
              />

              {/* Main sharp white card */}
              <div className="relative bg-white border border-black/15 p-7 sm:p-10">
                <h3 className="font-display text-2xl sm:text-[1.75rem] font-bold tracking-tight text-[#090909]">
                  Start a conversation
                </h3>
                <p className="mt-1.5 text-sm text-[#58584F]">
                  Fill this out and send it straight to our WhatsApp.
                </p>

                <div className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#090909]"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-2 w-full bg-[#f4f4ec]/65 border border-black/15 px-3.5 py-2.5 text-sm text-[#090909] placeholder:text-[#78786e] focus:border-[#FF7A91] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF7A91] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#090909]"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-2 w-full bg-[#f4f4ec]/65 border border-black/15 px-3.5 py-2.5 text-sm text-[#090909] placeholder:text-[#78786e] focus:border-[#FF7A91] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF7A91] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-semibold text-[#090909]"
                    >
                      Company{' '}
                      <span className="font-normal text-[#58584F]">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your company or brand"
                      className="mt-2 w-full bg-[#f4f4ec]/65 border border-black/15 px-3.5 py-2.5 text-sm text-[#090909] placeholder:text-[#78786e] focus:border-[#FF7A91] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF7A91] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-note"
                      className="block text-xs font-semibold text-[#090909]"
                    >
                      What can we help build or grow?
                    </label>
                    <textarea
                      id="contact-note"
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Tell us a little about your website, digital marketing, or SEO goals..."
                      className="mt-2 w-full bg-[#f4f4ec]/65 border border-black/15 px-3.5 py-2.5 text-sm text-[#090909] placeholder:text-[#78786e] focus:border-[#FF7A91] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF7A91] transition-colors resize-y"
                    />
                  </div>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#090909] text-white hover:bg-gradient-to-r hover:from-[#FF9B7D] hover:to-[#FF879B] hover:text-[#090909] py-3.5 px-6 text-sm font-semibold transition-all duration-150"
                  >
                    <span>Send message on WhatsApp</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
