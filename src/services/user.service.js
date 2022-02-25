const { UserModel } = require('../models');

const getUserById = async (id) => UserModel.findById(id);
const createUser = async (userBody) => UserModel.create(userBody);

module.exports = { getUserById, createUser };
