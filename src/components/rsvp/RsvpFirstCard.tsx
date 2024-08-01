import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomTextField } from "./CustomTextField";
import "./RsvpFirstCard.css";
import { GuestInformation, RsvpCardProps } from "../../pages/Rsvp";

export const RsvpFirstCard = ({ setCurrentPage, setGuestList, guestList }: RsvpCardProps) => {
  const [validationError, setValidationError] = useState<string>("");

  const mainGuest: GuestInformation = useMemo(
    () => ({ id: "mainGuest", name: "", attends: false, allergies: ["none"], diet: "", accomodation: false, music: "" }),
    []
  );

  const initialGuestList: GuestInformation[] = useMemo(() => {
    const guestListFromProps = guestList?.map(
      (guest): GuestInformation => ({
        id: guest.id,
        name: guest.name,
        attends: guest.attends,
        allergies: guest.allergies,
        diet: guest.diet,
        accomodation: guest.accomodation,
        music: guest.music,
      })
    );

    return guestListFromProps?.length !== 0 ? guestListFromProps : [mainGuest];
  }, [guestList, mainGuest]);

  const [guestFields, setGuestFields] = useState<GuestInformation[]>(initialGuestList ?? [mainGuest]);

  const onRemoveGuestField = useCallback((guestId: string) => {
    setGuestFields((currentFields) => currentFields.filter((field) => field.id !== guestId));
  }, []);

  const onAddNewGuest = useCallback(() => {
    if (guestFields?.length < 5) {
      const newId = uuidv4();
      setGuestFields((currentFields) => [
        ...currentFields,
        { id: newId, name: "", attends: false, allergies: ["none"], diet: "", accomodation: false, music: "" },
      ]);
    }
  }, [guestFields?.length]);

  const handleFieldChange = useCallback((id: string, newValue: string) => {
    setGuestFields((currentFields) => currentFields.map((field) => (field.id === id ? { ...field, name: newValue } : field)));
  }, []);

  const renderGuestFields = useMemo(() => {
    return guestFields.map((field) => {
      if (field.id !== "mainGuest") {
        return (
          <div className="removeGuestText" key={field.id}>
            <CustomTextField
              id={`guest-${field.id}`}
              label="Extra vendég"
              className="guestNameText"
              color="4e5b51"
              value={field.name}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            <button className="rsvpFirstCancelCustomField" onClick={() => onRemoveGuestField(field.id)}>
              X
            </button>
          </div>
        );
      } else {
        return undefined;
      }
    });
  }, [guestFields, handleFieldChange, onRemoveGuestField]);

  const validateFields = useCallback(() => {
    const isMainGuestNameEmpty = guestFields.find((field) => field.id === "mainGuest" && !field.name.trim());

    if (isMainGuestNameEmpty) {
      setValidationError("Kérlek add meg a neved!");
      return false;
    } else {
      setValidationError("");
      return true;
    }
  }, [guestFields]);

  const onNextPageClick = useCallback(() => {
    const isValidated = validateFields();

    if (isValidated) {
      setCurrentPage((currentPage) => currentPage + 1);
      setGuestList(
        guestFields
          .filter((field) => field.name?.length !== 0)
          .map((field) => ({
            id: field.id,
            name: field.name,
            attends: field.attends,
            allergies: field.allergies,
            diet: field.diet,
            accomodation: field.accomodation,
            music: field.music,
          }))
      );
    }
  }, [guestFields, setCurrentPage, setGuestList, validateFields]);

  return (
    <div className="simpleCard">
      <h3 className="title">Dominika & Krisztián Esküvője</h3>
      <h3 className="subtitle">Kérjük jelezz vissza nekünk, hogy részt tudsz-e venni családoddal/pároddal esküvőnkön, az alábbi adatokat kitöltve.</h3>
      <CustomTextField
        required
        id="outlined-required"
        label="Teljes név"
        className="nameText"
        color="4e5b51"
        value={guestFields.find((field) => field.id === "mainGuest")?.name || ""}
        onChange={(e) => handleFieldChange("mainGuest", e.target.value)}
      />
      {validationError != null && validationError.length > 0 && <h4 className="validationError">*{validationError}</h4>}
      {renderGuestFields}
      <button className="rsvpActionButton" onClick={onAddNewGuest}>
        Extra vendég hozzáadása
      </button>
      <button className="rsvpActionButton" onClick={onNextPageClick}>
        Tovább
      </button>
    </div>
  );
};
