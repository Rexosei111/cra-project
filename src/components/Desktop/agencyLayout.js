import { Box, Toolbar } from "@mui/material";
import React from "react";
import { createContext } from "react";
import TopBar from "./TopBar";
import { ResponsiveDrawer } from "./drawer";

export const LayoutContext = createContext(null);
const drawerWidth = 240;

export default function AgencyLayout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <LayoutContext.Provider
      value={{ mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth }}
    >
      <Box sx={{ display: "flex" }}>
        <TopBar />
        <ResponsiveDrawer />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
      ;
    </LayoutContext.Provider>
  );
}
