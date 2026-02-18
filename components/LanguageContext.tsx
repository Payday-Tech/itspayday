'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getDictionary, type LanguageCode, type TranslationKey } from '@/lib/i18n';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'payday-language';

function getDefaultLanguage(pathname: string): LanguageCode {
  return pathname.startsWith('/for-workers') ? 'hng' : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored === 'en' || stored === 'hi' || stored === 'hng' || stored === 'kn') {
      setLanguageState(stored);
      return;
    }

    const defaultLanguage = getDefaultLanguage(pathname);
    setLanguageState(defaultLanguage);
    window.localStorage.setItem(STORAGE_KEY, defaultLanguage);
  }, [pathname]);

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  const value = useMemo(() => {
    const dictionary = getDictionary(language);
    return {
      language,
      setLanguage,
      t: (key: TranslationKey) => dictionary[key] || getDictionary('en')[key],
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
