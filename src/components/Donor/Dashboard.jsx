import React from "react";
import Navbar from "./DonarNavbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getCurrentUser } from "../../api";
import { Navigate } from "react-router-dom";
import DonorImg from "../../assets/DonorImg.jpg";
import donorMid from "../../assets/donorMid.jpg";
import DonorSides from "../../assets/DonorSides.jpg";

const DashboardDonor = () => {
  const user = getCurrentUser();

  if (user && user.role === "donor") {
    return (
      <div
        style={{
          backgroundColor: "#d4ecd2",
          backgroundImage: `url(${DonorSides})`,
          //height: "100vh",
          backgroundSize: "auto",
          backgroundPosition: "top left",
          backgroundAttachment: "fixed",
        }}
      >
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
            <Typography
              variant="h3"
              mt={2}
              style={{ color: "#1f3c28", fontWeight: 800 }}
            >
              Making a Difference Together
            </Typography>
            <Typography variant="h5" mt={2} style={{ color: "#1f3c28" }}>
              Empowering Generosity and Impact
            </Typography>
            <img
              src={DonorImg}
              alt="Centered Image"
              style={{
                maxWidth: "100%",
                width: "800px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px 5px #508276",
                marginTop: "20px",
              }}
            />
            <img
              src={donorMid}
              alt="Centered Image"
              style={{
                maxWidth: "100%",
                width: "800px",
                height: "auto",
                marginTop: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px 5px #508276",
              }}
            />
            <Typography
              variant="body1"
              mt={2}
              style={{
                color: "#1f3c28",
                fontSize: "1rem", // Adjust the font size as needed
                fontWeight: 600, // Adjust the font weight as needed
                lineHeight: "1.6", // Adjust the line height as needed
              }}
            >
              Step into the world of giving at Share Bite, where compassion
              fuels transformative change. As a donor, you are a vital force in
              our mission to create a more compassionate and equitable world.
              Immerse yourself in a diverse tapestry of causes, each
              representing a unique opportunity for impact. Explore the
              narratives of organizations committed to positive change, connect
              with their missions, and seamlessly contribute to the causes that
              resonate with your values. Whether supporting education,
              healthcare, or environmental initiatives, your generosity has the
              power to shape destinies. Join our dynamic community of
              compassionate individuals united by the belief that collective
              giving can forge a brighter future. Every click, every
              contribution, is a step toward building a world where kindness and
              generosity reign.
            </Typography>
          </Box>
        </Container>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default DashboardDonor;
