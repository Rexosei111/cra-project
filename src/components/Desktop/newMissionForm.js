import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { isAxiosError } from "axios";
import useToken from "@/hooks/token";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AntSwitch } from "../Mobile/switches";
import { LoadingButton } from "@mui/lab";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  ArrowCircleRight,
  Close,
  Delete,
  Email,
  Percent,
  Person,
  Work,
} from "@mui/icons-material";
import EuroIcon from "@mui/icons-material/Euro";
import { APIClient } from "@/utils/axios";
import DefaultWorkingDays from "./defaultDays";

const contactSchema = yup.object({
  name: yup.string().required("This field is required"),
  position: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Email must be valid. Eg. 'example@gmail.com'")
    .required("Email is required"),
  receiveCra: yup.boolean().required().default(false),
});

const newMissionSchema = yup
  .object({
    name: yup.string().required(),
    dailyRate: yup.number().default(0),
    vatRate: yup.number().default(0),
    sendCraDate: yup.string(),
    defaultWorkingDay: yup.object({}),
    automaticSending: yup.boolean().default(true),
    needManagerValisation: yup.boolean().default(false),
    client: yup.string().required(),
  })
  .required();

const selectOptions = [
  { name: "Premier jour du mois suivant", value: "firstDayOfNextMonth" },
  { name: "dernier jour du mois", value: "lastDayOfMonth" },
  { name: "le 25 du mois", value: "day25" },
  { name: "le dernier lundi", value: "lastMonday" },
];
export const TextInputField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#362B6A",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#D8D5E5",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {},
    "&:hover fieldset": {
      borderColor: "#D8D5E5",
      borderWidth: 1,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D8D5E5",
      borderWidth: 1,
    },
  },
});

export default function NewMissionForm() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useToken("token", null);
  const [workingDaysOpen, setWorkingDaysOpen] = useState(false);
  const handleWorkingDaysOpen = () => {
    setWorkingDaysOpen(!workingDaysOpen);
  };
  const router = useRouter();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(newMissionSchema),
  });

  useEffect(() => {
    getClients();
  }, []);
  const getClients = async () => {
    try {
      const { data } = await APIClient.get("/api/clients");
      setClients(data["hydra:member"]);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const handleSeleteChange = (e) => {
    setValue("client", e.target.value.id);
    const clientContacts = e.target.value?.contacts;
  };
  const onSubmit = async (data) => {
    const final_data = { ...data, organization: token?.me.organization?.id };
    console.log(final_data);
    setLoading(true);
    try {
      const { data } = await APIClient.post("/api/missions", final_data);
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
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 3 }}
        id="missionForm"
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
        {/* <Divider sx={{ my: 3 }} variant="middle" /> */}
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
              defaultValue={""}
              onChange={handleSeleteChange}
              select
              type={"text"}
              size="small"
              fullWidth
              sx={{
                mt: 1,
                bgcolor: (theme) => theme.palette.background.paper,
              }}
            >
              {clients.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.name}
                </MenuItem>
              ))}
            </TextInputField>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} variant="middle" />
        <Stack width={{ xs: "100%" }} flexDirection={"column"} gap={2}>
          <Typography variant="caption" fontSize={18} fontWeight={700}>
            Informations facturation
          </Typography>
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
                // focused
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
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextInputField
                fullWidth
                placeholder="Date d’envoi du CRA"
                variant="outlined"
                color="secondary"
                {...register("sendCraDate")}
                select
                defaultValue={""}
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
                  <AntSwitch {...register("automaticSending")} sx={{ m: 1 }} />
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
                    {...register("needManagerValisation")}
                    sx={{ m: 1 }}
                    // onChange={handleManagerChange}
                    // value={manager}
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
          <Divider sx={{ my: 1 }} variant="middle" />
          <Box width={"100%"}>
            <Typography variant="subtitle2" fontSize={18} fontWeight={700}>
              Jours travaillés par défaut
            </Typography>
            <Typography variant="subtitle2" fontSize={13}>
              Le consultant peut modifier les jours par défaut depuis son
              espace.
            </Typography>
            <Button
              sx={{ mt: 2, textTransform: "capitalize" }}
              variant="contained"
              color="secondary"
              // disabled
              onClick={handleWorkingDaysOpen}
              disableElevation
              endIcon={<ArrowCircleRight />}
            >
              Paramétrer les jours travaillés
            </Button>
          </Box>
        </Stack>
      </Paper>
      <DefaultWorkingDays
        open={workingDaysOpen}
        setOpen={setWorkingDaysOpen}
        setWorkingDays={setValue}
      />
      <Stack justifyContent={"center"} alignItems={"center"} my={2}>
        <LoadingButton
          //   loadingPosition="start"
          loading={loading}
          disabled={!isValid}
          form="missionForm"
          variant="contained"
          type="submit"
          sx={{ textTransform: "capitalize", color: "white" }}
          disableElevation
        >
          Enregistrer
        </LoadingButton>
      </Stack>
    </>
  );
}
