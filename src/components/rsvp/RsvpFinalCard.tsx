import { useCallback } from "react";
import { AllergenList, allergenList, RsvpCardProps } from "../../pages/Rsvp";
import Paper from "@mui/material/Paper";
import "./RsvpFinalCard.css";

export const RsvpFinalCard = ({ setCurrentPage, setGuestList, guestList }: RsvpCardProps) => {
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

  const onNextPageClick = useCallback(() => {}, []);

  return (
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
