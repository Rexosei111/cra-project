import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
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
import useToken from "@/hooks/token";
import LogoutIcon from "@mui/icons-material/Logout";
import { PeopleOutline } from "@mui/icons-material";
import ConsultantLayout, { ConsultantLayoutContext } from "./consultantLayout";

export function ResponsiveDrawer(props) {
  const [token, setToken] = useToken("token", null);
  const router = useRouter();
  const { mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth } =
    useContext(LayoutContext);
  const { window, sideNavItems } = props;

  const Mydrawer = () => {
    const [token, setToken] = useToken("token", null);
    const router = useRouter();
    const utilisateurs = () => {
      router.push("/a/utilisateurs");
    };
    const profile = () => {
      router.push("/a/profile");
    };
    const logout = () => {
      setToken(null);
      router.push("/auth/login");
    };
    return (
      <Box height={"89%"}>
        <Toolbar />
        <Stack
          flexDirection={"column"}
          alignItems={"space-between"}
          height={"100%"}
          px={1}
        >
          <List disablePadding>
            {sideNavItems?.map((item, index) => (
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
          <List
            disablePadding
            sx={{
              mt: "auto",
              width: "100%",
              borderRadius: 3,
              bgcolor: (theme) => theme.palette.background.default,
            }}
            elevation={0}
          >
            <ListItem disableGutters disablePadding>
              <ListItemButton onClick={utilisateurs}>
                <ListItemIcon>
                  <PeopleOutline fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={"Utilisateurs"}
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton onClick={profile}>
                <ListItemIcon>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    {token && token?.me?.firstName?.charAt(0)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={`${token?.me?.firstName} ${token?.me?.lastName}`}
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={"Déconnexion"}
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Box>
    );
  };

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
        <Mydrawer />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <Mydrawer />
      </Drawer>
    </Box>
  );
}

export function MobileResponsiveDrawer(props) {
  const [token, setToken] = useToken("token", null);
  const router = useRouter();
  const { mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth } =
    useContext(ConsultantLayoutContext);
  const { window, sideNavItems } = props;

  const Mydrawer = () => {
    const [token, setToken] = useToken("token", null);
    const router = useRouter();
    const profile = () => {
      const pathname = router.pathname;
      if (pathname.startsWith("/a")) {
        router.push("/a/profile");
      } else if (pathname.startsWith("/f")) {
        router.push("/f/profile");
      }
    };
    const logout = () => {
      setToken(null);
      router.push("/auth/login");
    };
    return (
      <Box height={"89%"}>
        <Toolbar />
        <Stack
          flexDirection={"column"}
          alignItems={"space-between"}
          height={"100%"}
          px={1}
        >
          <List disablePadding>
            {sideNavItems?.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  bgcolor: (theme) =>
                    router.pathname === "/a" ||
                    (router.pathname === "/f" && item.label === "Accueil")
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
                        router.pathname === "/a" ||
                        (router.pathname === "/f" && item.label === "Accueil")
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
          <List
            disablePadding
            sx={{
              mt: "auto",
              width: "100%",
              borderRadius: 3,
              bgcolor: (theme) => theme.palette.background.default,
            }}
            elevation={0}
          >
            <ListItem disableGutters disablePadding>
              <ListItemButton onClick={profile}>
                <ListItemIcon>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    {token && token?.me?.firstName?.charAt(0)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={`${token?.me?.firstName} ${token?.me?.lastName}`}
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={"Déconnexion"}
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Box>
    );
  };

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
        <Mydrawer />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <Mydrawer />
      </Drawer>
    </Box>
  );
}
