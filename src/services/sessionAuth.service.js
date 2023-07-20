const { JWT_SECRET } = require("../config/env");
const { SESSION } = require("../constants/enum");
const sessionAuthRepo = require('../dataAcess/sessionAuth');
const { generateAccessToken } = require("../utils/accessToken");
const { generateApiKey, generateRefreshToken } = require("../utils/refreshToken");
const { buildResponse } = require("../utils/responses");

const createApiKey = async ( userId) => {
     const { apiKey, apiKeyHash } = await generateApiKey();

     const newSessionAuth = {
       user: userId,
       token_type: SESSION.TOKEN_TYPES.API_KEY,
       token_hash: apiKeyHash,
       valid_until: null,
     }

     const modelInstance = await sessionAuthRepo.create(newSessionAuth);
     const savedSessionAuth = await sessionAuthRepo.save(modelInstance);

     if(!savedSessionAuth){
        throw new Error("User not found")
     }
     return buildResponse({
        data: savedSessionAuth,
        apiKey
     })
};

const create = async (userId, validityInSeconds, userAgent) => {
  const { refreshToken, refreshTokenHash } = await generateRefreshToken();

  const newSessionAuth = {
    user: userId,
    token_type: SESSION.TOKEN_TYPES.REFRESH_TOKEN,
    token_hash: refreshTokenHash,
    valid_until: new Date(Date.now() + validityInSeconds * 1000),
    userAgent,
  };
  const modelInstance = await sessionAuthRepo.create(newSessionAuth);
  const savedSessionAuth = await sessionAuthRepo.save(modelInstance);
  const accessToken = await generateAccessToken(
    userId,
    modelInstance._id,
    JWT_SECRET
  );

  if (!savedSessionAuth || savedSessionAuth?.statusCode == 404) {
    throw new Error("User not found");
  }

  const responseData = {
    refreshToken,
    accessToken,
    sessionAuthId: modelInstance.id,
    savedSessionAuth,
  };

  return buildResponse({
    data: responseData,
  });
};

module.exports = {
   create,
   createApiKey
}