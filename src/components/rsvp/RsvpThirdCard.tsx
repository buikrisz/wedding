import { useCallback, useState } from "react";
import { GuestInformation, RsvpCardProps } from "../../pages/Rsvp";
import "./RsvpThirdCard.css";

export const RsvpThirdCard = ({ guestList, setCurrentPage, setGuestList }: RsvpCardProps) => {
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
                Nincs
              </button>
              <button className={`${guest.allergies.includes("lactose") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "lactose")}>
                Laktóz
              </button>
              <button className={`${guest.allergies.includes("gluten") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "gluten")}>
                Glutén
              </button>
              <button className={`${guest.allergies.includes("nuts") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "nuts")}>
                Mogyoró és diófélék
              </button>
              <button className={`${guest.allergies.includes("egg") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "egg")}>
                Tojás
              </button>
              <button className={`${guest.allergies.includes("fish") ? "selected" : ""}`} onClick={() => onAllergenClicked(guest.id, "fish")}>
                Tenger gyümölcsei & halak
              </button>
            </div>
          </div>
        );
      });
  }, [currentGuestList, onAllergenClicked]);

  const onPrevPageClick = useCallback(() => {
    setCurrentPage((currentPage) => (currentPage === 0 ? currentPage : currentPage - 1));
    setGuestList(currentGuestList.map((guest) => ({ id: guest.id, name: guest.name, attends: guest.attends, allergies: guest.allergies })));
  }, [currentGuestList, setCurrentPage, setGuestList]);

  const onNextPageClick = useCallback(() => {
    setCurrentPage((currentPage) => (currentPage === 5 ? currentPage : currentPage + 1));
    setGuestList(currentGuestList.map((guest) => ({ id: guest.id, name: guest.name, attends: guest.attends, allergies: guest.allergies })));
  }, [currentGuestList, setCurrentPage, setGuestList]);

  return (
    <div className="simpleCard">
      <h3 className="title">Van valamilyen ételintoleranciád & allergiád?</h3>
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
