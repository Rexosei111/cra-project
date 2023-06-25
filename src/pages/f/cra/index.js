import ConsultantLayout from "@/components/Desktop/consultantLayout";
import SearchBar from "@/components/Desktop/searchBar";
import { Paper, Stack, Tab, Tabs, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr_fetcher";
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Tabs
      value={value}
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
      <Tab label="cra" {...a11yProps(0)} sx={{ fontWeight: 700 }} />
      <Tab
        label="Factures"
        {...a11yProps(1)}
        sx={{ fontWeight: 700, textTransform: "capitalize" }}
      />
    </Tabs>
  );
}
export default function CraIndexPage() {
  const [filteredCRA, setFilteredCRA] = useState([]);
  const { data, error, isLoading, mutate } = useSWR(() => null, fetcher);
  console.log(data);
  useEffect(() => {
    if (typeof data !== "undefined") {
      setFilteredCRA(data["hydra:member"]);
    }
  }, [data]);
  return (
    <Stack flexDirection={"column"} gap={2}>
      <FullWidthTabs />
      <SearchBar
        data={data ? data["hydra:member"] : []}
        setData={setFilteredCRA}
      />
    </Stack>
  );
}

CraIndexPage.getLayout = (page) => {
  return <ConsultantLayout title="CRA">{page}</ConsultantLayout>;
};
