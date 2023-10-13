const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const middlewares = require("./middleware");

// Auth routes
router.post("/auth/signin", controllers.signin);
router.post("/auth/signup", controllers.signup);
// Donor routes
router.post(
  "/donor/addItem",
  middlewares.verifyDonor,
  controllers.addDonorItem
);
router.get(
  "/donor/getItem/:itemid",
  middlewares.verifyDonor,
  controllers.getDonorItemById
);
router.get(
  "/donor/getAllItems",
  middlewares.verifyDonor,
  controllers.getAllDonorItems
);

// Org routes
router.get(
  "/org/getItem/:itemid",
  middlewares.verifyOrg,
  controllers.getOrgItemById
);
router.get(
  "/org/getAllItems",
  middlewares.verifyOrg,
  controllers.getAllOrgItems
);

// Warehouse routes
router.get(
  "/warehouse/getItem/:itemid",
  middlewares.verifyWarehouse,
  controllers.getWarehouseItemById
);
router.get(
  "/warehouse/getAllItems",
  middlewares.verifyWarehouse,
  controllers.getAllWarehouseItems
);
router.put(
  "/warehouse/updateStatus/:itemid",
  middlewares.verifyWarehouse,
  controllers.updateWarehouseItemStatus
);

module.exports = router;
