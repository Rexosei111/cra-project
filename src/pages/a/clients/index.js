import Listing from "@/components/Desktop/Listing";
import AgencyLayout from "@/components/Desktop/agencyLayout";
import BasicClientTable from "@/components/Desktop/clientsTable";
import SearchBar from "@/components/Desktop/searchBar";
import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/utils/swr_fetcher";
import useSWR from "swr";
import axios, { isAxiosError } from "axios";
import { headers } from "next/dist/client/components/headers";
import useToken from "@/hooks/token";

export default function ClientsPage() {
  const [token, setToken] = useToken("token", null);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState(clients);
  // const { data, error, isLoading } = useSWR("/api/clients", fetcher);
  useEffect(() => {
    async function get_clients() {
      try {
        const { data } = await axios.get(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/clients",
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        console.log(data["hydra:member"]);
        setClients(data["hydra:member"]);
        setFilteredClients(data["hydra:member"]);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      }
    }
    get_clients();
  }, []);
  return (
    <>
      <Stack width={"100%"} flexDirection={"column"} gap={2}>
        <Stack
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <SearchBar data={clients} setData={setFilteredClients} />
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
        <BasicClientTable data={filteredClients} />
      </Stack>
    </>
  );
}

ClientsPage.getLayout = (page) => {
  return <AgencyLayout title={"Clients"}>{page}</AgencyLayout>;
};
