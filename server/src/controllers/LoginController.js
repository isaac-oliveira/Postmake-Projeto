const User = require("../models/User");
const bcrypt = require("bcrypt");

const { generateToken } = require("../middlewares/auth");

module.exports = {
  store: async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user)
        return response.status(404).json({
          error: "Esse e-mail não existe.",
        });

      console.log(user);
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        return response.status(401).json({
          error: "Senha inválida.",
        });

      user.password = undefined;

      const token = generateToken(user.id);

      return response.status(200).json({
        user,
        token,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Erro interno no servidor." });
    }
  },
};
