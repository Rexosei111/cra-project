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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { APIClient } from "@/utils/axios";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";

const newClientSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    plainPassword: yup.string(),
  })
  .required();

const TextInputField = styled(TextField)({
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
export default function EditConsultantForm({ initialValues = {} }) {
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
        `/api/consultants/${router.query.id}`,
        final_data
      );
      console.log(data);
      router.push("/a/consultants");
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
              // label="Prénom"
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
