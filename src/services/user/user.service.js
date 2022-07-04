const { UserModel } = require('../../models');
const { dbConnection, dbDisconnect } = require('../../utils');
const ResponseService = require('../response/response.service');
// const Error = require('../../config/constant/Error');

const createUser = async (userBody) => {
  const db = await dbConnection();
  const user = await UserModel.create(userBody);
  dbDisconnect(db);

  // ResponseService.throwError(
  //   Error.PasswordInvalid.statusCode,
  //   Error.PasswordInvalid.errorCode,
  //   Error.PasswordInvalid.message
  // );
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
