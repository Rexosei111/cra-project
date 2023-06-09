import AgencyLayout from "@/components/Desktop/agencyLayout";
import NewClientForm from "@/components/Desktop/newClient";
import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function NewClientPage({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NewClientForm />
    </>
  );
}
NewClientPage.getInitialProps = async (context) => {
  return {
    title: "Nouveau client",
  };
};
NewClientPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
