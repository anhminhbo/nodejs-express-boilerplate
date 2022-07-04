// Services layer responsible for business logic of the application
// For example query db, handle complex business logic like validation,...
const UserService = require('./user/user.service');
const ResponseService = require('./response/response.service');

module.exports = { UserService, ResponseService };
