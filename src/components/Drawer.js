import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import AppBarCustom from "./AppBarCustom";
import DrawerListItem from "./DrawerListItem";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
// import "./Drawer.css";

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
            {/* <img src={logo} className="imgLogo" alt="" /> */}
          </Box>
          {/* <NavLink className="navLink" to="/billing">
            <DrawerListItem text={t("receipt")} icon={<ReceiptLongIcon />} />
          </NavLink>
          <NavLink className="navLink" to="/receipt-management">
            <DrawerListItem text={t("receipt-m")} icon={<ListAltIcon />} />
          </NavLink>
          <NavLink className="navLink" to="/account">
            <DrawerListItem text={t("account")} icon={<AccountBoxIcon />} />
          </NavLink>
          <NavLink className="navLink" to="/download-receipt">
            <DrawerListItem text={t("receipt-d")} icon={<FileDownloadIcon />} />
          </NavLink> */}

          <div style={{ marginTop: "auto", textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              color="eighth"
              sx={{ textTransform: "capitalize", px: 5, mb: 2 }}
            >
              {/* <LogoutIcon sx={{ mr: 2 }} /> {t("logout")} */}
            </Button>
          </div>
        </List>
      </Drawer>
    </Box>
  );
}
