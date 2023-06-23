import { Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function TableListingSkeleton() {
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
}
