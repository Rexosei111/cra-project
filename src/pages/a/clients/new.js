import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import NewClientForm from "@/components/Desktop/newClient";
import { Typography } from "@mui/material";
import Head from "next/head";
import React, { useContext } from "react";

export default function NewClientPage() {
  const { topbarTitle, setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Nouveau client");
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
