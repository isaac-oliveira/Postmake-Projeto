const User = require("../models/User");
const Post = require("../models/Post");
const Follow = require("../models/Follow");
const React = require("../models/React");

module.exports = {
  delete: async (request, response) => {
    try {
      await User.deleteMany();
      await Post.deleteMany();
      await Follow.deleteMany();
      await React.deleteMany();

      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
