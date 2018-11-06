import postServiceFactory from '../service';
import * as postDao from '../dao';

const postService = postServiceFactory(postDao);

function getAllPosts() {
  return postService.getAllPosts();
}

function addPost(req) {
  return postService.addPost(req.payload);
}

export {
  getAllPosts,
  addPost,
};
