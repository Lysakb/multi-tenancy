const express = require("express");
const userController = require("../controllers/user.controller");
const connectionResolver = require("../helper/connectionResolver");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/signup",
  connectionResolver.resolveCustomer,
  userController.createUser
);
router.post(
  "/login",
  connectionResolver.resolveCustomer,
  userController.login
);
router.get(
  "/",
  connectionResolver.resolveCustomer,
  authMiddleware,
  userController.getAllUsers
);

module.exports = router;
