import React from "react";
import { GoogleMapComponent } from "../components";
import { useTranslation } from "react-i18next";
import "./Location.css";

export const Location = () => {
  const { t } = useTranslation();
  const jaki = { lat: 47.51579, lng: 19.08271 };
  const levendulas = { lat: 47.2722, lng: 19.30506 };

  return (
    <div id="location">
      <div className="homeProgram">
        <h4 className="homeProgramLeft">1:00 PM - 2:00 PM</h4>
        <h4>{t("homeProgramLeft")}</h4>
      </div>
      <div className="homeProgramDetails">
        <h5>{t("locationChurchText")}</h5>
      </div>
      <div className="mapContainer">
        <GoogleMapComponent center={jaki} zoom={15} />
      </div>
      <div className="homeProgram lastProgram">
        <h4 className="homeProgramLeft">3:30 PM - 5:00 AM</h4>
        <h4>{t("homeProgramLeft2")}</h4>
      </div>
      <div className="homeProgramDetails">
        <h5>{t("locationCivilText1")}</h5>
        <h5>{t("locationCivilText2")}</h5>
      </div>
      <div className="mapContainer">
        <GoogleMapComponent center={levendulas} zoom={13} />
      </div>
    </div>
  );
};
