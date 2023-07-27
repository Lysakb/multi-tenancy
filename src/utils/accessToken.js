"use strict";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_EXPIRESIN = 24 * 60 * 60; // this is validate for 24hrs

/**
 * @private
 * @description Generates access token
 * @param {string} userId - loginIn user ID
 * @param {string} scope - scope //for now this represent user role
 * @param {string} sessionAuthId - sessionAuthId //current sessionAuth id for the current user
 * @param {string} phoneNumber - User phone number // optional
 * @return {string} Ruturn the actual token
 */
function generateAccessToken(userId, sessionAuthId, JWT_SECRET) {
  // console.log({userId, sessionAuthId, JWT_SECRET, phoneNumber})
  return jwt.sign(
    { sessionAuthId, userId },
    JWT_SECRET,
    {
      algorithm: "HS256",
      audience: "user",
      issuer: "dnuemarol",
      expiresIn: ACCESS_TOKEN_EXPIRESIN
    }
  );
}

/**
 * @description Hash a access token.
 * @param {string} accessToken - The access token to hash.
 * @returns {string} The hash of the access token.
 * @example
 * accessRefreshToken('xx');
 */
function hashAccessToken(accessToken) {
  const accessTokenHash = crypto
    .createHash("sha256")
    .update(accessToken)
    .digest("hex");
  return accessTokenHash;
}

const generateApiSecretKey = ({ phone_number, email, initial }) => {
  const randChar = crypto.randomBytes(32).toString("hex"); //[...Array(30)].map((e) => ((Math.random * 36) | 0).toString(36)).join('');
  return "sk".concat("-", initial).concat("-", randChar);
};

const generateApiPublicKey = (
  { phone_number, email, initial },
  private_key
) => {
  const randChar = crypto.randomBytes(32).toString("hex"); //[...Array(30)].map((e) => ((Math.random * 36) | 0).toString(36)).join('');
  return "pk".concat("-", initial).concat("-", randChar);
};

module.exports = {
  generateAccessToken,
  generateApiSecretKey,
  generateApiPublicKey,
};
