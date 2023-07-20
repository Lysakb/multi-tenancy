const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const generateSalt = async (saltRounds) => {
  return await bcrypt.genSalt(saltRounds);
};

const hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateJwt = (data) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: "30d" });
};

module.exports = Object.freeze({
  generateSalt,
  hashPassword,
  comparePassword,
  generateJwt,
});
