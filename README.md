# Automate_Zero

Website for **Automate_Zero**, an independent creative digital studio based in Telangana, India, specializing in website design and development, digital marketing, and search engine optimization (SEO).

## Architecture Overview

```text
src/
├── components/
│   ├── brand/         # AutomateLogo brand mark & wordmark
│   ├── layout/        # Navbar (top navigation + mobile drawer) & Footer
│   └── ui/            # StudioPreloader, TechStackStrip, HeadingHighlight, Reveal, WhatsAppWidget
├── config/
│   └── studio.ts      # Central brand, founder, WhatsApp, and social link config
├── data/
│   ├── approach.ts    # Studio standards ("What you get") items
│   ├── projects.ts    # Selected Work portfolio entries (Krupa Jewelry, Lumière Studio, ProAuto)
│   └── services.ts    # Core studio services & deliverables
├── features/
│   ├── hero/          # Asymmetric editorial hero & animated floating cards
│   ├── services/      # Interactive service tabs & scope view
│   ├── work/          # Selected Work portfolio section & ProjectCard renderer
│   ├── about/         # Independent studio overview, founder cards & studio standards
│   └── contact/       # Enquiry form & direct WhatsApp integration
├── integrations/
│   └── contactService.ts # Contact form submission & WhatsApp fallback adapter
├── types/
│   └── studio.ts      # Shared TypeScript interfaces
└── utils/
    └── validation.ts  # Form validation, enquiry summary, & WhatsApp URL helpers
```

## Configuration

1. **WhatsApp & Enquiry Form** (`src/config/studio.ts` or `.env`):
   - Set `VITE_WHATSAPP_NUMBER` (digits with country code, e.g. `9198XXXXXXXX`) or configure `studioConfig.contact.whatsappNumber`.
   - Optionally set `VITE_CONTACT_ENDPOINT` to connect a `POST` JSON form backend.
   - Update official social links in `studioConfig.contact.socialLinks`.
2. **Selected Work Projects** (`src/data/projects.ts`):
   - Manage project metadata, live URLs, and preview screenshots under `public/assets/projects/`.
3. **Favicons** (`public/`):
   - Includes `favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, and `apple-touch-icon.png`.

## Local Development & Build

```bash
npm install
npm run dev
```

- Development server runs at `http://localhost:3000`.
- Type-check: `npm run lint`
- Production build: `npm run build` (outputs to `dist/`)
- Preview production build: `npm run preview`
