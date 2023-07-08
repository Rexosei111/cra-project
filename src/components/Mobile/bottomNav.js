import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { Task } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useToken from "@/hooks/token";

const routeValues = ["/f", "/f/cra", "/f/missions", "/f/profile"];
export default function LabelBottomNavigation({ sideNavItems }) {
  const router = useRouter();
  const [token, setToken] = useToken("token", null);
  const [value, setValue] = React.useState("/f/");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    setToken(null);
    setAnchorEl(null);
    router.push("/auth/login");
  };

  const handleProfile = () => {
    setAnchorEl(null);
    router.push("/f/profile");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  React.useEffect(() => {
    routeValues.map((route) => {
      if (router.pathname === "/f") {
        setValue("/f/");
      } else if (router.pathname.startsWith(route)) {
        setValue(route);
      }
    });
  }, [router.isReady]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "100%" }}
      showLabels
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Accueil"
        value="/f/"
        icon={<HomeOutlinedIcon />}
      />
      <BottomNavigationAction
        label="CRA"
        value="/f/cras"
        icon={<AssignmentOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Missions"
        value="/f/missions"
        icon={<AssignmentTurnedInOutlinedIcon />}
      />
      <BottomNavigationAction
        showlabel={false}
        // label="Mon compte"
        // value="/f/profile"
        onClick={handleClick}
        icon={
          <Avatar sx={{ width: 35, height: 35 }}>
            {token && token?.me?.firstName?.charAt(0)}
          </Avatar>
        }
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List disablePadding sx={{ width: 150 }}>
          <ListItem disableGutters disablePadding>
            <ListItemButton onClick={handleProfile}>Profile</ListItemButton>
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemButton onClick={handleLogout}>Logout</ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </BottomNavigation>
  );
}
