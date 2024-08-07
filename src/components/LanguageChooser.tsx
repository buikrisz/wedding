import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageChooser.css";

export const LanguageChooser = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return (
    <div className="languageChooser">
      <button className="language" onClick={() => changeLanguage("hu")}>
        HUN
      </button>
      <button className="language" onClick={() => changeLanguage("en")}>
        EN
      </button>
    </div>
  );
};
