import * as api from './api';

export default [
  {
    method: 'GET',
    path: '/api/users/{userId}/{postId}/rating',
    config: {
      handler: api.checkUserVotes,
      auth: false,
    },
  }, {
    method: 'GET',
    path: '/api/users/{userId}/posts',
    config: {
      handler: api.getUsersPosts,
      auth: false,
    },
  }, {
    method: 'GET',
    path: '/api/users/{userId}',
    config: {
      handler: api.getUsersPublicProfile,
      auth: false,
    },
  },
];
