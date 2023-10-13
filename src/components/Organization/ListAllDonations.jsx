import React from "react";
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


const ListAllDonationsOrg = ()=> {
  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "Description 1",
      price: 10.99,
      quantity: 12,
      status: "Reached Warehouse",
      date: "12/04/2023",
    },
    {
      id: 2,
      name: "Item 2",
      description: "Description 2",
      price: 15.99,
      quantity: 17,
      status: "Shipped from Warehouse",
      date: "13/05/2023",
    },
  ];

  return (
    <>
      <NavBarOrg />
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
                    to={`/itemdetailorg/${item.id}`}
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
}

export default ListAllDonationsOrg;