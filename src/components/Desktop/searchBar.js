import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { TextInputField } from "./newClient";
import { Search } from "@mui/icons-material";

export default function SearchBar({ setData, data, searchFields = ["name"] }) {
  const handleFilter = (e) => {
    // console.log(e.target.value);
    const filteredResults = data.filter((item) => {
      const searchValue = e.target.value?.toLowerCase();

      // Define the object keys you want to use for filtering

      // Check if any of the filter keys contain the search value
      return searchFields.some((key) =>
        item[key]?.toLowerCase().includes(searchValue)
      );
    });
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
