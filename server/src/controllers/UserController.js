const User = require("../models/User");
const Follow = require("../models/Follow");

module.exports = {
  index: async (request, response) => {
    try {
      const user_id = request.userId;
      const { search = "" } = request.query;

      const users = await User.find();

      const filteredUsers = users.filter(
        (user) =>
          user.id !== user_id &&
          user.name.toLowerCase().includes(search.toLowerCase())
      );

      const serializerUsers = await Promise.all(
        filteredUsers.map(async (user) => {
          const result = await Follow.find({
            user_id,
            followed_user_id: user.id,
          }).count();

          return { user, following: result > 0 };
        })
      );

      return response.status(200).json(serializerUsers);
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
