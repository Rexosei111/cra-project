import ConsultantLayout from "@/components/Desktop/consultantLayout";
import SearchBar from "@/components/Desktop/searchBar";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
import { useRouter } from "next/router";
import { BasicConsultantsCraTable } from "@/components/Desktop/Tables";
import CraListing from "@/components/Mobile/craListing";
import { Add, Check, Close } from "@mui/icons-material";
import MissionSelect from "@/components/Desktop/missionSelect";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { APIClient } from "@/utils/axios";
import { isAxiosError } from "axios";
import useToken from "@/hooks/token";
import SwipeableTemporaryDrawer from "@/components/Mobile/swipperbleDrawer";

const NewCraDialog = ({ open, setOpen }) => {
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
  // const {data, error, isLoading} = useSWR("/api/missions", fetcher)
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle bgcolor={(theme) => theme.palette.common.white}>
        <Stack
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
          <div>Nouveau CRA</div>
          <IconButton disabled={!isValid} onClick={handleSubmit}>
            {creating && <CircularProgress size={20} />}
            {!creating && <Check fontSize="small" />}
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{ bgcolor: (theme) => theme.palette.background.default }}
      >
        <Stack flexDirection={"column"} gap={2} my={2}>
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
      </DialogContent>
    </Dialog>
  );
};

const tabContext = createContext({});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export function FullWidthTabs({ view, setView }) {
  const router = useRouter();
  const theme = useTheme();
  // const [value, setValue] = React.useState("cra");

  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Tabs
      value={view}
      onChange={handleChange}
      component={Paper}
      elevation={0}
      sx={{
        bgcolor: (theme) => theme.palette.background.default,
        borderBottom: "1px solid #D8D5E5",
        mx: 2,
      }}
      indicatorColor="secondary"
      textColor="inherit"
      aria-label="full width tabs example"
    >
      <Tab
        label="cra"
        {...a11yProps(0)}
        value={"cra"}
        sx={{ fontWeight: 700 }}
      />
      <Tab
        label="Factures"
        value={"factures"}
        {...a11yProps(1)}
        sx={{ fontWeight: 700, textTransform: "capitalize" }}
      />
    </Tabs>
  );
}
export default function CraIndexPage() {
  const router = useRouter();
  const [filteredCRA, setFilteredCRA] = useState([]);
  const { data, error, isLoading, mutate } = useSWR(() => null, fetcher);
  const [newCraOpen, setNewCraOpen] = useState(false);
  const [view, setView] = useState("cra");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  useEffect(() => {
    if (typeof data !== "undefined") {
      setFilteredCRA(data["hydra:member"]);
    }
  }, [data]);

  const handleNewCraOpen = () => {
    setNewCraOpen(true);
  };

  const handleBottomDrawerOpen = () => {
    setBottomDrawerOpen(true);
  };

  return (
    <Stack flexDirection={"column"} gap={2} width={"100%"}>
      <FullWidthTabs view={view} setView={setView} />
      <Stack flexDirection={"row"} justifyContent={"space-between"} p={2}>
        <SearchBar
          data={data ? data["hydra:member"] : []}
          setData={setFilteredCRA}
        />
        {!matches && (
          <Button
            onClick={handleNewCraOpen}
            variant="contained"
            disableElevation
            color="primary"
            startIcon={<Add fontSize="small" />}
          >
            New
          </Button>
        )}
      </Stack>
      <TabPanel value={view} index={"cra"}>
        {matches && <CraListing />}
        {!matches && <BasicConsultantsCraTable />}
      </TabPanel>
      <TabPanel value={view} index={"factures"}>
        <Typography>Tab 2</Typography>
      </TabPanel>
      {matches && (
        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="new"
          onClick={handleBottomDrawerOpen}
          sx={{ position: "fixed", bottom: 80, right: 20 }}
        >
          <Add />
          New
        </Fab>
      )}
      {!matches && <NewCraDialog open={newCraOpen} setOpen={setNewCraOpen} />}
      {matches && (
        <SwipeableTemporaryDrawer
          open={bottomDrawerOpen}
          setOpen={setBottomDrawerOpen}
        />
      )}
    </Stack>
  );
}

CraIndexPage.getLayout = (page) => {
  return (
    <ConsultantLayout title="Compte rendu d’activité">{page}</ConsultantLayout>
  );
};
