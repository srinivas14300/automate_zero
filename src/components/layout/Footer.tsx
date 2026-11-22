import { useRef } from 'react';
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Youtube,
} from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { studioConfig } from '../../config/studio';
import { buildWhatsAppUrl } from '../../utils/validation';
import { AutomateLogo } from '../brand/AutomateLogo';

const FOOTER_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SCROLL_SPRING = { stiffness: 120, damping: 24, mass: 0.45 };

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const email = studioConfig.contact.email ?? 'automatezero11@gmail.com';
  const whatsappHref = buildWhatsAppUrl(
    studioConfig.contact.whatsappNumber,
    studioConfig.contact.whatsappDefaultMessage
  );

  const youtubeLink = studioConfig.socialLinks.find(
    (item) => item.label === 'YouTube' && item.published && item.url
  );
  const instagramLink = studioConfig.socialLinks.find(
    (item) => item.label === 'Instagram' && item.published && item.url
  );
  const linkedinLink = studioConfig.socialLinks.find(
    (item) => item.label === 'LinkedIn' && item.published && item.url
  );

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const smoothScroll = useSpring(scrollYProgress, SCROLL_SPRING);
  const displayY = useTransform(smoothScroll, [0.25, 1], [36, 0]);
  const displayScale = useTransform(smoothScroll, [0.25, 1], [0.94, 1]);

  return (
    <footer
      ref={footerRef}
      data-nav-surface="dark"
      className="bg-[#090909] text-white/70 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center">
              <AutomateLogo />
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/60 max-w-sm">
              Custom website design, front-end development, digital marketing,
              and technical SEO for growing businesses.
            </p>
            <p className="mt-6 text-xs text-white/45">
              © {currentYear} {studioConfig.brandName}. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-white mb-4">Quick Links</p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-[#FF957A] transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 space-y-3.5">
            <p className="text-xs font-semibold text-white mb-4">Contact</p>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2.5 text-sm text-white/80 hover:text-[#FF957A] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#FF957A] shrink-0" aria-hidden="true" />
              <span>{email}</span>
            </a>

            <p className="flex items-center gap-2.5 text-sm text-white/70">
              <MapPin className="w-4 h-4 text-[#FF957A] shrink-0" aria-hidden="true" />
              <span>Hyderabad</span>
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`mailto:${email}`}
                aria-label="Email Automate_Zero"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/75 hover:border-[#FF957A]/60 hover:text-[#FF957A] transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>

              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Automate_Zero"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/75 hover:border-[#FF957A]/60 hover:text-[#FF957A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : null}

              {youtubeLink?.url ? (
                <a
                  href={youtubeLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Automate_Zero on YouTube"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/75 hover:border-[#FF957A]/60 hover:text-[#FF957A] transition-colors"
                >
                  <Youtube className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : null}

              {instagramLink?.url ? (
                <a
                  href={instagramLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Automate_Zero on Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/75 hover:border-[#FF957A]/60 hover:text-[#FF957A] transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : null}

              {linkedinLink?.url ? (
                <a
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Automate_Zero on LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/75 hover:border-[#FF957A]/60 hover:text-[#FF957A] transition-colors"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Oversized Full-Width Faded Brand Display Band with rising curtain reveal */}
      <div
        aria-hidden="true"
        className="relative w-full overflow-hidden border-t border-white/[0.08] bg-[#090909] bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px] pt-8 pb-3 sm:pt-12 sm:pb-5 select-none"
      >
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: displayY, scale: displayScale }
          }
          className="w-full px-2 sm:px-4 flex justify-center origin-bottom will-change-transform"
        >
          <span className="font-display font-bold tracking-[-0.045em] leading-[0.86] text-[13.8vw] sm:text-[14.2vw] whitespace-nowrap bg-gradient-to-b from-[#FF9B7D]/65 via-[#FF879B]/30 to-[#090909]/0 bg-clip-text text-transparent">
            {studioConfig.brandName}
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
