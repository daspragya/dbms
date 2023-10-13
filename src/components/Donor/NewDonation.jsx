import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import NavBar from "./DonarNavbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { addDonorItem } from "../../api"; // Import the API function for adding a donor item
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

export default function MakeNewDonation() {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    description: "",
    quantity: "",
    expirationDate: null,
    dropLocation: "",
    anonymousDonation: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "quantity" && parseFloat(value) < 0) {
      return;
    }
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleExpirationDateChange = (date) => {
    setItem({
      ...item,
      expirationDate: date,
    });
  };

  const handleDropLocationChange = (event) => {
    setItem({
      ...item,
      dropLocation: event.target.value,
    });
  };

  const handleAnonymousDonationChange = (event) => {
    setItem({
      ...item,
      anonymousDonation: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the API to add the donor item
    addDonorItem(item)
      .then(() => {
        console.log("Donation submitted successfully.");
        // Reset the form after submission
        setItem({
          name: "",
          description: "",
          quantity: "",
          expirationDate: null,
          dropLocation: "",
          anonymousDonation: false,
        });
        // Navigate to the ListAllDonations page upon success
        navigate("/listalldonations");
      })
      .catch((error) => {
        console.error("Error submitting donation:", error);
      });
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Create Donation
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Item Name"
              name="name"
              value={item.name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={item.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Item Quantity"
              name="quantity"
              type="number"
              value={item.quantity}
              onChange={handleChange}
              required
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expiration Date"
                inputFormat="MM/dd/yyyy"
                value={item.expirationDate}
                onChange={handleExpirationDateChange}
                required
                fullWidth
                margin="normal"
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Drop Location"
              name="dropLocation"
              select
              value={item.dropLocation}
              onChange={handleDropLocationChange}
              required
              margin="normal"
            >
              <MenuItem value="Location 1">Location 1</MenuItem>
              <MenuItem value="Location 2">Location 2</MenuItem>
              <MenuItem value="Location 3">Location 3</MenuItem>
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.anonymousDonation}
                  onChange={handleAnonymousDonationChange}
                  name="anonymousDonation"
                />
              }
              label="Anonymous Donation"
              style={{ marginTop: "10px" }}
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Make Donation
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  if (window.confirm("Are you sure you want to cancel?")) {
                    // Reset the form if confirmed
                    setItem({
                      name: "",
                      description: "",
                      quantity: "",
                      expirationDate: null,
                      dropLocation: "",
                      anonymousDonation: false,
                    });
                  }
                }}
              >
                Cancel Donation
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
}
