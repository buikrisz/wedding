import { useCallback, useState } from "react";
import { GuestInformation, RsvpCardProps } from "../../pages/Rsvp";
import "./RsvpFifthCard.css";

export const RsvpFifthCard = ({ setCurrentPage, setGuestList, guestList }: RsvpCardProps) => {
  const [currentGuestList, setCurrentGuestList] = useState<GuestInformation[]>(guestList ?? []);

  const onAcceptanceClicked = useCallback(
    (guestId: string, accomodation: boolean) => {
      setCurrentGuestList((currentList) => {
        return currentList.map((guest) => (guest.id === guestId ? { ...guest, accomodation } : guest));
      });
    },
    [setCurrentGuestList]
  );

  const renderContent = useCallback(() => {
    return currentGuestList?.map((guest) => {
      return (
        <div className="accomodationConfirmation">
          <h3>{guest.name}</h3>
          <div className="accomodationConfirmationButtons">
            <button onClick={() => onAcceptanceClicked(guest.id, true)} className={`accomodationAccept${guest.accomodation ? " selected" : ""}`}>
              Szeretnék szállást
            </button>
            <button onClick={() => onAcceptanceClicked(guest.id, false)} className={`accomodationDecline${!guest.accomodation ? " selected" : ""}`}>
              Nem szeretnék szállást
            </button>
          </div>
        </div>
      );
    });
  }, [currentGuestList, onAcceptanceClicked]);

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
    setCurrentPage((currentPage) => (currentPage === 5 ? currentPage : currentPage + 1));
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
      <h3 className="title">Szeretnél megszállni a helyszínen vagy a környéken?</h3>
      <h3 className="subtitle">
        Amennyiben több igény érkezik a szállásra, mint amennyit a helyszín tud biztosítani, legfeljebb javasolni tudunk a környéken (Inárcson) szállás
        lehetőségeket.
      </h3>
      <h3 className="subtitle">
        A helyszín viszonylag közel van Budapesthez, szóval a nem vidékről érkezők számára akár a sofőrszolgálatot is tudjuk javasolni.
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
