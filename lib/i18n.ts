export type LanguageCode = 'en' | 'hi' | 'hng' | 'kn';

export type TranslationKey =
  | 'cta.getStarted'
  | 'cta.partner'
  | 'cta.seeFees'
  | 'cta.whatsappGetStarted'
  | 'home.badge'
  | 'home.hero.worker.title'
  | 'home.hero.worker.subtitle'
  | 'home.hero.worker.cta'
  | 'home.hero.worker.benefit1'
  | 'home.hero.worker.benefit2'
  | 'home.hero.worker.benefit3'
  | 'home.hero.community.title'
  | 'home.hero.community.subtitle'
  | 'home.hero.community.cta'
  | 'home.hero.community.benefit1'
  | 'home.hero.community.benefit2'
  | 'home.hero.community.benefit3'
  | 'home.hero.lender.title'
  | 'home.hero.lender.subtitle'
  | 'home.hero.lender.cta'
  | 'home.hero.lender.benefit1'
  | 'home.hero.lender.benefit2'
  | 'home.hero.lender.benefit3'
  | 'home.audience.worker'
  | 'home.audience.community'
  | 'home.audience.lender'
  | 'home.trustLine'
  | 'home.howItWorksTitle'
  | 'home.how.step1.title'
  | 'home.how.step1.body'
  | 'home.how.step2.title'
  | 'home.how.step2.body'
  | 'home.how.step3.title'
  | 'home.how.step3.body'
  | 'home.faqTitle'
  | 'home.faq.q1'
  | 'home.faq.a1'
  | 'home.faq.q2'
  | 'home.faq.a2'
  | 'home.faq.q3'
  | 'home.faq.a3'
  | 'home.faq.q4'
  | 'home.faq.a4'
  | 'home.faq.q5'
  | 'home.faq.a5'
  | 'worker.badge'
  | 'worker.hero.title'
  | 'worker.hero.subtitle'
  | 'worker.trust.title'
  | 'worker.trust.subtitle'
  | 'worker.faqTitle'
  | 'worker.faq.q1'
  | 'worker.faq.a1'
  | 'worker.faq.q2'
  | 'worker.faq.a2'
  | 'worker.faq.q3'
  | 'worker.faq.a3'
  | 'microcopy.lsp'
  | 'microcopy.fees'
  | 'microcopy.consent'
  | 'microcopy.grievance';

type Dictionary = Record<TranslationKey, string>;

