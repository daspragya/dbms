const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey"; // Replace with your actual secret key

const verifyDonor = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to authenticate token" });
    }

    // You can access the decoded user information in `decoded`
    if (decoded.role === "donor") {
      next(); // User is a donor, continue with the request
    } else {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
  });
};

const verifyOrg = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to authenticate token" });
    }

    // You can access the decoded user information in `decoded`
    if (decoded.role === "org") {
      next(); // User is an org, continue with the request
    } else {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
  });
};

const verifyWarehouse = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to authenticate token" });
    }

    // You can access the decoded user information in `decoded`
    if (decoded.role === "warehouse") {
      next(); // User is a warehouse, continue with the request
    } else {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
  });
};

module.exports = {
  verifyDonor,
  verifyOrg,
  verifyWarehouse,
};
