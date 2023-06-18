import AgencyLayout from "@/components/Desktop/agencyLayout";
import BasicClientTable from "@/components/Desktop/clientsTable";
import SearchBar from "@/components/Desktop/searchBar";
import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/utils/swr_fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";

export const ListingLoadingSkeleton = () => {
  return (
    <Stack
      component={Paper}
      p={2}
      flexDirection={"column"}
      gap={2}
      elevation={0}
      width={"100%"}
    >
      <Skeleton variant="text" width={"30%"} height={20} />
      <Skeleton variant="text" width={"40%"} height={20} />
      <Skeleton variant="rectangular" width={"100%"} height={200} />
      <Skeleton variant="text" width={"40%"} height={20} />
      <Skeleton variant="text" width={"50%"} height={20} />
    </Stack>
  );
};

export const ErrorComponent = ({ refresh }) => {
  const retry = () => {
    refresh();
  };
  return (
    <Stack
      width={"100%"}
      height={300}
      alignItems={"center"}
      flexDirection={"column"}
      gap={1}
      justifyContent={"center"}
    >
      <Typography variant="h5" gutterBottom>
        Unable to load data
      </Typography>
      <Button
        variant="contained"
        sx={{ textTransform: "lowercase" }}
        disableElevation
        color="info"
        onClick={retry}
      >
        retry
      </Button>
    </Stack>
  );
};
export default function ClientsPage() {
  const [filteredClients, setFilteredClients] = useState([]);
  const { data, error, isLoading, mutate } = useSWR(
    () => "/api/clients",
    fetcher
  );
  useEffect(() => {
    if (typeof data !== "undefined") {
      setFilteredClients(data["hydra:member"]);
    }
  }, [data]);

  return (
    <>
      <Stack width={"100%"} flexDirection={"column"} gap={2}>
        <Stack
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <SearchBar
            data={data ? data["hydra:member"] : []}
            setData={setFilteredClients}
          />
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
        </Stack>
        {isLoading && <ListingLoadingSkeleton />}
        {!isLoading && error && <ErrorComponent refresh={mutate} />}
        {filteredClients && <BasicClientTable data={filteredClients} />}
      </Stack>
    </>
  );
}

ClientsPage.getLayout = (page) => {
  return <AgencyLayout title={"Clients"}>{page}</AgencyLayout>;
};
