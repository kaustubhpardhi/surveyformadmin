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
  const [sjf, setSjf] = useState();
  const [fse, setFse] = useState();
  const [fseCount, setFseCount] = useState(0);
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const zonelist = ["1", "2", "3", "4"];
  // const fsecodelist = ["02", "04", "05", "06", "07", "08"];

  const fsecodelist = [
    "SJF02",
    "SJF04",
    "SJF05",
    "SJF06",
    "SJF07",
    "SJF08",
    "SJF09",
    "SJF10",
    "SJF11",
    "SJF12",
    "SJF13",
    "SJF14",
    "SJF15",
  ];
  console.log(filteredEntries);
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
  useEffect(() => {
    axios.post("/form/getforms", {}).then((res) => {
      console.log(res.data.packages);
      setEntries(res.data.packages);
    });
  }, []);
  const handleDate = () => {
    if (selectedDate) {
      // filter entries by selected date and update state

      const filtered = entries.filter((entry) => {
        const entryDate = new Date(entry.createdAt);
        const selectedDateObj = new Date(selectedDate);
        const fseCode = entry.fse.toUpperCase();
        return (
          entryDate.toDateString() === selectedDateObj.toDateString() &&
          entry.fse.trim().toLowerCase() === sjf.trim().toLowerCase()
        );
      });
      setFilteredEntries(filtered.length);
    }
  };

  const handleZone = () => {
    const postdata = {
      zone: zone,
    };
    axios.post("/form/totalcountward", postdata).then((res) => {
      setZoneCount(res.data.totalforms);
    });
  };

  const handleFse = () => {
    const postdata = {
      fse: fse,
    };
    axios.post("/form/totalcountfse", postdata).then((res) => {
      setFseCount(res.data.totalforms);
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
      <div className="filters">
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
        <div className="ward-feature">
          <FormControl>
            <FormLabel
              sx={{ mb: 1, color: "grey[500]", fontWeight: "600" }}
              htmlFor="for"
            >
              Check Total
              <br />
              FSE Code wise count
            </FormLabel>
            <Select
              id="city"
              placeholder="Choose"
              sx={{ width: "100%" }}
              color="third"
              size="small"
              defaultValue={0}
              value={fse}
              onChange={(e) => setFse(e.target.value)}
            >
              <MenuItem value={0} disabled>
                Choose
              </MenuItem>
              {fsecodelist.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <button onClick={handleFse} className="button-5">
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
                Form Entries In FSE Code
              </Typography>
              <Typography
                sx={{ fontSize: 24, fontWeight: "600" }}
                color={green[600]}
                gutterBottom
              >
                {fseCount}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="filters">
        <div className="ward-feature">
          <div className="date">
            <FormLabel
              sx={{ mb: 1, color: "grey[500]", fontWeight: "600" }}
              htmlFor="for"
            >
              Check FSE Code wise count
              <br />
              on particular date
            </FormLabel>
            <input
              type="date"
              className="date-input"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
            <div className="date-code">
              <FormControl>
                <Select
                  id="city"
                  placeholder="Choose"
                  sx={{ width: "100%" }}
                  color="third"
                  size="small"
                  defaultValue={0}
                  value={sjf}
                  onChange={(e) => setSjf(e.target.value)}
                >
                  <MenuItem value={0} disabled>
                    Choose
                  </MenuItem>
                  {fsecodelist.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <button onClick={handleDate} className="button-5">
                  Filter
                </button>
              </FormControl>
            </div>
          </div>
          <div>
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
                  Form Entries on Date {selectedDate}
                </Typography>
                <Typography
                  sx={{ fontSize: 24, fontWeight: "600" }}
                  color={green[600]}
                  gutterBottom
                >
                  {filteredEntries}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
