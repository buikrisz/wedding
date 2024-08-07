import { useCallback } from "react";
import "./Nav.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div id="navbar">
      <ul>
        <li className={pathname === "/" ? "selected" : ""} onClick={() => handleClick("/")}>
          {t("home")}
        </li>
        <li className={pathname === "/fotok" ? "selected" : ""} onClick={() => handleClick("/fotok")}>
          {t("photos")}
        </li>
        <li className={pathname === "/program" ? "selected" : ""} onClick={() => handleClick("/program")}>
          {t("program")}
        </li>
        <li className={pathname === "/megkozelites" ? "selected" : ""} onClick={() => handleClick("/megkozelites")}>
          {t("location")}
        </li>
        <li className={pathname === "/rsvp" ? "selected" : ""} onClick={() => handleClick("/rsvp")}>
          {t("rsvp")}
        </li>
      </ul>
    </div>
  );
};
