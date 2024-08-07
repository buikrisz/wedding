import React from "react";
import { useTranslation } from "react-i18next";
import "./Photos.css";

export const Photos = () => {
  const { t } = useTranslation();

  return (
    <div id="photos">
      <h2 className="eyesomeFont">{t("photosText")}</h2>
    </div>
  );
};
