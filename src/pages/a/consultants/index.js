import AgencyLayout from "@/components/Desktop/agencyLayout";
import SearchBar from "@/components/Desktop/searchBar";
import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function ConsultantsPage({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Stack width={"100%"} flexDirection={"column"} gap={2}>
        <Stack
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <SearchBar />
          <Button
            variant="contained"
            component={Link}
            href="/a/consultants/new"
            startIcon={<Add fontSize="small" />}
            sx={{ ml: "auto", textTransform: "capitalize" }}
            disableElevation
          >
            New
          </Button>
          {/* <BasicClientTable /> */}
        </Stack>
      </Stack>
    </>
  );
}

ConsultantsPage.getInitialProps = async (context) => {
  return {
    title: "Consultants",
  };
};
ConsultantsPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
