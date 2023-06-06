import AgencyLayout from "@/components/Desktop/agencyLayout";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function CRAPage() {
  return (
    <>
      <Head>
        <title>CRA</title>
      </Head>
      <Typography variant="h5">CRA</Typography>
    </>
  );
}

CRAPage.getLayout = (page) => {
  return <AgencyLayout>{page}</AgencyLayout>;
};
