import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import { useRouter } from "next/router";
import EditManagerForm from "@/components/Desktop/managerEditForm";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { APIClient } from "@/utils/axios";
import { isAxiosError } from "axios";

export default function EditMangerPage({ title }) {
  const { setTopBarTitle } = useContext(LayoutContext);
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR(
    () => (router.isReady ? `/api/managers/${router.query.id}` : null),
    fetcher
  );

  const deleteManger = async () => {
    setLoading(true);
    try {
      await APIClient.delete(`/api/managers/${router.query.id}`);
      mutate();
      router.push("/a/utilisateurs");
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
          onClick={deleteManger}
          color="error"
        >
          Delete Manager
        </LoadingButton>
      </Stack>
      <EditManagerForm initialValues={data && data} />
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
          Unable to delete manager
        </Alert>
      </Snackbar>
    </>
  );
}
EditMangerPage.getInitialProps = async (context) => {
  return {
    title: "Edit Manager",
  };
};
EditMangerPage.getLayout = (page) => {
  return <AgencyLayout title={page.props?.title}>{page}</AgencyLayout>;
};
