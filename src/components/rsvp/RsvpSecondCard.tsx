import { useCallback, useState } from "react";
import { GuestInformation, RsvpCardProps } from "../../pages/Rsvp";
import { FaRegCalendarAlt } from "react-icons/fa";
import "./RsvpSecondCard.css";
import { useTranslation } from "react-i18next";

export const RsvpSecondCard = ({ setCurrentPage, setGuestList, guestList }: RsvpCardProps) => {
  const { t } = useTranslation();

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
              {t("rsvp2Attending")}
            </button>
            <button onClick={() => onAcceptanceClicked(guest.id, false)} className={`attendanceDecline${!guest.attends ? " selected" : ""}`}>
              {t("rsvp2NotAttending")}
            </button>
          </div>
        </div>
      );
    });
  }, [currentGuestList, onAcceptanceClicked, t]);

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
    const isAnyoneAttending = currentGuestList?.some((guest) => guest.attends);

    if (isAnyoneAttending) {
      setCurrentPage((currentPage) => currentPage + 1);
    } else {
      setCurrentPage(6);
    }
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
      <h3 className="title">{t("rsvp2Title")}</h3>
      <div className="subtitleWithIcon">
        <FaRegCalendarAlt />
        <h3 className="subtitle">{t("rsvp2SubtitleWithIcon")}</h3>
      </div>
      <h3 className="subtitle">{t("rsvp2SubtitleWithoutIcon")}</h3>
      {renderContent()}
      <div className="rsvpActionButtons">
        <button className="rsvpActionButton" onClick={onPrevPageClick}>
          {t("rsvpBack")}
        </button>
        <button className="rsvpActionButton" onClick={onNextPageClick}>
          {t("rsvpNext")}
        </button>
      </div>
    </div>
  );
};
