import { ErrorComponent } from "@/pages/a/clients";
import { fetcher } from "@/utils/swr_fetcher";
import {
  Edit,
  ExpandLess,
  ExpandMore,
  PeopleOutline,
} from "@mui/icons-material";
import {
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import clientImage from "../../../public/test.svg";
import Link from "next/link";

const MissionDisplay = ({ mission }) => {
  return (
    <>
      <Stack width={"100%"} gap={2} flexDirection={"row"} alignItems={"center"}>
        <Stack alignItems={"flex-start"} width={"100%"}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <IconButton>
              <Image src={clientImage} fill alt="client logo" />
            </IconButton>
            <Typography variant="subtitle2" fontSize={14} fontWeight={700}>
              {mission?.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack width={"100%"} alignItems={"flex-start"}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <IconButton>
              <PeopleOutline fontSize="small" />
            </IconButton>
            <Typography
              variant="subtitle2"
              fontSize={14}
              fontWeight={400}
              color={(theme) => theme.palette.text.secondary}
            >
              {mission?.consultants?.length} consultants
            </Typography>
          </Stack>
        </Stack>
        <Stack width={"100%"} alignItems={"center"}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <Button
              variant="text"
              color="secondary"
              sx={{
                textTransform: "capitalize",
              }}
              startIcon={<Edit fontSize="small" />}
            >
              Editer
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
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
    () => (router.isReady && missionOpen ? "/api/missions" : null),
    fetcher
  );

  const handleMissionOpen = () => {
    setMissionOpen(!missionOpen);
  };

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
      <Collapse in={missionOpen} timeout="auto" unmountOnExit>
        {isLoading && <MissionsLoading />}
        {!isLoading && error && <ErrorComponent refresh={mutate} />}
        {data && data["hydra:member"].length > 0 && (
          <Stack
            flexDirection={"column"}
            overflow={"auto"}
            gap={2}
            p={2}
            minWidth={750}
          >
            {data["hydra:member"].map((mission, index) => (
              <MissionDisplay mission={mission} key={index} />
            ))}
          </Stack>
        )}
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography
            alignSelf={"center"}
            variant="caption"
            component={Link}
            href="/a/missions/new"
          >
            Ajouter une mission pour Le Figaro
          </Typography>
        </Stack>
      </Collapse>
    </Paper>
  );
}
