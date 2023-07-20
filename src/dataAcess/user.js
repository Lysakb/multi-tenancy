const { getConnection } = require("../helper/connectionManager");
const User = require("../models/user.model");

const createUser = async (data) => {
  const model = getConnection().model("User");
  return await new model(data);
};

const saveUser = async (userInstance) => {
  return await userInstance.save();
};

const getAll = async (query = () => {}) => {
  const model = getConnection().model("User");
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
  const model = getConnection().model("User");
  return await model.findOne(query);
};

const updateUser = async (query = {}, update = {}, options = {}) => {
  return await User.findOneAndUpdate(query, update, options);
};

module.exports = Object.freeze({
  createUser,
  saveUser,
  getAll,
  getOne,
  updateUser,
});
