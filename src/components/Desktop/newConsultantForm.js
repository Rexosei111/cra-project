import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios, { isAxiosError } from "axios";
import useToken from "@/hooks/token";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";

// const contactSchema = yup.object({
//   name: yup.string().required("This field is required"),
//   position: yup.string().required("This field is required"),
//   email: yup
//     .string()
//     .email("Email must be valid. Eg. 'example@gmail.com'")
//     .required("Email is required"),
//   receiveCra: yup.boolean().required().default(false),
// });
const newClientSchema = yup
  .object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

const selectOptions = ["Dernier jour du mois"];
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
export default function NewConsultantForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(newClientSchema),
  });
  const [token, setToken] = useToken("token", "");

  const onSubmit = async (data) => {
    const final_data = { ...data, organization: token?.me.organization?.id };
    // setLoading(true);
    // try {
    //   const { data } = await axios.post(
    //     process.env.NEXT_PUBLIC_API_BASE_URL + "/api/clients",
    //     final_data,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token.token}`,
    //       },
    //     }
    //   );
    //   console.log(data);
    // } catch (error) {
    //   if (isAxiosError(error)) {
    //     console.log(error);
    //   }
    // } finally {
    //   setLoading(false);
    // }
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
          <TextInputField
            {...register("firstname")}
            variant="outlined"
            type={"text"}
            label="Nom"
            error={errors.firstname ? true : false}
            helperText={errors.firstname ? errors.firstname?.message : null}
            fullWidth
            focused
            placeholder="Coca-Cola"
          />
          <TextInputField
            {...register("lastname")}
            variant="outlined"
            color="secondary"
            focused
            type={"text"}
            label="Prénom"
            error={errors.lastname ? true : false}
            helperText={errors.lastname ? errors.lastname?.message : null}
            fullWidth
            placeholder="Coca-Cola"
          />
          <TextInputField
            {...register("email")}
            variant="outlined"
            color="secondary"
            focused
            type={"email"}
            label="Email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email?.message : null}
            fullWidth
            placeholder="example@gmail.com"
          />
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
