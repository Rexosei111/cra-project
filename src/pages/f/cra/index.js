import ConsultantLayout from "@/components/Desktop/consultantLayout";
import SearchBar from "@/components/Desktop/searchBar";
import {
  Box,
  Button,
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
import Link from "next/link";
import { Add } from "@mui/icons-material";

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
      }}
      indicatorColor="secondary"
      textColor="inherit"
      //   variant="fullWidth"
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
  const [view, setView] = useState("cra");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    if (typeof data !== "undefined") {
      setFilteredCRA(data["hydra:member"]);
    }
  }, [data]);

  return (
    <Stack flexDirection={"column"} gap={2} width={"100%"}>
      <FullWidthTabs view={view} setView={setView} />
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <SearchBar
          data={data ? data["hydra:member"] : []}
          setData={setFilteredCRA}
        />
        <Button
          component={Link}
          href="/f/cra/new"
          variant="contained"
          disableElevation
          color="primary"
          startIcon={<Add fontSize="small" />}
        >
          New
        </Button>
      </Stack>
      <TabPanel value={view} index={"cra"}>
        {matches && <CraListing />}
        {!matches && <BasicConsultantsCraTable />}
      </TabPanel>
      <TabPanel value={view} index={"factures"}>
        <Typography>Tab 2</Typography>
      </TabPanel>
    </Stack>
  );
}

CraIndexPage.getLayout = (page) => {
  return (
    <ConsultantLayout title="Compte rendu d’activité">{page}</ConsultantLayout>
  );
};
