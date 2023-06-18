import { ErrorComponent } from "@/pages/a/clients";
import { fetcher } from "@/utils/swr_fetcher";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

const MissionsLoading = () => {
  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      gap={2}
      minHeight={"80vh"}
      my={2}
    >
      <Skeleton variant="text" width={"30%"} height={20} />
      <Skeleton variant="rectangular" width={"100%"} height={150} />
      <Skeleton variant="text" width={"65%"} height={20} />
      <Skeleton variant="text" width={"65%"} height={20} />
    </Stack>
  );
};

export default function ClientMissionEditForm() {
  const router = useRouter();
  const [missionOpen, setMissionOpen] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    () => (router.isReady && missionOpen ? "/api/missons" : null),
    fetcher
  );

  const handleMissionOpen = () => {
    setMissionOpen(!missionOpen);
  };
  console.log(data);
  return (
    <Paper elevation={0} sx={{ p: 2, width: "100%" }}>
      <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
        <Typography variant="caption" fontSize={17} fontWeight={700}>
          Missions
        </Typography>

        <IconButton size="small" onClick={handleMissionOpen}>
          {missionOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>
      {/* <Divider sx={{ my: 1 }} /> */}
      <Collapse in={missionOpen} timeout="auto" unmountOnExit>
        {isLoading && <MissionsLoading />}
        {!isLoading && error && <ErrorComponent refresh={mutate} />}
      </Collapse>
    </Paper>
  );
}
