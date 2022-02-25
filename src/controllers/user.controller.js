const httpStatus = require('http-status');
const { ApiError } = require('../utils');
const { UserService } = require('../services');
const { catchAsync } = require('../utils');
const { dbConnection, dbDisconnect } = require('../utils');

const createUser = catchAsync(async (req, res) => {
  const db = await dbConnection();
  const user = await UserService.createUser(req.body);
  dbDisconnect(db);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req, res) => {
  const db = await dbConnection();
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    dbDisconnect(db);
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  dbDisconnect(db);
  res.render('home', { user });
});

module.exports = { createUser, getUser };
