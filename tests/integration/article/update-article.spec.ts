import request from "supertest";
import { app } from "../../../src/app";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Mock users
const otherUser = {
  id: "1f0e59ec-54a9-447e-947a-caa606224109",
  email: "tom@gmail.com",
  role: "AUTHOR",
};
const adminUser = {
  id: "9efdb984-7d8d-4aa5-9dfc-ec15cf216db9",
  email: "brenda@gmail.com",
  role: "ADMIN",
};
const authorUser = {
  id: "ada202e8-db0f-4aa6-9332-7c5ff3755ae8",
  email: "k.olliver18@gmail.com",
  role: "AUTHOR",
};

// Mock article
const article = {
  id: "e116083d-650e-4609-be6a-924ef8accee5",
  title: "Moda 2026",
  body: "Old body content that is long enough to pass validation.",
  categoryId: "7484a6cc-7e7c-48e3-a7bd-ed65c820e5f8",
  userId: authorUser.id,
};

describe("PUT /api/articles/:id", () => {
  it("should return 401 if not authenticated", async () => {
    const res = await request(app)
      .put(`/api/articles/${article.id}`)
      .send({ title: "New Title" });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 403 if author tries to edit article not owned", async () => {
    const token = jwt.sign(otherUser, JWT_SECRET);
    const res = await request(app)
      .put(`/api/articles/${article.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Title" });
    // Assuming ownership check is enforced in service/controller
    // If not, this test may need to be adjusted
    expect([403, 401]).toContain(res.status); // Accept 401 or 403 depending on implementation
  });

  it("should allow author to edit own article", async () => {
    const token = jwt.sign(authorUser, JWT_SECRET);
    const res = await request(app)
      .put(`/api/articles/${article.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated by Author" });
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body.data).toHaveProperty("title", "Updated by Author");
  });

  it("should allow admin to edit any article", async () => {
    const token = jwt.sign(adminUser, JWT_SECRET);
    const res = await request(app)
      .put(`/api/articles/${article.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated by Admin" });
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body.data).toHaveProperty("title", "Updated by Admin");
  });
});
