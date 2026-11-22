import { studioConfig } from '../config/studio';
import type { ContactFormData, ContactSubmissionResult } from '../types/studio';
import { getServiceLabel } from '../utils/validation';

/**
 * Submits an enquiry to a configured backend endpoint.
 * Never fabricates a successful submission when no backend is configured.
 */
export async function submitContactEnquiry(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  const endpoint = studioConfig.contact.formEndpoint;

  if (!endpoint) {
    return {
      status: 'pending-integration',
      message:
        'Direct form submission is awaiting backend configuration. Your enquiry has not been sent yet—you can copy your formatted summary below or reach out via WhatsApp once configured.',
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name.trim(),
        businessName: data.businessName.trim() || undefined,
        contactMethod: data.contactMethod.trim(),
        serviceRequired: getServiceLabel(data.serviceRequired),
        message: data.message.trim(),
      }),
    });

    if (!response.ok) {
      return {
        status: 'error',
        message:
          'Unable to submit your enquiry right now. Please try again shortly or use a direct contact channel.',
      };
    }

    return {
      status: 'submitted',
      message: 'Your enquiry has been received. Thank you for reaching out.',
    };
  } catch {
    return {
      status: 'error',
      message:
        'A network error occurred while sending your enquiry. Please check your connection and try again.',
    };
  }
}
