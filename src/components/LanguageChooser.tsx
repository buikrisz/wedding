import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Us, Hu } from "react-flags-select";
import "./LanguageChooser.css";

export const LanguageChooser = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return (
    <div className="languageChooser">
      <Hu className="languageButton" onClick={() => changeLanguage("hu")} />
      <div className="languageButtonSeparator"></div>
      <Us className="languageButton" onClick={() => changeLanguage("en")} />
    </div>
  );
};
