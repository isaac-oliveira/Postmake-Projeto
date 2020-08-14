const Follow = require("../models/Follow");
const User = require("../models/User");
const Post = require("../models/Post");
const React = require("../models/React");

module.exports = {
  index: async (request, response) => {
    try {
      const user_id = request.userId;

      const followers = await Follow.find({ user_id });

      let posts = [];

      await Promise.all(
        followers.map(async (follow) => {
          const findedPosts = await Post.find({
            user_id: follow.followed_user_id,
          });

          posts = [...findedPosts, ...posts];
        })
      );

      const serializedPosts = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.user_id);
          const { _id, title, subject, hashtags, createdAt } = post;

          const react = await React.findOne({ user_id, post_id: _id }).select(
            "type"
          );

          return {
            _id,
            title,
            subject,
            hashtags,
            user_id: post.user_id,
            user_name: user.name,
            react: react,
            createdAt,
          };
        })
      );

      const sortedPosts = serializedPosts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      return response.status(200).json(sortedPosts);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
