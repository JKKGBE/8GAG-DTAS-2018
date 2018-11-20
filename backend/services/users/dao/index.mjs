import Boom from 'boom';
import _ from 'lodash';

import User from './User';
import userErrors from '../errors';

async function getOneUser(query, getAuth) {
  const user = await User
    .findOne(query)
    .lean();

  if (!user) {
    throw Boom.notFound(userErrors.userDoesNotExist);
  }

  return getAuth
    ? user
    : _.omit(user, 'password');
}

async function addUser(userData) {
  const savedUser = await new User(userData).save();

  return savedUser.toObject();
}

export {
  getOneUser,
  addUser,
};
