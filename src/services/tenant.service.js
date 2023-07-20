const { db_name } = require("../config/env");
const tenantRepo = require("../dataAcess/tenant");
const tenantApiAccessRepo = require('../dataAcess/TenantAccessToken');
const { generateApiSecretKey, generateApiPublicKey } = require("../utils/accessToken");
const { generateApiKey } = require("../utils/refreshToken");
const { buildCreateResponse } = require("../utils/responses");

const createTenant = async (payload) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // create a new tenant
    const createNewTenant = await tenantRepo.createUser(payload);

    const apiUsageLog = {
      date: today,
      count: 0,
    };
    const secretKey = generateApiSecretKey({
      phone_number: createNewTenant.phone_number,
      email: createNewTenant.email,
      initial: payload.prefix_initial,
    });

    const { apiKey, apiKeyHash } = await generateApiKey();

    const tokenObj = Object.assign(
      {},
      {
        organization: createNewTenant._id,
        prefix_initial: payload.prefix_initial,
        token_hash: apiKeyHash,
        revoked: false, //the default
        valid_until: payload.valid_until,
        secret_key: secretKey, //sk-ta-783267310998082f6323837g
        public_key: generateApiPublicKey(
          {
            phone_number: createNewTenant.phone_number,
            email: createNewTenant.email,
            initial: payload.prefix_initial,
          },
          secretKey
        ), //pk-ta-783267310998082f6323837g
        // host: hostDomain, // whitelist domain name
        usage: apiUsageLog,
      }
    );

    const tokenApiInstance = await tenantApiAccessRepo.createUser(tokenObj);

    createNewTenant.apiToken.push(tokenApiInstance);

    const db_name = payload.name;
    const db_url = `mongodb://0.0.0.0:27017/${db_name}`;
    createNewTenant.tenantInfo = Object.assign(
      {},
      {
        db_name: db_name,
        db_url: db_url,
      }
    );

    const saveTokenApiData = await tenantApiAccessRepo.saveUser(tokenApiInstance)
    const data = await tenantRepo.saveUser(createNewTenant);

    return buildCreateResponse({
      data: data,
      apiKey: apiKey
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getAllTenants = async (query = {}) => {
  try {
    const user = await tenantRepo.getAll(query);
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
    const user = await tenantRepo.getOne({ _id: id });

    if (!user) {
      return notFoundResponse({ message: "User not found" });
    }
    return buildResponse({ data: user });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTenant,
  getAllTenants,
  getUserById,
};
