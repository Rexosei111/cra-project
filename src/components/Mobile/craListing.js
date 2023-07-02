import {
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import testImage from "../../../public/test.svg";
import { CheckOutlined, Event, History } from "@mui/icons-material";

function createCraData(name, calories, fat, carbs, protein) {
  return {
    name,
    invoiceDate: calories,
    workedDays: fat,
    validatedDate: carbs,
    validated: protein,
  };
}

const craRows = [
  createCraData(
    "Frozen yoghurt",
    "Premier jour du mois suivant",
    "Mai - 19 jours",
    "En cours",
    false
  ),
  createCraData(
    "Ice cream sandwich",
    "dernier jour du mois",
    "Janvier - 8 jours",
    "Validé le 11 Mai",
    true
  ),
  createCraData(
    "Eclair",
    "le 25 du mois",
    "Août - 19 jours",
    "Validé le 11 Mai",
    true
  ),
  createCraData(
    "Cupcake",
    "le dernier lundi",
    "Août - 19 jours",
    "Validé le 11 Mai",
    true
  ),
  createCraData(
    "Gingerbread",
    "dernier jour du mois",
    "Août - 19 jours",
    "Validé le 11 Mai",
    true
  ),
];

const CraSecondaryInfo = ({ row }) => {
  return (
    <Stack flexDirection={"column"} gap={1}>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <Event fontSize="small" />
        <Typography variant="caption">{row.invoiceDate}</Typography>
      </Stack>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <History fontSize="small" />
        <Typography variant="caption">{row.workedDays}</Typography>
      </Stack>
      <Chip
        icon={<CheckOutlined fontSize="small" />}
        sx={{ width: "50%" }}
        label={row?.validatedDate}
        variant="filled"
        color={row?.validated ? "secondary" : "error"}
      />
    </Stack>
  );
};

export default function CraListing() {
  return (
    <Stack
      component={List}
      disablePadding
      flexDirection={"column"}
      gap={1}
      width={"100%"}
    >
      {craRows &&
        craRows.map((row, index) => (
          <ListItem
            sx={{ p: 1, bgcolor: (theme) => theme.palette.background.paper }}
            alignItems="flex-start"
          >
            <ListItemIcon>
              <Image
                src={testImage}
                // fill
                alt="mission icon"
                width={35}
                height={35}
              />
            </ListItemIcon>
            <ListItemText
              primary={row?.name}
              secondary={<CraSecondaryInfo row={row} />}
            />
          </ListItem>
        ))}
    </Stack>
  );
}
