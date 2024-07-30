import { useCallback } from "react";
import mainImage from "../assets/main_photo.jpg";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div id="home">
      <img src={mainImage} alt="Jegyesfotózás" className="mainImage" />
      <div className="mainContent">
        <h2 className="date">
          Október 11,
          <br />
          2024
        </h2>
        <p className="separator"></p>
        <h2 className="location">
          Levendulás Rendezvényközpont
          <br />
          Inárcs
        </h2>
      </div>
      <button onClick={() => handleClick("/rsvp")} className="rsvpButton">
        RSVP
      </button>
    </div>
  );
};
