const Follow = require("../models/Follow");
const User = require("../models/User");

module.exports = {
  store: async (request, response) => {
    try {
      const user_id = request.userId;
      const { id } = request.body;

      const userExists = await User.findById(id);
      if (!userExists)
        return response.status(404).json({ error: "Usuário não existe." });

      const followExists = await Follow.findOne({
        user_id,
        followed_user_id: id,
      });
      if (followExists)
        return response.status(404).json({ error: "Usuário já seguido." });

      await Follow.create({ user_id, followed_user_id: id });

      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
  index: async (request, response) => {
    try {
      const user_id = request.userId;

      const followers = await Follow.find({ user_id });

      return response.status(200).json(followers);
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
  delete: async (request, response) => {
    try {
      const user_id = request.userId;
      const { id } = request.params;

      const followExists = await Follow.findOneAndDelete({
        user_id,
        followed_user_id: id,
      });
      if (!followExists)
        return response
          .status(404)
          .json({ error: "Você não segue esse usuário." });

      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
