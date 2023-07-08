import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { TextInputField } from "../textInput";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import missionImage from "../../../public/test2.svg";
import Image from "next/image";
import { Paper, Typography, styled } from "@mui/material";

export const MissionTextInputField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#362B6A",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#D8D5E5",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px 5px 0 0",

    "& fieldset": {},
    "&:hover fieldset": {
      borderColor: "#D8D5E5",
      borderRadius: "5px 5px 0 0",
      //   borderBottomColor: "white",

      borderWidth: 1,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D8D5E5",
      borderRadius: "5px 5px 0 0",
      borderWidth: 1,
    },
  },
});

const PaperRender = ({ children }) => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ borderRadius: "0 0 5px 5px", borderTopColor: "white" }}
    >
      {children}
    </Paper>
  );
};
export default function MissionSelect({ setMission }) {
  const { data = [], error, isLoading } = useSWR("/api/missions", fetcher);
  const handleMissionChange = (event, newMission) => {
    setMission(newMission);
  };
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: "100%" }}
      options={data ? data["hydra:member"] : []}
      autoHighlight
      onChange={handleMissionChange}
      PaperComponent={PaperRender}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <Image loading="lazy" width="25" src={missionImage} alt="" />
          <Typography variant="subtitle2" fontSize={14}>
            {option.name}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <MissionTextInputField
          sx={{
            bgcolor: (theme) => theme.palette.background.paper,
          }}
          {...params}
          label="Choix de la mission"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
