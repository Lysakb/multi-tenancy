const { getConnection } = require("../helper/connectionManager");
const User = require("../models/user.model");

const create = async (data) => {
  const model = getConnection().model("sessionAuth");
  return await new model(data);
};

const save = async (userInstance) => {
  return await userInstance.save();
};

const getAll = async (query = () => {}) => {
  const model = getConnection().model("sessionAuth");
  const skip = Number(query.skip) || 0;
  const limit = Number(query.limit) || 10;

  const data = await model.find(query)
    .select("-password")
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");
  return data;
};

const getOne = async (query = {}) => {
  const model = getConnection().model("sessionAuth");
  return await model.findOne(query);
};

const updateUser = async (query = {}, update = {}, options = {}) => {
  return await User.findOneAndUpdate(query, update, options);
};

module.exports = Object.freeze({
  create,
  save,
  getAll,
  getOne,
  updateUser,
});
