import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NoData({ message, url }) {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      flexDirection={"column"}
      width={"100%"}
      height={400}
    >
      <Typography variant="body1" fontSize={16} fontWeight={400}>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<Add fontSize="small" />}
        component={Link}
        href={url}
        sx={{
          textTransform: "capitalize",
        }}
      >
        New
      </Button>
    </Stack>
  );
}
