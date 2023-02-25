import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import AppBarCustom from "./AppBarCustom";
import DrawerListItem from "./DrawerListItem";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
// import "./Drawer.css";
import logo from "./meerut.jpg";

// navigate

export default function PersistentDrawerLeft({
  sideBar,
  setSideBar,
  drawerWidth,
}) {
  const navigate = useNavigate();
  // log out handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box>
      <CssBaseline />
      <AppBarCustom
        sideBar={sideBar}
        setSideBar={setSideBar}
        drawerWidth={drawerWidth}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={sideBar}
      >
        {/* <DrawerHeader /> */}
        <List sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ px: 5, pt: 4 }}>
            <img src={logo} className="imgLogo" alt="" />
          </Box>

          <NavLink
            style={{
              textDecoration: "none",
            }}
            className="navLink"
            to="/admin"
          >
            <DrawerListItem text="Home" icon={<HomeIcon />} />
          </NavLink>

          <NavLink
            style={{
              textDecoration: "none",
            }}
            className="navLink"
            to="/dashboard"
          >
            <DrawerListItem text="Dashboard" icon={<AccountBoxIcon />} />
          </NavLink>
          <NavLink
            style={{
              textDecoration: "none",
            }}
            className="navLink"
            to="/excel"
          >
            <DrawerListItem text="Download Excel" icon={<FileDownloadIcon />} />
          </NavLink>
          {/* <NavLink
            style={{
              textDecoration: "none",
            }}
            className="navLink"
            to="/surveyor"
          >
            <DrawerListItem
              text="Surveyor Registration"
              icon={<FileDownloadIcon />}
            />
          </NavLink> */}
          <div style={{ marginTop: "auto", textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              color="eighth"
              sx={{
                textTransform: "capitalize",
                px: 5,
                mb: 2,
                fontFamily: "Montserrat",
              }}
            >
              <LogoutIcon sx={{ mr: 2 }} /> Logout
            </Button>
          </div>
        </List>
      </Drawer>
    </Box>
  );
}
