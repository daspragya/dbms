import React from "react";
import NavBarWarehouse from "./NavbarWarehouse";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getCurrentUser } from "../../api"; // Import the getCurrentUser function
import { Navigate } from "react-router-dom";
import CCImg from "../../assets/CCImg.jpg";
import CCMid from "../../assets/CCMid.jpg";
import CCSides from "../../assets/DonorSides.jpg";

const DashboardWarehouse = () => {
  const user = getCurrentUser();

  if (user && user.role === "warehouse") {
    return (
      <div
        style={{
          backgroundColor: "#d4ecd2",
          backgroundImage: `url(${CCSides})`,
          //height: "100vh",
          backgroundSize: "auto",
          backgroundPosition: "top left",
          backgroundAttachment: "fixed",
        }}
      >
        <NavBarWarehouse />
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
              src={CCImg}
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
              src={CCMid}
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
              Welcome to Share Bite Collection Centers, the heartbeat of local
              impact and community engagement. As a collection center, you play
              a pivotal role in connecting donors with causes that resonate
              close to home. Our platform is your ally in streamlining the
              donation process, ensuring that your center becomes a focal point
              for positive change in your community. Increase your visibility
              and attract socially conscious donors by showcasing your
              initiatives, events, and ongoing projects to a broader audience.
              Share Bite provides a suite of features tailored to support the
              efficient management of incoming donations, from logistics and
              coordination assistance to technology integration for contactless
              contributions. Collaborate with local organizations, businesses,
              and individuals to host joint events that maximize the impact of
              your collections. Join us as a key player in the philanthropic
              ecosystem, where every collection becomes an opportunity to build
              stronger, more resilient communities.
            </Typography>
          </Box>
        </Container>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default DashboardWarehouse;
