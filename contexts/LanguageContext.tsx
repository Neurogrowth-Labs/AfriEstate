

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { translations as englishTranslations } from '../translations';

const defaultTranslations = englishTranslations[Language.EN];

type TranslationsType = typeof defaultTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: Language.EN,
  setLanguage: () => {},
  t: defaultTranslations,
  isTranslating: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang && Object.values(Language).includes(savedLang as Language)) 
      ? savedLang as Language 
      : Language.EN;
  });
  
  const [translationsCache, setTranslationsCache] = useState<Partial<Record<Language, TranslationsType>>>({
      [Language.EN]: defaultTranslations,
  });
  const [isTranslating, setIsTranslating] = useState(false);

  const setLanguage = async (lang: Language) => {
      if (lang === language || isTranslating) return;

      if (translationsCache[lang]) {
          setLanguageState(lang);
          return;
      }
      // Translation content must be supplied by the application, not generated in a
      // browser with a secret key. Until a locale bundle is shipped, retain the
      // complete English bundle so every selected locale remains usable.
      setTranslationsCache(prev => ({ ...prev, [lang]: defaultTranslations }));
      setLanguageState(lang);
  };

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const syncLanguage = (event: StorageEvent) => {
      if (event.key !== 'language' || !event.newValue || !Object.values(Language).includes(event.newValue as Language)) return;
      setLanguageState(event.newValue as Language);
    };
    window.addEventListener('storage', syncLanguage);
    return () => window.removeEventListener('storage', syncLanguage);
  }, []);

  const t = useMemo(() => (translationsCache[language] || defaultTranslations), [language, translationsCache]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslations = () => useContext(LanguageContext);
