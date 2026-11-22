import type { ProjectEntry } from '../types/studio';

/**
 * Project portfolio registry.
 *
 * Centralizes verified project metadata, live URLs, repositories,
 * authentic live-site captures, and honest completion status.
 */
export const projects: ProjectEntry[] = [
  {
    id: 'krupa-jewelry',
    name: 'Krupa Jewelry',
    category: 'Jewellery & Retail',
    projectType: 'Jewellery Website',
    verifiedDescription:
      'A jewellery website designed to showcase collections through a refined visual presentation, product browsing, and direct customer enquiry.',
    liveUrl: 'https://krupa-jewelry.vercel.app/',
    repositoryUrl: 'https://github.com/Thrishal1105/Krupa-Jewelry',
    screenshotSrc: '/assets/projects/krupa-jewelry.png',
    screenshotAlt:
      'Krupa Jewelry live website homepage showcasing royal bridal jewellery collections and navigation',
    statusLabel: null,
    attributionNote: null,
    published: true,
  },
  {
    id: 'lumiere-studio',
    name: 'Lumière Studio',
    category: 'Photography',
    projectType: 'Photography Portfolio Website',
    verifiedDescription:
      'A photography website focused on presenting visual work through immersive galleries, portfolio browsing, and an image-led experience.',
    liveUrl: 'https://lumiere-studio-photography.vercel.app/',
    repositoryUrl: 'https://github.com/Thrishal1105/Lumiere-Studio-photography',
    screenshotSrc: '/assets/projects/lumiere-studio.png',
    screenshotAlt:
      'Lumière Studio live photography portfolio website featuring editorial typography and wedding photo galleries',
    statusLabel: null,
    attributionNote: null,
    published: true,
  },
  {
    id: 'proauto',
    name: 'ProAuto',
    category: 'Automotive',
    projectType: 'Car Sales & Services Website',
    verifiedDescription:
      'An automotive website bringing car sales and service information together in a digital experience designed to help customers explore offerings and connect with the business.',
    liveUrl: 'https://carsalesandservices.vercel.app/',
    repositoryUrl: 'https://github.com/srinivas14300/proauto-car-sales-services',
    screenshotSrc: '/assets/projects/proauto.png',
    screenshotAlt:
      'ProAuto live car sales and services website homepage featuring service booking and vehicle browsing',
    statusLabel: 'In progress · Work pending',
    attributionNote:
      'Active project — core structure is live with remaining work still in progress.',
    published: true,
  },
];

export const publishedProjects = projects.filter((project) => project.published);
