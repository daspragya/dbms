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
import Navbar from "./DonarNavbar";
import { Link } from "react-router-dom";
import apis from "../../api"; // Import the getDonorItems function

const ListAllDonations = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch donor items when the component mounts
    apis
      .getAllDonorItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor items: ", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" mt={2}>
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" mt={2}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" mt={2}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" mt={2}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Link
                    to={`/itemdetail/${item.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListAllDonations;
