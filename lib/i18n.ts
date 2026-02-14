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
  | 'home.faqTitle'
  | 'home.faq.q1'
  | 'home.faq.a1'
  | 'home.faq.q2'
  | 'home.faq.a2'
  | 'home.faq.q3'
  | 'home.faq.a3'
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
  'home.hero.worker.title': 'Short-term credit that respects how India\'s workers actually earn.',
  'home.hero.worker.subtitle': 'We design fair, wage-linked access for domestic and on-demand workers with irregular income and real-world cash flow needs.',
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
  'home.faqTitle': 'Quick answers',
  'home.faq.q1': 'Is Payday a lender?',
  'home.faq.a1': 'Payday is a Lending Service Provider partnering with regulated lenders. We never lend directly.',
  'home.faq.q2': 'How much can I access?',
  'home.faq.a2': 'Limits are tied to earned wages and community data, with caps and reminders.',
  'home.faq.q3': 'How are fees shared?',
  'home.faq.a3': 'Fees are clearly shown before you confirm, with no hidden charges.',
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
  'cta.partner': 'हमारे साथ पार्टनर बनें',
  'cta.seeFees': 'फीस देखें',
  'cta.whatsappGetStarted': 'WhatsApp से शुरू करें',
  'home.badge': 'हम बीटा में हैं — लोन ऑफर पाने के लिए अपनी जानकारी जोड़ें',
  'home.hero.worker.title': 'शॉर्ट-टर्म क्रेडिट, जो आपके असली कमाई पैटर्न के मुताबिक हो।',
  'home.hero.worker.subtitle': 'घरेलू और ऑन-डिमांड वर्कर्स के लिए निष्पक्ष, वेज-लिंक्ड एक्सेस — अनियमित आय और रोज़मर्रा के कैश फ्लो को ध्यान में रखकर।',
  'home.hero.worker.cta': 'शुरू करें',
  'home.hero.worker.benefit1': 'वेतन-आधारित लिमिट और स्पष्ट रिमाइंडर।',
  'home.hero.worker.benefit2': 'हर कन्फर्मेशन से पहले पूरी फीस दिखाई जाती है।',
  'home.hero.worker.benefit3': 'WhatsApp पर आपकी भाषा में सहायता।',
  'home.audience.worker': 'वर्कर',
  'home.audience.community': 'कम्युनिटी',
  'home.audience.lender': 'लेंडर',
  'home.trustLine': 'हम LSP हैं — सीधे लोन नहीं देते। कन्फर्मेशन से पहले फीस दिखती है। डेटा उपयोग पूरी सहमति के साथ। शिकायत सहायता स्पष्ट है।',
  'home.faqTitle': 'झटपट जवाब',
  'home.faq.q1': 'क्या Payday लेंडर है?',
  'home.faq.a1': 'Payday एक Lending Service Provider है जो रेगुलेटेड लेंडर्स के साथ काम करता है। हम सीधे लोन नहीं देते।',
  'home.faq.q2': 'मैं कितना एक्सेस कर सकता/सकती हूँ?',
  'home.faq.a2': 'लिमिट आपकी कमाई और कम्युनिटी डेटा से तय होती है, साथ में कैप और रिमाइंडर रहते हैं।',
  'home.faq.q3': 'फीस कैसे दिखाई जाती है?',
  'home.faq.a3': 'कन्फर्म करने से पहले फीस स्पष्ट दिखती है, कोई छुपे हुए चार्ज नहीं।',
  'worker.badge': 'वर्कर्स के लिए',
  'worker.hero.title': 'क्रेडिट सपोर्ट, जो आपके असली कैश-फ्लो के अनुसार हो।',
  'worker.hero.subtitle': 'वेतन-आधारित लिमिट में उधार लें, सभी शुल्क पहले देखें, और अपनी आय के हिसाब से भुगतान करें।',
  'worker.trust.title': 'सम्मानजनक सहायता',
  'worker.trust.subtitle': 'English, Hinglish, Kannada और Hindi में फ्रेंडली सपोर्ट।',
  'worker.faqTitle': 'अक्सर पूछे जाने वाले सवाल',
  'worker.faq.q1': 'कौन आवेदन कर सकता है?',
  'worker.faq.a1': 'Tier-1 शहरों की gated communities और gig platforms में काम करने वाले वर्कर्स।',
  'worker.faq.q2': 'क्या क्रेडिट स्कोर जरूरी है?',
  'worker.faq.a2': 'नहीं। हम पारंपरिक स्कोर की जगह कमाई और सहमति-आधारित डेटा देखते हैं।',
  'worker.faq.q3': 'सपोर्ट कैसे मिलेगा?',
  'worker.faq.a3': 'हमारी टीम WhatsApp, फोन और आपकी पसंदीदा भाषा में सहायता देती है।',
  'microcopy.lsp': 'हम LSP हैं — सीधे लोन नहीं देते।',
  'microcopy.fees': 'कन्फर्मेशन से पहले फीस दिखती है।',
  'microcopy.consent': 'डेटा उपयोग पूरी सहमति के साथ।',
  'microcopy.grievance': 'स्पष्ट शिकायत सहायता।',
};

