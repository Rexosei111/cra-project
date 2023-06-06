import AgencyLayout from "@/components/Desktop/agencyLayout";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function ClientsPage() {
  return (
    <>
      <Head>
        <title>Clients </title>
      </Head>
      <Typography variant="h5">Clients</Typography>
    </>
  );
}

ClientsPage.getLayout = (page) => {
  return <AgencyLayout>{page}</AgencyLayout>;
};
