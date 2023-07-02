import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import NewClientForm from "@/components/Desktop/newClient";
import NewConsultantForm from "@/components/Desktop/newConsultantForm";
import { Typography } from "@mui/material";
import Head from "next/head";
import React, { useContext } from "react";

export default function NewConsultantPage({ title }) {
  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle(title);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NewConsultantForm />
    </>
  );
}
NewConsultantPage.getInitialProps = async (context) => {
  return {
    title: "Nouveau consultant",
  };
};
NewConsultantPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
