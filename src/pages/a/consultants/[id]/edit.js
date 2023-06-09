import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import ConsultantMissionForm from "@/components/Desktop/consultantMissions";
import EditConsultantForm from "@/components/Desktop/editConsultantForm";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import { useRouter } from "next/router";
import { Alert, Snackbar, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";
import { isAxiosError } from "axios";
import { APIClient } from "@/utils/axios";

export default function EditConsultantPage({ title }) {
  const { setTopBarTitle } = useContext(LayoutContext);
  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    () => (router.isReady ? `/api/consultants/${router.query.id}` : null),
    fetcher
  );

  const deleteConsultant = async () => {
    setLoading(true);
    try {
      await APIClient.delete(`/api/consultants/${router.query.id}`);
      // mutate();
      router.push("/a/consultants");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
      handleOpen();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data !== "undefined") {
      setTopBarTitle(data && `${data?.firstName} ${data?.lastName}`);
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Stack flexDirection={"row"} width={"100%"}>
        <LoadingButton
          disableElevation
          loading={Loading}
          sx={{ textTransform: "capitalize", ml: "auto", mb: 2 }}
          startIcon={<Delete fontSize="small" />}
          variant="contained"
          onClick={deleteConsultant}
          color="error"
        >
          Delete consultant
        </LoadingButton>
      </Stack>
      <EditConsultantForm initialValues={data && data} />
      <ConsultantMissionForm consultant={data && data} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Unable to delete consultant
        </Alert>
      </Snackbar>
    </>
  );
}
EditConsultantPage.getInitialProps = async (context) => {
  return {
    title: "Edit consultant",
  };
};
EditConsultantPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
