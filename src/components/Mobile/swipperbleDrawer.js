import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import useToken from "@/hooks/token";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import MissionSelect from "../Desktop/missionSelect";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { APIClient } from "@/utils/axios";
import { isAxiosError } from "axios";

export default function SwipeableTemporaryDrawer({ open, setOpen }) {
  const toggleDrawer = (anchor, d_open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(d_open);
  };

  const Content = (anchor) => {
    const [mission, setMission] = useState(null);
    const [craDate, setCraDate] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [creating, setCreating] = useState(false);
    const [token, setToken] = useToken("token", null);
    const router = useRouter();

    useEffect(() => {
      if (craDate !== null && mission !== null) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }, [craDate, mission]);

    const handleClose = () => {
      setMission(null);
      setCraDate(null);
      setIsValid(false);
      setOpen(false);
      toggleDrawer(anchor, false);
    };

    const handleSubmit = async () => {
      setCreating(true);
      const final_data = {
        mission: mission.id,
        period: craDate,
        consultant: token?.me?.id,
      };
      try {
        const { data } = await APIClient.post("/api/cras", final_data);
        toggleDrawer(anchor, false);
        router.push("/f/cras/" + data.id + "/edit");
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      } finally {
        setCreating(false);
      }
    };

    const handleDateChange = (newValue) => {
      setCraDate(newValue?.$d);
    };

    return (
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
          height: "98vh",
          bgcolor: (theme) => theme.palette.background.default,
        }}
        role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        //   onKeyDown={toggleDrawer(anchor, false)}
      >
        <Stack
          width={"100%"}
          height={50}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={1}
          bgcolor={(theme) => theme.palette.background.paper}
        >
          <IconButton onClick={handleClose} onKeyDown={handleClose}>
            <Close fontSize="small" />
          </IconButton>
          <div>Nouveau CRA</div>
          <IconButton disabled={!isValid} onClick={handleSubmit}>
            {creating && <CircularProgress size={20} />}
            {!creating && <Check fontSize="small" />}
          </IconButton>
        </Stack>
        <Stack flexDirection={"column"} gap={2} my={2} px={2}>
          <MissionSelect setMission={setMission} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={handleDateChange}
              sx={{ bgcolor: (theme) => theme.palette.background.paper }}
              label={"mm/yyyy"}
              views={["month", "year"]}
            />
          </LocalizationProvider>
        </Stack>
      </Box>
    );
  };
  return (
    <div>
      <React.Fragment key={"bottom"}>
        {/* <Button onClick={toggleDrawer("bottom", true)}>{"bottom"}</Button> */}
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer("bottom", false)}
          onOpen={toggleDrawer("bottom", true)}
        >
          {Content("bottom")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
