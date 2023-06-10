import { Paper } from "@mui/material";
import React from "react";
import BasicClientTable from "./clientsTable";

export default function Listing() {
  return (
    <Paper elevation={0} sx={{ width: "100%", overflowX: "auto" }}>
      <BasicClientTable />
    </Paper>
  );
}
