import { Box, Paper, Toolbar } from "@mui/material";
import React from "react";
import { createContext } from "react";
import TopBar, { ConsultantTopBar } from "./TopBar";
import { MobileResponsiveDrawer, ResponsiveDrawer } from "./drawer";
import Head from "next/head";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { useRouter } from "next/router";
import LabelBottomNavigation from "../Mobile/bottomNav";

export const ConsultantLayoutContext = createContext(null);
const drawerWidth = 240;

export default function ConsultantLayout({ children, title = "Accueil" }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const sideNavItems = [
    {
      label: "Accueil",
      icon: (
        <HomeOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname === "/f" ? "white" : null}
        />
      ),
      url: "/f",
    },
    {
      label: "CRA",
      icon: (
        <AssignmentOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname.startsWith("/f/cras") ? "white" : null}
        />
      ),
      url: "/f/cras",
    },

    {
      label: "Missions",
      icon: (
        <AssignmentTurnedInOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname.startsWith("/f/missions") ? "white" : null}
        />
      ),
      url: "/f/missions",
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
      <ConsultantLayoutContext.Provider
        value={{ mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth }}
      >
        <Box sx={{ display: "flex" }}>
          <ConsultantTopBar title={title} />
          <MobileResponsiveDrawer sideNavItems={sideNavItems} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 2,
              mb: 5,
              width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              display: { xs: "block", sm: "none" },
            }}
            elevation={3}
          >
            <LabelBottomNavigation />
          </Paper>
        </Box>
        ;
      </ConsultantLayoutContext.Provider>
    </>
  );
}
