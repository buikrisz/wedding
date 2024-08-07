import { useCallback } from "react";
import mainImage from "../assets/main_photo.jpg";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          {t("homeDate")},
          <br />
          2024
        </h2>
        <p className="separator"></p>
        <h2 className="location">
          Levendulás,
          <br />
          Inárcs
        </h2>
      </div>
      <button onClick={() => handleClick("/rsvp")} className="rsvpButton">
        {t("rsvp")}
      </button>
      <div className="welcomeText">
        <h5>{t("homeWelcomeText")}</h5>
      </div>
      <div className="homeProgram">
        <h4 className="homeProgramLeft">1:00 PM - 2:00 PM</h4>
        <h4>{t("homeProgramLeft")}</h4>
      </div>
      <div className="homeProgram lastProgram">
        <h4 className="homeProgramLeft">3:30 PM - 5:00 AM</h4>
        <h4>{t("homeProgramLeft2")}</h4>
      </div>
      <div className="dressCodeSection">
        <h3 className="eyesomeFont">Dresscode:</h3>
        <h4>{t("homeDresscodeText")}</h4>
        <div className="dressCodeColorsSection">
          <div className="dressCodeColor dressCodeColor1"></div>
          <div className="dressCodeColor dressCodeColor2"></div>
          <div className="dressCodeColor dressCodeColor3"></div>
          <div className="dressCodeColor dressCodeColor4"></div>
          <div className="dressCodeColor dressCodeColor5"></div>
          <div className="dressCodeColor dressCodeColor6"></div>
        </div>
      </div>
    </div>
  );
};
