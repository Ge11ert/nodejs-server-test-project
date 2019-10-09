const UserService = require('../../services/user-service');
const UserModel = require('../../models/user');

const signUp = require('./sign-up');
const signIn = require('./sign-in');
const logout = require('./logout');

const userService = new UserService(UserModel);
const withUserService = (fn) => (...args) => fn(userService, ...args);

module.exports = {
  signIn: withUserService(signIn),
  signUp: withUserService(signUp),
  logout: withUserService(logout),
};
