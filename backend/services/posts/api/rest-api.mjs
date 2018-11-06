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
      handler: api.getPostsRating,
      auth: false,
    },
  }, {
    method: 'POST',
    path: '/api/posts/{postId}/rate',
    config: {
      handler: api.addRateToPost,
      auth: true,
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
    path: '/api/posts/{postId}/comment',
    config: {
      handler: api.addCommentToPost,
      auth: true,
    },
  }, {
    method: 'DELETE',
    path: '/api/posts/{postId}/{commentId}',
    config: {
      handler: api.removeComment,
      auth: true,
    },
  }, {
    method: 'PUT',
    path: '/api/posts/{postId}/{commentId}',
    config: {
      handler: api.editComment,
      auth: true,
    },
  },
];
