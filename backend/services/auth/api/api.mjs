import authenticationServiceFactory from '../service';
import * as userRepository from '../../users/dao';

const authenticationService = authenticationServiceFactory(userRepository);

function registerUser(req) {
  return authenticationService.registerUser(req.payload);
}

function loginUser(req) {
  return authenticationService.loginUser(req.payload);
}

function checkToken(req) {
  return authenticationService.checkToken(req.payload);
}

export {
  registerUser,
  loginUser,
  checkToken,
};
