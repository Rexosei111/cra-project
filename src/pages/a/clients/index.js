import Listing from "@/components/Desktop/Listing";
import AgencyLayout from "@/components/Desktop/agencyLayout";
import BasicClientTable from "@/components/Desktop/clientsTable";
import SearchBar from "@/components/Desktop/searchBar";
import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function ClientsPage({ title }) {
  return (
    <>
      {/* <Head>
        <title>{title}</title>
      </Head> */}
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
            href="/a/clients/new"
            startIcon={<Add fontSize="small" />}
            sx={{ ml: "auto", textTransform: "capitalize" }}
            disableElevation
          >
            New
          </Button>
          {/* <BasicClientTable /> */}
        </Stack>
        <Listing />
      </Stack>
    </>
  );
}

ClientsPage.getInitialProps = async (context) => {
  return {
    title: "Clients",
  };
};
ClientsPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
