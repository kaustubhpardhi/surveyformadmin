import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./meerut.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState(false);

  const [userData] = useState({
    id: "admin",
    password: "123",
  });

  // localStorage
  let user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, change, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (userData.id !== id) {
      return alert("User not found");
    }
    if (userData.password !== password) {
      return alert("User and password doesn't match");
    }
    localStorage.setItem("user", true);
    setChange(!change);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "9999",
        backgroundColor: "#fafbfb",
      }}
    >
      <Box sx={{ my: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1.5fr", xs: "1fr" },
            gap: 2,
            maxWidth: "700px",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            overflow: "hidden",
          }}
        >
          <div className="login-img">
            <img src={logo} className="logo" alt="loginImage" />
          </div>
          <div>
            <Box component="form" onSubmit={submitHandler}>
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "eighth.main",
                  }}
                >
                  Admin Login{" "}
                </Typography>

                <FormControl sx={{ display: "block", my: 2 }}>
                  <TextField
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    fullWidth
                    id="id"
                    color="eighth"
                    size="small"
                    placeholder="Username"
                  />
                </FormControl>
                <FormControl sx={{ display: "block", my: 2 }}>
                  <TextField
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    id="password"
                    color="eighth"
                    size="small"
                    type="password"
                    placeholder="Password"
                  />
                </FormControl>

                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ px: 6, textTransform: "capitalize" }}
                    type="submit"
                    color="eighth"
                    disableElevation
                  >
                    {" "}
                    Login
                  </Button>
                </Box>
              </Box>
            </Box>
          </div>
        </Box>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography
            paragraph
            sx={{ color: "eighth.main", mb: 0 }}
          ></Typography>
          {/* <img src={bob} style={{ maxWidth: "200px" }} alt="logo" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
