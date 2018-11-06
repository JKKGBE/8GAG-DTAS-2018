// import Boom from 'boom';
// import _ from 'lodash';

import Post from './Post';
// import postErrors from '../errors';

function getManyPosts(query = {}) {
  return Post
    .find(query)
    .lean();
}

async function addPost(postData) {
  const savedPost = await new Post(postData).save();

  return savedPost.toObject();
}

export {
  getManyPosts,
  addPost,
};
