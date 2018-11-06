function getAllPosts(req) {
  return {
    status: true,
    posts: [{
      post_id: 1,
      user_id: 1,
      title: 'Node.js',
      content: 'https://i.imgur.com/ArN48vy.png',
      post_date: '2018-11-06T00:00:00.000Z',
      accepted: 0,
    }, {
      post_id: 2,
      user_id: 2,
      title: 'React.js',
      content: 'https://i.imgur.com/SByFkgM.png',
      post_date: '2018-11-06T00:00:00.000Z',
      accepted: 0,
    }],
  };
}

export {
  getAllPosts,
};
