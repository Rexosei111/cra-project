import ConsultantLayout from "@/components/Desktop/consultantLayout";
import { TextInputField } from "@/components/textInput";
import useToken from "@/hooks/token";
import { APIClient } from "@/utils/axios";
import { fetcher } from "@/utils/swr_fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EmailOutlined,
  PasswordOutlined,
  Person2Outlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import * as yup from "yup";

const profileSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email(),
  plainPassword: yup.string(),
  password_confirmation: yup.string(),
});
//   .required();
export default function ProfilePage() {
  const [token, setToken] = useToken("token", null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });
  const [formError, setFormError] = useState(false);
  const { data, error, isLoading } = useSWR("/api/me", fetcher);
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);
  const onsubmit = async (final_data) => {
    setError(false);
    try {
      if (final_data.plainPassword) {
        if (!final_data.password_confirmation) {
          setError("password_confirmation", {
            type: "manual",
            message: "This field must be provided",
          });
          throw new Error("Confirmation password must be provided");
        }
        if (final_data.plainPassword !== final_data.password_confirmation) {
          setError("password_confirmation", {
            type: "manual",
            message: "Passowrd mismatch",
          });
          throw new Error("Password Mismatch");
        }
      }
      const { data } = await APIClient.put("/api/me", final_data);
      const { me, ...rest } = token;
      setToken({
        ...rest,
        me: data,
      });
    } catch (error) {
      setFormError(true);
      if (isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Paper
        sx={{ p: 2, borderRadius: 2 }}
        elevation={0}
        component={"form"}
        onSubmit={handleSubmit(onsubmit)}
        id="profileForm"
      >
        <Typography variant="body1" fontSize={18} fontWeight={700} gutterBottom>
          Mon compte
        </Typography>
        <Stack mt={2} flexDirection={"column"} gap={4} width={"100%"}>
          <Stack
            flexDirection={"row"}
            gap={2}
            width={"inherit"}
            flexWrap={{ xs: "wrap", lg: "nowrap" }}
          >
            <Box width={"100%"}>
              <InputLabel shrink>Prénom</InputLabel>
              <TextInputField
                {...register("lastName")}
                variant="outlined"
                color="secondary"
                type={"text"}
                //   label="Prénom"
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? errors.lastName?.message : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person2Outlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                //   placeholder="Tapez votre email"
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel shrink>Nom</InputLabel>
              <TextInputField
                {...register("firstName")}
                variant="outlined"
                color="secondary"
                type={"text"}
                //   label="Prénom"
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? errors.firstName?.message : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person2Outlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                //   placeholder="Tapez votre email"
              />
            </Box>
          </Stack>
          <Stack flexDirection={"row"} gap={2} width={"inherit"}>
            <Box width={{ xs: "100%", lg: "40%" }}>
              <InputLabel shrink>Email</InputLabel>
              <TextInputField
                {...register("email")}
                variant="outlined"
                color="secondary"
                type={"text"}
                //   label="Prénom"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email?.message : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                //   placeholder="Tapez votre email"
              />
            </Box>
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={2}
            width={"inherit"}
            flexWrap={{ xs: "wrap", lg: "nowrap" }}
          >
            <Box width={"100%"}>
              <InputLabel shrink>Mot de passe</InputLabel>
              <TextInputField
                {...register("plainPassword")}
                variant="outlined"
                color="secondary"
                type={"password"}
                //   label="Prénom"
                error={errors.plainPassword ? true : false}
                helperText={
                  errors.plainPassword ? errors.plainPassword?.message : null
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                //   placeholder="Tapez votre email"
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel shrink>Confirmation du mot de passe</InputLabel>
              <TextInputField
                {...register("password_confirmation")}
                variant="outlined"
                color="secondary"
                type={"password"}
                //   label="Prénom"
                error={errors.password_confirmation ? true : false}
                helperText={
                  errors.password_confirmation
                    ? errors.password_confirmation?.message
                    : null
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                //   placeholder="Tapez votre email"
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>
      <Paper elevation={0} sx={{ p: 3, bgcolor: "#EEEEEE", mt: 3 }}>
        <Typography
          component={"div"}
          variant="caption"
          fontSize={18}
          fontWeight={700}
          gutterBottom
        >
          Société
        </Typography>
        <Typography
          component={"div"}
          variant="caption"
          fontSize={16}
          //   fontWeight={700}
          gutterBottom
          mt={2}
        >
          HR Team
        </Typography>
        <Typography
          component={"div"}
          variant="caption"
          fontSize={15}
          //   fontWeight={700}
          gutterBottom
          mt={2}
        >
          Responsable : Arnaud Mathieu - amathieu@hr-team.net
        </Typography>
      </Paper>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <LoadingButton
          form="profileForm"
          variant="contained"
          color={
            isSubmitSuccessful && !formError
              ? "success"
              : formError
              ? "error"
              : "secondary"
          }
          type="submit"
          //   disabled={!isValid}
          sx={{ textTransform: "capitalize", mt: 2 }}
          loading={isSubmitting}
          disableElevation
        >
          Enregistrer
        </LoadingButton>
      </Stack>
    </>
  );
}

ProfilePage.getLayout = (page) => {
  return <ConsultantLayout title="Mon compte">{page}</ConsultantLayout>;
};
