import { Box, Paper, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import loginSVG from "../../../public/images/login_image.svg";
import LoginForm from "@/components/Desktop/loginForm";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        height={"100vh"}
        width={"100vw"}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          height={{ xs: 0, sm: "inherit" }}
          bgcolor={"#d8d5e678"}
        >
          <Box
            width={{ xs: "0%", sm: "50vw" }}
            height={{ xs: 0, sm: "50vh" }}
            position="relative"
          >
            <Image
              src={loginSVG}
              priority
              alt="login image"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Typography
            variant="h4"
            mt={2}
            fontSize={42}
            fontWeight={700}
            color={"#362B6A"}
          >
            Connexion
          </Typography>
        </Stack>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          height={"100vh"}
          width={{ xs: "100%", md: "50vw" }}
        >
          <Paper
            component={Stack}
            flexDirection={"column"}
            gap={7}
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "transparent",
              minWidth: { xs: "100%", md: "70%" },
            }}
          >
            <div>
              <Typography variant="subtitle2" fontSize={20} gutterBottom>
                Login
              </Typography>
              <Typography variant="caption">Welcome to the platform</Typography>
            </div>
            <LoginForm />
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
