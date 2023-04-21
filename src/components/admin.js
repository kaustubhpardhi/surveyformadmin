// import React, { useEffect, useState, memo } from "react";
// import { useNavigate } from "react-router-dom";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import axios from "axios";
// import { Box, CircularProgress, IconButton, Button } from "@mui/material";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
// import DownloadExcelButton from "./DownloadExcelButton";
// import "./admin.css";
// import logo from "./meerut.jpg";
// import bob from "./bob.webp";
// const Admin = () => {
//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState([true]);
//   useEffect(() => {
//     axios.post("/form/getforms", {}).then((res) => {
//       console.log(res.data.data);
//       setForms(res.data.data);
//       setLoading(false);
//     });
//   }, []);
//   console.log(forms);
//   if (loading) {
//     return (
//       <div className="screenCenter">
//         <CircularProgress color="success" />
//       </div>
//     );
//   }
//   return (
//     <div className="admin">
//       <div className="table-title">
//         <p>Form Entries 👇</p>
//       </div>

//       <div className="forms-table">
//         <Paper sx={{ width: "100%", borderRadius: 2, ml: 2, mr: 2 }}>
//           <TableContainer sx={{}}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center"> Property Owner Name </TableCell>
//                   <TableCell align="center"> Size of Shop(sq.ft) </TableCell>
//                   <TableCell align="center"> Zone</TableCell>
//                   <TableCell align="center"> Shop Owner Name </TableCell>
//                   <TableCell align="center"> Father/husband Name</TableCell>
//                   <TableCell align="center"> Email </TableCell>
//                   <TableCell align="center"> Shop/Trade Address </TableCell>
//                   <TableCell align="center"> Phone Number </TableCell>
//                   <TableCell align="center"> Shop/Trade Name </TableCell>
//                   <TableCell align="center"> Business Category </TableCell>
//                   <TableCell align="center"> How Many Employees? </TableCell>
//                   <TableCell align="center"> FSE Code </TableCell>
//                   <TableCell align="center"> Occupation </TableCell>
//                   <TableCell align="center"> License Available </TableCell>
//                   <TableCell align="center"> Qualification </TableCell>
//                   <TableCell align="center"> Gender </TableCell>
//                   <TableCell align="center"> Since </TableCell>
//                   <TableCell align="center"> Ward No. </TableCell>
//                   <TableCell align="center"> Lat-Long </TableCell>
//                   <TableCell align="center"> Property Image </TableCell>
//                 </TableRow>
//               </TableHead>
//               {
//                 <TableBody>
//                   {forms &&
//                     forms.map((row, index) => (
//                       <TableRow key={row.pawatiNumber} hover role="checkbox">
//                         <TableCell align="center">{row.ownerName} </TableCell>
//                         <TableCell align="center"> {row.size} </TableCell>
//                         <TableCell align="center"> {row.zone} </TableCell>
//                         <TableCell align="center"> {row.shopOwner} </TableCell>
//                         <TableCell align="center">{row.fhName} </TableCell>
//                         <TableCell align="center"> {row.email} </TableCell>
//                         <TableCell align="center"> {row.shopName} </TableCell>
//                         <TableCell align="center"> {row.number} </TableCell>
//                         <TableCell align="center"> {row.shopName} </TableCell>
//                         <TableCell align="center"> {row.category} </TableCell>
//                         <TableCell align="center"> {row.employees} </TableCell>
//                         <TableCell align="center"> {row.fse} </TableCell>
//                         <TableCell align="center"> {row.occupation} </TableCell>
//                         <TableCell align="center"> {row.license} </TableCell>
//                         <TableCell align="center">
//                           {" "}
//                           {row.qualification}{" "}
//                         </TableCell>
//                         <TableCell align="center"> {row.gender} </TableCell>
//                         <TableCell align="center"> {row.since} </TableCell>
//                         <TableCell align="center"> {row.ward} </TableCell>
//                         <TableCell align="center"> {row.latlong} </TableCell>
//                         <TableCell align="center">
//                           <a
//                             href={row.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             {row.url}
//                           </a>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               }
//             </Table>
//           </TableContainer>
//         </Paper>
//       </div>
//     </div>
//   );
// };

// export default Admin;
import React, { useEffect, useState, memo, useRef } from "react";
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
import bob from "./bob.webp";

const ROWS_PER_PAGE = 10;

const Admin = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const tableEndRef = useRef(null);

  useEffect(() => {
    axios.post("/form/getforms", {}).then((res) => {
      console.log(res.data);
      setForms(res.data.data);
      setLoading(false);
    });
  }, []);

  const loadMoreRows = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (tableEndRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreRows();
        }
      });
      observer.observe(tableEndRef.current);
      return () => observer.disconnect();
    }
  }, [tableEndRef]);

  const paginatedRows = forms.slice(0, (currentPage + 1) * ROWS_PER_PAGE);

  return (
    <div className="admin">
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
                  <TableCell align="center"> Property Image </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{row.ownerName}</TableCell>
                    <TableCell align="center">{row.size}</TableCell>
                    <TableCell align="center">{row.zone}</TableCell>
                    <TableCell align="center">{row.shopOwner}</TableCell>
                    <TableCell align="center">{row.fhName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.shopAddress}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    <TableCell align="center">{row.shopName}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.employees}</TableCell>
                    <TableCell align="center">{row.fse}</TableCell>
                    <TableCell align="center">{row.occupation}</TableCell>
                    <TableCell align="center">{row.license}</TableCell>
                    <TableCell align="center">{row.qualification}</TableCell>
                    <TableCell align="center">{row.gender}</TableCell>
                    <TableCell align="center">{row.since}</TableCell>
                    <TableCell align="center"> {row.ward} </TableCell>
                    <TableCell align="center"> {row.latlong} </TableCell>
                    <TableCell align="center">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.url}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {loading && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
            >
              <CircularProgress color="success" />
            </Box>
          )}
          {!loading && paginatedRows.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
            >
              <p>No data found.</p>
            </Box>
          )}
          <div ref={tableEndRef}></div>
        </Paper>
      </div>
    </div>
  );
};

export default memo(Admin);
