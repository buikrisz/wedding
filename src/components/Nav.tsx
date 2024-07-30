import { useCallback } from "react";
import "./Nav.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
          Főoldal
        </li>
        <li className={pathname === "/fotok" ? "selected" : ""} onClick={() => handleClick("/fotok")}>
          Fotók
        </li>
        <li className={pathname === "/program" ? "selected" : ""} onClick={() => handleClick("/program")}>
          Program
        </li>
        <li className={pathname === "/rsvp" ? "selected" : ""} onClick={() => handleClick("/rsvp")}>
          RSVP
        </li>
      </ul>
    </div>
  );
};
