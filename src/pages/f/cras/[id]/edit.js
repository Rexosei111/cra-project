import ConsultantLayout from "@/components/Desktop/consultantLayout";
import React from "react";

import { AntSwitch } from "@/components/Mobile/switches";
import { CheckCircle, Event } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";

const workingDays = Array.from({ length: 7 }, (_, index) => index + 1);

export default function CRAEditPage() {
  //   const theme = useTheme();
  const router = useRouter();
  // const { data, error, isLoading } = useSWR(
  //   () => (router.isReady ? `/api/cras/${router.query.id}` : null),
  //   fetcher
  // );
  const { data, error, isLoading } = useSWR(
    () => (router.isReady ? null : null),
    fetcher
  );
  console.log(data);
  const xxs = useMediaQuery("(max-width:360px)");
  return (
    <Paper elevation={0} sx={{ width: "100%", minHeight: 400, p: 2 }}>
      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Box
          component={Stack}
          sx={{ p: 2 }}
          flexDirection={{ xs: "column", md: "row" }}
          gap={1}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent={"space-between"}
          width={{ xs: "100%", md: "40%" }}
          minHeight={120}
          bgcolor={(theme) => theme.palette.background.default}
        >
          <Box>
            <Typography variant="subtitle2">Davy Gabison</Typography>
            <Typography variant="caption">Le Figaro</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Dev back end Symfony</Typography>
            <Chip
              label={"TJM : 600€"}
              variant="outlined"
              color="default"
              size="small"
            />
          </Box>
        </Box>
        <Box component={Stack} flexDirection={"row"} alignItems={"center"}>
          <Chip
            label={"10,5 jours travaillés"}
            variant="filled"
            color="primary"
            size="small"
          />
        </Box>
        <Box
          component={Stack}
          flexDirection={"column"}
          alignItems={"center"}
          gap={1}
        >
          <Button
            disableElevation
            color="secondary"
            variant="contained"
            startIcon={<CheckCircle fontSize="small" />}
            sx={{ height: 55, textTransform: "capitalize" }}
          >
            Valider le CRA
          </Button>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Event fontSize="small" color="action" />
            <Typography
              variant="caption"
              color={(theme) => theme.palette.text.secondary}
            >
              Envoi prévu le 01 Aout. 2021
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Stack
        flexDirection={"column"}
        mt={4}
        gap={2}
        width={{ xs: "100%", md: "40%" }}
      >
        <Stack
          flexDirection={xxs ? "column" : "row"}
          gap={1}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={xxs ? "flex-start" : "center"}
        >
          <Typography variant="subtitle2">Consultant</Typography>
          <Chip
            label={"Validé le 24 Juillet"}
            size="small"
            variant="filled"
            color="secondary"
          />
        </Stack>
        <Stack
          flexDirection={xxs ? "column" : "row"}
          gap={1}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={xxs ? "flex-start" : "center"}
        >
          <Typography variant="subtitle2">Client</Typography>
          <Chip
            label={"Le client n’a pas encore validé le CRA"}
            size="small"
            variant="filled"
            color="primary"
          />
        </Stack>
        <Stack
          flexDirection={xxs ? "column" : "row"}
          gap={1}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={xxs ? "flex-start" : "center"}
        >
          <Typography variant="subtitle2">Manager</Typography>
          <Chip
            label={"Pas encore validé"}
            size="small"
            variant="filled"
            color="warning"
          />
        </Stack>
      </Stack>
      <Divider sx={{ my: 2 }} variant="middle" />
      <Typography variant="subtitle2" fontSize={18} fontWeight={700}>
        Détails des jours
      </Typography>
      <Grid container my={2} spacing={2}>
        {workingDays.map((day, index) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
            <InputLabel shrink>{day} Juillet</InputLabel>
            <Paper elevation={0} variant="outlined" sx={{ p: 1 }}>
              <Stack
                flexDirection={"row"}
                gap={3}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack flexDirection={"column"}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        // {...register(`${day}.am`)}
                        // defaultChecked={getValues()[`${day}`]?.am}
                      />
                    }
                    componentsProps={{
                      typography: {
                        fontSize: 13,
                      },
                    }}
                    label="Matin"
                  />
                  <FormControlLabel
                    sx={{ ml: 0.0 }}
                    control={
                      <AntSwitch
                      // {...register(`${day}.remote_am`)}
                      // defaultChecked={getValues()[`${day}`]?.remote_am}
                      />
                    }
                    componentsProps={{
                      typography: {
                        fontSize: 13,
                        ml: 0.5,
                      },
                    }}
                    label="Remote"
                  />
                </Stack>
                <Stack flexDirection={"column"}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        // {...register(`${day}.pm`)}
                        // defaultChecked={getValues()[`${day}`]?.pm}
                      />
                    }
                    componentsProps={{
                      typography: {
                        fontSize: 13,
                      },
                    }}
                    label="Après-midi"
                  />
                  <FormControlLabel
                    sx={{ ml: 0.0 }}
                    control={
                      <AntSwitch
                        size="small"
                        // {...register(`${day}.remote_pm`)}
                        // defaultChecked={getValues()[`${day}`]?.remote_pm}
                      />
                    }
                    label="Remote"
                    componentsProps={{
                      typography: {
                        fontSize: 13,
                        ml: 0.5,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

CRAEditPage.getLayout = (page) => {
  return <ConsultantLayout title="Update Cra">{page}</ConsultantLayout>;
};
