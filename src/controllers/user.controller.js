const userServices = require("../services/user.service");
const sessionService = require("../services/sessionAuth.service");
const { SESSION } = require("../constants/enum");

const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    const sessionAuth = await sessionService.create(
      user.data._id,
      SESSION.LOGIN_VALIDITY_IN_SECONDS,
      req.get("User-Agent")
    );

    user.data.sessionAuth = sessionAuth.data;
    await user.data.save();

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
  try {
    const user = await userServices.loginUser(req.body);

    return res.status(user.statusCode).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to login users at the moment",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await userServices.getAllUsers(req.query);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get users at the moment",
      error: error.message,
    });
  }
};


module.exports = {
  createUser,
  login,
  getAllUsers,
};
