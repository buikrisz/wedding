import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import initials from "../assets/initials.png";
import { LanguageChooser } from "./LanguageChooser";
import { useTranslation } from "react-i18next";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const now = new Date();
  const target = new Date("2024-10-11");

  const difference = target.getTime() - now.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  const daysToShow = days < 1 ? 0 : days;

  return (
    <>
      <div id="layout">
        <LanguageChooser />
        <img src={initials} alt="DK" className="initials" />
        <h1 className="title">Dominika & Krisztián</h1>
        <h3 className="details1">{t("layoutDetails1")}</h3>
        <h3 className="details2">{daysToShow === 1 ? t("layoutDetails2", { day: days }) : t("layoutDetails2Plural", { days: days })}</h3>
      </div>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
