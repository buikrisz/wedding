import { useCallback, useState } from "react";
import { GuestInformation, RsvpCardProps } from "../../pages/Rsvp";
import "./RsvpFifthCard.css";
import { useTranslation } from "react-i18next";

export const RsvpFifthCard = ({ setCurrentPage, setGuestList, guestList }: RsvpCardProps) => {
  const { t } = useTranslation();

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
    return currentGuestList
      ?.filter((guest) => guest.attends)
      .map((guest) => {
        return (
          <div className="accomodationConfirmation">
            <h3>{guest.name}</h3>
            <div className="accomodationConfirmationButtons">
              <button onClick={() => onAcceptanceClicked(guest.id, true)} className={`accomodationAccept${guest.accomodation ? " selected" : ""}`}>
                {t("rsvp5AccomodationAccept")}
              </button>
              <button onClick={() => onAcceptanceClicked(guest.id, false)} className={`accomodationDecline${!guest.accomodation ? " selected" : ""}`}>
                {t("rsvp5AccomodationDecline")}
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
      <h3 className="title">{t("rsvp5Title")}</h3>
      <h3 className="subtitle">{t("rsvp5Subtitle1")}</h3>
      <h3 className="subtitle">{t("rsvp5Subtitle2")}</h3>
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
