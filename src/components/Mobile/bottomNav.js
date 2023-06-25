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
import { Avatar, useMediaQuery, useTheme } from "@mui/material";
import useToken from "@/hooks/token";

const routeValues = ["/f", "/f/cra", "/f/missions", "/f/profile"];
export default function LabelBottomNavigation({ sideNavItems }) {
  const router = useRouter();
  const [token, setToken] = useToken("token", null);
  const [value, setValue] = React.useState("/f/");

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
        value="/f/cra"
        icon={<AssignmentOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Missions"
        value="/f/missions"
        icon={<AssignmentTurnedInOutlinedIcon />}
      />
      <BottomNavigationAction
        showLabel={false}
        // label="Mon compte"
        value="/f/profile"
        icon={
          <Avatar sx={{ width: 35, height: 35 }}>
            {token && token?.me?.firstName?.charAt(0)}
          </Avatar>
        }
      />
    </BottomNavigation>
  );
}
