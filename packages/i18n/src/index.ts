import React, { createContext, useContext, useState } from 'react';
import en from './en.json';
import hi from './hi.json';

export const translations = { en, hi };

export type LanguageCode = 'en' | 'hi';
export type Translations = typeof en;

export function getTranslation(lang: LanguageCode, key: string): string {
  const keys = key.split('.');
  let current: any = translations[lang];
  
  for (const k of keys) {
    if (current[k] === undefined) {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`);
      return key;
    }
    current = current[k];
  }
  
  return current;
}

interface TranslationContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export function TranslationProvider({ children, defaultLanguage = 'en' }: { children: React.ReactNode, defaultLanguage?: LanguageCode }) {
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  const t = (key: string) => getTranslation(language, key);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
