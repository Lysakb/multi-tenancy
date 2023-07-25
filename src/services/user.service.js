const userRepo = require("../dataAcess/user");
const sessionService = require("../services/sessionAuth.service");
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
    if (!sessionAuth) {
      return buildFailedResponse({ message: "No session api key" });
    }

    const responseData = {
      foundUser,
      tokenType: sessionAuth.data.token_type,
      tokenHash: sessionAuth.data.token_hash,
    };

    return buildResponse({
      responseData,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getAllUsers = async (query = {}) => {
  try {
    const user = await userRepo.getAll(query);
    if (user.length === 0) {
      return notFoundResponse({ message: "No user found!" });
    }
    console.log(user);

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
