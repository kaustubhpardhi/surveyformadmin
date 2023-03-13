import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import {
  deepOrange,
  lightBlue,
  pink,
  teal,
  yellow,
  blue,
  green,
} from "@mui/material/colors";
import axios from "axios";

const theme = createTheme({
  palette: {
    light: {
      main: "rgb(250, 251, 251)",
      contrastText: "rgb(148, 157, 178)",
    },
    third: {
      main: blue[600],
      contrastText: "#fff",
      dark: lightBlue[500],
      light: lightBlue[100],
    },
    fourth: {
      main: deepOrange[300],
      contrastText: "#fff",
      light: deepOrange[100],
    },
    fifth: {
      main: yellow[600],
      contrastText: "#fff",
      light: yellow[100],
    },
    sixth: {
      main: pink[700],
      contrastText: "#fff",
    },
    seventh: {
      main: teal[400],
      contrastText: "#fff",
    },
    eighth: {
      main: green[600],
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Montserrat,DM Sans, sans-serif",
    fontWeight: "400",
  },
});
axios.defaults.baseURL = "https://brv7qd.deta.dev";
//axios.defaults.baseURL = "http://localhost:8081";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
