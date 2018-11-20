import axios from 'axios';

const URL = 'http://localhost:4000'

export default class API {

  static async getPosts() {
    return axios.get(`${URL}/api/posts`)
      .then((response) => {
        if (response.data.status)
          return response.data.posts
        else
          return [];
      })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };

  static async getComments(postId) {
    return axios.get(`${URL}/api/posts/${postId}/comments`)
      .then((response) => {
        return response.data.comments;
      })
  };

  static async getPostRating(postId) {
    return axios.get(`${URL}/api/posts/${postId}/rating`)
      .then((response) => {
        return response.data.rating;
      })
  };

  static async loginUser(login, password) {
    return axios.post(`${URL}/api/users/login`, { login, password })
      .then((response) => {
        return response;
      })
  };

  static async postComment(postId, token, content) {
    return axios.post(`${URL}/api/posts/${postId}/comments`, { content, token })
      .then((response) => {
        return response;
      })
  };

  static async deleteComment(token, commentId, postId) {
    return axios.post(`${URL}/api/posts/${postId}/comments/${commentId}`, { token })
      .then((response) => {
        return response;
      })
  };

  static async registerUser(login, email, password) {
    return axios.post(`${URL}/api/users`, { login, email, password })
      .then((response) => {
        return response;
      })
  };

  static async uploadPost(data) {
    return axios.post(`${URL}/api/posts`, data)
      .then((response) => {
        return response;
      })
  };

  static async authenticate(token) {
    return axios.post(`${URL}/api/jwtTest`, token)
      .then((response) => {
        return response;
      })
  };
  static async ratePost(token, rate, postId) {
    return axios.post(`${URL}/api/posts/${postId}/rate`, { token, rate })
      .then((response) => {
        return response;
      })
  };

  static async editComment(token, commentId, newContent, postId) {
    return axios.patch(`${URL}/api/posts/${postId}/comments/${commentId}`, { token, commentId, newContent })
      .then((response) => {
        return response;
      })
  };

  static async getRanking(type) {
    return axios.get(`${URL}/api/posts/ranking`, type)
      .then((response) => {
        return response.data.rating;
      })
  };

  static async getUserVote(userId, postId) {
    return axios.get(`${URL}/api/users/${userId}/posts/${postId}/rating`)
      .then((response) => {
        return response.data.response;
      })
  };

  static async getUserPublicProfile(userId) {
    return axios.get(`${URL}/api/users/${userId}`)
      .then((response) => {
        return response.data.user;
      })
  };

  static async getUserPosts(userId) {
    return axios.get(`${URL}/api/users/${userId}/posts`)
      .then((response) => {
        return response.data.posts;
      })
  };
}
