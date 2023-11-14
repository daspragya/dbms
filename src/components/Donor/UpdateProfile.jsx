import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, Button, Container } from "@mui/material";
import Alert from "@mui/material/Alert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Navbar from "./DonarNavbar";
import { updateProfile, getUserProfile } from "../../api"; // Import the API functions
import DonorSides from "../../assets/DonorSides.jpg";

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    FName: "",
    LName: "",
    Phone: "",
    dateOfBirth: null,
    Address: "",
  });

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        console.log(response);
        const { FName, LName, Phone, DOB, Address } = response.data;
        console.log(FName, LName, Phone, DOB, Address);
        setProfile({
          FName,
          LName,
          Phone,
          dateOfBirth: new Date(DOB),
          Address,
        });
      })
      .catch((error) => {
        console.error("Error fetching user profile: ", error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleDateOfBirthChange = (date) => {
    setProfile({
      ...profile,
      dateOfBirth: date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedDateOfBirth = profile.dateOfBirth
      ? profile.dateOfBirth.toISOString().split("T")[0]
      : null;

    updateProfile({
      FName: profile.FName,
      LName: profile.LName,
      Phone: profile.Phone,
      dateOfBirth: formattedDateOfBirth,
      Address: profile.Address,
    })
      .then(() => {
        alert("Sucessfully Updated Profile!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${DonorSides})`,
        backgroundRepeat: "repeat",
      }}
    >
      <Navbar />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            marginTop: "20px",
            backgroundColor: "#bee8d3",
            boxShadow: "0px 0px 15px 5px #508276",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "#3a5e56" }}>
            Update Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="FName"
              value={profile.FName}
              onChange={handleChange}
              required
              margin="normal"
              style={{ backgroundColor: "#afe2c8" }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="LName"
              value={profile.LName}
              onChange={handleChange}
              margin="normal"
              style={{ backgroundColor: "#afe2c8" }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="Phone"
              value={profile.Phone}
              onChange={handleChange}
              s
              margin="normal"
              style={{ backgroundColor: "#afe2c8" }}
            />
            <TextField
              fullWidth
              label="Address"
              name="Address"
              value={profile.Address}
              onChange={handleChange}
              multiline // Allow multiline input
              rows={4} // Set the number of rows
              margin="normal"
              style={{ backgroundColor: "#afe2c8" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                inputFormat="MM/dd/yyyy"
                value={dayjs(profile.dateOfBirth)}
                onChange={handleDateOfBirthChange}
                required
                fullWidth
                margin="normal"
                style={{ backgroundColor: "#afe2c8" }}
              />
            </LocalizationProvider>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  marginRight: "10px",
                  backgroundColor: "#508276",
                  color: "#fff",
                }}
              >
                Update Profile
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                style={{
                  marginRight: "10px",
                  backgroundColor: "#EA777A",
                  color: "#fff",
                }}
              >
                Delete Profile
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default UpdateProfile;
