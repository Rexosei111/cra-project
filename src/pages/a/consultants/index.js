import Listing from "@/components/Desktop/Listing";
import AgencyLayout from "@/components/Desktop/agencyLayout";
import BasicClientTable from "@/components/Desktop/clientsTable";
import SearchBar from "@/components/Desktop/searchBar";
import useToken from "@/hooks/token";
import { APIClient } from "@/utils/axios";
import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ConsultantsPage({ title }) {
  const [token, setToken] = useToken("token", null);
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState(consultants);
  useEffect(() => {
    async function get_consultants() {
      console.log("calling");
      try {
        const { data } = await APIClient.get("/api/consultants", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        console.log(data["hydra:member"]);
        setConsultants(data["hydra:member"]);
        setFilteredConsultants(data["hydra:member"]);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      }
    }
    get_consultants();
  }, []);
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
          <SearchBar data={consultants} setData={setFilteredConsultants} />
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
        </Stack>
        <BasicClientTable data={filteredConsultants} />
      </Stack>
    </>
  );
}

ConsultantsPage.getLayout = (page) => {
  return <AgencyLayout title={"Consultants"}>{page}</AgencyLayout>;
};
