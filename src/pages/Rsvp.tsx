import { styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Rsvp.css";
import { RsvpFirstCard, RsvpSecondCard } from "../components";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  width: "95%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#4e5b51" : "#308fe8",
  },
}));

export type GuestInformation = {
  id: string;
  name: string;
  attends: boolean;
};

export const Rsvp = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [guestList, setGuestList] = useState<GuestInformation[]>([]);

  useEffect(() => {
    console.log(">>>", guestList);
  }, [guestList]);

  const handleClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const renderRsvpCards = useCallback(() => {
    switch (currentPage) {
      case 1:
        return <RsvpSecondCard setCurrentPage={setCurrentPage} guestList={guestList} setGuestList={setGuestList} />;
      case 2:
        return <div>2</div>;
      case 3:
        return <div>3</div>;
      case 4:
        return <div>4</div>;

      default:
        return <RsvpFirstCard setCurrentPage={setCurrentPage} guestList={guestList} setGuestList={setGuestList} />;
    }
  }, [currentPage, guestList]);

  return (
    <div id="rsvp">
      <button className="cancel" onClick={() => handleClick("/")}>
        X
      </button>
      <div className="rsvpHead">
        <h1>RSVP</h1>
        <BorderLinearProgress variant="determinate" value={50} />
      </div>
      <div className="rsvpBody">{renderRsvpCards()}</div>
    </div>
  );
};
