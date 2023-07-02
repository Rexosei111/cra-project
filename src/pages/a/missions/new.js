import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import NewMissionForm from "@/components/Desktop/newMissionForm";
import { Typography } from "@mui/material";
import Head from "next/head";
import React, { useContext } from "react";

export default function NewMissionsPage({ title }) {
  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Nouveau mission");

  return (
    <>
      <Head>
        <title>Nouveau mission</title>
      </Head>
      <NewMissionForm />
    </>
  );
}

NewMissionsPage.getLayout = (page) => {
  return <AgencyLayout title={"Nouveau mission"}>{page}</AgencyLayout>;
};
