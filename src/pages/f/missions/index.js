import AgencyLayout from "@/components/Desktop/agencyLayout";
import BasicClientTable, {
  BasicConsultantMissionsTable,
  BasicMissionsTable,
} from "@/components/Desktop/Tables";
import SearchBar from "@/components/Desktop/searchBar";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Fab,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TableListingSkeleton from "@/components/Loading/ListingSkeleton";
import RetryError from "@/components/Errors/ErrorWithRetry";
import { fetcher } from "@/utils/swr_fetcher";
import useSWR from "swr";
import NoData from "@/components/noData";
import ConsultantLayout from "@/components/Desktop/consultantLayout";
import useToken from "@/hooks/token";
import MobileMissionsListing from "@/components/Mobile/Listings";

export default function ConsultantMissionPage({ title }) {
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [token, setToken] = useToken("token", null);
  const sm = useMediaQuery("(max-width: 600px)");
  // const {
  //   data: consultantData,
  //   error: consultantError,
  //   isLoading: consultantIsLoading,
  // } = useSWR(
  //   () => (token ? "/api/consultants/" + token?.me?.id : null),
  //   fetcher
  // );
  // console.log(consultantData);
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
          p={2}
        >
          <SearchBar
            data={data ? data["hydra:member"] : []}
            setData={setFilteredMissions}
          />
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
          <>
            {sm && <MobileMissionsListing data={filteredMissions} />}
            {!sm && <BasicConsultantMissionsTable data={filteredMissions} />}
          </>
        )}
      </Stack>
    </>
  );
}

ConsultantMissionPage.getInitialProps = async (context) => {
  return {
    title: "Missions",
  };
};
ConsultantMissionPage.getLayout = (page) => {
  return <ConsultantLayout title={page.props?.title}>{page}</ConsultantLayout>;
};
