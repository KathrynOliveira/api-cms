const db = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function findUserByEmail(email) {
  return db.user.findFirst({ where: { email } });
}

async function validatePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" },
  );
}

module.exports = {
  findUserByEmail,
  validatePassword,
  generateToken,
};
