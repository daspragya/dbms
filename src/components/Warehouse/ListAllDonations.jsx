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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Navbar from "./NavbarWarehouse";
import apis from "../../api";
import OrgSides from "../../assets/DonorSides.jpg";

const steps = ["Donated", "PickedUp", "Shipped", "Delivered"];

const ListAllDonationsWarehouse = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    apis
      .getAllWarehouseItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor items: ", error);
      });
  }, []);

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleUpdateConfirm = () => {
    // Check if the selected item's status is the last in the sequence
    const isLastStatus = selectedItem.Status === "Delivered";

    // Find the index of the current status in the sequence
    const statusIndex = isLastStatus
      ? steps.length - 1 // If it's the last status, use the last index
      : steps.indexOf(selectedItem.Status);

    // If it's not the last status, update to the next in the sequence
    const nextStatus = isLastStatus
      ? selectedItem.Status
      : steps[statusIndex + 1];

    // Call your API to update the status here
    const payload = { status: nextStatus };

    // Use selectedItem.DonTranID to identify the item
    const itemId = selectedItem.DonTranID;

    // For demonstration purposes, let's update the status locally
    apis
      .updateWarehouseItemStatus(itemId, payload)
      .then(() => {
        // If the API call is successful, update the local state
        const updatedItems = items.map((item) => {
          if (item.DonTranID === selectedItem.DonTranID) {
            item.Status = nextStatus; // Update to the next status in the sequence
          }
          return item;
        });

        setItems(updatedItems);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error updating warehouse item status: ", error);
        // Handle the error as needed (e.g., show an error message)
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#daf7e8",
        minHeight: "100vh",
        backgroundImage: `url(${OrgSides})`,
        backgroundRepeat: "repeat",
      }}
    >
      <Navbar />
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#daf7e8",
          boxShadow: "0px 0px 15px 5px #508276",
          margin: "20px",
          width: "205vh",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ borderBottom: "1.4px solid #508276" }}>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  ID
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Donor
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Organization
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 0px", // Adjust left and right padding
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" mt={2} style={{ color: "#3a5e56" }}>
                  Update
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={item.DonTranID}
                style={{ borderBottom: "1.4px solid #508276" }}
              >
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {item.ItemName}
                </TableCell>
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {item.DonorName}
                </TableCell>
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {item.OrgName}
                </TableCell>
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px", // Adjust left and right padding
                    textAlign: "center",
                  }}
                >
                  {item.Status}
                </TableCell>
                <TableCell
                  style={{
                    color: "#508276",
                    padding: "10px 0px 10px 0px",
                    textAlign: "center",
                  }}
                >
                  {item.Status !== "Delivered" && ( // Only show update button if not delivered
                    <Button
                      variant="outlined"
                      onClick={() => handleUpdateClick(item)}
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#508276",
                        color: "#fff",
                      }}
                    >
                      Update
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Status Update?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to update the status of this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListAllDonationsWarehouse;
