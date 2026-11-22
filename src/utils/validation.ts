import type {
  ContactFormData,
  ContactValidationErrors,
  ServiceSlug,
} from '../types/studio';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,18}$/;

export function isValidContactMethod(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.includes('@')) {
    return EMAIL_PATTERN.test(trimmed);
  }
  const digitCount = trimmed.replace(/\D/g, '').length;
  return PHONE_PATTERN.test(trimmed) && digitCount >= 7 && digitCount <= 15;
}

export function validateContactForm(
  data: ContactFormData
): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!data.contactMethod.trim()) {
    errors.contactMethod = 'Please provide an email address or phone number.';
  } else if (!isValidContactMethod(data.contactMethod)) {
    errors.contactMethod =
      'Enter a valid email address or a 7–15 digit phone number.';
  }

  if (!data.serviceRequired) {
    errors.serviceRequired = 'Please select a service.';
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message =
      'Please share a short note about your project (at least 10 characters).';
  }

  return errors;
}

const SERVICE_LABELS: Record<ServiceSlug, string> = {
  'website-design-development': 'Website Design & Development',
  'digital-marketing': 'Digital Marketing',
  seo: 'Search Engine Optimization (SEO)',
  multiple: 'Multiple Services',
};

export function getServiceLabel(slug: ServiceSlug): string {
  return SERVICE_LABELS[slug];
}

export function formatEnquirySummary(data: ContactFormData): string {
  const lines = [
    `Enquiry for Automate_Zero`,
    `Name: ${data.name.trim()}`,
    data.businessName.trim()
      ? `Business: ${data.businessName.trim()}`
      : null,
    `Email / Phone: ${data.contactMethod.trim()}`,
    `Service: ${getServiceLabel(data.serviceRequired)}`,
    `Message: ${data.message.trim()}`,
  ].filter(Boolean);

  return lines.join('\n');
}

function normalizeWhatsAppDigits(rawNumber: string | null): string | null {
  if (!rawNumber) return null;
  const digits = rawNumber.replace(/\D/g, '');
  if (digits.length < 8) return null;
  return digits.length === 10 ? `91${digits}` : digits;
}

function sanitizeWhatsAppText(message: string): string {
  return message
    .replace(/\r?\n+/g, ' - ')
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function buildWhatsAppUrl(
  rawNumber: string | null,
  message: string
): string | null {
  const digits = normalizeWhatsAppDigits(rawNumber);
  if (!digits) return null;
  const encodedText = encodeURIComponent(sanitizeWhatsAppText(message));
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodedText}`;
}

export function buildWhatsAppWebUrl(
  rawNumber: string | null,
  message: string
): string | null {
  const digits = normalizeWhatsAppDigits(rawNumber);
  if (!digits) return null;
  const encodedText = encodeURIComponent(sanitizeWhatsAppText(message));
  return `https://web.whatsapp.com/send?phone=${digits}&text=${encodedText}`;
}
