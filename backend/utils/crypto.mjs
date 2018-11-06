import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

function getHashedPassword(password) {
  return bcrypt.hash(password, config.crypto.saltRounds);
}

function arePasswordsMatching(providedPassword, dbPassword) {
  return bcrypt.compare(providedPassword, dbPassword);
}

function generateJwt(data) {
  return jwt.sign(data, config.crypto.jwtSecret);
}

function verifyJwt(token) {
  return jwt.verify(token, config.crypto.jwtSecret);
}

export {
  getHashedPassword,
  arePasswordsMatching,
  generateJwt,
  verifyJwt,
};
