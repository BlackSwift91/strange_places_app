import { store } from '../store/index';

import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationRU from './ru/translation.json';

console.log('LNG', store.getState().userSettingsReducer.language);

const resources = {
  en_US: {
    translation: translationEN,
  },
  ru_RU: {
    translation: translationRU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en_US',
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.changeLanguage(store.getState().userSettingsReducer.language);

export default i18n;
