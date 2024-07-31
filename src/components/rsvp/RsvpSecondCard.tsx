import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { GuestInformation } from "../../pages/Rsvp";
import "./RsvpSecondCard.css";

type RsvpSecondCardProps = {
  guestList: GuestInformation[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setGuestList: Dispatch<SetStateAction<GuestInformation[]>>;
};

export const RsvpSecondCard = ({ setCurrentPage, setGuestList, guestList }: RsvpSecondCardProps) => {
  const [currentGuestList, setCurrentGuestList] = useState<GuestInformation[]>(guestList ?? []);

  const onAcceptanceClicked = useCallback(
    (guestId: string, attends: boolean) => {
      setCurrentGuestList((currentList) => {
        return currentList.map((guest) => (guest.id === guestId ? { ...guest, attends } : guest));
      });
    },
    [setCurrentGuestList]
  );

  const renderContent = useCallback(() => {
    return currentGuestList?.map((guest) => {
      return (
        <div className="attendanceConfirmation">
          <h3>{guest.name}</h3>
          <div className="attendanceConfirmationButtons">
            <button onClick={() => onAcceptanceClicked(guest.id, true)} className={`attendanceAccept${guest.attends ? " selected" : ""}`}>
              Jövök
            </button>
            <button onClick={() => onAcceptanceClicked(guest.id, false)} className={`attendanceDecline${!guest.attends ? " selected" : ""}`}>
              Nem jövök
            </button>
          </div>
        </div>
      );
    });
  }, [currentGuestList, onAcceptanceClicked]);

  const onPrevPageClick = useCallback(() => {
    setCurrentPage((currentPage) => (currentPage === 0 ? currentPage : currentPage - 1));
    setGuestList(currentGuestList.map((guest) => ({ id: guest.id, name: guest.name, attends: guest.attends })));
  }, [currentGuestList, setCurrentPage, setGuestList]);

  const onNextPageClick = useCallback(() => {
    setCurrentPage((currentPage) => (currentPage === 5 ? currentPage : currentPage + 1));
    setGuestList(currentGuestList.map((guest) => ({ id: guest.id, name: guest.name, attends: guest.attends })));
  }, [currentGuestList, setCurrentPage, setGuestList]);

  return (
    <div className="simpleCard">
      <h3 className="title">Házasságkötésünk napja</h3>
      <h3 className="subtitle">IKON - 2024. Október 11, Péntek - 13:00</h3>
      <h3 className="subtitle">
        Kedves Családunk és Barátaink! Ezúton szeretnénk meghívni az esküvőnkre, reméljük Velünk tudsz tartani. Várjuk a visszajelzésed!
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
