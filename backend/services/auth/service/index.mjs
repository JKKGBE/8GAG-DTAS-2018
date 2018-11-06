import Boom from 'boom';

import authErrors from '../errors';
import * as cryptoUtils from '../../../utils/crypto';

export default userRepository => ({
  async registerUser(userData) {
    const userDataWithHashedPassword = {
      ...userData,
      password: await cryptoUtils.getHashedPassword(userData.password),
    };

    await userRepository.add(userDataWithHashedPassword);

    return {
      message: 'User registered sucessfully',
    };
  },

  async loginUser(userData) {
    const dbUser = await userRepository.getOne(userData.login, true);

    if (!await cryptoUtils.arePasswordsMatching(userData.password, dbUser.password)) {
      throw Boom.badRequest(authErrors.wrongUserNameOrPassword);
    }

    return {
      message: '',
      userId: dbUser._id,
      token: cryptoUtils.generateJwt(dbUser),
    };
  },

  checkToken(token) {
    try {
      return cryptoUtils.verifyJwt(token);
    } catch (e) {
      throw Boom.badRequest(authErrors.incorrectToken);
    }
  },
});
