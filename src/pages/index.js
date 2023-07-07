import * as React from "react";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useRouter } from "next/router";
import { LinearProgress, Stack } from "@mui/material";
import useToken from "@/hooks/token";

const IndexLoadingPage = () => {
  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={1}
      width={"100%"}
      height={"100vh"}
    >
      <Typography variant="subtitle2">Loading...</Typography>
      <LinearProgress sx={{ width: 200 }} />
    </Stack>
  );
};
export default function Index() {
  const [token, setToken] = useToken("token", null);

  const router = useRouter();
  React.useEffect(() => {
    if (token === null) {
      router.push("/auth/login");
    }
    const userType = token?.me?.type;
    if (userType === "manager") {
      router.push("/a/");
    } else if (userType === "consultant") {
      router.push("/f/");
    }
  }, [token]);
  return (
    <>
      <Head>
        <title>CRA App</title>
      </Head>
      <IndexLoadingPage />
    </>
  );
}
