import AgencyLayout from "@/components/Desktop/agencyLayout";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function ConsultantsPage() {
  return (
    <>
      <Head>
        <title>Consultants</title>
      </Head>
      <Typography variant="h5">Consultants</Typography>
    </>
  );
}

ConsultantsPage.getLayout = (page) => {
  return <AgencyLayout>{page}</AgencyLayout>;
};
