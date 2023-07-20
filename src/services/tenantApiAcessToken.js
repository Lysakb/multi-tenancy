const { createUser, saveUser } = require("../dataAcess/TenantAccessToken");
const { generateApiSecretKey } = require("../utils/accessToken");
const { generateApiKey } = require("../utils/refreshToken");
const { buildCreateResponse } = require("../utils/responses");

const createApiAccessToken = async (payload) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const apiUsageLog = {
      date: today,
      count: 0,
    };

    const secretKey = generateApiSecretKey({
      phone_number: payload.phone_number,
      email: payload.email,
      initial: payload.prefix_initial,
    });

    const { apiKey, apiKeyHash } = await generateApiKey();

    payload.secret_key = secretKey;
    payload.token_hash = apiKeyHash;
    payload.usage = apiUsageLog;

    const createUserToken = await createUser(payload);
    const saveToken = await saveUser(createUserToken)

    return buildCreateResponse({
      data: saveToken,
      apiKey
    })

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {createApiAccessToken};