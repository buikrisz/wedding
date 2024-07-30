import TextField from "@mui/material/TextField";
import React from "react";
import "./RsvpSimpleCard.css";

export const RsvpSimpleCard = () => {
  return (
    <div className="simpleCard">
      <h3 className="title">Dominika & Krisztián Esküvő</h3>
      <h3 className="subtitle">Kérjük jelezz vissza nekünk, hogy részt tudsz-e venni családoddal/pároddal esküvőnkön, az alábbi adatokat kitöltve.</h3>
      <TextField required id="outlined-required" label="Teljes név" />
      <button>Tovább</button>
    </div>
  );
};
