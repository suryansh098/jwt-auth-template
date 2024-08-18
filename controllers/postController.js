const posts = [
  {
    id: 1,
    username: "Suryansh",
    title: "Post 1",
  },
  {
    id: 2,
    username: "Jenny",
    title: "Post 2",
  },
];

exports.getPosts = (req, res) => {
  const filteredPosts = posts.filter((post) => post.username === req.user.name);
  res.json(filteredPosts);
};
