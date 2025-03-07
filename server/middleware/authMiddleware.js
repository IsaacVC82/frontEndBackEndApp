const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega el usuario autenticado a la solicitud
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
