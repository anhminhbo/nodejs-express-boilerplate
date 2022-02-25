const httpStatus = require('http-status');
const { ApiError } = require('../utils');
const { UserService } = require('../services');
const { catchAsync } = require('../utils');

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.render('home', { user });
});

module.exports = { createUser, getUser };
