import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import {
  blue,
  blueGrey,
  deepOrange,
  green,
  grey,
  yellow,
} from "@mui/material/colors";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import {
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import "./dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [totalFormEntries, setTotalFormEntries] = useState(0);
  const [todaysCount, setTodaysCount] = useState(0);
  const [zoneCount, setZoneCount] = useState(0);

  const [zone, setZone] = useState();
  console.log(zone);
  const zonelist = ["1", "2", "3", "4"];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  useEffect(() => {
    axios.get("/form/totalcount").then((res) => {
      setTotalFormEntries(res.data.totalforms);
    });
  });
  useEffect(() => {
    axios.get("/form/totalcounttoday").then((res) => {
      setTodaysCount(res.data.count);
    });
  }, []);

  const handleZone = () => {
    const postdata = {
      zone: zone,
    };
    axios.post("/form/totalcountward", postdata).then((res) => {
      setZoneCount(res.data.totalforms);
    });
  };

  return (
    <div className="container">
      <div className="dashboard">
        <Card
          sx={{
            boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            borderRadius: "15px",
            p: 2,
            mt: 2,
            width: "15rem",
            height: "10rem",
            className: "totalReceipts",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 18, fontWeight: "600" }}
              color={grey[500]}
              gutterBottom
            >
              Total Form Entries
            </Typography>
            <Typography
              sx={{ fontSize: 24, fontWeight: "bold" }}
              color={green[600]}
              gutterBottom
            >
              {totalFormEntries}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            borderRadius: "15px",
            p: 2,
            mt: 2,
            width: "18rem",
            height: "10rem",
            className: "totalReceipts",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 18, fontWeight: "600" }}
              color={grey[500]}
              gutterBottom
            >
              Today's Form Entries {today}
            </Typography>
            <Typography
              sx={{ fontSize: 24, fontWeight: "bold" }}
              color={green[600]}
              gutterBottom
            >
              {todaysCount}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="ward-feature">
        <FormControl>
          <FormLabel
            sx={{ mb: 1, color: "grey[500]", fontWeight: "600" }}
            htmlFor="for"
          >
            Check zone wise count
          </FormLabel>
          <Select
            id="city"
            placeholder="Choose"
            sx={{ width: "100%" }}
            color="third"
            size="small"
            defaultValue={0}
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          >
            <MenuItem value={0} disabled>
              Choose
            </MenuItem>
            {zonelist.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <button onClick={handleZone} className="button-5">
            Filter
          </button>
        </FormControl>
        <Card
          sx={{
            boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            borderRadius: "15px",
            p: 2,

            width: "15rem",
            height: "10rem",
            className: "zoneCard",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 18, fontWeight: "600" }}
              color={grey[500]}
              gutterBottom
            >
              Form Entries In Zone
            </Typography>
            <Typography
              sx={{ fontSize: 24, fontWeight: "600" }}
              color={green[600]}
              gutterBottom
            >
              {zoneCount}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
