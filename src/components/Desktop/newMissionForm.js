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
import React, { useState } from "react";
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

const contactSchema = yup.object({
  name: yup.string().required("This field is required"),
  position: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Email must be valid. Eg. 'example@gmail.com'")
    .required("Email is required"),
  receiveCra: yup.boolean().required().default(false),
});
const newClientSchema = yup
  .object({
    name: yup.string().required(),
    siren: yup.string().required(),
    contacts: yup.array().of(contactSchema),
    automaticSending: yup.boolean().default(true),
    needManagerValisation: yup.boolean().default(false),
  })
  .required();

const selectOptions = ["Dernier jour du mois"];
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
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("token", null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(newClientSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });
  const getClients = async () => {
    try {
      const { data } = await axios.get("", {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      });
      console.log(data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const onSubmit = async (data) => {
    const final_data = { ...data, organization: token?.me.organization?.id };
    setLoading(true);
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/clients",
        final_data,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(data);
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
        <Box
          width={"100%"}
          mt={3}
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            p: 2,
            borderRadius: 3,
          }}
        >
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
              select
              type={"text"}
              size="small"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: (theme) => theme.palette.background.paper,
              }}
            >
              {selectOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextInputField>
          </Box>
          <Stack
            flexDirection={"column"}
            minWidth={270}
            width={{ xs: "100%" }}
            gap={2}
            mt={3}
          >
            <Typography variant="subtitle2" fontSize={15} fontWeight={700}>
              Contacts
            </Typography>
            <Grid container spacing={4}>
              {contacts.map((contact, index) => (
                <Grid item xs={12} sm={6} md={5} key={index}>
                  <Stack flexDirection={"column"} gap={1} width={"100%"}>
                    <Box width={"100%"}>
                      <InputLabel shrink htmlFor={`contacts[${index}].name`}>
                        Nom, prenom
                      </InputLabel>
                      <TextInputField
                        {...register(`contacts[${index}].name`)}
                        variant="outlined"
                        color="secondary"
                        focused
                        size="small"
                        type={"text"}
                        sx={{
                          bgcolor: (theme) => theme.palette.background.paper,
                        }}
                        // label="Nom, prénom"
                        error={errors?.contacts?.[index]?.name ? true : false}
                        helperText={
                          errors?.contacts?.[index]?.name
                            ? errors?.contacts?.[index]?.name?.message
                            : null
                        }
                        fullWidth
                        placeholder="Davy Manager"
                        InputProps={{
                          style: { fontSize: 14 },
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box width={"100%"}>
                      <InputLabel shrink htmlFor={`contacts[${index}].email`}>
                        Email
                      </InputLabel>

                      <TextInputField
                        {...register(`contacts[${index}].email`)}
                        variant="outlined"
                        color="secondary"
                        focused
                        size="small"
                        type={"email"}
                        // label="Email"
                        error={errors?.contacts?.[index]?.email ? true : false}
                        helperText={
                          errors?.contacts?.[index]?.email
                            ? errors?.contacts?.[index]?.email?.message
                            : null
                        }
                        fullWidth
                        placeholder="example@gmail.com"
                        sx={{
                          bgcolor: (theme) => theme.palette.background.paper,
                        }}
                        InputProps={{
                          style: { fontSize: 14 },
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    {/* <TextInputField
                    {...register(`contacts[${index}].phone`)}
                    variant="outlined"
                    color="secondary"
                    focused
                    size="small"
                    type={"text"}
                    label="Phone number"
                    error={errors?.contacts?.[index]?.phone ? true : false}
                    helperText={
                      errors?.contacts?.[index]?.phone
                        ? errors?.contacts?.[index]?.phone?.message
                        : null
                      }
                    fullWidth
                    placeholder="123456789"
                  /> */}
                    <Box width={"100%"}>
                      <InputLabel
                        shrink
                        htmlFor={`contacts[${index}].position`}
                      >
                        Fonction
                      </InputLabel>
                      <TextInputField
                        {...register(`contacts[${index}].position`)}
                        variant="outlined"
                        color="secondary"
                        focused
                        size="small"
                        type={"text"}
                        // label="Fonction"
                        error={
                          errors?.contacts?.[index]?.position ? true : false
                        }
                        helperText={
                          errors?.contacts?.[index]?.position
                            ? errors?.contacts?.[index]?.position?.message
                            : null
                        }
                        fullWidth
                        placeholder="Chef"
                        sx={{
                          bgcolor: (theme) => theme.palette.background.paper,
                        }}
                        InputProps={{
                          style: { fontSize: 14 },
                          startAdornment: (
                            <InputAdornment position="start">
                              <Work fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <FormControlLabel
                        control={
                          <AntSwitch
                            {...register(`contacts[${index}].receiveCra`)}
                            sx={{ m: 1 }}
                            // onChange={handleManagerChange}
                            // value={manager}
                          />
                        }
                        label="Reçoit et valide les CRA"
                        componentsProps={{
                          typography: {
                            fontSize: 13,
                          },
                        }}
                      />
                      {contacts.length > 1 && (
                        <Button
                          startIcon={<Delete fontSize="small" />}
                          size="small"
                          onClick={() => {
                            setContacts((prevState) => [
                              ...prevState.filter(
                                (item, contactIndex) => contactIndex !== index
                              ),
                            ]);
                            remove(index);
                          }}
                        >
                          delete
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setContacts((prevState) => [...prevState, {}]);
              }}
              startIcon={<AddCircleOutlineIcon fontSize="small" />}
              sx={{ ml: "auto", textTransform: "capitalize" }}
              color="secondary"
            >
              Ajouter un contact
            </Button>
          </Stack>
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
                color="secondary"
                focused
                size="small"
                type={"text"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Typography fontSize={14} variant="caption">
                        TJM
                      </Typography>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment>
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
                focused
                select
                defaultValue={"Dernier jour du mois"}
                size="small"
                type={"text"}
                // label="Date d’envoi du CRA"
              >
                {selectOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
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
              disableElevation
              endIcon={<ArrowCircleRight />}
            >
              Paramétrer les jours travaillés
            </Button>
          </Box>
        </Stack>
      </Paper>
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
