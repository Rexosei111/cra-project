import { BasicManagersTable } from "@/components/Desktop/Tables";
import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import SearchBar from "@/components/Desktop/searchBar";
import RetryError from "@/components/Errors/ErrorWithRetry";
import TableListingSkeleton from "@/components/Loading/ListingSkeleton";
import NoData from "@/components/noData";
import useToken from "@/hooks/token";
import { fetcher } from "@/utils/swr_fetcher";
import { Add } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";

export default function UsersListingPage() {
  const [token, setToken] = useToken("token", null);

  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Utilisateurs");

  const [filteredManagers, setFilteredManagers] = useState([]);
  const { data, error, isLoading, mutate } = useSWR(
    () => "/api/managers",
    fetcher
  );

  useEffect(() => {
    if (typeof data !== "undefined") {
      const api_managers = data["hydra:member"].filter((manager) => {
        if (manager.id !== token?.me?.id) {
          return manager;
        }
      });
      setFilteredManagers(api_managers);
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
            searchFields={["firstName", "lastName"]}
            setData={setFilteredManagers}
          />
          <Button
            variant="contained"
            component={Link}
            href="/a/utilisateurs/new"
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
            message={"Unable to retrieve data at this time."}
            url={"/a/missions/new"}
          />
        )}
        {data && !error && data["hydra:totalItems"] > 0 && (
          <BasicManagersTable data={filteredManagers} />
        )}
      </Stack>
    </>
  );
}

UsersListingPage.getLayout = (page) => {
  return <AgencyLayout title="Utilisateurs">{page}</AgencyLayout>;
};
