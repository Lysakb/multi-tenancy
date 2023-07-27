const { getConnection } = require("../helper/connectionManager");
const tenantApiTokenModel = require("../models/orgApiAccessToken");

const createUser = async (data) => {
  const model = getConnection().model("ApiAccessToken");
  return await new model(data);
};

const saveUser = async (userInstance) => {
  return await userInstance.save();
};

const getAll = async (query = () => {}) => {
  const model = getConnection().model("ApiAccessToken");
  const skip = Number(query.skip) || 0;
  const limit = Number(query.limit) || 10;

  const data = await model
    .find(query)
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");
  return data;
};

const getOne = async (query = {}) => {
  const model = getConnection().model("ApiAccessToken");
  const foundData = await model.findOne(query);
  return foundData;
};

module.exports = Object.freeze({
  createUser,
  saveUser,
  getAll,
  getOne,
});
