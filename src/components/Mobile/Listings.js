import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import missionImage from "../../../public/test2.svg";
import { Event } from "@mui/icons-material";

export default function MobileMissionsListing({ data }) {
  return (
    <List
      disablePadding
      sx={{ width: "100%", p: 2 }}
      component={Paper}
      elevation={0}
    >
      {data.map((mission, index) => (
        <>
          <ListItem
            disableGutters
            disablePadding
            key={index}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt={mission?.name} src={"/test2.svg"} />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="subtitle2" fontSize={16} gutterBottom>
                {mission?.name}
              </Typography>
              <Typography variant="subtitle2" fontSize={14} gutterBottom>
                Dev senior Symony
              </Typography>
              <Chip
                variant="outlined"
                color="secondary"
                label={`TJM: ${mission.dailyRate} €`}
                size="small"
              />
              <Stack flexDirection={"row"} gap={1} my={1}>
                <Event
                  fontSize="small"
                  color={index === 2 ? "action" : "secondary"}
                />
                <Typography
                  variant="caption"
                  color={(theme) =>
                    index === 2
                      ? theme.palette.action.disabled
                      : theme.palette.text.primary
                  }
                >
                  {index === 2 ? "Durée : 24 mois" : "Depuis le 10 Sep. 2021"}
                </Typography>
              </Stack>
            </ListItemText>
          </ListItem>
          {index + 1 !== data.length && (
            <Divider variant="fullWidth" sx={{ my: 1 }} />
          )}
        </>
      ))}
    </List>
  );
}
