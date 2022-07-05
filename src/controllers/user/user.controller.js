const httpStatus = require('http-status');
const { ResponseService, UserService } = require('../../services');
const { catchAsync } = require('../../utils');

const createUser = catchAsync(async (req, res) => {
  await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).json(ResponseService.newSucess());
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    throw ResponseService.newError(Error.UserNotFound.statusCode, Error.UserNotFound.errorCode, Error.UserNotFound.message);
  }

  res.render('home', { user });
});

module.exports = { createUser, getUser };