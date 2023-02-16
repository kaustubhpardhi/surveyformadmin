import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import "./AppBarCustom.css";
import { Button } from "@mui/material";
import DownloadExcelButton from "./DownloadExcelButton";
import logo from "./meerut.jpg";
import bob from "./bob.webp";

const AppBarCustom = ({ sideBar, setSideBar, drawerWidth }) => {
  let user = JSON.parse(localStorage.getItem("user"));

  // AppBar custom style
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const [open, setOpen] = React.useState(false);

  const languages = [
    {
      code: "mr",
      name: "Marathi",
    },
    {
      code: "en",
      name: "English",
    },
    {
      code: "kn",
      name: "Kannada",
    },
  ];
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        open={sideBar}
        component="nav"
        sx={{ background: "white", boxShadow: "none" }}
      >
        <div className="headers">
          <div className="headers-title">
            {user ? (
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setSideBar(!sideBar)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <img
                className="logo"
                // src={logo}
                alt=""
                style={{ maxWidth: "130px", padding: "5px 0" }}
              />
            )}
            <img src={logo} alt="logo"></img>
            <h2>MEERUT NAGAR NIGAM MERCHANT DATABASE ONBORDING</h2>
          </div>
          <div className="bank-logo">
            <img src={bob} alt="bob" className="bob"></img>
          </div>
        </div>

        {/* <img
            src={BOB}
            style={{
              maxWidth: "180px",
              marginLeft: "auto",
              marginTop: "15px",
            }}
            alt="Logo"
          /> */}
      </AppBar>
    </div>
  );
};

export default AppBarCustom;
