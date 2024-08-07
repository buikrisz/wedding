import { useCallback, useState } from "react";
import { GuestInformation, RsvpCardProps } from "../../pages/Rsvp";
import "./RsvpThirdCard.css";
import { useTranslation } from "react-i18next";

export const RsvpThirdCard = ({ guestList, setCurrentPage, setGuestList }: RsvpCardProps) => {
  const { t } = useTranslation();

  const [currentGuestList, setCurrentGuestList] = useState<GuestInformation[]>(guestList ?? []);

  const onAllergenClicked = useCallback(
    (guestId: string, allergenId: string) => {
      setCurrentGuestList((currentList) => {
        return currentList.map((guest) => {
          if (guest.id === guestId) {
            if (allergenId === "none") {
              return { ...guest, allergies: ["none"] };
            }

            const allergenIndex = guest.allergies.indexOf(allergenId);

            const updatedAllergies =
              allergenIndex === -1 ? [...guest.allergies.filter((id) => id !== "none"), allergenId] : guest.allergies.filter((id) => id !== allergenId);

            return { ...guest, allergies: updatedAllergies };
          }

          return guest;
        });
      });
    },
    [setCurrentGuestList]
  );

  const renderContent = useCallback(() => {
    return currentGuestList
      ?.filter((guest) => guest.attends)
      .map((guest) => {
        return (
          <div className="allergenListWithName">
            <h3>{guest.name}:</h3>
            <div className="allergenList">
              <button className={`${guest.allergies.includes("none") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "none")}>
                {t("rsvp3None")}
              </button>
              <button className={`${guest.allergies.includes("lactose") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "lactose")}>
                {t("rsvp3Lactose")}
              </button>
              <button className={`${guest.allergies.includes("milk") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "milk")}>
                {t("rsvp3Milk")}
              </button>
              <button className={`${guest.allergies.includes("gluten") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "gluten")}>
                {t("rsvp3Gluten")}
              </button>
              <button className={`${guest.allergies.includes("nuts") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "nuts")}>
                {t("rsvp3Nuts")}
              </button>
              <button className={`${guest.allergies.includes("egg") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "egg")}>
                {t("rsvp3Egg")}
              </button>
              <button className={`${guest.allergies.includes("soy") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "soy")}>
                {t("rsvp3Soy")}
              </button>
              <button className={`${guest.allergies.includes("fish") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "fish")}>
                {t("rsvp3Fish")}
              </button>
            </div>
          </div>
        );
      });
  }, [currentGuestList, onAllergenClicked, t]);

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
      <h3 className="title">{t("rsvp3Title")}</h3>
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
