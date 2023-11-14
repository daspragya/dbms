import React, { useState, useEffect } from "react";
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
import DonorSides from "../../assets/DonorSides.jpg";

import dayjs from "dayjs";
import {
  addDonorItem,
  getOrgNames,
  getCCAddress,
  getItemDetails,
  getFName,
} from "../../api";
import { useNavigate } from "react-router-dom";

export default function MakeNewDonation() {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    ItemName: "",
    quantity: "",
    expirationDate: null,
    dropLocation: "",
    OrgName: "",
    anonymousDonation: false,
  });
  const [qty, setQuantity] = useState();
  const [orgNames, setOrgNames] = useState([]);
  const [ccAddresses, setCcAddresses] = useState([]);
  const [allDonorItems, setAllDonorItems] = useState([]);
  const [selectedItemDetails, setSelectedItemDetails] = useState({
    ItemDesc: "",
    ItemColor: "",
    Weight: "",
  });
  const [donorFirstName, setDonorFirstName] = useState("");

  useEffect(() => {
    getFName()
      .then((res) => {
        setDonorFirstName(res.data.FName);
        if (!res.data.FName) {
          showUpdateProfileAlert();
        }
      })
      .catch((error) =>
        console.error("Error fetching donor's first name:", error)
      );

    getOrgNames()
      .then((res) => setOrgNames(res.data.orgNames))
      .catch((error) =>
        console.error("Error fetching organization names:", error)
      );

    getCCAddress()
      .then((res) => setCcAddresses(res.data.ccAddresses))
      .catch((error) => console.error("Error fetching CC addresses:", error));

    getItemDetails()
      .then((res) => {
        setAllDonorItems(res.data.itemDetails);
      })
      .catch((error) => console.error("Error fetching donor items:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const selectedItem = allDonorItems.find(
      (donorItem) => donorItem.ItemName === value
    );

    setItem({
      ...item,
      ItemName: value,
    });

    setSelectedItemDetails({
      ItemDesc: selectedItem?.ItemDesc || "",
      ItemColor: selectedItem?.ItemColor || "",
      Weight: selectedItem?.Weight || "",
    });
  };

  const handleQuantityChange = (event) => {
    if (event.target.value > 0) {
      setItem({
        ...item,
        quantity: event.target.value,
      });
    }
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

  const handleOrganizationChange = (event) => {
    setItem({
      ...item,
      OrgName: event.target.value,
    });
  };

  const handleAnonymousDonationChange = (event) => {
    if (!donorFirstName) {
      event.preventDefault();
      showUpdateProfileAlert();
    } else {
      setItem({
        ...item,
        anonymousDonation: event.target.checked,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedDate = item.expirationDate
      ? dayjs(item.expirationDate).format("YYYY-MM-DD")
      : null;
    item.expirationDate = formattedDate;

    addDonorItem(item)
      .then(() => {
        alert("Donation submitted successfully.");
        setItem({
          ItemName: "",
          quantity: "",
          expirationDate: null,
          dropLocation: "",
          OrgName: "",
          anonymousDonation: false,
        });
        navigate("/listalldonations");
      })
      .catch((error) => {
        console.error("Error submitting donation:", error);
      });
  };

  const showUpdateProfileAlert = () => {
    const result = window.confirm(
      "Profile page not updated! Your donation will be anonymous. Do you want to update your profile now?"
    );

    if (result) {
      navigate("/profile");
    } else {
      setItem({
        ...item,
        anonymousDonation: true,
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${DonorSides})`,
        backgroundRepeat: "repeat",
      }}
    >
      <NavBar />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            marginTop: "20px",
            backgroundColor: "#afe2c8",
            boxShadow: "0px 0px 15px 5px #508276",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "#3a5e56" }}>
            Create Donation
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Item Name"
              name="name"
              select
              value={item.ItemName}
              onChange={handleChange}
              required
              margin="normal"
              style={{ backgroundColor: "#bee8d3" }}
            >
              {allDonorItems.map((donorItem) => (
                <MenuItem key={donorItem.ItemName} value={donorItem.ItemName}>
                  {donorItem.ItemName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Item Description"
              name="desc"
              value={selectedItemDetails.ItemDesc}
              margin="normal"
              style={{ backgroundColor: "#bee8d3" }}
            />
            <TextField
              fullWidth
              label="Item Color"
              name="color"
              value={selectedItemDetails.ItemColor}
              margin="normal"
              style={{ backgroundColor: "#bee8d3" }}
            />
            <TextField
              fullWidth
              label="Max Item Weight"
              name="desc"
              value={selectedItemDetails.Weight}
              margin="normal"
              style={{ backgroundColor: "#bee8d3" }}
            />
            <TextField
              fullWidth
              label="Item Quantity"
              name="quantity"
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              required
              margin="normal"
              style={{ backgroundColor: "#bee8d3" }}
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
                style={{ backgroundColor: "#bee8d3" }}
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
              style={{ backgroundColor: "#bee8d3" }}
            >
              {ccAddresses.map((address) => (
                <MenuItem key={address} value={address}>
                  {address}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Organization"
              name="OrgName"
              select
              value={item.OrgName}
              onChange={handleOrganizationChange}
              required
              margin="normal"
              style={{ backgroundColor: "#bee8d3" }}
            >
              {orgNames.map((orgName) => (
                <MenuItem key={orgName} value={orgName}>
                  {orgName}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.anonymousDonation}
                  onChange={handleAnonymousDonationChange}
                  name="anonymousDonation"
                  style={{ color: "#508276" }} // Set the color to green when checked
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
                style={{
                  marginRight: "10px",
                  backgroundColor: "#508276",
                  color: "#fff",
                }}
              >
                Make Donation
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel? Your changes will not be saved."
                    )
                  ) {
                    setItem({
                      ItemName: "",
                      quantity: "",
                      expirationDate: null,
                      dropLocation: "",
                      OrgName: "",
                      anonymousDonation: false,
                    });
                  }
                }}
                style={{ color: "#3a5e56", borderColor: "#508276" }}
              >
                Cancel Donation
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
