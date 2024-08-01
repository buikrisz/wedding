import React from "react";
import { GoogleMapComponent } from "../components";
import "./Location.css";

export const Location = () => {
  const jaki = { lat: 47.51579, lng: 19.08271 };
  const levendulas = { lat: 47.2722, lng: 19.30506 };

  return (
    <div id="location">
      <div className="homeProgram">
        <h4 className="homeProgramLeft">1:00 PM - 2:00 PM</h4>
        <h4>Egyházi Szertartás - Jáki Kápolna</h4>
      </div>
      <div className="mapContainer">
        <GoogleMapComponent center={jaki} zoom={15} />
      </div>
      <div className="homeProgram lastProgram">
        <h4 className="homeProgramLeft">3:30 PM - 5:00 AM</h4>
        <h4>Polgári Szertartás & Vacsora & Lagzi - Levendulás, Inárcs</h4>
      </div>
      <div className="mapContainer">
        <GoogleMapComponent center={levendulas} zoom={13} />
      </div>
    </div>
  );
};
