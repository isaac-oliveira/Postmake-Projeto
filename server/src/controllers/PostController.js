const Post = require("../models/Post");

module.exports = {
  store: async (request, response) => {
    try {
      const user_id = request.userId;
      const { body } = request;

      const post = await Post.create({
        ...body,
        user_id,
        createdAt: Date.now(),
      });

      return response.status(201).json(post);
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
  index: async (request, response) => {
    try {
      const user_id = request.userId;

      const posts = await Post.find({ user_id });

      const sortedPosts = posts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      return response.status(200).json(sortedPosts);
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
