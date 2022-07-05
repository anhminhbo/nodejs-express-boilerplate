// Utils provides different function for handling errors, helper functions
const catchAsync = require('./catchAsync');
const { dbConnection, dbDisconnect } = require('./dbHandler');

module.exports = {
  catchAsync,
  dbConnection,
  dbDisconnect,
};
