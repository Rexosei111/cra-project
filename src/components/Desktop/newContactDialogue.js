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
  FormControlLabel,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import {
  Add,
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

const contactSchema = yup.object({
  name: yup.string().required("This field is required"),
  position: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Email must be valid. Eg. 'example@gmail.com'")
    .required("Email is required"),
  receiveCra: yup.boolean().required().default(false),
});
export default function NewContactDialogue({
  newClientOpen,
  handleNewClientOpen,
  mutate,
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const handleClose = () => {
    reset({});
    handleNewClientOpen();
  };

  const onSubmit = async (final_data) => {
    setLoading(true);
    try {
      await APIClient.post("/api/contacts", {
        ...final_data,
        client: router.query.id,
      });
      reset({});
      mutate();
      handleNewClientOpen();
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={newClientOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent>
        <Box
          width={"100%"}
          component={"form"}
          id="newContact"
          action="#"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack flexDirection={"column"} gap={1} width={"100%"}>
            <Box width={"inherit"}>
              <InputLabel shrink htmlFor={`name`}>
                Nom, prénom
              </InputLabel>
              <TextInputField
                {...register(`name`)}
                variant="outlined"
                color="secondary"
                // size="small"
                type={"text"}
                sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                }}
                error={errors?.name ? true : false}
                helperText={errors?.name ? errors?.name?.message : null}
                fullWidth
                placeholder="Coca-Cola"
                InputProps={{
                  style: { fontSize: 14 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person2Outlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box width={"100%"}>
              <InputLabel shrink htmlFor={`email`}>
                Email
              </InputLabel>
              <TextInputField
                {...register(`email`)}
                variant="outlined"
                color="secondary"
                // size="small"
                sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                }}
                type={"email"}
                error={errors?.email ? true : false}
                helperText={errors?.email ? errors?.email.message : null}
                fullWidth
                placeholder="example@gmail.com"
                InputProps={{
                  style: { fontSize: 14 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box width={"inherit"}>
              <InputLabel shrink htmlFor={`position`}>
                Fonction
              </InputLabel>
              <TextInputField
                {...register(`position`)}
                variant="outlined"
                color="secondary"
                sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                }}
                // size="small"
                type={"text"}
                error={errors?.position ? true : false}
                helperText={errors?.position ? errors?.position?.message : null}
                fullWidth
                placeholder="Coca-Cola"
                InputProps={{
                  style: { fontSize: 14 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <FormControlLabel
                control={
                  <AntSwitch {...register(`receiveCra`)} sx={{ m: 1 }} />
                }
                label="Reçoit et valide les CRA"
                componentsProps={{
                  typography: {
                    fontSize: 13,
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          disabled={!isValid}
          loading={loading}
          variant="contained"
          color="secondary"
          form="newContact"
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
