import postServiceFactory from '../service';
import * as postDao from '../dao';

const postService = postServiceFactory(postDao);

function getAllPosts() {
  return postService.getAllPosts();
}

function addPost(req) {
  return postService.addPost(req.payload);
}

function getPostsComments(req) {
  return postService.getPostsComments(req.params);
}

function addCommentToPost(req) {
  return postService.addCommentToPost({
    commentData: req.payload,
    ...req.params,
  });
}

function ratePost(req) {
  return postService.ratePost({
    rateData: req.payload,
    ...req.params,
  });
}

function getPostRating(req) {
  return postService.getPostRating(req.params);
}

function getPostsRanking() {
  return postService.getPostsRanking();
}

function editComment(req) {
  return postService.editComment({
    ...req.payload,
    ...req.params,
  });
}

function removeComment(req) {
  return postService.removeComment({
    ...req.payload,
    ...req.params,
  });
}

function getUserVote(req) {
  return postService.getUserVote(req.params);
}

export {
  getAllPosts,
  addPost,
  getPostsComments,
  addCommentToPost,
  ratePost,
  getPostRating,
  getPostsRanking,
  editComment,
  removeComment,
  getUserVote,
};
