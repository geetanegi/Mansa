import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './JSON/en.json';
import hi from './JSON/hi.json';

const resources = {
  en: {
    translation: en
  },
  hi: {
    translation: hi
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;


  