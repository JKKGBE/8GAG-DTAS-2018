import Post from './Post';

function getOnePost(query, select) {
  const postQuery = Post.findOne(query);

  if (select) {
    postQuery.select(select);
  }

  return postQuery
    .lean()
    .exec();
}

function getManyPosts(query = {}, sort = { createdOn: -1 }) {
  return Post
    .find(query)
    .sort(sort)
    .lean()
    .exec();
}

async function addPost(postData) {
  const savedPost = await new Post(postData).save();

  return savedPost.toObject();
}

function updatePost(query, updateData) {
  return Post
    .findOneAndUpdate(query, updateData)
    .lean()
    .exec();
}

function getPostsRating(query = {}, group) {
  return Post
    .aggregate()
    .match(query)
    .unwind('$ratings')
    .group(group)
    .sort({ rating: -1 })
    .exec();
}

export {
  getOnePost,
  getManyPosts,
  addPost,
  updatePost,
  getPostsRating,
};
