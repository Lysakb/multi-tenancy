const express = require("express");

// connection resolver for tenant
const connectionResolver = require("../helper/connectionResolver");

//middleware
const {authMiddleware} = require('../middlewares/auth.middleware');

// Mounting routes
const v1Routes = express.Router();

// v1Routes.use("/tenant", connectionResolver.resolveTenant);
// v1Routes.use("/admin", connectionResolver.setAdminDb);

// admin
const adminApi = require("../controllers/organization.controller");
v1Routes.post("/admin/tenant", connectionResolver.resolveAdmin, adminApi.createUser);
v1Routes.get("/admin/tenant", connectionResolver.resolveAdmin, adminApi.getAllUsers);

// user
const userApi = require("../controllers/user.controller");
v1Routes.post(
  "/tenant/user/signup",
  connectionResolver.resolveCustomer,
  userApi.createUser
);
v1Routes.post(
  "/tenant/user/login",
  connectionResolver.resolveCustomer,
  userApi.login
);
v1Routes.get(
  "/tenant/user",
  connectionResolver.resolveCustomer, authMiddleware,
  userApi.getAllUsers
);

// tenantAccessKey
const tenantApiToken = require("../controllers/orgApiToken");
v1Routes.post(
  "/admin/tenant/token", connectionResolver.resolveAdmin,
  tenantApiToken.createUser
);
// v1Routes.get(
//   "/tenant/user",
//   connectionResolver.resolveCustomer,
//   userApi.getAllUsers
// );

module.exports = v1Routes;
