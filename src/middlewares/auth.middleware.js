const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const User = require("../models/user.model");
const userRepo = require("../dataAcess/user");

exports.authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodeToken = jwt.verify(token, JWT_SECRET);

      const data = await userRepo.getOne({ _id: decodeToken.userId });

      if (!data) {
        return res
          .status(404)
          .json({ message: "Invalid token or Wrong tenant" });
      }
      req.user = data._id;
      req.sessionId = data.sessionAuth;

      next();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token" });
    throw new Error("Not authorized, no token");
  }
};
