from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Optional


class RecaptchaBase(BaseModel):
    """Base model with reCAPTCHA token"""
    recaptcha_token: str = Field(..., description="reCAPTCHA v2 response token")


class GetStartedForm(RecaptchaBase):
    """Get Started modal form submission"""
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    occupation: str = Field(..., min_length=1, max_length=50)


class ContactForm(RecaptchaBase):
    """Contact page form submission"""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    topic: str = Field(..., min_length=1, max_length=50)
    message: str = Field(..., min_length=10, max_length=2000)


class LenderPartnershipForm(RecaptchaBase):
    """Lender partnership form submission"""
    name: str = Field(..., min_length=1, max_length=100)
    company: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\d{10,15}$")
    role: str = Field(..., min_length=1, max_length=100)
    city: str = Field(..., min_length=1, max_length=100)
    notes: Optional[str] = Field(None, max_length=1000)


class EligibilityUploadMeta(BaseModel):
    label: Literal['voterIdUpload', 'drivingLicenceUpload', 'passportUpload']
    fileName: str = Field(..., min_length=1, max_length=300)
    fileType: str = Field(..., min_length=1, max_length=100)
    fileSize: int = Field(..., ge=1)
    storageRef: str = Field(..., min_length=1, max_length=500)


class EligibilitySubmission(BaseModel):
    applicationId: str
    fullName: str
    firstName: str
    lastName: str
    dob: str
    pan: str
    voterIdUpload: Optional[EligibilityUploadMeta] = None
    drivingLicenceUpload: Optional[EligibilityUploadMeta] = None
    passportUpload: Optional[EligibilityUploadMeta] = None
    phone1: str
    phone2: str = ''
    address1: str
    city1: str
    state1: str
    pincode1: str
    address2: str = ''
    city2: str = ''
    state2: str = ''
    pincode2: str = ''
    consentAccepted: bool
    consentTimestamp: str
    consentTextVersion: str
    privacyAccepted: bool
    source: str


class FormResponse(BaseModel):
    """Standard form response"""
    success: bool
    message: str
