import AgencyLayout, { LayoutContext } from "@/components/Desktop/agencyLayout";
import { TextInputField } from "@/components/textInput";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const mailSchema = yup.object({
  subject: yup.string().required("This field is required"),
  body: yup.string().required("This field is required"),
});

export default function AgencyMail() {
  const { setTopBarTitle } = useContext(LayoutContext);
  setTopBarTitle("Personnalisation du mail envoyé aux clients");
  const {
    register,
    control,
    reset,
    setValue,
    getValues,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(mailSchema),
  });

  const onsubmit = async (data) => {
    console.log(data);
  };
  return (
    <Paper
      elevation={0}
      sx={{ p: 2 }}
      component={"form"}
      onSubmit={handleSubmit(onsubmit)}
    >
      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={{ xs: "wrap", md: "nowrap" }}
        gap={2}
      >
        <Box width={{ xs: "100%", md: "40%" }}>
          <Typography variant="caption" fontSize={15}>
            Les balises disponibles sont les suivantes : [NOM] : Nom du
            candidat, [PRENOM]: prénom du candidat [ORGANISATION] : Nom de votre
            société
          </Typography>
        </Box>
        <Box width={{ xs: "100%", md: "40%" }}>
          <Typography variant="caption" fontSize={15}>
            [RESPONSABLE] : Nom Prénom du responsable de votre société
            [VALIDATION_LIEN] : Lien de validation
          </Typography>
        </Box>
      </Stack>
      <Stack flexDirection={"column"} gap={3} mt={7}>
        <TextInputField
          variant="outlined"
          {...register("subject")}
          color="secondary"
          label="Object du mail"
          placeholder="Voici le CRA de [NOM] [PRENOM] - [ORGANISATION]"
          focused
          inputProps={{
            style: { fontSize: 13 },
          }}
        />
        <TextInputField
          variant="outlined"
          color="secondary"
          label="Object du mail"
          {...register("body")}
          multiline
          rows={15}
          inputProps={{
            style: { fontSize: 13 },
          }}
          focused
        />
      </Stack>
      <Stack
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={3}
      >
        <Button
          disableElevation
          variant="contained"
          type="submit"
          disabled={!isValid}
          sx={{ textTransform: "capitalize" }}
        >
          Enregistrer
        </Button>
      </Stack>
    </Paper>
  );
}

AgencyMail.getLayout = (page) => {
  return (
    <AgencyLayout title="Personnalisation du mail envoyé aux clients">
      {page}
    </AgencyLayout>
  );
};
