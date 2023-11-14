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
      console.log(req.user);
      req.DID = decoded.id;
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
      console.log(decoded);
      req.OrgId = decoded.id;
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
      req.CCID = decoded.id;
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
