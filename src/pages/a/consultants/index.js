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
import { ErrorComponent, ListingLoadingSkeleton } from "../clients";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
export default function ConsultantsPage() {
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    () => "/api/consultants",
    fetcher
  );
  useEffect(() => {
    if (typeof data !== "undefined") {
      setFilteredConsultants(data["hydra:member"]);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Consultants</title>
      </Head>
      <Stack width={"100%"} flexDirection={"column"} gap={2}>
        <Stack
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <SearchBar
            data={data ? data["hydra:member"] : []}
            setData={setFilteredConsultants}
          />
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
        {isLoading && <ListingLoadingSkeleton />}
        {!isLoading && error && <ErrorComponent refresh={mutate} />}
        {filteredConsultants && <BasicClientTable data={filteredConsultants} />}
      </Stack>
    </>
  );
}

ConsultantsPage.getLayout = (page) => {
  return <AgencyLayout title={"Consultants"}>{page}</AgencyLayout>;
};
