import React from "react";
import { CustomTextField } from "./CustomTextField";
import "./RsvpFirstCard.css";

export const RsvpFirstCard = () => {
  return (
    <div className="simpleCard">
      <h3 className="title">Dominika & Krisztián Esküvő</h3>
      <h3 className="subtitle">Kérjük jelezz vissza nekünk, hogy részt tudsz-e venni családoddal/pároddal esküvőnkön, az alábbi adatokat kitöltve.</h3>
      <CustomTextField required id="outlined-required" label="Teljes név" className="nameText" color="4e5b51" />
      <button>Tovább</button>
    </div>
  );
};
