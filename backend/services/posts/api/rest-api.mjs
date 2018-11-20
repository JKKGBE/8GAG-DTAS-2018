import * as api from './api';

export default [
  {
    method: 'GET',
    path: '/api/posts',
    config: {
      handler: api.getAllPosts,
      auth: false,
    },
  }, {
    method: 'GET',
    path: '/api/posts/ranking',
    config: {
      handler: api.getPostsRanking,
      auth: false,
    },
  }, {
    method: 'GET',
    path: '/api/users/{userId}/posts/{postId}/rating',
    config: {
      handler: api.getUserVote,
      auth: false,
    },
  }, {
    method: 'POST',
    path: '/api/posts',
    config: {
      handler: api.addPost,
      auth: true,
    },
  }, {
    method: 'GET',
    path: '/api/posts/{postId}/rating',
    config: {
      handler: api.getPostRating,
      auth: false,
    },
  }, {
    method: 'POST',
    path: '/api/posts/{postId}/rate',
    config: {
      auth: true,
      handler: api.ratePost,
    },
  }, {
    method: 'GET',
    path: '/api/posts/{postId}/comments',
    config: {
      handler: api.getPostsComments,
      auth: false,
    },
  }, {
    method: 'POST',
    path: '/api/posts/{postId}/comments',
    config: {
      handler: api.addCommentToPost,
      auth: true,
    },
  }, {
    method: 'POST',
    path: '/api/posts/{postId}/comments/{commentId}',
    config: {
      handler: api.removeComment,
      auth: true,
    },
  }, {
    method: 'PATCH',
    path: '/api/posts/{postId}/comments/{commentId}',
    config: {
      handler: api.editComment,
      auth: true,
    },
  },
];
