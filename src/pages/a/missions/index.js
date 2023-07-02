import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import BasicClientTable, {
  BasicMissionsTable,
} from "@/components/Desktop/Tables";
import SearchBar from "@/components/Desktop/searchBar";
import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ErrorComponent, ListingLoadingSkeleton } from "../clients";
import TableListingSkeleton from "@/components/Loading/ListingSkeleton";
import RetryError from "@/components/Errors/ErrorWithRetry";
import { fetcher } from "@/utils/swr_fetcher";
import useSWR from "swr";
import NoData from "@/components/noData";

export default function MissionsPage({ title }) {
  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Missions");

  const [filteredMissions, setFilteredMissions] = useState([]);
  const { data, error, isLoading, mutate } = useSWR(
    () => "/api/missions",
    fetcher
  );
  useEffect(() => {
    if (typeof data !== "undefined") {
      setFilteredMissions(data["hydra:member"]);
    }
  }, [data]);

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
          <SearchBar
            data={data ? data["hydra:member"] : []}
            setData={setFilteredMissions}
          />
          <Button
            variant="contained"
            component={Link}
            href="/a/missions/new"
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
            message={"Your organisation does not have a mission yet."}
            url={"/a/missions/new"}
          />
        )}
        {data && !error && data["hydra:totalItems"] > 0 && (
          <BasicMissionsTable data={filteredMissions} />
        )}
      </Stack>
    </>
  );
}

MissionsPage.getInitialProps = async (context) => {
  return {
    title: "Missions",
  };
};
MissionsPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
