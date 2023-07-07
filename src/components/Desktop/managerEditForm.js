import { Box, FormControlLabel, InputLabel, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { APIClient } from "@/utils/axios";
import { AntSwitch } from "../Mobile/switches";
import { TextInputField } from "../textInput";

const newClientSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    plainPassword: yup.string(),
    isAdmin: yup.boolean(),
  })
  .required();

export default function EditManagerForm({ initialValues = {} }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(newClientSchema),
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues]);

  const onSubmit = async (data) => {
    const final_data = { ...data };
    setLoading(true);
    try {
      const { data } = await APIClient.put(
        `/api/managers/${router.query.id}`,
        final_data
      );
      router.push("/a/utilisateurs");
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
        id="consultantForm"
        elevation={0}
      >
        <Stack flexDirection={"column"} gap={3}>
          <Box>
            <InputLabel shrink htmlFor="firstName">
              Nom
            </InputLabel>
            <TextInputField
              {...register("firstName")}
              id="firstName"
              variant="outlined"
              type={"text"}
              // label="Nom"
              error={errors.firstname ? true : false}
              helperText={errors.firstname ? errors.firstname?.message : null}
              fullWidth
              // focused
              placeholder="Coca-Cola"
            />
          </Box>
          <Box>
            <InputLabel shrink htmlFor="lastName">
              Prénom
            </InputLabel>
            <TextInputField
              {...register("lastName")}
              variant="outlined"
              id="lastName"
              color="secondary"
              type={"text"}
              error={errors.lastname ? true : false}
              helperText={errors.lastname ? errors.lastname?.message : null}
              fullWidth
              placeholder="Coca-Cola"
            />
          </Box>
          <Box>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <TextInputField
              {...register("email")}
              variant="outlined"
              id="email"
              color="secondary"
              // focused
              type={"email"}
              // label="Email"
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email?.message : null}
              fullWidth
              placeholder="example@gmail.com"
            />
          </Box>
          <FormControlLabel
            control={<AntSwitch {...register("isAdmin")} sx={{ m: 1 }} />}
            label="Administrateur"
            componentsProps={{
              typography: {
                fontSize: 13,
              },
            }}
          />
        </Stack>
      </Paper>
      <Stack justifyContent={"center"} alignItems={"center"} my={2}>
        <LoadingButton
          //   loadingPosition="start"
          loading={loading}
          disabled={!isValid}
          form="consultantForm"
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
