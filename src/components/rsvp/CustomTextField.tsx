import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import React from "react";

export type CustomTextFieldProps = {
  color: string;
  required: boolean;
  id: string;
  className: string;
  label: string;
};

export const CustomTextField = ({ color, required, className, label, id }: CustomTextFieldProps) => {
  const CustomTextField = styled(TextField)(() => ({
    "& .MuiInputLabel-root": {
      color: `#${color}`, // Default label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: `#${color}`, // Label color when focused
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `#${color}`, // Border color
      },
      "&:hover fieldset": {
        borderColor: `#${color}`, // Highlight color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: `#${color}`, // Highlight color when focused
      },
    },
  }));

  return <CustomTextField {...(required != null ? { required } : undefined)} id={id} label={label} className={className} />;
};
