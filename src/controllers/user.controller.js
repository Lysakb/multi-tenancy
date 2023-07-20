const userServices = require("../services/user.service");
const sessionService = require("../services/sessionAuth.service");
const { SESSION } = require("../constants/enum");
const { saveUser } = require("../dataAcess/user");

const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    const sessionAuth = await sessionService.createApiKey(
      user.data._id,
      SESSION.LOGIN_VALIDITY_IN_SECONDS,
      req.get("User-Agent")
    );

    // user.sessionAuth = sessionAuth.savedSessionAuth._id;
    user.sessionAuth = sessionAuth.data;
    
    return res.status(user.statusCode).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create user at the moment",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const user = await userServices.loginUser(req.body);
   let sessionAuth = await useCases.sessionAuth.create(user.data._id, 
      SESSION.LOGIN_VALIDITY_IN_SECONDS,
      req.headers['user-agent']);
  
    user.data.sessionAuth = sessionAuth.data;
    return res.status(200).json(user)

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
  login,
  getAllUsers,
  getUserById,
};
