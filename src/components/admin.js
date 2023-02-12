import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Box, CircularProgress, IconButton, Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import DownloadExcelButton from "./DownloadExcelButton";
import "./admin.css";
import logo from "./meerut.jpg";

const Admin = () => {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    axios.post("/form/getforms", {}).then((res) => {
      console.log(res.data.packages);
      setForms(res.data.packages);
    });
  }, []);

  return (
    <div className="admin">
      <div className="headers">
        <div className="headers-title">
          <img src={logo} alt="logo"></img>
          <h2>MEERUT NAGAR NIGAM MERCHANT DATABASE ONBORDING</h2>
        </div>
        <div className="excel-button">
          <DownloadExcelButton />
        </div>
      </div>
      <div className="table-title">
        <p>Form Entries 👇</p>
      </div>
      <div className="forms-table">
        <Paper sx={{ width: "100%", borderRadius: 2, ml: 2, mr: 2 }}>
          <TableContainer sx={{}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"> Property Owner Name </TableCell>
                  <TableCell align="center"> Size of Shop(sq.ft) </TableCell>
                  <TableCell align="center"> Zone</TableCell>
                  <TableCell align="center"> Shop Owner Name </TableCell>
                  <TableCell align="center"> Father/husband Name</TableCell>
                  <TableCell align="center"> Email </TableCell>
                  <TableCell align="center"> Shop/Trade Address </TableCell>
                  <TableCell align="center"> Phone Number </TableCell>
                  <TableCell align="center"> Shop/Trade Name </TableCell>
                  <TableCell align="center"> Business Category </TableCell>
                  <TableCell align="center"> How Many Employees? </TableCell>
                  <TableCell align="center"> FSE Code </TableCell>
                  <TableCell align="center"> Occupation </TableCell>
                  <TableCell align="center"> License Available </TableCell>
                  <TableCell align="center"> Qualification </TableCell>
                  <TableCell align="center"> Gender </TableCell>
                  <TableCell align="center"> Since </TableCell>
                  <TableCell align="center"> Ward No. </TableCell>
                  <TableCell align="center"> Lat-Long </TableCell>
                </TableRow>
              </TableHead>
              {
                <TableBody>
                  {forms.map((row, index) => (
                    <TableRow key={row.pawatiNumber} hover role="checkbox">
                      <TableCell align="center">{index} </TableCell>
                      <TableCell align="center"> {row.category} </TableCell>
                      <TableCell align="center"> {row.email} </TableCell>
                      <TableCell align="center"> {row.employees} </TableCell>
                      <TableCell align="center">{row.occupation} </TableCell>
                      <TableCell align="center"> {row.since} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default Admin;