import AccueilTable from "@/components/Desktop/AccueilTable";
import AgencyLayout from "@/components/Desktop/agencyLayout";
import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>CRA | Welcome</title>
      </Head>
      <Stack flexDirection={"column"} gap={1}>
        <Typography variant="caption" fontSize={18} fontWeight={700}>
          CRA en attente de validation
        </Typography>
        <AccueilTable />
      </Stack>
      <Stack flexDirection={"column"} gap={1} mt={2}>
        <Typography variant="caption" fontSize={18} fontWeight={700}>
          CRA validés
        </Typography>
        <AccueilTable validated={true} />
      </Stack>
    </>
  );
}

IndexPage.getLayout = (page) => {
  return <AgencyLayout>{page}</AgencyLayout>;
};
