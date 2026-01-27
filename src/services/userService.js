const db = require("../lib/prisma");
const bcrypt = require("bcrypt");

async function findUserByEmail(email) {
  return db.user.findFirst({ where: { email } });
}

async function findUserById(id) {
  return db.user.findUnique({ where: { id } });
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function createUser({ name, email, password, role }) {
  return db.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
}

module.exports = {
  findUserByEmail,
  hashPassword,
  createUser,
  findUserById,
};
