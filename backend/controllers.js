const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library

const mockDonor = [
  {
    id: 1,
    username: "donorUser",
    email: "donor@example.com",
    password: "donorPassword",
    role: "donor",
  },
  {
    id: 2,
    username: "donorUser2",
    email: "donor2@example.com",
    password: "donorPassword2",
    role: "donor",
  },
];

const mockOrg = [
  {
    id: 2,
    username: "orgUser",
    email: "org@example.com",
    password: "orgPassword",
    role: "org",
  },
];

const mockWarehouse = [
  {
    id: 3,
    username: "warehouseUser",
    email: "warehouse@example.com",
    password: "warehousePassword",
    role: "warehouse",
  },
];

const donors = [
  {
    name: "Donor Item 1",
    description: "Item Desc 1",
    quantity: 12,
    expirationDate: "2023-10-22T18:30:00.000Z",
    dropLocation: "Location 2",
    anonymousDonation: false,
    status: "Shipped from Warehouse",
    id: 1,
  },
  {
    name: "Donor Item 2",
    description: "Another Description",
    quantity: 8,
    expirationDate: "2023-11-15T14:45:00.000Z",
    dropLocation: "Location 1",
    anonymousDonation: true,
    status: "Reached Warehouse",
    id: 2,
  },
];

const orgItems = [
  {
    id: 1,
    name: "Org Item 1",
    description: "Org Description 1",
    quantity: 8,
    status: "Reached Warehouse",
    expirationDate: "14/04/2023",
    anonymousDonation: true,
  },
  {
    id: 2,
    name: "Org Item 2",
    description: "Org Description 2",
    quantity: 12,
    status: "Reached Organization",
    expirationDate: "14/05/2023",
    anonymousDonation: "Donor 1",
  },
];

const warehouseItems = [
  {
    id: 1,
    name: "Warehouse Item 1",
    description: "Warehouse Description 1",
    price: 20.99,
    quantity: 25,
    status: "In Warehouse",
    date: "16/04/2023",
  },
  {
    id: 2,
    name: "Warehouse Item 2",
    description: "Warehouse Description 2",
    price: 18.99,
    quantity: 30,
    status: "In Warehouse",
    date: "17/05/2023",
  },
];

const secretKey = "yourSecretKey"; // Replace with a strong, secret key

const signin = (req, res) => {
  const { email, password } = req.body;
  let mockUser = null;
  let mockArray;

  // Try to find the user in the donor array
  mockArray = mockDonor;
  mockUser = mockArray.find(
    (user) => user.email === email && user.password === password
  );

  // If not found in the donor array, try to find in the org array
  if (!mockUser) {
    mockArray = mockOrg;
    mockUser = mockArray.find(
      (user) => user.email === email && user.password === password
    );
  }

  // If still not found, try to find in the warehouse array
  if (!mockUser) {
    mockArray = mockWarehouse;
    mockUser = mockArray.find(
      (user) => user.email === email && user.password === password
    );
  }

  if (mockUser) {
    // Generate a JWT token
    const token = jwt.sign(
      {
        id: mockUser.id,
        role: mockUser.role,
      },
      secretKey,
      {
        expiresIn: "1h", // Token expiration time (1 hour)
      }
    );

    const response = {
      success: true,
      message: "Login successful",
      accessToken: token, // Include the generated token
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      role: mockUser.role,
    };

    res.json(response);
  } else {
    res.status(401).json({
      success: false,
      message: "Login failed. Please check your credentials.",
    });
  }
};

const signup = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Check if a user with the same email already exists
  const existingUser = mockDonor.find((user) => user.email == email);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists. Please log in.",
    });
  } else {
    // Generate a new donor user
    const newUser = {
      id: mockDonor.length + 1, // Generate a new unique ID
      username: `donorUser${donors.length + 1}`,
      email,
      password,
      role: "donor",
    };

    // Add the new user to the donors array
    donors.push(newUser);

    // Generate a JWT token for the new user
    const token = jwt.sign(
      {
        id: newUser.id,
        role: newUser.role,
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
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json(response);
  }
};

// Donor controller functions
const addDonorItem = (req, res) => {
  const newItem = req.body;
  newItem.status = "Donation Placed";
  newItem.id = donors.length + 1;
  donors.push(newItem);
  console.log(donors);
  res.status(201).json(newItem);
};

const getDonorItemById = (req, res) => {
  const itemId = parseInt(req.params.itemid);
  const item = donors.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

const getAllDonorItems = (req, res) => {
  res.json(donors);
};

// Org controller functions
const getOrgItemById = (req, res) => {
  const itemId = parseInt(req.params.itemid);
  const item = orgItems.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

const getAllOrgItems = (req, res) => {
  res.json(orgItems);
};

// Warehouse controller functions
const getWarehouseItemById = (req, res) => {
  const itemId = parseInt(req.params.itemid);
  const item = warehouseItems.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

const getAllWarehouseItems = (req, res) => {
  res.json(warehouseItems);
};

const updateWarehouseItemStatus = (req, res) => {
  const itemId = parseInt(req.params.itemid);
  const item = warehouseItems.find((item) => item.id === itemId);
  if (item) {
    const newStatus = req.body.status; // Assuming the request body contains the updated status
    item.status = newStatus;
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

module.exports = {
  signin,
  signup,
  addDonorItem,
  getDonorItemById,
  getAllDonorItems,
  getOrgItemById,
  getAllOrgItems,
  getWarehouseItemById,
  getAllWarehouseItems,
  updateWarehouseItemStatus,
};
