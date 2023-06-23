import { TextField, styled } from "@mui/material";

export const TextInputField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#362B6A",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#D8D5E5",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {},
    "&:hover fieldset": {
      borderColor: "#D8D5E5",
      borderWidth: 1,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D8D5E5",
      borderWidth: 1,
    },
  },
});
