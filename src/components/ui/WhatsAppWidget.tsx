import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { studioConfig } from '../../config/studio';
import { buildWhatsAppUrl, buildWhatsAppWebUrl } from '../../utils/validation';

const QUICK_TOPICS = [
  'Website Design & Development',
  'Digital Marketing',
  'Search Engine Optimization (SEO)',
] as const;

function WhatsAppGlyph({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.004 3.2c-7.06 0-12.8 5.736-12.8 12.796 0 2.256.592 4.46 1.716 6.4L3.08 29.12l6.892-1.804a12.75 12.75 0 0 0 6.032 1.516h.004c7.056 0 12.792-5.736 12.792-12.8 0-3.42-1.332-6.636-3.752-9.052A12.72 12.72 0 0 0 16.004 3.2Zm7.46 18.184c-.312.88-1.82 1.68-2.532 1.788-.644.096-1.46.136-2.356-.148-.544-.172-1.244-.404-2.14-.792-3.768-1.628-6.228-5.416-6.416-5.668-.188-.252-1.532-2.04-1.532-3.892 0-1.852.972-2.764 1.316-3.14.344-.376.752-.472 1.004-.472.252 0 .5.004.72.012.232.012.54-.088.844.644.312.752 1.064 2.596 1.156 2.784.096.188.16.408.032.66-.124.252-.188.408-.376.628-.188.22-.396.492-.564.66-.188.188-.384.392-.164.768.22.376.976 1.612 2.096 2.612 1.44 1.284 2.656 1.684 3.032 1.872.376.188.596.156.816-.096.22-.252.94-1.096 1.192-1.472.252-.376.5-.312.844-.188.344.124 2.192 1.036 2.568 1.224.376.188.628.284.72.44.092.156.092.908-.22 1.788Z" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    studioConfig.contact.whatsappDefaultMessage
  );
  const prefersReducedMotion = useReducedMotion();

  const whatsappNumber = studioConfig.contact.whatsappNumber;
  const activeText =
    message.trim() || studioConfig.contact.whatsappDefaultMessage;
  const whatsappHref = buildWhatsAppUrl(whatsappNumber, activeText);
  const whatsappWebHref = buildWhatsAppWebUrl(whatsappNumber, activeText);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!whatsappHref) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="dialog"
            aria-label="WhatsApp quick chat"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 12, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.96 }
            }
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(calc(100vw-2.5rem),21.5rem)] rounded-2xl border border-white/15 bg-[#0d0d0d] text-white shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-[#141414] px-4 py-3.5 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppGlyph className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-white truncate">
                    {studioConfig.brandName}
                  </p>
                  <p className="font-mono text-[11px] text-white/55 tabular-nums truncate">
                    +91 93475 21582 · WhatsApp
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp popup"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3.5">
              <p className="text-xs leading-relaxed text-white/70">
                Send us a quick message on WhatsApp to discuss your website,
                digital marketing, or SEO goals.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {QUICK_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() =>
                      setMessage(
                        `Hello Automate_Zero, I would like to enquire about ${topic}.`
                      )
                    }
                    className="rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-white/80 hover:border-[#FF957A]/60 hover:text-[#FF957A] transition-colors cursor-pointer text-left"
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div>
                <label htmlFor="wa-quick-message" className="sr-only">
                  WhatsApp message
                </label>
                <textarea
                  id="wa-quick-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-black/50 px-3 py-2.5 text-xs leading-relaxed text-white placeholder:text-white/40 focus:border-[#FF957A] focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#22bf5b] px-4 py-2.5 text-sm font-semibold text-[#062010] transition-colors"
                >
                  <WhatsAppGlyph className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                {whatsappWebHref ? (
                  <a
                    href={whatsappWebHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[11px] text-white/55 hover:text-[#FF957A] transition-colors"
                  >
                    Open directly in WhatsApp Web →
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Always-visible bottom-right floating WhatsApp trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Minimize WhatsApp chat' : 'Open WhatsApp chat (+91 93475 21582)'}
        className="group inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.65)] ring-1 ring-black/10 hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer"
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <WhatsAppGlyph className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}
