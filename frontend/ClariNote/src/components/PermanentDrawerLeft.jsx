import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useUserStore } from "../store/User.store";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import MiddleC from "./middleC";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadLecture from "../pages/UploadLecture";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const userStore = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");

  const changePage = () => {
    switch (activePage) {
      case "Dashboard":
        return <MiddleC />;
      case "Upload lecture":
        return <UploadLecture />;
      default:
        <MiddleC />;
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Avatar variant="square" sx={{ bgcolor: "#212121" }}>
            AI
          </Avatar>
          <Typography
            sx={{
              fontFamily: "bricolage grotesque, sans-serif",
              fontSize: "15px",
              fontWeight: "500",
              marginLeft: "10px",
            }}
          >
            Lecture summarizer
          </Typography>
        </Toolbar>
        <Toolbar>
          <Avatar sx={{ bgcolor: "#212121" }}>
            {/* {user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}{" "}
            // ✅ auto initials from name */}
          </Avatar>
          <Typography
            sx={{
              marginLeft: "10px",
              fontFamily: "bricolage grotesque, sans-serif",
              fontWeight: "500",
            }}
          >
            {userStore?.name}
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ flexGrow: 1 }}>
          {["Dashboard", "Upload lecture"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => setActivePage(text)}
                selected={activePage === text}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <SpaceDashboardRoundedIcon />
                  ) : (
                    <UploadFileRoundedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <form onSubmit={handleLogout}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<LogoutIcon />}
            sx={{
              bgcolor: "#212121",
              color: "#fff",
              margin: "12px",
              borderRadius: "8px",
              width: "80%",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#424242",
              },
            }}
          >
            Logout
          </Button>
        </form>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar>{changePage()}</Toolbar>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar>
          <Typography
          variant="h5"
            sx={{
              marginLeft: "10px",
              fontFamily: "bricolage grotesque, sans-serif",
            }}
          >
            PDF file
          </Typography>
        </Toolbar>
      </Box>
    </Box>
  );
}
