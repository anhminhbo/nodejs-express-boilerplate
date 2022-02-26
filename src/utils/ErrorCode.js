const ErrorCode = {
  // 100++ Error vallidation from info of the client
  UserNameInvalid: 101,
  PasswordInvalid: 102,
  UserNotFound: 103,
  // 200++ Error from Db
  CastError: 201,
  DuplicateFieldError: 202,

  // 300++ Error from Third Party

  // 400++ Error in application
  UrlNotFound: 401,
};

module.exports = ErrorCode;
