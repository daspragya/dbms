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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Navbar from "./NavbarWarehouse";
import { Link } from "react-router-dom";
import apis from "../../api";

const ListAllDonationsWarehouse = () => {
  const items = [
    {
      id: 1,
      name: "Item 1",
      donor: "Donor 1",
      organization: "Organization 1",
      status: "Donation Placed",
    },
    {
      id: 2,
      name: "Item 2",
      donor: "Donor 2",
      organization: "Organization 2",
      status: "Picked Up",
    },
    {
      id: 3,
      name: "Item 3",
      donor: "Donor 3",
      organization: "Organization 3",
      status: "Reached Warehouse",
    },
    {
      id: 4,
      name: "Item 4",
      donor: "Donor 4",
      organization: "Organization 4",
      status: "Shipped from Warehouse",
    },
    {
      id: 5,
      name: "Item 5",
      donor: "Anonymous",
      organization: "Organization 5",
      status: "Reached Organization",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState({});

  const handleStatusChange = (itemId, newStatus) => {
    // You can update your state or perform any other action here.
    console.log(`Changing status of item ${itemId} to ${newStatus}`);
  };

  const getStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case "Donation Placed":
        return [
          "Donation Placed",
          "Picked Up",
          "Reached Warehouse",
          "Shipped from Warehouse",
        ];
      case "Picked Up":
        return ["Picked Up", "Reached Warehouse", "Shipped from Warehouse"];
      case "Reached Warehouse":
        return ["Reached Warehouse", "Shipped from Warehouse"];
      case "Shipped from Warehouse":
        return ["Shipped from Warehouse"];
      default:
        return [];
    }
  };

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
                  Donor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" mt={2}>
                  Organization
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
                    href={`./ItemDetail?id=${item.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.donor}</TableCell>
                <TableCell>{item.organization}</TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedStatus[item.id] || item.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setSelectedStatus({
                          ...selectedStatus,
                          [item.id]: newStatus,
                        });
                      }}
                    >
                      {getStatusOptions(item.status).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option === "Reached Organization" ? (
                            <Typography variant="body1">{option}</Typography>
                          ) : (
                            option
                          )}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {selectedStatus[item.id] && (
                    <span
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() =>
                        handleStatusChange(item.id, selectedStatus[item.id])
                      }
                    >
                      (Change)
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListAllDonationsWarehouse;
