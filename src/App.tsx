import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { TechStackStrip } from './components/ui/TechStackStrip';
import { StudioPreloader } from './components/ui/StudioPreloader';
import { WhatsAppWidget } from './components/ui/WhatsAppWidget';
import { AboutSection } from './features/about/AboutSection';
import { ContactSection } from './features/contact/ContactSection';
import { HeroSection } from './features/hero/HeroSection';
import { ServicesSection } from './features/services/ServicesSection';
import { SelectedWorkSection } from './features/work/SelectedWorkSection';
import type { ServiceSlug } from './types/studio';

export default function App() {
  const [activeService, setActiveService] = useState<
    Exclude<ServiceSlug, 'multiple'>
  >('website-design-development');
  const [enquiryService, setEnquiryService] = useState<ServiceSlug>(
    'website-design-development'
  );

  return (
    <MotionConfig reducedMotion="user">
      <StudioPreloader />
      <div className="min-h-screen flex flex-col bg-[#f4f4ec] text-[#090909]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:px-4 focus:py-2 focus:bg-[#FF957A] focus:text-[#090909] focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          <HeroSection />
          <TechStackStrip />
          <ServicesSection
            activeService={activeService}
            onSelectService={setActiveService}
            onEnquireService={setEnquiryService}
          />
          <SelectedWorkSection />
          <AboutSection />
          <ContactSection preselectedService={enquiryService} />
        </main>

        <Footer />
        <WhatsAppWidget />
      </div>
    </MotionConfig>
  );
}
