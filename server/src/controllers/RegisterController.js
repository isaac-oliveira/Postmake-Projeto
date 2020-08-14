const User = require("../models/User");
const Post = require("../models/Post");

const { generateToken } = require("../middlewares/auth");

module.exports = {
  store: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const existsName = await User.findOne({ name });
      if (existsName)
        return response.status(400).json({
          error: "Esse nome de usuário já existe.",
        });

      const existsEmail = await User.findOne({ email });
      if (existsEmail)
        return response.status(400).json({
          error: "Esse e-mail já foi cadastrado.",
        });

      const user = await User.create({
        name,
        email,
        password,
      });

      user.password = undefined;

      const token = generateToken(user.id);

      return response.status(201).json({
        user,
        token,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },

  delete: async (request, response) => {
    try {
      const user_id = request.userId;

      await User.findByIdAndDelete(user_id);

      const posts = await Post.find({ user_id });
      await Promise.all(
        posts.map(async (post) => {
          await Post.findByIdAndDelete(post._id);
        })
      );

      return response.status(204).json();
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
