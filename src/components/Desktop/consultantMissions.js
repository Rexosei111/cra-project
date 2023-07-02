import { ErrorComponent } from "@/pages/a/clients";
import { fetcher } from "@/utils/swr_fetcher";
import {
  Check,
  Edit,
  ExpandLess,
  ExpandMore,
  PeopleOutline,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import clientImage from "../../../public/test.svg";
import Link from "next/link";
import { TextInputField } from "../textInput";
import EuroIcon from "@mui/icons-material/Euro";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { isAxiosError } from "axios";
import { APIClient } from "@/utils/axios";
import { LoadingButton } from "@mui/lab";

const consultantMissionSchema = yup
  .object({
    missionId: yup
      .string()
      .required("This field is required, please select a mission"),
    dailyRate: yup.number().default(1),
  })
  .required();

const AttachConsultantToMission = ({ missions = [], consultantMissions }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(consultantMissionSchema),
  });
  const handleSeleteChange = (e) => {
    setValue("missionId", e.target.value.id);
  };

  const onSubmit = async (form_data) => {
    setError(false);
    const final_data = {
      dailyRate: form_data.dailyRate,
      missions: [
        ...new Set([
          ...consultantMissions.map((consultant) => consultant?.id),
          form_data.missionId,
        ]),
      ],
    };
    try {
      const { data } = await APIClient.put(
        `/api/consultants/${router.query.id}`,
        final_data
      );
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        setError(true);
      }
    } finally {
    }
  };
  return (
    <Stack
      width={"100%"}
      mt={2}
      gap={1}
      flexDirection={"row"}
      alignItems={"center"}
      onSubmit={handleSubmit(onSubmit)}
      flexWrap={{ xs: "wrap", md: "nowrap" }}
      component={"form"}
    >
      <TextInputField
        variant="outlined"
        fullWidth
        select
        error={errors.missionId ? true : false}
        helperText={errors.missionId ? errors.missionId?.message : null}
        sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        onChange={handleSeleteChange}
        {...register("missionId")}
      >
        {missions &&
          missions?.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
      </TextInputField>
      <TextInputField
        fullWidth
        variant="outlined"
        {...register("dailyRate")}
        color="secondary"
        sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        // focused
        error={errors.dailyRate ? true : false}
        helperText={errors.dailyRate ? errors.dailyRate?.message : null}
        type={"text"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography fontSize={14} variant="caption">
                TJM
              </Typography>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <EuroIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        variant="contained"
        disabled={!isValid}
        disableElevation
        sx={{ height: "100%" }}
        color={
          isSubmitSuccessful && !error
            ? "success"
            : error
            ? "error"
            : "secondary"
        }
        type="submit"
        loading={isSubmitting}
      >
        <Check />
      </LoadingButton>
    </Stack>
  );
};

const MissionDisplay = ({ mission }) => {
  return (
    <>
      <Stack width={"100%"} gap={2} flexDirection={"row"} alignItems={"center"}>
        <Stack alignItems={"flex-start"} width={"100%"}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <IconButton>
              <Image src={clientImage} fill alt="client logo" />
            </IconButton>
            <Typography variant="subtitle2" fontSize={14} fontWeight={700}>
              {mission?.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack width={"100%"} alignItems={"flex-start"}>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <IconButton>
              <PeopleOutline fontSize="small" />
            </IconButton>
            <Typography
              variant="subtitle2"
              fontSize={14}
              fontWeight={400}
              color={(theme) => theme.palette.text.secondary}
            >
              {mission?.consultants?.length} consultants
            </Typography>
          </Stack>
        </Stack>
        <Stack width={"100%"} alignItems={"center"}>
          <Chip
            variant="outlined"
            color="secondary"
            label={`TJM: ${mission?.dailyRate}`}
          />
        </Stack>
        <Stack width={"100%"} alignItems={"center"}>
          <Button
            variant="text"
            color="secondary"
            component={Link}
            href={`/a/missions/${mission?.id}/edit`}
            sx={{
              textTransform: "capitalize",
            }}
            startIcon={<Edit fontSize="small" />}
          >
            Editer
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
const MissionsLoading = () => {
  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      gap={2}
      minHeight={"80vh"}
      my={2}
    >
      <Skeleton variant="text" width={"30%"} height={20} />
      <Skeleton variant="rectangular" width={"100%"} height={150} />
      <Skeleton variant="text" width={"65%"} height={20} />
      <Skeleton variant="text" width={"65%"} height={20} />
    </Stack>
  );
};

export default function ConsultantMissionForm({ consultant = {} }) {
  const router = useRouter();
  const [missionOpen, setMissionOpen] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    () => (router.isReady ? "/api/missions" : null),
    fetcher
  );

  const handleMissionOpen = () => {
    setMissionOpen(!missionOpen);
  };

  return (
    <>
      <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
        <Typography
          variant="caption"
          fontSize={17}
          fontWeight={700}
          gutterBottom
        >
          Missions
        </Typography>
      </Stack>
      <Paper elevation={0} sx={{ p: 2, width: "100%", overflowX: "auto" }}>
        {/* <Collapse
          in={missionOpen}
          timeout="auto"
          unmountOnExit
          // sx={{ minWidth: 750, overflowX: "auto" }}
        > */}
        {isLoading && <MissionsLoading />}
        {!isLoading && error && <ErrorComponent refresh={mutate} />}
        {consultant && consultant?.missions?.length > 0 && (
          <Stack
            flexDirection={"column"}
            component={Paper}
            elevation={0}
            minWidth={750}
            gap={2}
            p={2}
          >
            {consultant?.missions.map((mission, index) => (
              <MissionDisplay mission={mission} key={index} />
            ))}
          </Stack>
        )}
        {/* </Collapse> */}
      </Paper>
      <AttachConsultantToMission
        missions={data && data["hydra:member"]}
        consultantMissions={consultant?.missions}
      />
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Typography
          alignSelf={"center"}
          variant="caption"
          component={Link}
          href="/a/missions/new"
        >
          Ajouter une mission pour Le Figaro
        </Typography>
      </Stack>
    </>
  );
}
