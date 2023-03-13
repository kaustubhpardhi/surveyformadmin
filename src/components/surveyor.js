import "./surveyor.css";
import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState, memo } from "react";
import FormInput from "./FormInput";
import axios from "axios";

const Surveyor = () => {
  const [surveyorName, setSurveyorName] = useState();
  const [surveyorId, setSurveyorId] = useState();
  const [surveyorPass, setSurveyorPass] = useState();

  const handleForm = async (event) => {
    event.preventDefault();

    if (!surveyorName) {
      return alert("Surveyor Name Not Entered");
    }
    if (!surveyorId) {
      return alert("Surveyor ID Not Entered");
    }
    if (!surveyorPass) {
      return alert("Surveyor Password Not Entered");
    }

    const postdata = {
      surveyorName,
      surveyorId,
      surveyorPass,
    };

    try {
      const response = await axios.post("/surveyor/addsurveyor", postdata);
      const message = response.data.message;
      alert(message);
    } catch (error) {
      console.log(error);
      alert("Surveyor Registration Failed");
    }
  };
  const resetForm = () => {
    setSurveyorName("");
    setSurveyorId("");
    setSurveyorPass("");
  };
  return (
    <div className="surveyor">
      <Box mb={2} className="logo-title">
        <Typography
          variant="h1"
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            mt: 4,
            ml: 0,
            color: "green",
          }}
          gutterBottom
        >
          Surveyor Registration
        </Typography>
        <Box />
        <Box
          component="form"
          onSubmit={handleForm}
          sx={{
            backgroundColor: "#fff",
            boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            px: 3,
            py: 2,
            ml: 0,
            mr: 2,
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr ", sm: "1fr 1fr" },
              gap: 1.2,
              mb: 2,
            }}
          >
            <FormInput
              value={surveyorName}
              onChange={setSurveyorName}
              label="Surveyor Name"
              id="name"
              placeholder=""
              type="text"
              disabled={false}
              required={true}
            />
            <FormInput
              value={surveyorId}
              onChange={setSurveyorId}
              label="Surveyor ID"
              id="name"
              placeholder=""
              type="text"
              disabled={false}
              required={true}
            />
            <FormInput
              value={surveyorPass}
              onChange={setSurveyorPass}
              label="Surveyor Password"
              id="name"
              placeholder=""
              type="text"
              disabled={false}
              required={true}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                mr: 2,
                textTransform: "capitalize",
                width: "120px",
                fontSize: "15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
              type="submit"
              color="eighth"
              disableElevation
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Surveyor;
