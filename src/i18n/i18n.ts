import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languageState } from '../types/types';

// Import translation files
import enTranslations from './locales/en.json';
import siTranslations from './locales/si.json';
import taTranslations from './locales/ta.json';

const resources = {
  en: {
    translation: enTranslations
  },
  si: {
    translation: siTranslations
  },
  ta: {
    translation: taTranslations
  }
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources,
    lng: languageState.currentLanguage, // Use variable instead of default
    fallbackLng: 'en', // Fallback language
    
    detection: {
      order: ['navigator', 'htmlTag'], // Remove localStorage from detection order
      caches: [], // Don't cache in localStorage
    },

    interpolation: {
      escapeValue: false // React already does escaping
    },

    react: {
      useSuspense: false
    },

    // Don't save missing translations
    saveMissing: false,
  });

// Custom language detector that uses our variable
const customLanguageDetector = {
  name: 'customDetector',
  lookup: () => {
    return languageState.currentLanguage;
  },
  cacheUserLanguage: (lng: string) => {
    languageState.currentLanguage = lng as 'en' | 'si' | 'ta';
  }
};

// Add our custom detector
i18n.services.languageDetector.addDetector(customLanguageDetector);

// Override the language change function to update our variable
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = (lng?: string) => {
  if (lng && (lng === 'en' || lng === 'si' || lng === 'ta')) {
    languageState.currentLanguage = lng;
    // Store in sessionStorage for persistence across refreshes
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('appLanguage', lng);
    }
  }
  return originalChangeLanguage(lng);
};

export default i18n;