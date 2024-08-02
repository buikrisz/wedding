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
          Levendulás,
          <br />
          Inárcs
        </h2>
      </div>
      <button onClick={() => handleClick("/rsvp")} className="rsvpButton">
        Visszajelzés
      </button>
      <div className="welcomeText">
        <h5>Kedves Családunk és Barátaink! Ezúton szeretnénk meghívni az esküvőnkre, reméljük Velünk tudsz tartani. Várjuk a visszajelzésed!</h5>
      </div>
      <div className="homeProgram">
        <h4 className="homeProgramLeft">1:00 PM - 2:00 PM</h4>
        <h4>Egyházi Szertartás - Jáki Kápolna</h4>
      </div>
      <div className="homeProgram lastProgram">
        <h4 className="homeProgramLeft">3:30 PM - 5:00 AM</h4>
        <h4>Polgári Szertartás & Vacsora & Lagzi - Levendulás, Inárcs</h4>
      </div>
      <div className="dressCodeSection">
        <h3 className="eyesomeFont">Dresscode:</h3>
        <h4>Esküvőnkön az alábbi színek fognak dominálni. Örömmel vesszük, ha a ti öltözéketek is egyezik az esküvőnk tematikájával.</h4>
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
