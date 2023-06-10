import { Box, Toolbar } from "@mui/material";
import React from "react";
import { createContext } from "react";
import TopBar from "./TopBar";
import { ResponsiveDrawer } from "./drawer";
import Head from "next/head";

export const LayoutContext = createContext(null);
const drawerWidth = 240;

export default function AgencyLayout({ children, title = "Accueil" }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutContext.Provider
        value={{ mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth }}
      >
        <Box sx={{ display: "flex" }}>
          <TopBar title={title} />
          <ResponsiveDrawer />
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
