import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import "./DrawerListItem.css";

const DrawerListItem = ({ text, icon }) => {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: "35px" }}>{icon}</ListItemIcon>
        <ListItemText primary={text} className="text" />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerListItem;
