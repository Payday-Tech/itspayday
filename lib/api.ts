const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface FormResponse {
  success: boolean;
  message: string;
}

interface GetStartedFormData {
  first_name: string;
  last_name: string;
  occupation: string;
  recaptcha_token: string;
}

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
  recaptcha_token: string;
}

interface LenderPartnershipFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  notes?: string;
  recaptcha_token: string;
}

async function submitForm<T>(endpoint: string, data: T): Promise<FormResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Submission failed' }));
    throw new Error(error.detail || 'Submission failed');
  }

  return response.json();
}

export async function submitGetStartedForm(data: GetStartedFormData): Promise<FormResponse> {
  return submitForm('/api/forms/get-started', data);
}

export async function submitContactForm(data: ContactFormData): Promise<FormResponse> {
  return submitForm('/api/forms/contact', data);
}

export async function submitLenderPartnershipForm(data: LenderPartnershipFormData): Promise<FormResponse> {
  return submitForm('/api/forms/lender-partnership', data);
}
