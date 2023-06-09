import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { LayoutContext } from "./agencyLayout";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { useRouter } from "next/router";
import Link from "next/link";

export function ResponsiveDrawer(props) {
  const router = useRouter();
  const { mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth } =
    useContext(LayoutContext);
  const { window } = props;
  const sideNavItems = [
    // const drawerWidth = 240;
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
  //   const [mobileOpen, setMobileOpen] = React.useState(false);

  //   const handleDrawerToggle = () => {
  //     setMobileOpen(!mobileOpen);
  //   };

  const drawer = (
    <Box height={"89%"}>
      <Toolbar />
      <Stack
        flexDirection={"column"}
        alignItems={"space-between"}
        height={"100%"}
        px={1}
      >
        <List disablePadding>
          {sideNavItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                bgcolor: (theme) =>
                  router.pathname === "/a" && item.label === "Accueil"
                    ? theme.palette.primary.main
                    : router.pathname.startsWith(item.url) &&
                      item.label !== "Accueil"
                    ? theme.palette.primary.main
                    : null,
              }}
            >
              <ListItemButton LinkComponent={Link} href={item.url}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    color:
                      router.pathname === "/a" && item.label === "Accueil"
                        ? "white"
                        : router.pathname.startsWith(item.url) &&
                          item.label !== "Accueil"
                        ? "white"
                        : null,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List sx={{ mt: "auto" }}></List>
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
