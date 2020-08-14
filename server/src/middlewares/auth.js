const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  generateToken: (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 86400,
    });
  },

  validation: (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader)
      return response.status(401).json({ error: "Token não enviado" });

    const parts = authHeader.split(" ");
    if (!parts.length === 2)
      return response.status(401).json({ error: "Erro no token" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return response.status(401).json({ error: "Token mal formatado" });

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) return response.status(401).json({ error: "Token inválido" });

      const exists = await User.findById(decoded.id);
      if (!exists)
        return response.status(401).json({ error: "usuário não existe" });

      request.userId = decoded.id;

      return next();
    });
  },
};
