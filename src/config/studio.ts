import type { StudioConfig } from '../types/studio';
import avatarGlasses from '../assets/images/student_avatar_glasses_1795359284554.jpg';
import avatarClean from '../assets/images/student_avatar_clean_1795359284865.jpg';

const envWhatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || null;
const envContactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || null;

const OFFICIAL_SOCIAL_URLS = {
  youtube: 'https://www.youtube.com/@automatezero',
  linkedin: 'https://www.linkedin.com/company/automatezero/home/',
  instagram: 'https://www.instagram.com/automate_zero/',
} as const;

/**
 * Central business configuration for Automate_Zero.
 * Official business social accounts and communication channels live here.
 */
export const studioConfig: StudioConfig = {
  brandName: 'Automate_Zero',
  locationLabel: 'India',
  serviceAreaLabel: 'Businesses and startups across India',
  studioTypeLabel: 'Digital Studio',
  founders: [
    {
      id: 'dharshanoj-thrishal',
      name: 'Dharshanoj Thrishal',
      initials: 'DT',
      role: 'Co-Founder · Web Design & Front-End',
      bio: 'Designs and engineers custom React and TypeScript websites—focused on clear layouts, sharp typography, and responsive performance from wireframe to launch.',
      focusAreas: [
        'UI/UX & Responsive Web Design',
        'React, TypeScript & Modern CSS',
        'Mobile-First Front-End Builds',
      ],
      socials: [
        {
          label: 'LinkedIn',
          url: OFFICIAL_SOCIAL_URLS.linkedin,
          published: true,
        },
      ],
      photoSrc: avatarGlasses,
      published: true,
    },
    {
      id: 'patti-srinivas',
      name: 'Patti Srinivas',
      initials: 'PS',
      role: 'Co-Founder · Digital Marketing & SEO',
      bio: 'Leads technical SEO, search architecture, and focused digital marketing campaigns—connecting clean web engineering with steady enquiry growth.',
      focusAreas: [
        'Technical SEO & Schema Markup',
        'Search Visibility & Metadata',
        'Conversion-Focused Campaigns',
      ],
      socials: [
        {
          label: 'LinkedIn',
          url: OFFICIAL_SOCIAL_URLS.linkedin,
          published: true,
        },
      ],
      photoSrc: avatarClean,
      published: true,
    },
  ],
  contact: {
    whatsappNumber: envWhatsappNumber ?? '919347521582',
    whatsappDefaultMessage:
      'Hello Automate_Zero, I would like to discuss a website, digital marketing, or SEO project.',
    email: 'automatezero11@gmail.com',
    phone: null,
    formEndpoint: envContactEndpoint,
  },
  socialLinks: [
    {
      label: 'YouTube',
      url: OFFICIAL_SOCIAL_URLS.youtube,
      published: true,
    },
    {
      label: 'LinkedIn',
      url: OFFICIAL_SOCIAL_URLS.linkedin,
      published: true,
    },
    {
      label: 'Instagram',
      url: OFFICIAL_SOCIAL_URLS.instagram,
      published: true,
    },
  ],
};
