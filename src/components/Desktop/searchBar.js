import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { TextInputField } from "./newClient";
import { Search } from "@mui/icons-material";

export default function SearchBar() {
  return (
    <TextInputField
      variant="outlined"
      size="small"
      name="search"
      //   label="Rechercher"
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        width: { xs: "100%", md: "40%" },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize="small" />
          </InputAdornment>
        ),
      }}
      placeholder="Rechercher"
    />
  );
}
