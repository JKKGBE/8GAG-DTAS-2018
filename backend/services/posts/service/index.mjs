// import Boom from 'boom';
import axios from 'axios';

import config from '../../../config';

export default postDao => ({
  async getAllPosts() {
    const allPosts = await postDao.getManyPosts();

    return {
      posts: allPosts.map(post => ({
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

    return addedPost;
  },
});
