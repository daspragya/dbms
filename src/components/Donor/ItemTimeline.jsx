import React from "react";
import {
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Navbar from "./DonarNavbar";

const items = [
  {
    id: 1,
    name: "Item 1",
    description: "Description 1",
    price: 10.99,
    quantity: 12,
    status: "Reached Warehouse",
  },
  {
    id: 2,
    name: "Item 2",
    description: "Description 2",
    price: 15.99,
    quantity: 17,
    status: "Shipped from Warehouse",
  },
];

const ItemTimeline = ({ itemId })=> {
  // Define the possible steps in your timeline
  const steps = [
    "Donation Placed",
    "Picked Up",
    "Reached Warehouse",
    "Shipped from Warehouse",
    "Reached Organization",
  ];
  const item = items.find((item) => item.id === parseInt(itemId, 10));
  const currentStepIndex = steps.indexOf(item.status);

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            <strong>Donation Timeline</strong>
          </Typography>
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="h6">Current Step: {item.status}</Typography>
          </div>
          <Stepper activeStep={currentStepIndex} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* Display item details */}
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Item Details</strong>
            </Typography>
            <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
              <strong>Name:</strong> {item.name}
            </Typography>
            <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
              <strong>Description:</strong> {item.description}
            </Typography>
            <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
              <strong>Quantity:</strong> {item.quantity}
            </Typography>
            <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
              <strong>Price:</strong> ${item.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
              <strong>Expiration Date:</strong> {item.expirationDate}
            </Typography>
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default ItemTimeline