import * as api from './api';

export default [
  {
    method: 'POST',
    path: '/api/users',
    config: {
      handler: api.registerUser,
      auth: false,
    },
  }, {
    method: 'POST',
    path: '/api/users/login',
    config: {
      handler: api.loginUser,
      auth: false,
    },
  },
];
