import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
} from "@mui/material";
import {
  Add,
  CheckBox,
  EmailOutlined,
  Person2Outlined,
  Save,
  Work,
} from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { TextInputField } from "./newClient";
import { AntSwitch } from "../Mobile/switches";
import { APIClient } from "@/utils/axios";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";
import { LoadingButton } from "@mui/lab";

const workingDays = Array.from({ length: 31 }, (_, index) => index + 1);

const daySchema = yup.object({
  am: yup.boolean().default(false),
  pm: yup.boolean().default(false),
  remote_am: yup.boolean().default(false),
  remote_pm: yup.boolean().default(false),
});

const workingDaysSchema = yup.object({
  1: daySchema,
  2: daySchema,
  3: daySchema,
  4: daySchema,
  5: daySchema,
  6: daySchema,
  7: daySchema,
  8: daySchema,
  9: daySchema,
  10: daySchema,
  11: daySchema,
  12: daySchema,
  13: daySchema,
  13: daySchema,
  14: daySchema,
  15: daySchema,
  16: daySchema,
  17: daySchema,
  18: daySchema,
  19: daySchema,
  20: daySchema,
  21: daySchema,
  22: daySchema,
  23: daySchema,
  24: daySchema,
  25: daySchema,
  26: daySchema,
  27: daySchema,
  28: daySchema,
  29: daySchema,
  30: daySchema,
  31: daySchema,
});
export default function DefaultWorkingDays({
  open,
  setOpen,
  defaultValues = {},
  setWorkingDays,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    control,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(workingDaysSchema),
  });

  React.useEffect(() => {
    if (
      typeof defaultValues === "object" &&
      Object.keys(defaultValues).length !== 0
    ) {
      reset(defaultValues);
    }
  }, [defaultValues]);
  const onSubmit = async (final_data) => {
    setWorkingDays("defaultWorkingDay", final_data);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Jours travaillés par défaut</DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          id="workingDaysForm"
        >
          <Grid container spacing={2}>
            {workingDays.map((day, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <InputLabel shrink>Day {day}</InputLabel>
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
                            {...register(`${day}.am`)}
                            defaultChecked={getValues()[`${day}`]?.am}
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
                            {...register(`${day}.remote_am`)}
                            defaultChecked={getValues()[`${day}`]?.remote_am}
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
                            {...register(`${day}.pm`)}
                            defaultChecked={getValues()[`${day}`]?.pm}
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
                            {...register(`${day}.remote_pm`)}
                            defaultChecked={getValues()[`${day}`]?.remote_pm}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          //   disabled={!isValid}
          //   loading={loading}
          variant="contained"
          color="secondary"
          form="workingDaysForm"
          type="submit"
          disableElevation
          startIcon={<Save fontSize="small" />}
        >
          save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
