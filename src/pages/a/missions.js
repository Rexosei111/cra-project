import AgencyLayout from "@/components/Desktop/agencyLayout";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function MissionsPage() {
  return (
    <>
      <Head>
        <title>Missions</title>
      </Head>
      <Typography variant="h5">Missions</Typography>
    </>
  );
}

MissionsPage.getLayout = (page) => {
  return <AgencyLayout>{page}</AgencyLayout>;
};
