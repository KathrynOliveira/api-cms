const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso não autorizado. Token ausente." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
