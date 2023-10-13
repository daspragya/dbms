import React from "react";
import Navbar from "./DonarNavbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getCurrentUser } from "../../api"; // Import the getCurrentUser function
import { Navigate } from "react-router-dom";

const DashboardDonor = () => {
  const user = getCurrentUser();

  if (user && user.role === "donor") {
    return (
      <>
        <Navbar />
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="90vh"
            textAlign="center"
          >
            <Typography variant="h3" mt={2}>
              Making a Difference Together
            </Typography>
            <Typography variant="h5" mt={2}>
              Empowering Generosity and Impact
            </Typography>
            <img
              src={"https://source.unsplash.com/random?wallpapers"}
              alt="Centered Image"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
            <Typography variant="body1" mt={2}>
              We are a team of dedicated individuals committed to making the
              world a better place. Our purpose was born out of a simple idea:
              to bridge the gap between those who want to help and those who
              need it most. With a focus on transparency and efficiency, we're
              here to inspire change and empower communities.
            </Typography>
          </Box>
        </Container>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default DashboardDonor;
