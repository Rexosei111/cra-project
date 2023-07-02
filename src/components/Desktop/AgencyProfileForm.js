import {
  Box,
  Button,
  Divider,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { TextInputField } from "../textInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

const profileSchema = yup
  .object({
    name: yup.string().required(),
    siren: yup.string().required(),
    email: yup.string().email().required(),
    adresse: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
    phone: yup.string(),
    position: yup.string(),
  })
  .required();

export default function AgencyProfileForm({ initialValues }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (initialValues !== null) {
      reset(initialValues);
    }
  }, [initialValues]);

  const onsubmit = async (data) => {
    console.log(data);
  };
  return (
    <>
      <Stack flexDirection={"row"} width={"100%"}>
        <Button
          disableElevation
          my={2}
          component={Link}
          href="/a/profile/mail"
          variant="subtitle2"
          sx={{ ml: "auto", textTransform: "capitalize" }}
        >
          Personalize your emails
        </Button>
      </Stack>
      <Paper
        elevation={0}
        sx={{ p: 2 }}
        component={"form"}
        method="PUT"
        onSubmit={handleSubmit(onsubmit)}
        action="#"
        id="agencyProfileForm"
      >
        <Stack flexDirection={"column"} gap={2} width={"100%"}>
          <Box width={"100%"}>
            <InputLabel shrink htmlFor="name">
              Nom de l’entreprise
            </InputLabel>
            <TextInputField
              {...register("name")}
              variant="outlined"
              color="secondary"
              id="name"
              type="text"
              fullWidth
              inputProps={{
                style: { fontSize: 13 },
              }}
            />
          </Box>
          <Box width={"100%"}>
            <InputLabel shrink htmlFor="Adresse">
              Adresse
            </InputLabel>
            <TextInputField
              {...register("adresse")}
              variant="outlined"
              color="secondary"
              id="Adresse"
              type="text"
              fullWidth
              inputProps={{
                style: { fontSize: 13 },
              }}
            />
          </Box>
          <Stack
            flexDirection={"row"}
            gap={2}
            width={"100%"}
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            <Box width={"100%"}>
              <InputLabel shrink htmlFor="Code_postal">
                Code postal
              </InputLabel>
              <TextInputField
                variant="outlined"
                color="secondary"
                id="Code_postal"
                type="text"
                inputProps={{
                  style: { fontSize: 13 },
                }}
                fullWidth
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel shrink htmlFor="Ville">
                Ville
              </InputLabel>
              <TextInputField
                variant="outlined"
                color="secondary"
                id="Ville"
                inputProps={{
                  style: { fontSize: 13 },
                }}
                type="text"
                fullWidth
              />
            </Box>
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={2}
            width={"100%"}
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            <Box width={"100%"}>
              <InputLabel shrink htmlFor="SIRET">
                SIRET
              </InputLabel>
              <TextInputField
                {...register("siren")}
                variant="outlined"
                color="secondary"
                id="SIRET"
                type="text"
                fullWidth
                inputProps={{
                  style: { fontSize: 13 },
                }}
              />
            </Box>
            <Box width={"100%"}></Box>
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={2}
            width={"100%"}
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            <Box width={"100%"}>
              <InputLabel shrink htmlFor="Téléphone">
                Téléphone
              </InputLabel>
              <TextInputField
                variant="outlined"
                color="secondary"
                inputProps={{
                  style: { fontSize: 13 },
                }}
                id="Téléphone"
                type="text"
                fullWidth
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel shrink htmlFor="Email">
                Email
              </InputLabel>
              <TextInputField
                variant="outlined"
                color="secondary"
                inputProps={{
                  style: { fontSize: 13 },
                }}
                id="Email"
                type="email"
                fullWidth
              />
            </Box>
          </Stack>
        </Stack>
        <Box width={"100%"} mt={4}>
          <Typography
            variant="body1"
            fontSize={18}
            fontWeight={700}
            gutterBottom
          >
            Responsable
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Stack flexDirection={"column"} gap={2} width={"100%"}>
            <Stack
              flexDirection={"row"}
              gap={2}
              width={"100%"}
              flexWrap={{ xs: "wrap", md: "nowrap" }}
            >
              <Box width={"100%"}>
                <InputLabel shrink htmlFor="nom">
                  Nom
                </InputLabel>
                <TextInputField
                  {...register("firstName")}
                  variant="outlined"
                  color="secondary"
                  id="nom"
                  type="text"
                  inputProps={{
                    style: { fontSize: 13 },
                  }}
                  fullWidth
                />
              </Box>
              <Box width={"100%"}>
                <InputLabel shrink htmlFor="Prénom">
                  Prénom
                </InputLabel>
                <TextInputField
                  {...register("lastName")}
                  variant="outlined"
                  color="secondary"
                  id="Prénom"
                  type="text"
                  fullWidth
                  inputProps={{
                    style: { fontSize: 13 },
                  }}
                />
              </Box>
            </Stack>
            <Box width={"100%"}>
              <InputLabel shrink htmlFor="Fonction">
                Fonction
              </InputLabel>
              <TextInputField
                {...register("position")}
                variant="outlined"
                color="secondary"
                id="Fonction"
                type="text"
                inputProps={{
                  style: { fontSize: 13 },
                }}
                fullWidth
              />
            </Box>
            <Stack
              flexDirection={"row"}
              gap={2}
              width={"100%"}
              flexWrap={{ xs: "wrap", md: "nowrap" }}
            >
              <Box width={"100%"}>
                <InputLabel shrink htmlFor="Téléphone">
                  Téléphone
                </InputLabel>
                <TextInputField
                  {...register("phone")}
                  variant="outlined"
                  color="secondary"
                  id="Téléphone"
                  type="text"
                  fullWidth
                  inputProps={{
                    style: { fontSize: 13 },
                  }}
                />
              </Box>
              <Box width={"100%"}>
                <InputLabel shrink htmlFor="Email">
                  Email
                </InputLabel>
                <TextInputField
                  {...register("email")}
                  variant="outlined"
                  color="secondary"
                  id="Email"
                  inputProps={{
                    style: { fontSize: 13 },
                  }}
                  type="email"
                  fullWidth
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Box width={"100%"} mt={4}>
          <Typography
            variant="body1"
            fontSize={18}
            fontWeight={700}
            gutterBottom
          >
            Plan
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" fontSize={13}>
            Vous êtes en version d’essai (reste 9 jours)
          </Typography>
          <Stack
            width={"100%"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={5}
            my={2}
            justifyContent={"center"}
          >
            <Button
              disableElevation
              color="secondary"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Passer à la version complète
            </Button>
            <Button
              disableElevation
              type="submit"
              color="primary"
              form="agencyProfileForm"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Enregistrer
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
