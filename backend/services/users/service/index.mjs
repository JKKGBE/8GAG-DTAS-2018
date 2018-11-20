/* eslint-disable camelcase */

export default (userDao, postDao) => ({
  async getUsersPublicProfile(params) {
    const { userId } = params;

    const user = await userDao.getOneUser(
      { _id: userId },
      false
    );

    return {
      user: {
        userName: user.login,
        creationDate: user.createdOn,
      },
    };
  },

  async getUserPosts(params) {
    const { userId } = params;

    return {
      posts: (await postDao.getManyPosts({ userId }))
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
});
