import AgencyLayout from "@/components/Desktop/agencyLayout";
import NewClientForm from "@/components/Desktop/newClient";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function NewClientPage() {
  return (
    <>
      <Head>
        <title>Nouveau client</title>
      </Head>
      <NewClientForm />
    </>
  );
}

NewClientPage.getLayout = (page) => {
  return <AgencyLayout title={"Nouveau client"}>{page}</AgencyLayout>;
};
