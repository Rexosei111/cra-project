import AgencyLayout from "@/components/Desktop/agencyLayout";
import NewMissionForm from "@/components/Desktop/newMissionForm";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function NewMissionsPage({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NewMissionForm />
    </>
  );
}
NewMissionsPage.getInitialProps = async (context) => {
  return {
    title: "Nouveau mission",
  };
};
NewMissionsPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
