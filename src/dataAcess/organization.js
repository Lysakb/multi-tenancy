const { getConnection } = require("../helper/connectionManager");
const tenantModel = require("../models/organization.model");

const createUser = async (data) => {
  const model = getConnection().model("Tenant");
  return await new model(data);
};

const saveUser = async (userInstance) => {
  return await userInstance.save();
};

const getAll = async (query = () => {}) => {
  const model = getConnection().model("Tenant");
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
  const model = getConnection().model('tenant');
  const data = await model.findOne(query);
  return data;
};

module.exports = Object.freeze({
  createUser,
  saveUser,
  getAll,
  getOne,
});
