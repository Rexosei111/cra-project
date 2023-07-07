import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import { TextInputField } from "@/components/textInput";
import {
  ArrowCircleRight,
  Delete,
  ExpandLess,
  ExpandMore,
  Percent,
} from "@mui/icons-material";
import EuroIcon from "@mui/icons-material/Euro";
import { AntSwitch } from "@/components/Mobile/switches";
import { APIClient } from "@/utils/axios";
import DefaultWorkingDays from "@/components/Desktop/defaultDays";
import { isAxiosError } from "axios";
import ConsultantMissionForm from "@/components/Desktop/consultantMissions";
import MissionConsultantsForm from "@/components/Desktop/missionConsultants";

const selectOptions = [
  { name: "Premier jour du mois suivant", value: "firstDayOfNextMonth" },
  { name: "dernier jour du mois", value: "lastDayOfMonth" },
  { name: "le 25 du mois", value: "day25" },
  { name: "le dernier lundi", value: "lastMonday" },
];

function findOptionByValue(value) {
  for (let i = 0; i < selectOptions.length; i++) {
    if (selectOptions[i].value === value) {
      return selectOptions[i].value;
    }
  }
  return ""; // Return null if no match is found
}

const editMissionSchema = yup
  .object({
    name: yup.string().required(),
    dailyRate: yup
      .number()
      .transform((value, originalValue) => {
        // The `value` parameter contains the value as a string
        // The `originalValue` parameter contains the original value before being transformed
        return parseFloat(value); // Convert the string value to a decimal number
      })
      .positive()
      .default(0),
    vatRate: yup
      .number()
      .transform((value, originalValue) => {
        // The `value` parameter contains the value as a string
        // The `originalValue` parameter contains the original value before being transformed
        return parseFloat(value); // Convert the string value to a decimal number
      })
      .positive()
      .default(0),
    sendCraDate: yup.string(),
    automaticSending: yup.boolean().default(true),
    needManagerValidation: yup.boolean().default(false),
    client: yup.string().required(),
  })
  .required();
