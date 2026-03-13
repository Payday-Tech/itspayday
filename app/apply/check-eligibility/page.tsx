'use client';

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { EligibilitySubmissionData, submitEligibilityForm } from '@/lib/api';

type StepKey = 'basic' | 'identity' | 'address' | 'additional' | 'consent';
type UploadKind = 'voterIdUpload' | 'drivingLicenceUpload' | 'passportUpload';

interface UploadState {
  file: File;
  previewUrl: string;
  error?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  dob: string;
  hasPan: 'yes' | 'no';
  pan: string;
  fallbackIdType: UploadKind | '';
  address1: string;
  city1: string;
  state1: string;
  pincode1: string;
  phone2: string;
  consentAccepted: boolean;
  privacyAccepted: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const STEP_ORDER: StepKey[] = ['basic', 'identity', 'address', 'additional', 'consent'];
const CONSENT_TEXT_VERSION = 'v1_2026_03';
const ACCEPTED_UPLOAD_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const ACCEPTED_UPLOAD_EXTENSIONS = '.jpg,.jpeg,.png,.pdf';
const MAX_UPLOAD_SIZE = 8 * 1024 * 1024;

const FALLBACK_ID_OPTIONS: Array<{ value: UploadKind; label: string }> = [
  { value: 'voterIdUpload', label: 'Voter ID photo' },
  { value: 'drivingLicenceUpload', label: 'Driving Licence photo' },
  { value: 'passportUpload', label: 'Passport photo' },
];

const STATE_OPTIONS = [
  { code: 'AN', name: 'Andaman and Nicobar Islands' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'AR', name: 'Arunachal Pradesh' },
  { code: 'AS', name: 'Assam' },
  { code: 'BR', name: 'Bihar' },
  { code: 'CH', name: 'Chandigarh' },
  { code: 'CG', name: 'Chhattisgarh' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: 'DL', name: 'Delhi' },
  { code: 'GA', name: 'Goa' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'HR', name: 'Haryana' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'JK', name: 'Jammu and Kashmir' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'KL', name: 'Kerala' },
  { code: 'LA', name: 'Ladakh' },
  { code: 'LD', name: 'Lakshadweep' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'MN', name: 'Manipur' },
  { code: 'ML', name: 'Meghalaya' },
  { code: 'MZ', name: 'Mizoram' },
  { code: 'NL', name: 'Nagaland' },
  { code: 'OD', name: 'Odisha' },
  { code: 'PY', name: 'Puducherry' },
  { code: 'PB', name: 'Punjab' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'SK', name: 'Sikkim' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TS', name: 'Telangana' },
  { code: 'TR', name: 'Tripura' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'UK', name: 'Uttarakhand' },
  { code: 'WB', name: 'West Bengal' },
];

const stepLabels: Record<StepKey, string> = {
  basic: 'Basic details',
  identity: 'Identity',
  address: 'Address',
  additional: 'Additional details',
  consent: 'Consent and submit',
};

const initialData: FormData = {
  firstName: '',
  lastName: '',
  mobile: '',
  dob: '',
  hasPan: 'yes',
  pan: '',
  fallbackIdType: '',
  address1: '',
  city1: '',
  state1: '',
  pincode1: '',
  phone2: '',
  consentAccepted: false,
  privacyAccepted: false,
};

const onlyLettersRegex = /^[A-Za-z\s'-]+$/;
const mobileRegex = /^[6-9][0-9]{9}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const addressRegex = /^[A-Za-z0-9\s,/.#-]{5,120}$/;
const cityRegex = /^[A-Za-z\s'-]+$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

const formatDobInput = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const parseDobToDate = (dob: string): Date | null => {
  const parts = dob.split('/');
  if (parts.length !== 3) return null;
  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);
  if (!day || !month || !year) return null;
  const date = new Date(year, month - 1, day);
  const isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isValid ? date : null;
};

const calculateAge = (dobDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDifference = today.getMonth() - dobDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
    age -= 1;
  }
  return age;
};

const genId = () => `PD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const getFallbackLabel = (kind: UploadKind | '') => FALLBACK_ID_OPTIONS.find((option) => option.value === kind)?.label || '';

export default function CheckEligibilityPage() {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<StepKey>('basic');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploads, setUploads] = useState<Partial<Record<UploadKind, UploadState>>>({});
  const applicationIdRef = useRef<string>(genId());
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      Object.values(uploads).forEach((upload) => {
        if (upload?.previewUrl) URL.revokeObjectURL(upload.previewUrl);
      });
    };
  }, [uploads]);

  const currentStepIndex = STEP_ORDER.indexOf(step);
  const progressPercent = ((currentStepIndex + 1) / STEP_ORDER.length) * 100;

  const validateBasic = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!data.firstName.trim() || !onlyLettersRegex.test(data.firstName.trim())) {
      nextErrors.firstName = 'Please enter a valid first name';
    }
    if (!data.lastName.trim() || !onlyLettersRegex.test(data.lastName.trim())) {
      nextErrors.lastName = 'Please enter a valid last name';
    }
    if (!mobileRegex.test(data.mobile)) {
      nextErrors.mobile = 'Please enter a valid mobile number';
    }
    return nextErrors;
  };

  const validateIdentity = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const dobDate = parseDobToDate(data.dob);
    if (!dobDate) {
      nextErrors.dob = 'Please enter a valid date of birth';
    } else {
      const age = calculateAge(dobDate);
      if (age < 18 || age > 70) {
        nextErrors.dob = 'Age should be between 18 and 70 years';
      }
    }

    if (data.hasPan === 'yes') {
      if (!panRegex.test(data.pan)) {
        nextErrors.pan = 'Please enter a valid PAN';
      }
    }

    if (data.hasPan === 'no') {
      if (!data.fallbackIdType) {
        nextErrors.fallbackIdType = 'Please choose one ID to upload';
      } else if (!uploads[data.fallbackIdType]) {
        nextErrors.fallbackUpload = 'Please upload a clear file';
      }
    }

    return nextErrors;
  };

  const validateAddress = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!addressRegex.test(data.address1.trim())) {
      nextErrors.address1 = 'Please enter a valid address';
    }
    if (!data.city1.trim() || !cityRegex.test(data.city1.trim())) {
      nextErrors.city1 = 'Please enter a valid city';
    }
    if (!data.state1) {
      nextErrors.state1 = 'Please select your state';
    }
    if (!pincodeRegex.test(data.pincode1)) {
      nextErrors.pincode1 = 'Please enter a valid pincode';
    }
    return nextErrors;
  };

  const validateAdditional = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (data.phone2 && !mobileRegex.test(data.phone2)) {
      nextErrors.phone2 = 'Please enter a valid mobile number';
    }
    if (data.phone2 && data.phone2 === data.mobile) {
      nextErrors.phone2 = 'Alternate number cannot be same as mobile number';
    }
    return nextErrors;
  };

  const validateConsent = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!data.consentAccepted) {
      nextErrors.consentAccepted = 'Please give consent to continue';
    }
    if (!data.privacyAccepted) {
      nextErrors.privacyAccepted = 'Please accept privacy acknowledgement';
    }
    return nextErrors;
  };

  const validateStep = (stepKey: StepKey): FormErrors => {
    switch (stepKey) {
      case 'basic':
        return validateBasic();
      case 'identity':
        return validateIdentity();
      case 'address':
        return validateAddress();
      case 'additional':
        return validateAdditional();
      case 'consent':
        return { ...validateBasic(), ...validateIdentity(), ...validateAddress(), ...validateAdditional(), ...validateConsent() };
      default:
        return {};
    }
  };

  const handleTextChange = (key: keyof FormData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, fallbackUpload: undefined }));
  };

  const openDatePicker = () => {
    if (datePickerRef.current?.showPicker) {
      datePickerRef.current.showPicker();
    } else {
      datePickerRef.current?.focus();
    }
  };

  const handleUploadChange = (kind: UploadKind, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_UPLOAD_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, [kind]: 'Please upload a clear file (JPG, PNG or PDF)' }));
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setErrors((prev) => ({ ...prev, [kind]: 'Please upload a clear file under 8 MB' }));
      return;
    }

    setErrors((prev) => ({ ...prev, [kind]: undefined }));
    setUploads((prev) => {
      if (prev[kind]?.previewUrl) URL.revokeObjectURL(prev[kind]!.previewUrl);
      return {
        ...prev,
        [kind]: {
          file,
          previewUrl: URL.createObjectURL(file),
        },
      };
    });
  };

  const removeUpload = (kind: UploadKind) => {
    setUploads((prev) => {
      if (prev[kind]?.previewUrl) URL.revokeObjectURL(prev[kind]!.previewUrl);
      const cloned = { ...prev };
      delete cloned[kind];
      return cloned;
    });
  };

  const nextStep = () => {
    const nextErrors = validateStep(step);
    if (Object.keys(nextErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      return;
    }
    setStep(STEP_ORDER[currentStepIndex + 1]);
  };

  const backStep = () => {
    if (currentStepIndex > 0) setStep(STEP_ORDER[currentStepIndex - 1]);
  };

  const submitDisabled = submitting || Object.keys(validateStep('consent')).length > 0;

  const buildPayload = (): EligibilitySubmissionData => {
    const asUploadMeta = (kind: UploadKind) => {
      const upload = uploads[kind];
      if (!upload) return null;
      return {
        label: kind,
        fileName: upload.file.name,
        fileType: upload.file.type,
        fileSize: upload.file.size,
        storageRef: `pending-upload://${applicationIdRef.current}/${kind}/${upload.file.name}`,
      } as const;
    };

