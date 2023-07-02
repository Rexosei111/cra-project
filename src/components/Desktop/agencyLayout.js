import { Box, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import TopBar from "./TopBar";
import { ResponsiveDrawer } from "./drawer";
import Head from "next/head";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { useRouter } from "next/router";

export const LayoutContext = createContext(null);
const drawerWidth = 240;

export default function AgencyLayout({ children, title = "Accueil" }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [topbarTitle, setTopBarTitle] = useState(title);

  const sideNavItems = [
    {
      label: "Accueil",
      icon: (
        <HomeOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname === "/a" ? "white" : null}
        />
      ),
      url: "/a",
    },
    {
      label: "CRA",
      icon: (
        <AssignmentOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname.startsWith("/a/cra") ? "white" : null}
        />
      ),
      url: "/a/cra",
    },
    {
      label: "Client",
      icon: (
        <GroupsOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname.startsWith("/a/clients") ? "white" : null}
        />
      ),
      url: "/a/clients",
    },
    {
      label: "Missions",
      icon: (
        <AssignmentTurnedInOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname.startsWith("/a/missions") ? "white" : null}
        />
      ),
      url: "/a/missions",
    },
    {
      label: "Consultants",
      icon: (
        <GroupOutlinedIcon
          fontSize="small"
          htmlColor={
            router.pathname.startsWith("/a/consultants") ? "white" : null
          }
        />
      ),
      url: "/a/consultants",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutContext.Provider
        value={{
          mobileOpen,
          setMobileOpen,
          handleDrawerToggle,
          drawerWidth,
          topbarTitle,
          setTopBarTitle,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <TopBar title={topbarTitle ? topbarTitle : title} />
          <ResponsiveDrawer sideNavItems={sideNavItems} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 2,
              width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
        ;
      </LayoutContext.Provider>
    </>
  );
}
