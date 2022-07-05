const { UserModel } = require('../../models');
const { dbConnection, dbDisconnect } = require('../../utils');
const ResponseService = require('../response/response.service');
// const { Error } = require('../../config');

const createUser = async (userBody) => {
  const db = await dbConnection();
  const user = await UserModel.create(userBody);
  dbDisconnect(db);

  // throw ResponseService.newError(Error.PasswordInvalid.errCode, Error.PasswordInvalid.errMessage);
  return user;
};

const getUserById = async (id) => {
  const db = await dbConnection();
  const user = await UserModel.findById(id);
  dbDisconnect(db);

  ResponseService.newSucess(user);

  return user;
};

module.exports = { getUserById, createUser };
