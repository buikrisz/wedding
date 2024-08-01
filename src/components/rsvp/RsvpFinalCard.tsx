import { useCallback, useEffect, useState } from "react";
import { AllergenList, allergenList, RsvpCardProps } from "../../pages/Rsvp";
import Paper from "@mui/material/Paper";
import emailjs from "@emailjs/browser";
import "./RsvpFinalCard.css";
import apiKey from "../../emailkey";

type FormResult = {
  name0: string;
  attendance0: string;
  allergies0: string;
  diet0: string;
  accomodation0: string;
  music0: string;

  name1: string;
  attendance1: string;
  allergies1: string;
  diet1: string;
  accomodation1: string;
  music1: string;

  name2: string;
  attendance2: string;
  allergies2: string;
  diet2: string;
  accomodation2: string;
  music2: string;

  name3: string;
  attendance3: string;
  allergies3: string;
  diet3: string;
  accomodation3: string;
  music3: string;

  name4: string;
  attendance4: string;
  allergies4: string;
  diet4: string;
  accomodation4: string;
  music4: string;
};

export const RsvpFinalCard = ({ setCurrentPage, setGuestList, guestList }: RsvpCardProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const renderContent = useCallback(() => {
    return guestList.map((guest) => {
      return (
        <Paper elevation={3} sx={{ width: 200, height: 350, padding: 3, backgroundColor: "#4e5b51", color: "#fff" }}>
          <h3>Név: {guest.name}</h3>
          <h4>Részt vesz az esküvőn: {guest.attends ? "Igen" : "Nem"}</h4>
          {guest.attends && (
            <h4>
              Intolerancia/allergia:{" "}
              {guest.allergies == null || guest.allergies.length === 0 || guest.allergies[0] === "none"
                ? "Nincs"
                : guest.allergies.map((allergy) => allergenList[allergy as keyof AllergenList]).join(" & ")}
            </h4>
          )}
          {guest.attends && <h4>Különleges étrend: {guest.diet == null || guest.diet.length === 0 ? "Nincs" : guest.diet}</h4>}
          {guest.attends && <h4>Szállás igény: {guest.accomodation ? "Van" : "Nincs"}</h4>}
          {guest.attends && guest.id === "mainGuest" && <h4>Javasolt zene: {guest.music}</h4>}
        </Paper>
      );
    });
  }, [guestList]);

  const onPrevPageClick = useCallback(() => {
    const isAnyoneAttending = guestList?.some((guest) => guest.attends);

    if (isAnyoneAttending) {
      setCurrentPage((currentPage) => (currentPage === 0 ? currentPage : currentPage - 1));
    } else {
      setCurrentPage(1);
    }
  }, [guestList, setCurrentPage]);

  const onNextPageClick = useCallback(() => {
    setFormSubmitted(true);
  }, []);

  useEffect(() => {
    if (formSubmitted) {
      //setAnimationStarted(true);
      const formResult: FormResult = {} as FormResult;

      guestList.forEach((guest) => {
        formResult[`name${guestList.indexOf(guest)}` as keyof FormResult] = `Név: ${guest.name}`;
        formResult[`attendance${guestList.indexOf(guest)}` as keyof FormResult] = `Részt vesz az esküvőn: ${guest.attends ? "Igen" : "Nem"}`;
        if (guest.attends)
          formResult[`allergies${guestList.indexOf(guest)}` as keyof FormResult] = `Allergia: ${
            guest.allergies == null || guest.allergies.length === 0 || guest.allergies[0] === "none"
              ? "Nincs"
              : guest.allergies.map((allergy) => allergenList[allergy as keyof AllergenList]).join(" & ")
          }`;
        if (guest.attends)
          formResult[`diet${guestList.indexOf(guest)}` as keyof FormResult] = `Különleges étrend: ${
            guest.diet == null || guest.diet.length === 0 ? "Nincs" : guest.diet
          }`;
        if (guest.attends) formResult[`accomodation${guestList.indexOf(guest)}` as keyof FormResult] = `Szállásigény: ${guest.accomodation ? "Van" : "Nincs"}`;
        if (guest.attends && guest.id === "mainGuest") formResult[`music${guestList.indexOf(guest)}` as keyof FormResult] = `Zene: ${guest.music}`;
      });

      emailjs
        .send(apiKey.SERVICE_ID, apiKey.SERVICE_REQUEST_TEMPLATE_ID, formResult, apiKey.PUBLIC_KEY)
        .then(() => {
          console.log("Email sent");
          //setMailSent(true);
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }, [formSubmitted, guestList]);

  return formSubmitted ? (
    <div className="simpleCard finalCard">
      <h3 className="title">Köszönjük a visszajelzést!</h3>
    </div>
  ) : (
    <div className="simpleCard finalCard">
      <h3 className="title">Utolsó lépés! Kérlek ellenőrizd le a megadott adataid, és ha minden megfelel, kattints a Küldés gombra!</h3>
      <div className="finalGuestCards">{renderContent()}</div>
      <div className="rsvpActionButtons">
        <button className="rsvpActionButton" onClick={onPrevPageClick}>
          Vissza
        </button>
        <button className="rsvpActionButton" onClick={onNextPageClick}>
          Küldés
        </button>
      </div>
    </div>
  );
};
