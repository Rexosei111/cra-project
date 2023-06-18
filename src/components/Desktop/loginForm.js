import React, { useState } from "react";
import {
  Alert,
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { useRouter } from "next/router";
import axios, { isAxiosError } from "axios";
import useToken from "@/hooks/token";
import { AntSwitch } from "../Mobile/switches";
import { APIClient } from "@/utils/axios";

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [manager, setManager] = useState(true);
  const router = useRouter();
  const [token, setToken] = useToken("token", null);

  const handleOpen = (message) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const final_data = { username: data.email, password: data.password };
    try {
      const { data } = await APIClient.post("/api/login_check", final_data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token_expire_time = +process.env.NEXT_PUBLIC_TOKEN_EXPIRES_IN;
      const currentTime = new Date();
      setToken({
        ...data,
        expiresIn: new Date(
          currentTime.getTime() + token_expire_time
        ).getTime(),
      });
      setLoading(false);
      const { callbackUrl } = router.query;
      if (manager) {
        router.push("/a/");
      } else {
        console.log("Unable to log in as manager");
      }
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        if (error?.response?.status === 401) {
          handleOpen("Invalid credentials.");
        } else if (error?.response?.status !== 401) {
          handleOpen(
            "Unable to login at this time. Kindly check your credentials"
          );
        }
      } else {
        console.log(error);
        handleOpen("Something went wrong. Retry");
      }
    }
  };

  const handleManagerChange = (event) => {
    setManager(!manager);
  };

  return (
    <>
      <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"column"} gap={2}>
          <TextField
            {...register("email")}
            variant="outlined"
            type={"email"}
            label="Email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder="Tapez votre email"
          />
          <TextField
            {...register("password")}
            variant="outlined"
            type={"password"}
            label="Password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder="Tapez votre mot de passe"
          />
          <FormControlLabel
            control={
              <AntSwitch
                sx={{ m: 1 }}
                defaultChecked
                onChange={handleManagerChange}
                value={manager}
              />
            }
            label="Connectez-vous en tant que gestionnaire"
            componentsProps={{
              typography: {
                fontSize: 13,
              },
            }}
          />
          <LoadingButton
            loadingPosition="start"
            loading={loading}
            disabled={!isValid}
            startIcon={<LoginIcon />}
            variant="contained"
            type="submit"
            sx={{ textTransform: "capitalize", color: "white" }}
            disableElevation
          >
            Connexion
          </LoadingButton>
          <Typography
            component={Link}
            href="#"
            textAlign={"center"}
            style={{ fontSize: 13, textDecoration: "none" }}
            color={(theme) => theme.palette.text.primary}
          >
            Mot de passe oublié ?
          </Typography>
          <Divider>or</Divider>
          <Stack
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={13}
          >
            Vous n’avez pas encore de compte ?
            <Typography
              component={Link}
              href={"#"}
              textAlign={"center"}
              style={{ fontSize: 13, textDecoration: "none" }}
              color={(theme) => theme.palette.primary.main}
            >
              Créer un compte
            </Typography>
          </Stack>
        </Stack>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
