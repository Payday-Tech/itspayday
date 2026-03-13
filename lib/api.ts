const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const ELIGIBILITY_API_ENDPOINT =
  process.env.NEXT_PUBLIC_ELIGIBILITY_API_ENDPOINT ||
  '/api/forms/check-eligibility';

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

export interface EligibilityUploadMeta {
  label: 'voterIdUpload' | 'drivingLicenceUpload' | 'passportUpload';
  fileName: string;
  fileType: string;
  fileSize: number;
  storageRef: string;
}

export interface EligibilitySubmissionData {
  applicationId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  dob: string;
  pan: string;
  voterIdUpload: EligibilityUploadMeta | null;
  drivingLicenceUpload: EligibilityUploadMeta | null;
  passportUpload: EligibilityUploadMeta | null;
  phone1: string;
  phone2: string;
  address1: string;
  city1: string;
  state1: string;
  pincode1: string;
  address2: string;
  city2: string;
  state2: string;
  pincode2: string;
  consentAccepted: boolean;
  consentTimestamp: string;
  consentTextVersion: string;
  privacyAccepted: boolean;
  source: string;
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

export async function submitEligibilityForm(data: EligibilitySubmissionData): Promise<FormResponse> {
  const response = await fetch(ELIGIBILITY_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unable to submit right now. Please try again.' }));
    throw new Error(error.detail || 'Unable to submit right now. Please try again.');
  }

  return response.json();
}