const en: Dictionary = {
  'cta.getStarted': 'Get Started',
  'cta.partner': 'Partner with us',
  'cta.seeFees': 'See fees',
  'cta.whatsappGetStarted': 'WhatsApp Get Started',
  'home.badge': 'We are in beta — add your details to receive a loan offer',
  'home.hero.worker.title': 'Access what you’ve already earned—when you need it.',
  'home.hero.worker.subtitle': 'Take your earned money early. Simple, clear, and safe.',
  'home.hero.worker.cta': 'Get Started',
  'home.hero.worker.benefit1': 'Wage-linked limits with clear reminders.',
  'home.hero.worker.benefit2': 'Pricing shown before every confirmation.',
  'home.hero.worker.benefit3': 'Support in your preferred language on WhatsApp.',
  'home.hero.community.title': 'Support workers without taking lending risk on your books.',
  'home.hero.community.subtitle': 'Payday helps communities enable responsible access while regulated lenders handle credit underwriting and loan issuance.',
  'home.hero.community.cta': 'For Communities',
  'home.hero.community.benefit1': 'No capital allocation from society committees.',
  'home.hero.community.benefit2': 'Clear worker onboarding and consent flow.',
  'home.hero.community.benefit3': 'Transparent grievance support for residents and staff.',
  'home.hero.lender.title': 'A trusted origination channel for responsible low-ticket credit.',
  'home.hero.lender.subtitle': 'Use attendance, tenure, and earnings consistency signals to underwrite better and scale repayment outcomes.',
  'home.hero.lender.cta': 'For Lenders',
  'home.hero.lender.benefit1': 'Consent-led data pipeline with verified signals.',
  'home.hero.lender.benefit2': 'Higher-intent worker segments from gated ecosystems.',
  'home.hero.lender.benefit3': 'Assisted servicing and structured grievance escalation.',
  'home.audience.worker': 'Worker',
  'home.audience.community': 'Community',
  'home.audience.lender': 'Lender',
  'home.trustLine': 'We\'re an LSP — we don\'t lend directly. Fees shown before confirmation. Consent-led data use. Clear grievance support.',
  'home.howItWorksTitle': 'How it works',
  'home.how.step1.title': 'Consent first',
  'home.how.step1.body': 'You say yes first on WhatsApp.',
  'home.how.step2.title': 'Access on pay',
  'home.how.step2.body': 'Take part of your earned pay before salary day.',
  'home.how.step3.title': 'Repay simply',
  'home.how.step3.body': 'Repayment matches your salary cycle.',
  'home.faqTitle': 'FAQs',
  'home.faq.q1': 'Do I need a CIBIL score to apply?',
  'home.faq.a1': 'No. Payday eligibility is based on your earnings and work profile, not your CIBIL score.',
  'home.faq.q2': 'Do I need a bank account and UPI ID?',
  'home.faq.a2': 'Yes. You need an active bank account and UPI ID in your own name to receive funds and complete repayments.',
  'home.faq.q3': 'How quickly can I get the loan amount?',
  'home.faq.a3': 'After approval from the lending partner, disbursal is typically completed within minutes.',
  'home.faq.q4': 'Do I need to be employed to use Payday?',
  'home.faq.a4': 'Yes. Payday currently serves salaried or gig workers with regular, verifiable income.',
  'home.faq.q5': 'What if I face repayment issues or have a complaint?',
  'home.faq.a5': 'Please contact our support team for help. You can also raise a grievance by emailing grievance@payday.in.',
  'worker.badge': 'For workers',
  'worker.hero.title': 'Credit support that fits your real cash-flow cycle.',
  'worker.hero.subtitle': 'Borrow within wage-linked limits, see all charges upfront, and repay on schedules aligned to your earnings.',
  'worker.trust.title': 'Respectful support',
  'worker.trust.subtitle': 'Friendly guidance in English, Hinglish, Kannada, and Hindi.',
  'worker.faqTitle': 'FAQs',
  'worker.faq.q1': 'Who can apply?',
  'worker.faq.a1': 'Workers in gated communities and gig platforms across Tier-1 cities.',
  'worker.faq.q2': 'Do I need a credit score?',
  'worker.faq.a2': 'No. We rely on wage and consent-based data rather than traditional scores.',
  'worker.faq.q3': 'How do I get support?',
  'worker.faq.a3': 'Our team supports you via WhatsApp, phone, and in your preferred language.',
  'microcopy.lsp': 'We\'re an LSP — we don\'t lend directly.',
  'microcopy.fees': 'Fees shown before confirmation.',
  'microcopy.consent': 'Consent-led data use.',
  'microcopy.grievance': 'Clear grievance support.',
};

