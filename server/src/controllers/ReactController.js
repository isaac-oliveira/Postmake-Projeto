const React = require("../models/React");

module.exports = {
  store: async (request, response) => {
    try {
      const user_id = request.userId;
      const { post_id, type } = request.params;

      if (!["loved", "like", "dislike"].includes(type))
        return response.status(400).json({ error: "Reação inválida." });

      const react = await React.findOne({ user_id, post_id });
      if (react) {
        if (!(type === react.type))
          await React.findByIdAndUpdate(react.id, { type });
        else await React.findByIdAndDelete(react.id);

        return response.status(204).json();
      }
      console.log("react");
      await React.create({ user_id, post_id, type });

      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
