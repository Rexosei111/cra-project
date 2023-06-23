import { Button, Stack, Typography } from "@mui/material";
import React from "react";

export default function RetryError({ refresh }) {
  const retry = () => {
    refresh();
  };
  return (
    <Stack
      width={"100%"}
      height={300}
      alignItems={"center"}
      flexDirection={"column"}
      gap={1}
      justifyContent={"center"}
    >
      <Typography variant="h5" gutterBottom>
        Unable to load data
      </Typography>
      <Button
        variant="contained"
        sx={{ textTransform: "lowercase" }}
        disableElevation
        color="info"
        onClick={retry}
      >
        retry
      </Button>
    </Stack>
  );
}
