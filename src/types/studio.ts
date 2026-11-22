export type ServiceSlug =
  | 'website-design-development'
  | 'digital-marketing'
  | 'seo'
  | 'multiple';

export interface ProjectEntry {
  id: string;
  name: string;
  category: string;
  projectType?: string;
  /** Short factual summary verified by the business prior to publication. */
  verifiedDescription: string | null;
  liveUrl: string;
  repositoryUrl?: string;
  /** Path to an actual project screenshot (never fabricated). */
  screenshotSrc: string | null;
  screenshotAlt?: string;
  /** Optional honest completion status label (e.g., for ongoing builds). */
  statusLabel?: string | null;
  /** Clarifies studio role or collaboration scope once confirmed. */
  attributionNote: string | null;
  /** Set to true only after ownership, permission, completion, and assets are verified. */
  published: boolean;
}

export interface ServiceOffering {
  index: string;
  slug: Exclude<ServiceSlug, 'multiple'>;
  title: string;
  summary: string;
  scope: string[];
  suitableFor: string;
  ctaLabel: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface FounderProfile {
  id: string;
  name: string | null;
  initials?: string;
  noteHeading?: string;
  role: string | null;
  bio: string | null;
  bioParagraphs?: string[];
  focusAreas?: string[];
  socials?: SocialLink[];
  photoSrc: string | null;
  published: boolean;
}

export interface SocialLink {
  label: string;
  url: string | null;
  published: boolean;
}

export interface StudioConfig {
  brandName: string;
  locationLabel: string;
  serviceAreaLabel: string;
  studioTypeLabel: string;
  founders: FounderProfile[];
  contact: {
    /**
     * Digits with country code and no '+' or spaces, e.g. '9198XXXXXXXX'.
     * Can also be set via VITE_WHATSAPP_NUMBER.
     */
    whatsappNumber: string | null;
    /** Default pre-filled message for WhatsApp enquiries. */
    whatsappDefaultMessage: string;
    /** Real business email address once configured. */
    email: string | null;
    /** Real business phone display string once configured. */
    phone: string | null;
    /**
     * Real backend endpoint (e.g. Formspree, custom API, or serverless route)
     * that accepts POST JSON submissions. Can also be set via VITE_CONTACT_ENDPOINT.
     */
    formEndpoint: string | null;
  };
  socialLinks: SocialLink[];
}

export interface ContactFormData {
  name: string;
  businessName: string;
  contactMethod: string;
  serviceRequired: ServiceSlug;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  contactMethod?: string;
  serviceRequired?: string;
  message?: string;
}

export type ContactSubmissionResult =
  | { status: 'submitted'; message: string }
  | { status: 'pending-integration'; message: string }
  | { status: 'error'; message: string };