    return {
      applicationId: applicationIdRef.current,
      fullName: `${data.firstName.trim()} ${data.lastName.trim()}`.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      dob: data.dob,
      pan: data.hasPan === 'yes' ? data.pan.toUpperCase() : '',
      voterIdUpload: data.hasPan === 'no' && data.fallbackIdType === 'voterIdUpload' ? asUploadMeta('voterIdUpload') : null,
      drivingLicenceUpload: data.hasPan === 'no' && data.fallbackIdType === 'drivingLicenceUpload' ? asUploadMeta('drivingLicenceUpload') : null,
      passportUpload: data.hasPan === 'no' && data.fallbackIdType === 'passportUpload' ? asUploadMeta('passportUpload') : null,
      phone1: data.mobile,
      phone2: data.phone2,
      address1: data.address1.trim(),
      city1: data.city1.trim(),
      state1: data.state1,
      pincode1: data.pincode1,
      address2: '',
      city2: '',
      state2: '',
      pincode2: '',
      consentAccepted: data.consentAccepted,
      consentTimestamp: new Date().toISOString(),
      consentTextVersion: CONSENT_TEXT_VERSION,
      privacyAccepted: data.privacyAccepted,
      source: 'hidden_direct_link',
    };
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const allErrors = validateStep('consent');
    if (Object.keys(allErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...allErrors }));
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      await submitEligibilityForm(buildPayload());
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main>
        <section>
          <div className="card eligibility-shell success-shell">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h1>Thank you</h1>
            <p>Your details have been received.</p>
            <p>Our team will use this information to run an eligibility check and will contact you if there is a next step.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        <div className="card eligibility-shell">
          <div className="badge">Secure form</div>
          <h1 className="eligibility-title">Check your eligibility</h1>
          <p className="small">This helps us check your eligibility. It takes only a few minutes.</p>

          <div className="eligibility-progress" aria-label="Form progress">
            <div className="eligibility-progress-bar" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="eligibility-steps">
            {STEP_ORDER.map((stepKey, index) => (
              <div key={stepKey} className={`eligibility-step-chip ${index <= currentStepIndex ? 'active' : ''}`}>{index + 1}. {stepLabels[stepKey]}</div>
            ))}
          </div>

          <form className="form-grid eligibility-form" onSubmit={handleSubmit}>
            {step === 'basic' && (
              <>
                <h2>Basic details</h2>
                <div>
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" value={data.firstName} onChange={(e) => handleTextChange('firstName', e.target.value)} autoComplete="given-name" />
                  <p className="helper-text">Enter your name as you normally use it</p>
                  {errors.firstName && <p className="helper-text form-error">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" value={data.lastName} onChange={(e) => handleTextChange('lastName', e.target.value)} autoComplete="family-name" />
                  <p className="helper-text">Enter your name as you normally use it</p>
                  {errors.lastName && <p className="helper-text form-error">{errors.lastName}</p>}
                </div>
                <div>
                  <label htmlFor="mobile">Mobile number</label>
                  <input id="mobile" inputMode="numeric" maxLength={10} value={data.mobile} onChange={(e) => handleTextChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} autoComplete="tel" />
                  <p className="helper-text">Enter your 10-digit mobile number</p>
                  {errors.mobile && <p className="helper-text form-error">{errors.mobile}</p>}
                </div>
              </>
            )}

            {step === 'identity' && (
              <>
                <h2>Identity</h2>
                <div>
                  <label htmlFor="dob">Date of birth</label>
                  <div className="dob-row">
                    <input id="dob" placeholder="DD/MM/YYYY" inputMode="numeric" maxLength={10} value={data.dob} onChange={(e) => handleTextChange('dob', formatDobInput(e.target.value))} />
                    <button type="button" className="button secondary dob-button" onClick={openDatePicker}>Pick date</button>
                    <input
                      ref={datePickerRef}
                      type="date"
                      className="visually-hidden-date"
                      onChange={(e) => {
                        if (!e.target.value) return;
                        const [year, month, day] = e.target.value.split('-');
                        handleTextChange('dob', `${day}/${month}/${year}`);
                      }}
                    />
                  </div>
                  <p className="helper-text">Enter your date of birth</p>
                  {errors.dob && <p className="helper-text form-error">{errors.dob}</p>}
                </div>

                <div>
                  <label>Do you have a PAN card?</label>
                  <div className="radio-group">
                    <label className="radio-item"><input type="radio" name="hasPan" checked={data.hasPan === 'yes'} onChange={() => {
                      setData((prev) => ({ ...prev, hasPan: 'yes', fallbackIdType: '' }));
                      setErrors((prev) => ({ ...prev, fallbackIdType: undefined, fallbackUpload: undefined }));
                    }} /> Yes</label>
                    <label className="radio-item"><input type="radio" name="hasPan" checked={data.hasPan === 'no'} onChange={() => {
                      setData((prev) => ({ ...prev, hasPan: 'no', pan: '' }));
                      setErrors((prev) => ({ ...prev, pan: undefined }));
                    }} /> No</label>
                  </div>
                </div>

                {data.hasPan === 'yes' ? (
                  <div>
                    <label htmlFor="pan">PAN number</label>
                    <input id="pan" maxLength={10} value={data.pan} onChange={(e) => handleTextChange('pan', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))} />
                    <p className="helper-text">Enter your PAN number. This helps us check your eligibility faster</p>
                    {errors.pan && <p className="helper-text form-error">{errors.pan}</p>}
                  </div>
                ) : (
                  <div className="fallback-upload-wrap">
                    <p className="helper-text"><strong>If you do not have PAN, you can upload one other ID photo.</strong> You do not need to type the ID number.</p>
                    <div className="upload-card">
                      <label>Choose one ID to upload</label>
                      <div className="radio-group fallback-radio-group">
                        {FALLBACK_ID_OPTIONS.map((option) => (
                          <label key={option.value} className="radio-item">
                            <input
                              type="radio"
                              name="fallbackIdType"
                              checked={data.fallbackIdType === option.value}
                              onChange={() => {
                                setData((prev) => ({ ...prev, fallbackIdType: option.value }));
                                setErrors((prev) => ({ ...prev, fallbackIdType: undefined, fallbackUpload: undefined }));
                              }}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                      {errors.fallbackIdType && <p className="helper-text form-error">{errors.fallbackIdType}</p>}
                    </div>

                    {data.fallbackIdType && (
                      <div className="upload-card">
                        <label>{getFallbackLabel(data.fallbackIdType)}</label>
                        <p className="helper-text">Upload a clear photo of your ID</p>
                        <input type="file" accept={ACCEPTED_UPLOAD_EXTENSIONS} capture="environment" onChange={(event) => handleUploadChange(data.fallbackIdType as UploadKind, event)} />
                        {errors.fallbackUpload && <p className="helper-text form-error">{errors.fallbackUpload}</p>}
                        {errors[data.fallbackIdType] && <p className="helper-text form-error">{errors[data.fallbackIdType]}</p>}
                        {uploads[data.fallbackIdType] && (
                          <div className="upload-preview">
                            <p className="small">{uploads[data.fallbackIdType]?.file.name}</p>
                            <div className="upload-actions">
                              {uploads[data.fallbackIdType]?.file.type.startsWith('image/') && <a href={uploads[data.fallbackIdType]?.previewUrl} target="_blank" rel="noreferrer" className="button-link">Preview</a>}
                              <button type="button" className="button-link" onClick={() => removeUpload(data.fallbackIdType as UploadKind)}>Remove</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {step === 'address' && (
              <>
                <h2>Address</h2>
                <div>
                  <label htmlFor="address1">House / building / street</label>
                  <textarea id="address1" rows={3} value={data.address1} onChange={(e) => handleTextChange('address1', e.target.value)} />
                  <p className="helper-text">Enter the address where you stay now</p>
                  {errors.address1 && <p className="helper-text form-error">{errors.address1}</p>}
                </div>
                <div>
                  <label htmlFor="city1">City</label>
                  <input id="city1" value={data.city1} onChange={(e) => handleTextChange('city1', e.target.value)} />
                  {errors.city1 && <p className="helper-text form-error">{errors.city1}</p>}
                </div>
                <div>
                  <label htmlFor="state1">State</label>
                  <select id="state1" value={data.state1} onChange={(e) => handleTextChange('state1', e.target.value)}>
                    <option value="">Select state</option>
                    {STATE_OPTIONS.map((stateOption) => (
                      <option key={stateOption.code} value={stateOption.code}>{stateOption.name} ({stateOption.code})</option>
                    ))}
                  </select>
                  {errors.state1 && <p className="helper-text form-error">{errors.state1}</p>}
                </div>
                <div>
                  <label htmlFor="pincode1">Pincode</label>
                  <input id="pincode1" inputMode="numeric" maxLength={6} value={data.pincode1} onChange={(e) => handleTextChange('pincode1', e.target.value.replace(/\D/g, '').slice(0, 6))} />
                  <p className="helper-text">Enter 6-digit pincode</p>
                  {errors.pincode1 && <p className="helper-text form-error">{errors.pincode1}</p>}
                </div>
              </>
            )}

            {step === 'additional' && (
              <>
                <h2>Additional details</h2>
                <p className="notice">This step is optional. You can skip this if you want.</p>
                <div>
                  <label htmlFor="phone2">Alternate mobile number (optional)</label>
                  <input id="phone2" inputMode="numeric" maxLength={10} value={data.phone2} onChange={(e) => handleTextChange('phone2', e.target.value.replace(/\D/g, '').slice(0, 10))} />
                  <p className="helper-text">Enter another mobile number only if you have one</p>
                  {errors.phone2 && <p className="helper-text form-error">{errors.phone2}</p>}
                </div>
              </>
            )}

            {step === 'consent' && (
              <>
                <h2>Consent and submit</h2>
                <div className="review-card">
                  <h3>Review your details</h3>
                  <ul>
                    <li><strong>Name:</strong> {data.firstName} {data.lastName}</li>
                    <li><strong>Mobile:</strong> {data.mobile}</li>
                    <li><strong>Date of birth:</strong> {data.dob}</li>
                    <li><strong>PAN:</strong> {data.hasPan === 'yes' ? data.pan : 'Not provided'}</li>
                    {data.hasPan === 'no' && data.fallbackIdType && <li><strong>Uploaded ID:</strong> {getFallbackLabel(data.fallbackIdType)}</li>}
                    <li><strong>Address:</strong> {data.address1}, {data.city1}, {data.state1} - {data.pincode1}</li>
                    {data.phone2 && <li><strong>Alternate mobile:</strong> {data.phone2}</li>}
                  </ul>
                </div>

                <p className="small"><strong>Please give your consent so we can check your eligibility.</strong></p>
                <label className="checkbox-line">
                  <input type="checkbox" checked={data.consentAccepted} onChange={(e) => handleTextChange('consentAccepted', e.target.checked)} />
                  <span>
                    I hereby authorize PayDay and its lending partner(s), including regulated financial institution partners processing my application, to obtain my credit information report / score from credit bureaus and use the same for the purpose of evaluating my eligibility for a loan or salary advance. I confirm that the information provided by me is true and correct. I understand that this consent will be stored electronically for verification and audit purposes.
                  </span>
                </label>
                {errors.consentAccepted && <p className="helper-text form-error">{errors.consentAccepted}</p>}

                <label className="checkbox-line">
                  <input type="checkbox" checked={data.privacyAccepted} onChange={(e) => handleTextChange('privacyAccepted', e.target.checked)} />
                  <span>I acknowledge the privacy policy and allow PayDay to process my details for this eligibility check.</span>
                </label>
                {errors.privacyAccepted && <p className="helper-text form-error">{errors.privacyAccepted}</p>}

                <p className="notice">Submission of this form does not guarantee loan approval or disbursal. Final approval is subject to lender policy, verification, and eligibility checks.</p>
                {submitError && <p className="helper-text form-error">{submitError}</p>}
              </>
            )}

            <div className="sticky-cta">
              <div className="cta-row">
                {currentStepIndex > 0 && <button type="button" className="button secondary" onClick={backStep}>Back</button>}
                {step === 'additional' && <button type="button" className="button secondary" onClick={() => setStep('consent')}>Skip</button>}
                {step !== 'consent' ? (
                  <button type="button" className="button primary" onClick={nextStep}>Continue</button>
                ) : (
                  <button type="submit" className="button primary" disabled={submitDisabled}>{submitting ? 'Submitting...' : 'Submit'}</button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
