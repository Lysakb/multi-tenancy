const { JWT_SECRET } = require("../config/env");
const userRepo = require("../dataAcess/user");
const sessionService = require("../services/sessionAuth.service");
const { generateAccessToken } = require("../utils/accessToken");
const {
  buildResponse,
  buildCreateResponse,
  notFoundResponse,
  unAuthorizedResponse,
  buildFailedResponse,
} = require("../utils/responses");
const { comparePassword } = require("../utils/user");

const createUser = async (payload) => {
  try {
    const userInstance = await userRepo.createUser(payload);

    const savedUser = await userRepo.saveUser(userInstance);

    return buildCreateResponse({
      data: savedUser,
      message: "User registered successfully",
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const loginUser = async (payload) => {
  try {
    const foundUser = await userRepo.getOne({ email: payload.email });
    if (!foundUser) {
      return notFoundResponse({ message: "User not found" });
    }

    const IsValidPassword = await comparePassword(
      payload.password,
      foundUser.password
    );
    if (!IsValidPassword) {
      return unAuthorizedResponse({ message: "Invalid Password" });
    }

    const sessionAuth = await sessionService.getOne({ user: foundUser._id });

    const accessToken = await generateAccessToken(
      foundUser._id,
      sessionAuth.data._id,
      JWT_SECRET
    );

    const user = {
      id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
      sessionId: sessionAuth.data._id,
    };

    return buildResponse({
      user,
      accessToken,
    });
  } catch (error) {
    console.log(error)
    throw new Error(`${error}`);
  }
};

const getAllUsers = async (query = {}) => {
  try {
    const user = await userRepo.getAll(query);
    if (user.length === 0) {
      return notFoundResponse({ message: "No user found!" });
    }

    return buildResponse({
      data: user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await userRepo.getOne({ _id: id });

    if (!user) {
      return notFoundResponse({ message: "User not found" });
    }
    return buildResponse({ data: user });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};
