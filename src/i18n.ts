import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationHU from "./locales/hu/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  hu: { translation: translationHU },
  en: { translation: translationEN },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "hu",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
