import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { TextInputField } from "./newClient";
import { Search } from "@mui/icons-material";

export default function SearchBar({ setData, data }) {
  const handleFilter = (e) => {
    // console.log(e.target.value);
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value?.toLowerCase())
    );
    setData(filteredResults);
  };
  return (
    <TextInputField
      variant="outlined"
      size="small"
      name="search"
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        width: { xs: "100%", md: "40%" },
      }}
      onChange={handleFilter}
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
