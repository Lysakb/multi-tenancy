const tenantServices = require("../services/organization.service");

const createUser = async (req, res) => {
  try {
    const data = await tenantServices.createTenant(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create user at the moment",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await tenantServices.getAllTenants(req.query);
    res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get users at the moment",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await tenantServices.getUserById(req.params.id);
    res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get user at the moment",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
