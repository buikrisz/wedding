import TextField from "@mui/material/TextField";
import React from "react";

export type CustomTextFieldProps = {
  color: string;
  required?: boolean;
  id: string;
  className: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomTextField = ({ color, required, className, label, id, value, onChange }: CustomTextFieldProps) => {
  return (
    <TextField
      required={required}
      id={id}
      label={label}
      className={className}
      value={value}
      onChange={onChange}
      sx={{
        width: "100%",
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
      }}
    />
  );
};
