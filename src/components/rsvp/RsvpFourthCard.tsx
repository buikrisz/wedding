import { useCallback, useState } from "react";
import { GuestInformation, RsvpCardProps } from "../../pages/Rsvp";
import { CustomTextField } from "./CustomTextField";

export const RsvpFourthCard = ({ setCurrentPage, setGuestList, guestList, cardType }: RsvpCardProps) => {
  const [currentGuestList, setCurrentGuestList] = useState<GuestInformation[]>(guestList ?? []);

  const handleFieldChange = useCallback(
    (id: string, newValue: string) => {
      if (cardType === "diet") {
        setCurrentGuestList((currentGuests) => currentGuests.map((guest) => (guest.id === id ? { ...guest, diet: newValue } : guest)));
      } else if (cardType === "music") {
        setCurrentGuestList((currentGuests) => currentGuests.map((guest) => (guest.id === id ? { ...guest, music: newValue } : guest)));
      }
    },
    [cardType]
  );

  const renderContent = useCallback(() => {
    if (cardType === "diet") {
      return currentGuestList
        ?.filter((guest) => guest.attends)
        .map((guest) => {
          return (
            <div className="dietConfirmation">
              <h3>{guest.name}</h3>
              <div className="dietTextArea">
                <CustomTextField
                  id="outlined-multiline-static"
                  label="Speciális étrend"
                  className="guestDiet"
                  color="4e5b51"
                  value={guest.diet}
                  onChange={(e) => handleFieldChange(guest.id, e.target.value)}
                />
              </div>
            </div>
          );
        });
    } else if (cardType === "music") {
      return (
        <div className="dietConfirmation">
          <div className="dietTextArea">
            <CustomTextField
              id="outlined-multiline-static"
              label="Zene javaslatok"
              className="guestMusic"
              color="4e5b51"
              value={currentGuestList[0].music}
              onChange={(e) => handleFieldChange(currentGuestList[0].id, e.target.value)}
            />
          </div>
        </div>
      );
    }
  }, [cardType, currentGuestList, handleFieldChange]);

  const onPrevPageClick = useCallback(() => {
    setCurrentPage((currentPage) => (currentPage === 0 ? currentPage : currentPage - 1));
    setGuestList(
      currentGuestList.map((guest) => ({
        id: guest.id,
        name: guest.name,
        attends: guest.attends,
        allergies: guest.allergies,
        diet: guest.diet,
        accomodation: guest.accomodation,
        music: guest.music,
      }))
    );
  }, [currentGuestList, setCurrentPage, setGuestList]);

  const onNextPageClick = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1);
    setGuestList(
      currentGuestList.map((guest) => ({
        id: guest.id,
        name: guest.name,
        attends: guest.attends,
        allergies: guest.allergies,
        diet: guest.diet,
        accomodation: guest.accomodation,
        music: guest.music,
      }))
    );
  }, [currentGuestList, setCurrentPage, setGuestList]);

  return (
    <div className="simpleCard">
      <h3 className="title">
        {cardType === "diet"
          ? "Van bármilyen speciális étrended (vegetáriánus, vegán, stb.)? Ha igen, milyen?"
          : "Oszd meg velünk a kedvenc zeneszámod amire szívesen buliznál..."}
      </h3>
      {renderContent()}
      <div className="rsvpActionButtons">
        <button className="rsvpActionButton" onClick={onPrevPageClick}>
          Vissza
        </button>
        <button className="rsvpActionButton" onClick={onNextPageClick}>
          Tovább
        </button>
      </div>
    </div>
  );
};