const hi: Dictionary = {
  ...en,
  'cta.getStarted': 'शुरू करें',
  'cta.partner': 'हमारे साथ जुड़ें',
  'cta.seeFees': 'फीस देखें',
  'cta.whatsappGetStarted': 'WhatsApp से शुरू करें',
  'home.badge': 'हम बीटा में हैं — लोन ऑफर के लिए अपनी जानकारी जोड़ें',
  'home.hero.worker.title': 'जो कमाया है, ज़रूरत पर वही अभी पाएं।',
  'home.hero.worker.subtitle': 'अपनी कमाई का हिस्सा पहले लें। आसान, साफ और सुरक्षित।',
  'home.hero.worker.cta': 'शुरू करें',
  'home.faqTitle': 'अक्सर पूछे जाने वाले सवाल',
  'home.faq.q1': 'क्या Payday लोन देता है?',
  'home.faq.a1': 'नहीं। Payday RBI-रेगुलेटेड लेंडर्स के साथ काम करता है। हम सीधे लोन नहीं देते।',
  'home.faq.q2': 'मैं कितने पैसे ले सकता/सकती हूँ?',
  'home.faq.a2': 'लिमिट आपकी पहले से कमाई हुई मजदूरी पर तय होती है।',
  'home.faq.q3': 'क्या फीस पहले दिखेगी?',
  'home.faq.a3': 'हाँ। कन्फर्म करने से पहले सारी फीस दिखती है।',
  'home.howItWorksTitle': 'यह कैसे काम करता है',
  'home.how.step1.title': 'पहले सहमति',
  'home.how.step1.body': 'पहले WhatsApp पर आपकी मंज़ूरी ली जाती है।',
  'home.how.step2.title': 'कमाई से एक्सेस',
  'home.how.step2.body': 'सैलरी से पहले अपनी कमाई का हिस्सा लें।',
  'home.how.step3.title': 'आसान भुगतान',
  'home.how.step3.body': 'भुगतान आपकी सैलरी तारीख के हिसाब से होता है।',
  'microcopy.lsp': 'हम LSP हैं — सीधे लोन नहीं देते।',
  'microcopy.fees': 'कन्फर्मेशन से पहले फीस दिखती है।',
  'microcopy.consent': 'डेटा उपयोग आपकी सहमति से।',
  'microcopy.grievance': 'शिकायत के लिए स्पष्ट मदद।',
};

const hng: Dictionary = {
  ...en,
  'cta.getStarted': 'Shuru Karein',
  'cta.partner': 'Partner with us',
  'cta.seeFees': 'Fees Dekho',
  'cta.whatsappGetStarted': 'WhatsApp Se Start Karo',
  'home.badge': 'Hum beta mein hain — loan offer ke liye details add karo',
  'home.hero.worker.title': 'Jo aapne kamaya hai, zaroorat par wahi abhi pao.',
  'home.hero.worker.subtitle': 'Apni kamayi ka hissa salary se pehle le lo. Seedha, saaf, safe.',
  'home.hero.worker.cta': 'Shuru Karein',
  'home.faqTitle': 'FAQ',
  'home.faq.q1': 'Kya Payday lender hai?',
  'home.faq.a1': 'Nahi. Payday RBI-regulated lenders ke saath kaam karta hai. Hum direct loan nahi dete.',
  'home.faq.q2': 'Main kitna paisa le sakta/sakti hoon?',
  'home.faq.a2': 'Aapki limit aapki pehle se earned wages par hoti hai.',
  'home.faq.q3': 'Fees pehle dikhegi?',
  'home.faq.a3': 'Haan. Confirm karne se pehle sab fees dikhegi.',
  'home.howItWorksTitle': 'Kaise kaam karta hai',
  'home.how.step1.title': 'Consent pehle',
  'home.how.step1.body': 'WhatsApp par pehle aapki haan li jaati hai.',
  'home.how.step2.title': 'Kamayi se access',
  'home.how.step2.body': 'Salary day se pehle earned pay ka hissa le lo.',
  'home.how.step3.title': 'Repay easy',
  'home.how.step3.body': 'Repayment aapki salary cycle ke saath hota hai.',
  'microcopy.lsp': 'Hum LSP hain — direct loan nahi dete.',
  'microcopy.fees': 'Confirm se pehle fees dikhte hain.',
  'microcopy.consent': 'Data use sirf aapki consent se.',
  'microcopy.grievance': 'Complaint help clear hai.',
};

