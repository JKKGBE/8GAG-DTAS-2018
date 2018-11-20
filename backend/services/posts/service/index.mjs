/* eslint-disable camelcase */

import moment from 'moment';
import axios from 'axios';
import mongoose from 'mongoose';

import config from '../../../config';

const objectId = mongoose.Types.ObjectId;

export default postDao => ({
  async getAllPosts() {
    return {
      posts: (await postDao.getManyPosts())
        .map(post => ({
          post_id: post._id,
          user_id: post.userId,
          title: post.title,
          content: post.content,
          post_date: post.createdOn,
          accepted: post.accepted,
        })),
    };
  },

  async addPost(params) {
    const { content, title } = params;

    const imgurResponse = await axios.post(
      '/image',
      {
        title,
        image: content.base64.split(',')[1],
      },
      {
        baseURL: config.imgur.apiUrl,
        headers: config.imgur.headers,
      },
    );

    const postToSave = {
      title,
      content: imgurResponse.data.data.link,
      userId: params._id,
    };

    const addedPost = await postDao.addPost(postToSave);

    return {
      data: addedPost,
      message: 'Post added successfully',
    };
  },

  async getPostsComments(params) {
    const { postId } = params;

    const post = await postDao.getOnePost({ _id: postId });

    return {
      comments: post.comments
        .map(comment => ({
          comment_id: comment._id,
          post_id: postId,
          user_id: comment.userId,
          user_name: comment.userName,
          date: comment.createdOn,
          content: comment.content,
        }))
        .sort(
          (first, second) => moment(first.date).isSameOrBefore(second.date)
            ? 1
            : -1
        ),
    };
  },

  async addCommentToPost(params) {
    const { postId, commentData } = params;

    const updateData = {
      $addToSet: {
        comments: {
          userId: commentData._id,
          userName: commentData.login,
          content: commentData.content,
          createdOn: moment(),
        },
      },
    };

    await postDao.updatePost(
      { _id: postId },
      updateData,
    );

    return {
      message: 'Your comment has been added',
    };
  },

  async ratePost(params) {
    const { postId, rateData } = params;

    const query = {
      _id: postId,
      ratings: {
        $elemMatch: {
          userId: rateData._id,
        },
      },
    };

    const foundRate = await postDao.getOnePost(
      query,
      { 'ratings.$.rate': 1 },
    );

    if (!foundRate) {
      const newRating = {
        $addToSet: {
          ratings: {
            userId: rateData._id,
            rate: rateData.rate,
            createdOn: moment(),
          },
        },
      };

      await postDao.updatePost(
        { _id: postId },
        newRating,
      );

      return {
        message: 'Your vote has been added',
      };
    } else if (rateData.rate === foundRate.ratings[0].rate) {
      await postDao.updatePost(
        query,
        { 'ratings.$.rate': 0 },
      );

      return {
        message: 'Your vote has been canceled',
      };
    } else {
      await postDao.updatePost(
        query,
        { 'ratings.$.rate': rateData.rate },
      );

      return {
        message: 'You have changed your vote',
      };
    }
  },

  async getPostRating(params) {
    const { postId } = params;

    const res = await postDao.getPostsRating(
      { _id: objectId(postId) },
      {
        _id: '$_id',
        rating: {
          $sum: '$ratings.rate',
        },
      }
    );

    return res.length === 0
      ? { rating: 0 }
      : { rating: res[0].rating };
  },

  async getPostsRanking() {
    return {
      rating: await postDao.getPostsRating(
        {},
        {
          _id: '$_id',
          rating: { $sum: '$ratings.rate' },
          post_id: { $first: '$_id' },
          user_id: { $first: '$userId' },
          title: { $first: '$title' },
          content: { $first: '$content' },
          accepted: { $first: '$accepted' },
          post_date: { $first: '$createdOn' },
        },
      ),
    };
  },

  async editComment(params) {
    const { postId, commentId, newContent } = params;

    await postDao.updatePost(
      {
        _id: postId,
        comments: {
          $elemMatch: {
            _id: commentId,
          },
        },
      },
      { 'comments.$.content': newContent }
    );

    return {
      message: 'Comment has been updated',
    };
  },

  async removeComment(params) {
    const { postId, commentId } = params;

    await postDao.updatePost(
      { _id: postId },
      {
        $pull: {
          comments: {
            _id: commentId,
          },
        },
      }
    );

    return {
      message: 'Comment has been deleted',
    };
  },

  async getUserVote(params) {
    const { postId, userId } = params;

    const query = {
      _id: postId,
      ratings: {
        $elemMatch: {
          userId,
        },
      },
    };

    const post = await postDao.getOnePost(
      query,
      { 'ratings.$': 1 }
    );

    return post
      ? { response: post.ratings[0].rate }
      : { response: post };
  },
});
