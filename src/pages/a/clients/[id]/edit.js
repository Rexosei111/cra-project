import AgencyLayout from "@/components/Desktop/agencyLayout";
import React from "react";
import { Stack } from "@mui/material";

import ClientUpdateForm from "@/components/Desktop/clientUpdateForm";

export default function UpdateClient() {
  return (
    <Stack flexDirection={"column"} gap={2}>
      <ClientUpdateForm />
    </Stack>
  );
}

UpdateClient.getLayout = (page) => {
  return <AgencyLayout title="Edit Client">{page}</AgencyLayout>;
};
