import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { APIClient } from "@/utils/axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import useToken from "@/hooks/token";
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
  Paper,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { TextInputField } from "@/components/Desktop/newClient";
import {
  ArrowDownward,
  Delete,
  Done,
  Email,
  EmailOutlined,
  ExpandLess,
  ExpandMore,
  Person2Outlined,
  Phone,
  Work,
} from "@mui/icons-material";
import { AntSwitch } from "@/components/Mobile/switches";
import { LoadingButton } from "@mui/lab";
import { isAxiosError } from "axios";
import { fetcher } from "@/utils/swr_fetcher";
import { ErrorComponent } from "@/pages/a/clients";
import NewContactDialogue from "./newContactDialogue";
import ClientMissionEditForm from "./clientMissionEditForm";
import ClientConsultantsEditForm from "./clientConsultantForm";
import { LayoutContext } from "./agencyLayout";

const ClientLoading = () => {
  return (
    <Stack width={"100%"} flexDirection={"column"} gap={2} minHeight={"80vh"}>
      <Skeleton variant="text" width={"30%"} height={20} />
      <Skeleton variant="rectangular" width={"100%"} height={120} />
      <Skeleton variant="text" width={"65%"} height={20} />
      <Skeleton variant="rectangular" width={"100%"} height={100} />
      <Skeleton variant="rectangular" width={"100%"} height={100} />
    </Stack>
  );
};

const contactSchema = yup.object({
  name: yup.string().required("This field is required"),
  position: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Email must be valid. Eg. 'example@gmail.com'")
    .required("Email is required"),
  receiveCra: yup.boolean().required().default(false),
});
const EditClientSchema = yup
  .object({
    name: yup.string().required(),
    siren: yup.string(),
    contacts: yup.array().of(contactSchema),
    automaticSending: yup.boolean().default(true),
    needManagerValisation: yup.boolean().default(false),
  })
  .required();

