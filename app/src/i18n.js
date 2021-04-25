import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/i18n/en.json';
import tw from './assets/i18n/zh-TW.json';

const resources = {
    en: {
        translation: en,
    },
    'zh-TW': {
        translation: tw,
    },
};

i18n.use(initReactI18next).init({
    debug: true,
    resources,
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    interpolation: {
        escapeValue: false, // React already does escaping
    },
});
// i18n.changeLanguage('en');
export default i18n;
