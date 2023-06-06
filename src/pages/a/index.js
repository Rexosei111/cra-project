import AgencyLayout from "@/components/Desktop/agencyLayout";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>CRA | Welcome</title>
      </Head>
      <Typography variant="h5">Welcome</Typography>
    </>
  );
}

IndexPage.getLayout = (page) => {
  return <AgencyLayout>{page}</AgencyLayout>;
};
