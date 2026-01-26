require("dotenv").config();
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient, Role } = require("@prisma/client");

// 1. Crie uma instância do pool do pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Inicialize o adaptador
const adapter = new PrismaPg(pool);

// 3. Passe o adaptador para o Prisma Client
const prisma = new PrismaClient({ adapter });

module.exports = {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      let { role } = req.body;
      if (role) role = role.trim().toUpperCase();

    //   if (!Object.values(Role).includes(role)) {
    //     return res.status(400).json({
    //       error: `Role inválido. Deve ser um dos: ${Object.values(Role).join(", ")}`,
    //     });
    //   }
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return res.status(409).json({ error: "E-mail já cadastrado." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar usuário.", details: error.message });
    }
  },
};
