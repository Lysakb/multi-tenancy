const express = require("express");
const orgApiToken = require("../controllers/orgApiToken");
const connectionResolver = require("../helper/connectionResolver");

const router = express.Router();

router.post(
  "/create",
  connectionResolver.resolveAdmin,
  orgApiToken.createToken
);

module.exports = router;
