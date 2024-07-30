import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Rsvp.css";
import { RsvpFirstCard } from "../components";

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

export const Rsvp = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div id="rsvp">
      <button className="cancel" onClick={() => handleClick("/")}>
        X
      </button>
      <div className="rsvpHead">
        <h1>RSVP</h1>
        <BorderLinearProgress variant="determinate" value={50} />
      </div>
      <div className="rsvpBody">
        <RsvpFirstCard />
      </div>
    </div>
  );
};
