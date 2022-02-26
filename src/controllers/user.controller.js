const httpStatus = require('http-status');
const { AppError, ErrorCode } = require('../utils');
const { UserService } = require('../services');
const { catchAsync } = require('../utils');

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    return new AppError(httpStatus.NOT_FOUND, 'User not found', ErrorCode.UserNotFound);
  }

  res.render('home', { user });
});

module.exports = { createUser, getUser };
