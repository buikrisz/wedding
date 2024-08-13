import { useCallback, useEffect, useMemo, useState } from "react";
import { AllergenList, RsvpCardProps } from "../../pages/Rsvp";
import Paper from "@mui/material/Paper";
import emailjs from "@emailjs/browser";
import "./RsvpFinalCard.css";
import apiKey from "../../emailkey";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

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

export const RsvpFinalCard = ({ setCurrentPage, guestList }: RsvpCardProps) => {
  const { t } = useTranslation();

  const allergenList = useMemo(
    () => ({
      none: t("rsvp3None"),
      lactose: t("rsvp3Lactose"),
      milk: t("rsvp3Milk"),
      gluten: t("rsvp3Gluten"),
      nuts: t("rsvp3Nuts"),
      egg: t("rsvp3Egg"),
      soy: t("rsvp3Soy"),
      fish: t("rsvp3Fish"),
    }),
    [t]
  );

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const renderContent = useCallback(() => {
    return guestList.map((guest) => {
      return (
        <Paper elevation={3} sx={{ width: 200, height: 350, padding: 3, backgroundColor: "#4e5b51", color: "#fff" }}>
          <h3>
            {t("rsvp6Name")}: {guest.name}
          </h3>
          <h4>
            {t("rsvp6Attending")}: {guest.attends ? t("rsvp6AttendingYes") : t("rsvp6AttendingNo")}
          </h4>
          {guest.attends && (
            <h4>
              {t("rsvp6Allergies")}:{" "}
              {guest.allergies == null || guest.allergies.length === 0 || guest.allergies[0] === "none"
                ? t("rsvp6None")
                : guest.allergies.map((allergy) => allergenList[allergy as keyof AllergenList]).join(" & ")}
            </h4>
          )}
          {guest.attends && (
            <h4>
              {t("rsvp6SpecialDiet")}: {guest.diet == null || guest.diet.length === 0 ? t("rsvp6None") : guest.diet}
            </h4>
          )}
          {guest.attends && (
            <h4>
              {t("rsvp6Accomodation")}: {guest.accomodation ? t("rsvp6AccYes") : t("rsvp6AccNo")}
            </h4>
          )}
          {guest.attends && guest.id === "mainGuest" && (
            <h4>
              {t("rsvp6Music")}: {guest.music}
            </h4>
          )}
        </Paper>
      );
    });
  }, [allergenList, guestList, t]);

  const onPrevPageClick = useCallback(() => {
    const isAnyoneAttending = guestList?.some((guest) => guest.attends);

    if (isAnyoneAttending) {
      setCurrentPage((currentPage) => (currentPage === 0 ? currentPage : currentPage - 1));
    } else {
      setCurrentPage(1);
    }
  }, [guestList, setCurrentPage]);

  const onNextPageClick = useCallback(() => {
    setCurrentPage((currentPage) => (currentPage === 0 ? currentPage : currentPage + 1));
    setFormSubmitted(true);
  }, [setCurrentPage]);

  useEffect(() => {
    if (formSubmitted) {
      setIsAnimationStarted(true);
      const formResult: FormResult = {} as FormResult;

      formResult[`name` as keyof FormResult] = `${guestList[0].name}`;

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
          setIsAnimationStarted(false);
          console.log(t("rsvp6MailSent"));
        })
        .catch((err: string) => {
          setIsAnimationStarted(false);
          alert(t("rsvp6ErrorMessage"));
          console.log(err);
        });
    }
  }, [allergenList, formSubmitted, guestList, t]);

  return formSubmitted ? (
    <div className="simpleCard finalCard formSubmitted">
      {isAnimationStarted ? <CircularProgress color="inherit" /> : <h3 className="title">{t("rsvp6TitleDone")}</h3>}
    </div>
  ) : (
    <div className="simpleCard finalCard">
      <h3 className="title">{t("rsvp6Title")}</h3>
      <div className="finalGuestCards">{renderContent()}</div>
      <div className="rsvpActionButtons">
        <button className="rsvpActionButton" onClick={onPrevPageClick}>
          {t("rsvpBack")}
        </button>
        <button className="rsvpActionButton" onClick={onNextPageClick}>
          {t("rsvpSubmit")}
        </button>
      </div>
    </div>
  );
};
