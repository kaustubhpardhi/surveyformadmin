import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "./DownloadExcelButton.css";

import { CSVLink } from "react-csv";
const DownloadExcelButton = () => {
  const filename = "forms";
  const [FormsData, setFormsData] = useState([]);

  const headers = [
    { label: "Timestamp", key: "createdAt" },
    { label: "Property Owner Name", key: "ownerName" },
    { label: "Size of Shop in Sq.ft", key: "size" },
    { label: "Zone", key: "zone" },
    { label: "Shop Owner Name", key: "shopOwner" },
    { label: "Father/Husband Name", key: "fhName" },
    { label: "Email", key: "email" },
    { label: "Shop/Trade Address", key: "shopAddress" },
    { label: "Phone Number", key: "number" },
    { label: "Shop/Trade Name", key: "shopName" },
    { label: "Business Category", key: "category" },
    { label: "How Many Employees", key: "employees" },
    { label: "FSE Code", key: "fse" },
    { label: "Occupation", key: "occupation" },
    { label: "license Available", key: "license" },
    { label: "Qualification", key: "qualification" },
    { label: "Gender", key: "gender" },
    { label: "Since", key: "since" },
    { label: "Ward No 1-90", key: "ward" },
    { label: "LatLong", key: "latlong" },
    { label: "Property Image", key: "url" },
  ];

  useEffect(() => {
    getFormsData();
  }, []);

  const getFormsData = () => {
    axios
      .get("/form/excel")
      .then((res) => {
        console.log(res.data);
        setFormsData(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div className="excel">
      <h2 className="excel-title"> Get Excel File Of Your Form Entries </h2>
      <div>
        <Button variant="contained" color="eighth">
          <CSVLink
            headers={headers}
            data={FormsData}
            filename={filename}
            style={{ textDecoration: "#bc4749 ", color: "white" }}
          >
            Download Forms Excel
          </CSVLink>
        </Button>
      </div>
    </div>
  );
};

export default DownloadExcelButton;
