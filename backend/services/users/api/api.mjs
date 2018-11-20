import userServiceFactory from '../service';
import * as userDao from '../dao';
import * as postDao from '../../posts/dao';

const userService = userServiceFactory(userDao, postDao);

function getUsersPublicProfile(req) {
  return userService.getUsersPublicProfile(req.params);
}

function getUserPosts(req) {
  return userService.getUserPosts(req.params);
}

export {
  getUsersPublicProfile,
  getUserPosts,
};