const hng: Dictionary = {
  ...en,
  'cta.getStarted': 'Shuru Karein',
  'cta.partner': 'Partner with us',
  'cta.seeFees': 'Fees Dekho',
  'cta.whatsappGetStarted': 'WhatsApp Se Start Karo',
  'home.badge': 'Hum beta mein hain — loan offer ke liye details add karo',
  'home.hero.worker.title': 'Short-term credit jo aapki real income cycle ko samjhe.',
  'home.hero.worker.subtitle': 'Domestic aur on-demand workers ke liye fair, wage-linked access — irregular income aur daily cash flow ke hisaab se.',
  'home.hero.worker.cta': 'Shuru Karein',
  'home.hero.worker.benefit1': 'Wage-linked limits aur clear reminders.',
  'home.hero.worker.benefit2': 'Confirmation se pehle fees dikhti hai.',
  'home.hero.worker.benefit3': 'WhatsApp par preferred language support.',
  'home.audience.worker': 'Worker',
  'home.audience.community': 'Community',
  'home.audience.lender': 'Lender',
  'home.trustLine': 'Hum LSP hain — direct loan nahi dete. Confirmation se pehle fees dikhte hain. Consent-led data use. Clear grievance support.',
  'home.faqTitle': 'Quick sawaal, clear jawaab',
  'home.faq.q1': 'Kya Payday lender hai?',
  'home.faq.a1': 'Payday ek Lending Service Provider hai jo regulated lenders ke saath kaam karta hai. Hum direct loan nahi dete.',
  'home.faq.q2': 'Main kitna access kar sakta/sakti hoon?',
  'home.faq.a2': 'Limit earned wages aur community data par based hoti hai, caps aur reminders ke saath.',
  'home.faq.q3': 'Fees kaise dikhti hai?',
  'home.faq.a3': 'Confirm karne se pehle fees clearly dikhayi jaati hai, koi hidden charges nahi.',
  'worker.badge': 'Workers ke liye',
  'worker.hero.title': 'Credit support jo aapke cash-flow cycle mein fit baithe.',
  'worker.hero.subtitle': 'Wage-linked limits ke andar borrow karo, saare charges upfront dekho, aur income ke hisaab se repay karo.',
  'worker.trust.title': 'Respectful support',
  'worker.trust.subtitle': 'English, Hinglish, Kannada, aur Hindi mein friendly madad.',
  'worker.faqTitle': 'FAQs',
  'worker.faq.q1': 'Kaun apply kar sakta hai?',
  'worker.faq.a1': 'Tier-1 cities ki gated communities aur gig platforms ke workers.',
  'worker.faq.q2': 'Credit score zaroori hai?',
  'worker.faq.a2': 'Nahi. Hum traditional score ke bajay wage aur consent-based data dekhte hain.',
  'worker.faq.q3': 'Support kaise milega?',
  'worker.faq.a3': 'Hamari team WhatsApp, phone, aur aapki preferred language mein support karti hai.',
  'microcopy.lsp': 'Hum LSP hain — direct loan nahi dete.',
  'microcopy.fees': 'Confirmation se pehle fees dikhte hain.',
  'microcopy.consent': 'Consent-led data use.',
  'microcopy.grievance': 'Clear grievance support.',
};

const kn: Dictionary = { ...hi };

const dictionaries: Record<LanguageCode, Dictionary> = { en, hi, hng, kn };

export function getDictionary(language: LanguageCode) {
  return dictionaries[language];
}
