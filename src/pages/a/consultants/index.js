import Listing from "@/components/Desktop/Listing";
import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import BasicClientTable, {
  BasicConsultantsTable,
} from "@/components/Desktop/Tables";
import SearchBar from "@/components/Desktop/searchBar";
import useToken from "@/hooks/token";
import { APIClient } from "@/utils/axios";
import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ErrorComponent, ListingLoadingSkeleton } from "../clients";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import RetryError from "@/components/Errors/ErrorWithRetry";
import TableListingSkeleton from "@/components/Loading/ListingSkeleton";
import NoData from "@/components/noData";
export default function ConsultantsPage() {
  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Consultants");
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
            searchFields={["firstName", "lastName"]}
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
        {isLoading && <TableListingSkeleton />}
        {!isLoading && error && <RetryError refresh={mutate} />}
        {data && data["hydra:totalItems"] === 0 && (
          <NoData
            message={"Your organisation does not have a consultant yet."}
            url={"/a/consultants/new"}
          />
        )}
        {data && !error && data["hydra:totalItems"] > 0 && (
          <BasicConsultantsTable data={filteredConsultants} />
        )}
      </Stack>
    </>
  );
}

ConsultantsPage.getLayout = (page) => {
  return <AgencyLayout title={"Consultants"}>{page}</AgencyLayout>;
};
