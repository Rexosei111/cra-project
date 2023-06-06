import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  if (typeof window !== "undefined") router.push("/auth/login");
  return (
    <>
      <Head>
        <title>CRA App</title>
      </Head>
      <Container
        maxWidth="md"
        gap={2}
        sx={{
          minHeight: "77vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          my={2}
          textAlign={{ xs: "center" }}
          width={{ xs: "100%", lg: "100%" }}
          fontWeight={700}
        >
          CRA APPLICATION INDEX
        </Typography>
      </Container>
    </>
  );
}
