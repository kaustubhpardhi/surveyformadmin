import "./App.css";
import Login from "./components/login";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/admin";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Box } from "@mui/material";
import Drawer from "./components/Drawer";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import DownloadExcelButton from "./components/DownloadExcelButton";
import Surveyor from "./components/surveyor";
const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
function App() {
  const [sideBar, setSideBar] = useState(false);
  const [receipt, setReceipt] = useState({});
  return (
    <div className="App">
      <Box sx={{ mt: 5 }}>
        <div style={{ display: "flex" }}>
          <Drawer
            sideBar={sideBar}
            setSideBar={setSideBar}
            drawerWidth={drawerWidth}
          />
          <Main open={sideBar} sx={{ pb: 0, pt: 4 }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <Admin />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/excel"
                element={
                  <RequireAuth>
                    <DownloadExcelButton />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/surveyor" element={<Surveyor />} />
            </Routes>
          </Main>
        </div>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