export default function UpdateMission() {
  const { setTopBarTitle } = useContext(LayoutContext);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteErrorOpen = () => {
    setOpen(true);
  };
  const handleDeleteErrorClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const [infoOpen, setInfoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultDaysOpen, setDefaultDaysOpen] = useState(false);
  const [workingDaysOpen, setWorkingDaysOpen] = useState(false);

  const handleWorkingDaysOpen = () => {
    setWorkingDaysOpen(!workingDaysOpen);
  };
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(editMissionSchema),
  });

  const handleInfoOpen = () => {
    setInfoOpen(!infoOpen);
  };
  const handleDefaultDaysOpen = () => {
    setDefaultDaysOpen(!defaultDaysOpen);
  };
  const { data, error, isLoading, mutate } = useSWR(
    () => (router.isReady ? `/api/missions/${router.query.id}` : null),
    fetcher
  );

  const deleteMission = async () => {
    setDeleting(true);
    try {
      await APIClient.delete(`/api/missions/${router.query.id}`);
      // mutate();
      router.push("/a/missions");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
      handleOpen();
    } finally {
      setDeleting(false);
    }
  };
  useEffect(() => {
    if (data) {
      reset(data);
      setTopBarTitle(data?.name);
      setValue("client", data?.client?.id);
    }
  }, [data]);

  const onSubmit = async (data) => {
    const { consultants, ...rest } = data;
    const final_data = {
      ...rest,
      consultants: [...consultants.map((consultant) => consultant.id)],
    };
    setLoading(true);
    try {
      const { data } = await APIClient.put(
        `/api/missions/${router.query.id}`,
        final_data
      );
      router.push("/a/missions");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack flexDirection={"row"} width={"100%"}>
        <LoadingButton
          disableElevation
          loading={deleting}
          sx={{ textTransform: "capitalize", ml: "auto", mb: 2 }}
          startIcon={<Delete fontSize="small" />}
          variant="contained"
          onClick={deleteMission}
          color="error"
        >
          Delete mission
        </LoadingButton>
      </Stack>
      <Paper
        component={"form"}
        action="#"
        method="PUT"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 3 }}
        id="missionEditForm"
        elevation={0}
      >
        <Box width={{ xs: "100%", md: "70%" }}>
          <InputLabel shrink htmlFor="name">
            Nom du client
          </InputLabel>
          <TextInputField
            {...register("name")}
            variant="outlined"
            type={"text"}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name?.message : null}
            fullWidth
            placeholder="Coca-Cola"
          />
        </Box>
        <Box width={"100%"} mt={3}>
          <Typography
            gutterBottom
            variant="caption"
            fontSize={18}
            fontWeight={700}
          >
            Client
          </Typography>
          <Box width={{ xs: "100%", md: "70%" }}>
            <TextInputField
              placeholder="Client"
              variant="outlined"
              color="secondary"
              disabled={data && data?.client?.name ? true : false}
              value={data?.client?.name}
              //   select
              type={"text"}
              size="small"
              fullWidth
              sx={{
                mt: 1,
                bgcolor: (theme) => theme.palette.background.paper,
              }}
            />
            {/* {clients.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.name}
                </MenuItem>
              ))}
            </TextInputField> */}
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} variant="fullWidth" />
        <Stack width={{ xs: "100%" }} flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"} mt={1}>
            <Typography variant="caption" fontSize={17} fontWeight={700}>
              Informations facturation
            </Typography>

            <IconButton size="small" onClick={handleInfoOpen}>
              {infoOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Stack>
          <Divider variant="fullWidth" sx={{}} />
          <Collapse unmountOnExit timeout={"auto"} in={infoOpen}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <TextInputField
                  fullWidth
                  variant="outlined"
                  {...register("dailyRate")}
                  color="secondary"
                  focused
                  size="small"
                  type={"text"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={14} variant="caption">
                          TJM
                        </Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <EuroIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextInputField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  {...register("vatRate")}
                  focused
                  size="small"
                  type={"text"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={14} variant="caption">
                          TVA (20%)
                        </Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Percent fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                ></TextInputField>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextInputField
                  fullWidth
                  placeholder="Date d’envoi du CRA"
                  variant="outlined"
                  color="secondary"
                  {...register("sendCraDate")}
                  defaultValue={findOptionByValue(getValues()?.sendCraDate)}
                  select
                  size="small"
                  type={"text"}
                >
                  {selectOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextInputField>
              </Grid>
            </Grid>
            <Box width={{ xs: "100%", md: "50%" }}>
              <div>
                <FormControlLabel
                  control={
                    <AntSwitch
                      {...register("automaticSending")}
                      sx={{ m: 1 }}
                    />
                  }
                  label="Envoi automatique du CRA au client"
                  componentsProps={{
                    typography: {
                      fontSize: 13,
                    },
                  }}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <AntSwitch
                      {...register("needManagerValidation")}
                      sx={{ m: 1 }}
                    />
                  }
                  label="Attendre la validation interne du CRA avant l’envoi au client"
                  componentsProps={{
                    typography: {
                      fontSize: 13,
                    },
                  }}
                />
              </div>
            </Box>
          </Collapse>
        </Stack>
        {/* <Stack width={{ xs: "100%" }} flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"} mt={1}>
            <Typography variant="caption" fontSize={17} fontWeight={700}>
              Jours travaillés par défaut
            </Typography>

            <IconButton size="small" onClick={handleDefaultDaysOpen}>
              {defaultDaysOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Stack>
          <Divider variant="fullWidth" sx={{}} />
          <Collapse unmountOnExit timeout={"auto"} in={defaultDaysOpen}>
            <Box width={"100%"}>
              <Typography variant="subtitle2" fontSize={13}>
                Le consultant peut modifier les jours par défaut depuis son
                espace.
              </Typography>
              <Button
                sx={{ mt: 2, textTransform: "capitalize" }}
                variant="contained"
                color="secondary"
                // disabled
                disableElevation
                onClick={handleWorkingDaysOpen}
                endIcon={<ArrowCircleRight />}
              >
                Paramétrer les jours travaillés
              </Button>
            </Box>
          </Collapse>
        </Stack> */}

        <Stack justifyContent={"center"} alignItems={"center"} my={2}>
          <LoadingButton
            //   loadingPosition="start"
            loading={loading}
            disabled={!isValid}
            form="missionEditForm"
            variant="contained"
            type="submit"
            sx={{ textTransform: "capitalize", color: "white" }}
            disableElevation
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Paper>
      <MissionConsultantsForm mission={data} refresh={mutate} />

      {/* <DefaultWorkingDays
        open={workingDaysOpen}
        setOpen={setWorkingDaysOpen}
        defaultValues={getValues()?.defaultWorkingDay}
        setWorkingDays={setValue}
      /> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleDeleteErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleDeleteErrorClose}
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

UpdateMission.getLayout = (page) => {
  return <AgencyLayout title="Edit Mission">{page}</AgencyLayout>;
};
