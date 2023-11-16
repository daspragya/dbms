const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const db = require("./db");

const secretKey = "yourSecretKey"; // Replace with a strong, secret key

const signup = (req, res) => {
  const { email, password } = req.body;

  // Check if a user with the same email already exists in the donor table
  db.query(
    "SELECT DID FROM donor WHERE Email = ? UNION ALL SELECT OrgID FROM organization WHERE OrgEmail = ? UNION ALL SELECT CCID FROM collectioncenter WHERE CCEmail = ?",
    [email, email, email],
    (err, results) => {
      if (err) {
        console.error("Error executing query: " + err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Account with this email already exists. Please log in.",
        });
      } else {
        // Find the latest DID
        db.query("SELECT MAX(DID) AS maxDID FROM donor", (err, maxResult) => {
          if (err) {
            console.error("Error executing query: " + err);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          const maxDID = maxResult[0].maxDID || 0;
          const newDID = maxDID + 1;

          // Generate a new donor user
          const newUser = {
            DID: newDID,
            email,
            password,
          };

          // Insert the new user into the donor table
          db.query("INSERT INTO donor SET ?", newUser, (err, insertResult) => {
            if (err) {
              console.error("Error executing query: " + err);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            // Generate a JWT token for the new user
            const token = jwt.sign(
              {
                id: newDID,
                role: "donor",
              },
              secretKey,
              {
                expiresIn: "1h",
              }
            );

            const response = {
              success: true,
              message: "Signup successful",
              accessToken: token,
              id: newDID,
              email: email,
              role: "donor",
            };

            res.status(201).json(response);
          });
        });
      }
    }
  );
};

const signin = (req, res) => {
  const { email, password } = req.body;
  let user = null;

  const queryDonor = () => {
    db.query(
      "SELECT DID, FName AS username, Email, 'donor' AS role FROM donor WHERE Email = ? AND Password = ?",
      [email, password],
      (err, donorResults) => {
        if (err) {
          console.error("Error executing query: " + err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (donorResults.length > 0) {
          user = donorResults[0];
          generateTokenAndRespond(user);
        } else {
          queryOrganization();
        }
      }
    );
  };

  const queryOrganization = () => {
    db.query(
      "SELECT OrgID, OrgName AS username, OrgEmail AS Email, 'org' AS role FROM organization WHERE OrgEmail = ? AND OrgPassword = ?",
      [email, password],
      (err, orgResults) => {
        if (err) {
          console.error("Error executing query: " + err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (orgResults.length > 0) {
          user = orgResults[0];
          generateTokenAndRespond(user);
        } else {
          queryCollectionCenter();
        }
      }
    );
  };

  const queryCollectionCenter = () => {
    db.query(
      "SELECT CCID, CCName AS username, CCEmail AS Email, 'warehouse' AS role FROM collectioncenter WHERE CCEmail = ? AND CCPassword = ?",
      [email, password],
      (err, ccResults) => {
        if (err) {
          console.error("Error executing query: " + err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (ccResults.length > 0) {
          user = ccResults[0];
          generateTokenAndRespond(user);
        } else {
          res.status(401).json({
            success: false,
            message: "Login failed. Please check your credentials.",
          });
        }
      }
    );
  };

  const generateTokenAndRespond = (user) => {
    const token = jwt.sign(
      {
        id: user.DID || user.OrgID || user.CCID,
        role: user.role,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    const response = {
      success: true,
      message: "Login successful",
      accessToken: token,
      id: user.DID || user.OrgID || user.CCID,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json(response);
  };

  queryDonor();
};

function getItemDetails(req, res) {
  db.query(
    "SELECT ItemName, Weight, ItemColor, ItemDesc FROM item",
    (err, results) => {
      if (err) {
        console.error("Error retrieving item details: " + err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const itemDetails = results.map((row) => ({
          ItemName: row.ItemName,
          Weight: row.Weight,
          ItemColor: row.ItemColor,
          ItemDesc: row.ItemDesc,
        }));
        res.status(200).json({ itemDetails });
      }
    }
  );
}

function getCCAddress(req, res) {
  db.query("SELECT CCAddress FROM collectioncenter", (err, results) => {
    if (err) {
      console.error("Error retrieving CCAddress: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const ccAddresses = results.map((row) => row.CCAddress);
      res.status(200).json({ ccAddresses });
    }
  });
}

function getOrgName(req, res) {
  db.query("SELECT OrgName FROM organization", (err, results) => {
    if (err) {
      console.error("Error retrieving OrgName: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const orgNames = results.map((row) => row.OrgName);
      res.status(200).json({ orgNames });
    }
  });
}

// Donor controller functions

const addDonorItem = (req, res) => {
  const newItem = req.body;
  const DID = req.DID; // Assuming you have the user's donor ID from JWT

  // Get the corresponding item, collection center, and organization details
  const {
    ItemName,
    OrgName,
    quantity,
    expirationDate,
    dropLocation,
    anonymousDonation,
  } = newItem;

  // Insert the donation into the database
  const query = `
    INSERT INTO donation (DID, IID, CCID, OrgID, Qty, UpdateTime, Status, Anonymity, DonatedDate, PickUpLoc, ExpDate)
    VALUES (?, (SELECT IID FROM item WHERE ItemName = ?), (SELECT CCID FROM collectioncenter WHERE CCAddress = ?), (SELECT OrgID FROM organization WHERE OrgName = ?), ?, NOW(), 'Donated', ?, NOW(), ?, ?);
  `;
  // name,description,quantity,expirationDate,dropLocation,anonymousDonation
  db.query(
    query,
    [
      DID,
      ItemName,
      dropLocation,
      OrgName,
      quantity,
      anonymousDonation,
      dropLocation,
      expirationDate,
    ],
    (error) => {
      if (error) {
        console.error("Error inserting donation: " + error);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the donation." });
      } else {
        res.status(201).json({ message: "Donation added successfully" });
      }
    }
  );
};

const getAllDonorItems = (req, res) => {
  const DID = req.DID; // Assuming you have the user's donor ID from JWT
  const query = `
    SELECT d.DonTranID, o.OrgName, i.ItemName, d.PickUpLoc, d.Status
    FROM donation AS d
    JOIN organization AS o ON d.OrgID = o.OrgID
    JOIN item AS i ON d.IID = i.IID
    WHERE d.DID = ?;
  `;

  db.query(query, [DID], (error, results) => {
    if (error) {
      console.error("Error retrieving donor items: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving donor items." });
    } else {
      res.json(results);
    }
  });
};

const getDonorFName = (req, res) => {
  const DID = req.DID; // Assuming you have the user's donor ID from JWT
  const query = "SELECT FName FROM donor WHERE DID = ?";

  db.query(query, [DID], (error, results) => {
    if (error) {
      console.error("Error retrieving donor FName: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving donor FName." });
    } else if (results.length > 0) {
      const donorFName = results[0].FName;
      res.json({ FName: donorFName });
    } else {
      res.status(404).json({ message: "Donor not found" });
    }
  });
};

// const getDonorItemById = (req, res) => {
//   const DID = req.DID; // Assuming you have the user's donor ID from JWT
//   const IID = parseInt(req.params.itemid);
//   console.log(DID, IID);
//   const query = `
//     SELECT Status
//     FROM donation
//     WHERE DID = ? AND IID = ?;
//   `;

//   db.query(query, [DID, IID], (error, results) => {
//     if (error) {
//       console.error("Error retrieving item status: " + error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while retrieving the item status." });
//     } else if (results.length > 0) {
//       res.json({ Status: results[0].Status });
//     } else {
//       res.status(404).json({ message: "Item not found" });
//     }
//   });
// };

const updateDonorProfile = (req, res) => {
  const DID = req.DID; // Assuming you have the donor's ID from JWT
  const { FName, LName, Phone, Address, dateOfBirth } = req.body; // Assuming the request body contains updated profile data

  // Update the donor's profile in the Donor table
  const query = `
    UPDATE donor
    SET FName = ?, LName = ?, Phone = ?, Address = ?, DOB = ?
    WHERE DID = ?;
  `;
  db.query(query, [FName, LName, Phone, Address, dateOfBirth, DID], (error) => {
    if (error) {
      console.error("Error updating donor profile: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the donor profile." });
    } else {
      res.json({ message: "Donor profile updated successfully" });
    }
  });
};

const getDonorDetails = (req, res) => {
  const DID = req.DID; // Assuming you have the donor's ID from JWT

  const query = `
    SELECT *
    FROM donor
    WHERE DID = ?;
  `;

  db.query(query, [DID], (error, results) => {
    if (error) {
      console.error("Error retrieving donor details: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving donor details." });
    } else if (results.length > 0) {
      res.json(results[0]); // Assuming there is only one record for a given DID
    } else {
      res.status(404).json({ message: "Donor not found" });
    }
  });
};

const getDonorItemById = (req, res) => {
  const DonTranID = parseInt(req.params.itemid); // Assuming you have the donor's ID from JWT

  const query = `
    SELECT i.ItemName, cc.CCAddress, o.OrgName, i.ItemDesc, d.Qty, d.ExpDate, d.Status,
    CASE WHEN d.Anonymity = 0 THEN CONCAT(dn.FName, ' ', dn.LName) ELSE NULL END AS DonorName
    FROM donation AS d
    JOIN item AS i ON d.IID = i.IID
    JOIN collectioncenter AS cc ON d.CCID = cc.CCID
    JOIN organization AS o ON d.OrgID = o.OrgID
    LEFT JOIN donor AS dn ON d.DID = dn.DID
    WHERE d.DonTranID = ?;
  `;

  db.query(query, [DonTranID], (error, results) => {
    if (error) {
      console.error("Error retrieving item details: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving item details." });
    } else {
      res.json(results);
    }
  });
};

// Org controller functions
const getOrgItemById = (req, res) => {
  const DonTranID = parseInt(req.params.itemid); // Assuming you have the donor's ID from JWT

  const query = `
    SELECT i.ItemName, i.ItemDesc, d.Qty, d.ExpDate, d.Status,
    CASE WHEN d.Anonymity = 0 THEN CONCAT(dn.FName, ' ', dn.LName) ELSE NULL END AS DonorName
    FROM donation AS d
    JOIN item AS i ON d.IID = i.IID
    JOIN collectioncenter AS cc ON d.CCID = cc.CCID
    JOIN organization AS o ON d.OrgID = o.OrgID
    LEFT JOIN donor AS dn ON d.DID = dn.DID
    WHERE d.DonTranID = ?;
  `;

  db.query(query, [DonTranID], (error, results) => {
    if (error) {
      console.error("Error retrieving item status: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the item status." });
    } else if (results.length > 0) {
      console.log(results);
      res.json({ results });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  });
};

const getAllOrgItems = (req, res) => {
  const OrgID = req.OrgId; // Assuming you have the organization's ID from JWT

  const query = `
    SELECT d.DonTranID, i.ItemName, i.ItemDesc, d.Status
    FROM donation AS d
    JOIN item AS i ON d.IID = i.IID
    WHERE d.OrgID = ?;
  `;

  db.query(query, [OrgID], (error, results) => {
    if (error) {
      console.error("Error retrieving item details: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving item details." });
    } else {
      res.json(results);
    }
  });
};

// const getOrgDonationDetails = (req, res) => {
//   const DID = req.DID; // Assuming you have the donor's ID from JWT

//   const query = `
//     SELECT i.ItemName, i.ItemDesc, i.ItemColor, i.Weight, d.Qty,
//     CASE WHEN d.Anonymity = 0 THEN CONCAT(dn.FName, ' ', dn.LName) ELSE NULL END AS DonorName, d.ExpDate
//     FROM donation AS d
//     JOIN item AS i ON d.IID = i.IID
//     LEFT JOIN donor AS dn ON d.DID = dn.DID
//     WHERE d.DID = ?;
//   `;

//   db.query(query, [DID], (error, results) => {
//     if (error) {
//       console.error("Error retrieving item details: " + error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while retrieving item details." });
//     } else {
//       res.json(results);
//     }
//   });
// };

// Warehouse controller functions

// const getWarehouseItemById = (req, res) => {
//   const CCID = req.CCID; // Assuming you have the collection center's ID from JWT
//   const IID = parseInt(req.params.iid);

//   const query = `
//     SELECT d.Status
//     FROM donation AS d
//     WHERE d.CCID = ? AND d.IID = ?;
//   `;

//   db.query(query, [CCID, IID], (error, results) => {
//     if (error) {
//       console.error("Error retrieving item status: " + error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while retrieving the item status." });
//     } else if (results.length > 0) {
//       res.json({ Status: results[0].Status });
//     } else {
//       res.status(404).json({ message: "Item not found" });
//     }
//   });
// };

const getAllWarehouseItems = (req, res) => {
  const CCID = req.CCID; // Assuming you have the collection center's ID from JWT

  const query = `
    SELECT d.DonTranID, i.ItemName, 
    CASE WHEN d.Anonymity = 0 THEN CONCAT(dn.FName, ' ', dn.LName) ELSE 'Anonymous' END AS DonorName,
    o.OrgName, d.Status
    FROM donation AS d
    JOIN item AS i ON d.IID = i.IID
    LEFT JOIN donor AS dn ON d.DID = dn.DID
    JOIN organization AS o ON d.OrgID = o.OrgID
    WHERE d.CCID = ?;
  `;

  db.query(query, [CCID], (error, results) => {
    if (error) {
      console.error("Error retrieving item details: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving item details." });
    } else {
      res.json(results);
    }
  });
};

const updateWarehouseItemStatus = (req, res) => {
  const CCID = req.CCID; // Assuming you have the collection center's ID from JWT
  const DonTranID = parseInt(req.params.itemid);
  const newStatus = req.body.status; // Assuming the request body contains the updated status
  console.log(CCID, DonTranID, newStatus);
  // Get the CCIncharge using the CCID
  const queryIncharge = `
    SELECT CCIncharge
    FROM collectioncenter
    WHERE CCID = ?;
  `;

  db.query(queryIncharge, [CCID], (error, resultsIncharge) => {
    if (error) {
      console.error("Error retrieving CCIncharge: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the item status." });
    } else if (resultsIncharge.length > 0) {
      const CCIncharge = resultsIncharge[0].CCIncharge;

      // Update the item status, UpdateTime, and UpdateBy
      const queryUpdate = `
        UPDATE donation
        SET Status = ?, UpdateTime = NOW(), UpdateBy = ?
        WHERE CCID = ? AND DonTranID = ?;
      `;

      db.query(
        queryUpdate,
        [newStatus, CCIncharge, CCID, DonTranID],
        (errorUpdate, resultsUpdate) => {
          if (errorUpdate) {
            console.error("Error updating item status: " + errorUpdate);
            res.status(500).json({
              error: "An error occurred while updating the item status.",
            });
          } else {
            res.json({ message: "Item status updated successfully" });
          }
        }
      );
    } else {
      res.status(404).json({ message: "Collection center not found" });
    }
  });
};

module.exports = {
  signin,
  signup,
  //getItemNames,
  getItemDetails,
  getDonorFName,
  getCCAddress,
  getOrgName,
  addDonorItem,
  getDonorItemById,
  getAllDonorItems,
  updateDonorProfile,
  getDonorDetails,
  getOrgItemById,
  getAllOrgItems,
  //getWarehouseItemById,
  getAllWarehouseItems,
  updateWarehouseItemStatus,

  //getOrgDonationDetails,
  //getDonorDonationDetails,
};
