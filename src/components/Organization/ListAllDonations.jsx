import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import NavBarOrg from "./NavbarOrganization";
import { Link } from "react-router-dom";
import apis from "../../api";
import OrgSides from "../../assets/DonorSides.jpg";

const ListAllDonationsOrg = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    apis
      .getAllOrgItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor items: ", error);
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#daf7e8",
        minHeight: "100vh",
        backgroundImage: `url(${OrgSides})`, // Set the background image
        backgroundRepeat: "repeat", // Make the background image repeat
      }}
    >
      <NavBarOrg />
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#daf7e8",
          boxShadow: "0px 0px 15px 5px #508276", // Add 3D shadow effect
          margin: "20px", // Add margin for spacing
          width: "205vh", // Set the width to 80vh
          overflowX: "auto", // Add horizontal scrollbar if necessary
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ borderBottom: "1.4px solid #508276" }}>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  ID
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Description
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={item.DonTranID}
                style={{ borderBottom: "1.4px solid #508276" }}
              >
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  style={{
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  <Link
                    to={`/itemdetailorg/${item.DonTranID}`}
                    style={{
                      textDecoration: "none",
                      color: "#508276",
                      fontWeight: 700,
                    }}
                  >
                    {item.ItemName}
                  </Link>
                </TableCell>
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {item.ItemDesc}
                </TableCell>
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {item.Status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListAllDonationsOrg;
