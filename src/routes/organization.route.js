const express = require("express");
const organizationController = require("../controllers/organization.controller");
const connectionResolver = require("../helper/connectionResolver");

const router = express.Router();

router.post(
  "/create",
  connectionResolver.resolveAdmin,
  organizationController.createUser
);
router.get("/", connectionResolver.resolveAdmin, organizationController.getAll);
router.get("/:id", connectionResolver.resolveAdmin, organizationController.getOne);

module.exports = router;
