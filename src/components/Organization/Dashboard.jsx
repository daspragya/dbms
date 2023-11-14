import React from "react";
import NavBarOrg from "./NavbarOrganization";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getCurrentUser } from "../../api"; // Import the getCurrentUser function
import { Navigate } from "react-router-dom";
import OrgImg from "../../assets/OrgImg.jpg";
import OrgMid from "../../assets/OrgMid.jpg";
import OrgSides from "../../assets/DonorSides.jpg";

const DashboardOrganization = () => {
  const user = getCurrentUser();

  if (user && user.role === "org") {
    return (
      <div
        style={{
          backgroundColor: "#d4ecd2",
          backgroundImage: `url(${OrgSides})`,
          //height: "100vh",
          backgroundSize: "auto",
          backgroundPosition: "top left",
          backgroundAttachment: "fixed",
        }}
      >
        <NavBarOrg />
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
              src={OrgImg}
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
              src={OrgMid}
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
              Welcome to Share Bite Organizations, the cornerstone of a
              collaborative journey toward positive change. If you're a
              non-profit, charity, or community initiative, our platform is your
              launchpad for impact. Elevate your organization's visibility and
              engage with a vibrant community of socially conscious donors eager
              to support causes that matter. Tell your story, share your
              mission, and showcase ongoing projects with a global audience.
              Share Bite simplifies the donation process, providing your
              organization with the tools to focus on what truly matters – your
              mission. From real-time project updates that foster transparency
              to targeted fundraising campaigns that rally support, our platform
              is designed to amplify your impact. Join us in creating a world
              where organizations have the resources and visibility to make a
              lasting difference.
            </Typography>
          </Box>
        </Container>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default DashboardOrganization;