const kn: Dictionary = {
  ...en,
  'cta.getStarted': 'ಪ್ರಾರಂಭಿಸಿ',
  'cta.partner': 'ನಮ್ಮ ಜೊತೆ ಸೇರಿ',
  'cta.seeFees': 'ಶುಲ್ಕ ನೋಡಿ',
  'cta.whatsappGetStarted': 'WhatsApp ನಲ್ಲಿ ಆರಂಭಿಸಿ',
  'home.badge': 'ನಾವು ಬೇಟಾದಲ್ಲಿದ್ದೇವೆ — ಸಾಲ ಆಫರ್‌ಗಾಗಿ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ',
  'home.hero.worker.title': 'ನೀವು ಗಳಿಸಿದ ಹಣವೇ, ಬೇಕಾದಾಗ ತಕ್ಷಣ ಪಡೆಯಿರಿ.',
  'home.hero.worker.subtitle': 'ವೇತನದ ಒಂದು ಭಾಗವನ್ನು ಮುಂಚಿತವಾಗಿ ಪಡೆಯಿರಿ. ಸರಳ, ಸ್ಪಷ್ಟ, ಸುರಕ್ಷಿತ.',
  'home.hero.worker.cta': 'ಪ್ರಾರಂಭಿಸಿ',
  'home.audience.worker': 'ಕಾರ್ಮಿಕ',
  'home.audience.community': 'ಸಮುದಾಯ',
  'home.audience.lender': 'ಸಾಲದಾತ',
  'home.howItWorksTitle': 'ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
  'home.how.step1.title': 'ಮೊದಲು ಒಪ್ಪಿಗೆ',
  'home.how.step1.body': 'ಮೊದಲು WhatsApp ನಲ್ಲಿ ನಿಮ್ಮ ಒಪ್ಪಿಗೆ ಪಡೆಯುತ್ತೇವೆ.',
  'home.how.step2.title': 'ಗಳಿಸಿದ ಹಣದಿಂದ ಪ್ರವೇಶ',
  'home.how.step2.body': 'ವೇತನದ ದಿನಕ್ಕೂ ಮೊದಲು ಗಳಿಸಿದ ಭಾಗವನ್ನು ಪಡೆಯಿರಿ.',
  'home.how.step3.title': 'ಸರಳವಾಗಿ ಮರುಪಾವತಿ',
  'home.how.step3.body': 'ಮರುಪಾವತಿ ನಿಮ್ಮ ವೇತನ ಚಕ್ರಕ್ಕೆ ಹೊಂದಿಕೊಂಡಿರುತ್ತದೆ.',
  'home.faqTitle': 'ಪ್ರಶ್ನೋತ್ತರ',
  'home.faq.q1': 'Payday ನೇರವಾಗಿ ಸಾಲ ಕೊಡುತ್ತದೆಯಾ?',
  'home.faq.a1': 'ಇಲ್ಲ. Payday RBI ನಿಯಂತ್ರಿತ ಸಾಲದಾತರ ಜೊತೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ. ನಾವು ನೇರವಾಗಿ ಸಾಲ ಕೊಡುವುದಿಲ್ಲ.',
  'home.faq.q2': 'ನಾನು ಎಷ್ಟು ಹಣ ಪಡೆಯಬಹುದು?',
  'home.faq.a2': 'ನಿಮ್ಮ ಮಿತಿ ನೀವು ಈಗಾಗಲೇ ಗಳಿಸಿದ ವೇತನದ ಮೇಲೆ ಇರುತ್ತದೆ.',
  'home.faq.q3': 'ಶುಲ್ಕ ಮೊದಲು ಕಾಣುತ್ತದೆಯಾ?',
  'home.faq.a3': 'ಹೌದು. ನೀವು ದೃಢೀಕರಿಸುವ ಮೊದಲು ಎಲ್ಲಾ ಶುಲ್ಕ ಕಾಣುತ್ತದೆ.',
  'microcopy.lsp': 'ನಾವು LSP — ನೇರವಾಗಿ ಸಾಲ ಕೊಡುವುದಿಲ್ಲ.',
  'microcopy.fees': 'ದೃಢೀಕರಣದ ಮೊದಲು ಶುಲ್ಕ ತೋರಿಸಲಾಗುತ್ತದೆ.',
  'microcopy.consent': 'ಡೇಟಾ ಬಳಕೆ ನಿಮ್ಮ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ ಮಾತ್ರ.',
  'microcopy.grievance': 'ದೂರುಗಳಿಗೆ ಸ್ಪಷ್ಟ ಸಹಾಯ ಲಭ್ಯ.',
};

const dictionaries: Record<LanguageCode, Dictionary> = { en, hi, hng, kn };

export function getDictionary(language: LanguageCode) {
  return dictionaries[language];
}
