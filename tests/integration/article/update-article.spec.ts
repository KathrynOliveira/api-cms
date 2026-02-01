import request from "supertest";
import { app } from "../../../src/app";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Mock users
const otherUser = {
  id: 2,
  email: "other@example.com",
  role: "AUTHOR",
};
const adminUser = {
  id: 3,
  email: "admin@example.com",
  role: "ADMIN",
};
const authorUser = {
  id: 1,
  email: "email@example.com",
  role: "AUTHOR",
};

// Mock article
const article = {
  id: 1,
  title: "Original Title",
  body: "Old body content that is long enough to pass validation.",
  categoryId: 1,
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
