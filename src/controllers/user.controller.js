const httpStatus = require('http-status');
const { ResponseService, UserService } = require('../services');
const { catchAsync } = require('../utils');

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).json(ResponseService.newSucess(user));
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    throw ResponseService.newError(Error.UserNotFound.errCode, Error.UserNotFound.errMessage);
  }
  res.render('home', { user });
});

module.exports = { createUser, getUser };