export default function ClientUpdateForm() {
  const { setTopBarTitle } = useContext(LayoutContext);
  const [token, setToken] = useToken("token", null);
  const [contacts, setContacts] = useState([]);
  const [contactOpen, setContactOpen] = useState(false);
  const [craOpen, setCraOpen] = useState(false);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientErrorOpen, setClientErrorOpen] = useState(false);
  const [newClientOpen, setNewClientOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [clientDeleteOpen, setClientDeleteOpen] = useState(false);

  const handleClientDeleteErrorOpen = () => {
    setClientDeleteOpen(true);
  };
  const handleClientDeleteErrorClose = () => {
    setClientDeleteOpen(false);
  };

  const handleNewClientOpen = () => {
    setNewClientOpen(!newClientOpen);
  };

  const router = useRouter();
  const {
    register,
    control,
    reset,
    setValue,
    getValues,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(EditClientSchema),
  });

  const { data, error, isLoading, mutate } = useSWR(
    () => `/api/clients/${router.query.id}`,
    fetcher
  );

  const deleteClient = async () => {
    setDeleting(true);
    try {
      await APIClient.delete(`/api/clients/${router.query.id}`);
      // mutate();
      router.push("/a/clients");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
      handleClientDeleteErrorOpen();
    } finally {
      setDeleting(false);
    }
  };
  useEffect(() => {
    if (data) {
      reset(data);
      setTopBarTitle(data?.name);
      setContacts(data?.contacts);
    }
  }, [data]);
  if (error) {
    return <ErrorComponent refresh={mutate} />;
  }
  if (isLoading) {
    return <ClientLoading />;
  }

  const handleContactOpen = () => {
    setContactOpen(!contactOpen);
  };

  const handleCraOpen = () => {
    setCraOpen(!craOpen);
  };

  const handleClientErrorOpen = () => {
    setClientErrorOpen(true);
  };
  const handleClientErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setClientErrorOpen(false);
  };

  const onClientSubmit = async (data) => {
    const { contacts: contactList, ...rest } = data;
    const final_contacts = contactList.map((contact) => contact["@id"]);
    const final_data = {
      ...rest,
      contacts: final_contacts,
      organization: token?.me.organization?.id,
    };

    setClientLoading(true);
    try {
      const { data } = await APIClient.put(
        `/api/clients/${router.query.id}`,
        final_data
      );
      router.push("/a/clients");
      mutate();
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        handleClientErrorOpen();
      }
    } finally {
      setClientLoading(false);
    }
  };

  const updateContact = async (index) => {
    const contact = getValues(`contacts[${index}]`);
    let validated = false;
    try {
      const result = await contactSchema.validate(contact, {
        abortEarly: false,
      });
      validated = true;
    } catch (validationErrors) {
      validationErrors.inner.forEach((error) => {
        setError(`contacts[${index}].${error.path}`, {
          type: "manual",
          message: error.message,
        });
      });
    }
    if (validated) {
      const { data } = await APIClient.put(contact["@id"], contact);
    }
  };

  return (
    <Stack flexDirection={"column"} gap={2} width={"100%"}>
      <Stack flexDirection={"row"} width={"100%"}>
        <LoadingButton
          disableElevation
          loading={deleting}
          sx={{ textTransform: "capitalize", ml: "auto", mb: 2 }}
          startIcon={<Delete fontSize="small" />}
          variant="contained"
          onClick={deleteClient}
          color="error"
        >
          Delete consultant
        </LoadingButton>
      </Stack>
      <Paper
        component={"form"}
        action="#"
        method="POST"
        onSubmit={handleSubmit(onClientSubmit)}
        sx={{ p: 3 }}
        id="clientEditForm"
        elevation={0}
      >
        <Stack flexDirection={"column"} gap={2} width={"100%"}>
          <Stack flexDirection={"column"} gap={1} width={"100%"}>
            <Box width={{ xs: "100%", md: "70%" }}>
              <InputLabel shrink htmlFor="name">
                Nom du client
              </InputLabel>

              <TextInputField
                {...register("name")}
                variant="filled"
                color="secondary"
                type={"text"}
                size="small"
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name?.message : null}
                fullWidth
                placeholder="Coca-Cola"
              />
            </Box>
            <Stack flexDirection={"column"} gap={1} width={"100%"}>
              <Stack flexDirection={"row"} gap={2} alignItems={"center"} mt={1}>
                <Typography variant="caption" fontSize={17} fontWeight={700}>
                  Contacts
                </Typography>

                <IconButton size="small" onClick={handleContactOpen}>
                  {contactOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Stack>
              <Collapse in={contactOpen} timeout="auto" unmountOnExit>
                <Grid container width={"100%"} spacing={4}>
                  {contacts?.map((contact, index) => (
                    <Grid item xs={12} sm={12} md={8} lg={5} key={index}>
                      <Stack flexDirection={"column"} gap={1} width={"100%"}>
                        <Box width={"inherit"}>
                          <InputLabel
                            shrink
                            htmlFor={`contacts[${index}].name`}
                          >
                            Nom, prénom
                          </InputLabel>
                          <TextInputField
                            {...register(`contacts[${index}].name`)}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            type={"text"}
                            sx={{
                              bgcolor: (theme) =>
                                theme.palette.background.paper,
                            }}
                            error={
                              errors?.contacts?.[index]?.name ? true : false
                            }
                            helperText={
                              errors?.contacts?.[index]?.name
                                ? errors?.contacts?.[index]?.name?.message
                                : null
                            }
                            fullWidth
                            placeholder="Coca-Cola"
                            InputProps={{
                              style: { fontSize: 14 },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person2Outlined fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                        <Box width={"100%"}>
                          <InputLabel
                            shrink
                            htmlFor={`contacts[${index}].email`}
                          >
                            Email
                          </InputLabel>
                          <TextInputField
                            {...register(`contacts[${index}].email`)}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            sx={{
                              bgcolor: (theme) =>
                                theme.palette.background.paper,
                            }}
                            type={"email"}
                            error={
                              errors?.contacts?.[index]?.email ? true : false
                            }
                            helperText={
                              errors?.contacts?.[index]?.email
                                ? errors?.contacts?.[index]?.email?.message
                                : null
                            }
                            fullWidth
                            placeholder="example@gmail.com"
                            InputProps={{
                              style: { fontSize: 14 },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailOutlined fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>

                        <Box width={"inherit"}>
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
                            sx={{
                              bgcolor: (theme) =>
                                theme.palette.background.paper,
                            }}
                            size="small"
                            type={"text"}
                            error={
                              errors?.contacts?.[index]?.position ? true : false
                            }
                            helperText={
                              errors?.contacts?.[index]?.position
                                ? errors?.contacts?.[index]?.position?.message
                                : null
                            }
                            fullWidth
                            placeholder="Coca-Cola"
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
                              />
                            }
                            label="Reçoit et valide les CRA"
                            componentsProps={{
                              typography: {
                                fontSize: 13,
                              },
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => updateContact(index)}
                          >
                            <Done fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleNewClientOpen}
                  startIcon={<AddCircleOutlineIcon fontSize="small" />}
                  sx={{ ml: "auto", textTransform: "capitalize" }}
                  color="secondary"
                >
                  Ajouter un contact
                </Button>
              </Collapse>
            </Stack>
            <Divider variant="fullWidth" />
            <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
              <Typography variant="caption" fontSize={17} fontWeight={700}>
                Informations concernant les CRA
              </Typography>

              <IconButton size="small" onClick={handleCraOpen}>
                {craOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Stack>
            <Collapse in={craOpen} unmountOnExit timeout={"auto"}>
              <Stack
                width={{ xs: "100%", md: "45%" }}
                flexDirection={"column"}
                gap={2}
              >
                <Box>
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
                          {...register("needManagerValisation")}
                          sx={{ m: 1 }}
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
            </Collapse>
          </Stack>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"} my={2}>
          <LoadingButton
            //   loadingPosition="start"
            loading={clientLoading}
            disabled={!isValid}
            form="clientEditForm"
            variant="contained"
            type="submit"
            sx={{ textTransform: "capitalize", color: "white" }}
            disableElevation
          >
            Enregistrer
          </LoadingButton>
        </Stack>

        <Snackbar
          open={clientErrorOpen}
          autoHideDuration={6000}
          onClose={handleClientErrorClose}
        >
          <Alert
            onClose={handleClientErrorClose}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            There are errors in the form!
          </Alert>
        </Snackbar>
      </Paper>
      <ClientMissionEditForm
        missions={data?.missions}
        clientName={data?.name}
        clientId={data?.id}
      />
      <ClientConsultantsEditForm clientName={data?.name} />
      <NewContactDialogue
        newClientOpen={newClientOpen}
        handleNewClientOpen={handleNewClientOpen}
        mutate={mutate}
      />
      <Snackbar
        open={clientDeleteOpen}
        autoHideDuration={6000}
        onClose={handleClientDeleteErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClientDeleteErrorClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Unable to delete consultant
        </Alert>
      </Snackbar>
    </Stack>
  );
}
