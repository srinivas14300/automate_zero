import type { ServiceOffering } from '../types/studio';

export const services: ServiceOffering[] = [
  {
    index: '01',
    slug: 'website-design-development',
    title: 'Website Design & Development',
    summary:
      'We create websites that help people understand your business, explore what you offer, and get in touch with you. Every website is designed to suit your business and work smoothly on mobile phones and computers.',
    scope: [
      'Planning the website pages and deciding what information to include.',
      'Designing and building a website that suits your business.',
      'Making sure the website works well on mobiles, tablets, and computers.',
      'Adding useful features such as contact forms, WhatsApp links, service details, and image galleries where needed.',
    ],
    suitableFor:
      'Local businesses that need their first website, businesses looking to update an old website, and startups that want to introduce their products or services online.',
    ctaLabel: "Let's Build Your Website",
  },
  {
    index: '02',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    summary:
      'We help businesses promote their products and services online. We focus on understanding your audience, presenting your business clearly, and choosing suitable ways to reach potential customers.',
    scope: [
      'Understanding your business and the customers you want to reach.',
      'Planning how to promote your products or services online.',
      'Helping prepare clear messages and promotional content.',
      'Reviewing your online presence and identifying ways to improve it.',
    ],
    suitableFor:
      'Local businesses and startups that want more people to discover their products or services online.',
    ctaLabel: "Let's Discuss Marketing",
  },
  {
    index: '03',
    slug: 'seo',
    title: 'Search Engine Optimization (SEO)',
    summary:
      'We help improve your website so search engines can understand its content and people can find your business more easily when searching for relevant products or services.',
    scope: [
      'Finding relevant search terms people use to look for your services.',
      'Improving website titles, descriptions, headings, and page content.',
      'Checking website structure and helping search engines find and understand its pages.',
      "Improving your website's local search information so nearby customers can discover your business.",
    ],
    suitableFor:
      'Local businesses, shops, service providers, and startups that want their websites to be easier to find through Google and other search engines.',
    ctaLabel: "Let's Improve Your SEO",
  },
];
