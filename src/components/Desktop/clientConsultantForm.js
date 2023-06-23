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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

const ConsultantsDisplay = ({ consultant }) => {
  return (
    <>
      <Stack width={"100%"} gap={2} flexDirection={"row"} alignItems={"center"}>
        <Stack alignItems={"flex-start"} width={"100%"}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <IconButton>
              <Image src={clientImage} fill alt="client logo" />
            </IconButton>
            <Typography variant="subtitle2" fontSize={14} fontWeight={700}>
              {consultant?.name}
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
              {consultant?.missions?.length} consultants
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
const ConsultantsLoading = () => {
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

export default function ClientConsultantsEditForm() {
  const router = useRouter();
  const [consultantsOpen, setConsultantsOpen] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    () => (router.isReady && consultantsOpen ? "/api/consultants" : null),
    fetcher
  );

  const handleConsultantOpen = () => {
    setConsultantsOpen(!consultantsOpen);
  };

  return (
    <Paper elevation={0} sx={{ p: 2, width: "100%" }}>
      <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
        <Typography variant="caption" fontSize={17} fontWeight={700}>
          Consultants
        </Typography>

        <IconButton size="small" onClick={handleConsultantOpen}>
          {consultantsOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>
      <Collapse in={consultantsOpen} timeout="auto" unmountOnExit>
        {isLoading && <ConsultantsLoading />}
        {!isLoading && error && <ErrorComponent refresh={mutate} />}
        {data && data["hydra:member"].length > 0 && (
          <Stack
            flexDirection={"column"}
            overflow={"auto"}
            gap={2}
            p={2}
            minWidth={750}
          >
            {data["hydra:member"].map((consultant, index) => (
              <ConsultantsDisplay consultant={consultant} key={index} />
            ))}
          </Stack>
        )}
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography
            alignSelf={"center"}
            variant="caption"
            component={Link}
            href="/a/consultants/new"
          >
            Ajouter un consultant pour Le Figaro
          </Typography>
        </Stack>
      </Collapse>
    </Paper>
  );
}
