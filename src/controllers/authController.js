const authService = require("../services/authService");

module.exports = {
  async auth(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "E-mail e senha são obrigatórios." });
      }

      const user = await authService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Usuário ou senha inválidos." });
      }

      const isPasswordValid = await authService.validatePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Usuário ou senha inválidos." });
      }

      const token = authService.generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hora
      });

      return res.status(200).json({
        message: "Autenticação bem-sucedida.",
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro na autenticação.", details: error.message });
    }
  },
};
