import CssBaseline from "@mui/material/CssBaseline";
import { Toolbar, Avatar } from "@mui/material";
import { useUserStore } from "../store/user.store.js";
import { Box, Button, Typography, Divider } from "@mui/material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Logout,
  SpaceDashboardRounded,
  UploadFileRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MiddleC from "./MiddleC";
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
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "#f0f4ff",
            background:
              "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Avatar variant="square" sx={{ bgcolor: "transparent", width: "60px", height: "60px" }}>
            <img
              src="/clarinote.svg"
              alt="ClariNote"
              width="100%"
              height="100%"
            />
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
        <List
          sx={{
            flexGrow: 1,
            "& .MuiListItemIcon-root": { color: "#a0a8c0" },
            "& .MuiListItemText-primary": {
              color: "#b0bcd8",
              fontFamily: "'Courier New', monospace",
              fontSize: "14px",
            },
            "& .MuiListItemButton-root.Mui-selected": {
              background: "rgba(99,179,237,0.1)",
              borderRight: "2px solid #63b3ed",
            },
            "& .MuiListItemButton-root:hover": {
              background: "rgba(255,255,255,0.05)",
            },
          }}
        >
          {["Dashboard", "Upload lecture"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => setActivePage(text)}
                selected={activePage === text}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <SpaceDashboardRounded />
                  ) : (
                    <UploadFileRounded />
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
            startIcon={<Logout />}
            sx={{
              bgcolor: "#212121",
              color: "#fff",
              margin: "12px",
              borderRadius: "8px",
              textTransform: "none",
              width: "80%",
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
        sx={{
          flexGrow: 1,
          background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
          minHeight: "100vh",
          color: "#f0f4ff",
          height: "100vh",
        }}
      >
        <Toolbar sx={{ margin: "30px 15px" }}>{changePage()}</Toolbar>
      </Box>
    </Box>
  );
}
