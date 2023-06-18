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
      {/* <Divider sx={{ my: 1 }} /> */}
      <Collapse in={consultantsOpen} timeout="auto" unmountOnExit>
        {isLoading && <ConsultantsLoading />}
        {!isLoading && error && <ErrorComponent refresh={mutate} />}
      </Collapse>
    </Paper>
  );
}
