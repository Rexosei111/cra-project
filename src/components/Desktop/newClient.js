import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
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
import { Close, Delete } from "@mui/icons-material";

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
export default function NewClientForm() {
  const [contacts, setContacts] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(newClientSchema),
  });
  const [token, setToken] = useToken("token", "");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });
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
        id="clientForm"
        elevation={0}
      >
        <Stack
          flexDirection={"row"}
          gap={{ xs: 2, md: 5 }}
          flexWrap={{ xs: "wrap", md: "nowrap" }}
        >
          <TextInputField
            {...register("name")}
            variant="outlined"
            type={"text"}
            label="Nom du client"
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name?.message : null}
            fullWidth
            focused
            placeholder="Coca-Cola"
          />
          <TextInputField
            {...register("siren")}
            variant="outlined"
            color="secondary"
            focused
            type={"text"}
            label="SIREN facultatif"
            error={errors.siren ? true : false}
            helperText={errors.siren ? errors.siren?.message : null}
            fullWidth
            placeholder="Coca-Cola"
          />
        </Stack>

        <Stack
          flexDirection={"column"}
          minWidth={270}
          width={{ xs: "100%" }}
          gap={2}
          mt={5}
        >
          <Typography variant="subtitle2" fontSize={18} fontWeight={700}>
            Contacts
          </Typography>
          <Grid container spacing={4}>
            {contacts.map((contact, index) => (
              <Grid item xs={12} sm={6} md={5} key={index}>
                <Stack flexDirection={"column"} gap={2} width={"100%"}>
                  <TextInputField
                    {...register(`contacts[${index}].name`)}
                    variant="outlined"
                    color="secondary"
                    focused
                    size="small"
                    type={"text"}
                    label="Nom, prénom"
                    error={errors?.contacts?.[index]?.name ? true : false}
                    helperText={
                      errors?.contacts?.[index]?.name
                        ? errors?.contacts?.[index]?.name?.message
                        : null
                    }
                    fullWidth
                    placeholder="Coca-Cola"
                  />
                  <TextInputField
                    {...register(`contacts[${index}].email`)}
                    variant="outlined"
                    color="secondary"
                    focused
                    size="small"
                    type={"email"}
                    label="Email"
                    error={errors?.contacts?.[index]?.email ? true : false}
                    helperText={
                      errors?.contacts?.[index]?.email
                        ? errors?.contacts?.[index]?.email?.message
                        : null
                    }
                    fullWidth
                    placeholder="Coca-Cola"
                  />
                  <TextInputField
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
                    placeholder="Coca-Cola"
                  />
                  <TextInputField
                    {...register(`contacts[${index}].position`)}
                    variant="outlined"
                    color="secondary"
                    focused
                    size="small"
                    type={"text"}
                    label="Fonction"
                    error={errors?.contacts?.[index]?.position ? true : false}
                    helperText={
                      errors?.contacts?.[index]?.position
                        ? errors?.contacts?.[index]?.position?.message
                        : null
                    }
                    fullWidth
                    placeholder="Coca-Cola"
                  />
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
            sx={{ ml: "auto" }}
            color="secondary"
          >
            Ajouter un contact
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} variant="middle" />
        <Stack
          width={{ xs: "100%", md: "45%" }}
          flexDirection={"column"}
          gap={2}
        >
          <Typography
            variant="caption"
            fontSize={18}
            fontWeight={700}
            gutterBottom
          >
            Informations concernant les CRA
          </Typography>
          <TextInputField
            fullWidth
            placeholder="Dernier jour du mois"
            variant="outlined"
            color="secondary"
            focused
            select
            defaultValue={"Dernier jour du mois"}
            // size="small"
            type={"text"}
            label="Date d’envoi du CRA"
          >
            {selectOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextInputField>
          <Box>
            <div>
              <FormControlLabel
                control={
                  <AntSwitch
                    {...register("automaticSending")}
                    sx={{ m: 1 }}

                    // onChange={handleManagerChange}
                    // value={manager}
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
                    {...register("needManagerValisation")}
                    sx={{ m: 1 }}
                    // onChange={handleManagerChange}
                    // value={manager}
                  />
                }
                label="Attendre la validation d’un manager du CRA avant l’envoi au client (L’envoi se fait le jour défini ou au moment de la validation si celle-ci est postérieur au jour défini)"
                componentsProps={{
                  typography: {
                    fontSize: 13,
                  },
                }}
              />
            </div>
          </Box>
        </Stack>
      </Paper>
      <Stack justifyContent={"center"} alignItems={"center"} my={2}>
        <LoadingButton
          //   loadingPosition="start"
          loading={loading}
          disabled={!isValid}
          form="clientForm"
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
