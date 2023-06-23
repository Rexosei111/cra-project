import AgencyLayout from "@/components/Desktop/agencyLayout";
import {
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
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import { TextInputField } from "@/components/textInput";
import {
  ArrowCircleRight,
  ExpandLess,
  ExpandMore,
  Percent,
} from "@mui/icons-material";
import EuroIcon from "@mui/icons-material/Euro";
import { AntSwitch } from "@/components/Mobile/switches";
import { APIClient } from "@/utils/axios";

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
    dailyRate: yup.number().default(0),
    vatRate: yup.number().default(0),
    sendCraDate: yup.string(),
    automaticSending: yup.boolean().default(true),
    needManagerValidation: yup.boolean().default(false),
    client: yup.string().required(),
  })
  .required();
export default function UpdateMission() {
  const router = useRouter();
  const [infoOpen, setInfoOpen] = useState(false);
  const [sendCra, setSendCra] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultDaysOpen, setDefaultDaysOpen] = useState(false);

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
  const handleSendCra = (e, value) => {
    console.log(e, value);
    setValue("sendCra", e.target.value);
  };
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

  useEffect(() => {
    if (data) {
      reset(data);
      setValue("client", data?.client?.id);
    }
  }, [data]);

  const onSubmit = async (data) => {
    const final_data = { ...data };
    console.log(final_data);
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
            // label="Nom du client"
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
              disabled
              defaultValue={data?.client?.name}
              //   onChange={handleSeleteChange}
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
        <Stack width={{ xs: "100%" }} flexDirection={"column"} gap={1}>
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
                endIcon={<ArrowCircleRight />}
              >
                Paramétrer les jours travaillés
              </Button>
            </Box>
          </Collapse>
        </Stack>
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
    </>
  );
}

UpdateMission.getLayout = (page) => {
  return <AgencyLayout title="Edit Mission">{page}</AgencyLayout>;
};