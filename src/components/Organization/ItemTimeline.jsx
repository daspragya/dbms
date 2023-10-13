import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Navbar from "./NavbarOrganization";
import apis from "../../api";

function isBoolean(value) {
  return typeof value === "boolean";
}

export default function ItemTimeline({ itemId }) {
  const [item, setItem] = useState(null);
  // Define the possible steps in your timeline
  const steps = [
    "Donation Placed",
    "Picked Up",
    "Reached Warehouse",
    "Shipped from Warehouse",
    "Reached Organization",
  ];
  useEffect(() => {
    apis
      .getOrgItemById(itemId)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item details: ", error);
      });
  }, [itemId]);
  if (!item) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            <strong>Loading...</strong>
          </Typography>
        </Paper>
      </Container>
    );
  }

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
              <strong>Expiration Date:</strong> {item.expirationDate}
            </Typography>
            <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
              <strong>Donor:</strong>{" "}
              {isBoolean(item.anonymousDonation)
                ? "Anonymous"
                : item.anonymousDonation}
            </Typography>
          </div>
        </Paper>
      </Container>
    </>
  );
}
