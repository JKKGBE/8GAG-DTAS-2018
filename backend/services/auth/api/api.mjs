import authenticationServiceFactory from '../service';
import * as userDao from '../../users/dao';

const authenticationService = authenticationServiceFactory(userDao);

function registerUser(req) {
  return authenticationService.registerUser(req.payload);
}

function loginUser(req) {
  return authenticationService.loginUser(req.payload);
}

function checkToken(token) {
  return authenticationService.checkToken(token);
}

export {
  registerUser,
  loginUser,
  checkToken,
};
