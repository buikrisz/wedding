import React from "react";
import timelineHU from "../assets/timeline_hu.jpg";
import timelineEN from "../assets/timeline_en.jpg";
import "./Program.css";
import { useTranslation } from "react-i18next";

export const Program = () => {
  const { i18n } = useTranslation();
  const lang = i18n?.language;

  return <div id="program">{lang === "en" ? <img src={timelineEN} alt="Timeline" /> : <img src={timelineHU} alt="Timeline" />}</div>;
};
