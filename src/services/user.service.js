const { UserModel } = require('../models');
const { dbConnection, dbDisconnect } = require('../utils');

const createUser = async (userBody) => {
  const db = await dbConnection();
  const user = await UserModel.create(userBody);
  dbDisconnect(db);
  return user;
};

const getUserById = async (id) => {
  const db = await dbConnection();
  const user = await UserModel.findById(id);
  dbDisconnect(db);
  return user;
};

module.exports = { getUserById, createUser };
