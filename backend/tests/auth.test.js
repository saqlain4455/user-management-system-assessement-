import request from "supertest";
import app from "../src/app.js";

describe("Auth & Admin - Minimal Tests", () => {
  let adminToken;
  let userToken;
  let userId;

  test("User signup works", async () => {
  const res = await request(app)
    .post("/api/auth/signup")
    .send({
      fullName: "Test User",
      email: `testuser_${Date.now()}@mail.com`,
      password: "password123"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.token).toBeDefined();
});

    test("User login works", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@mail.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    userToken = res.body.token;
    userId = res.body.user.id;
  });

  test("Protected route blocks unauthenticated access", async () => {
    const res = await request(app).get("/api/user/profile");

    expect(res.statusCode).toBe(401);
  });
 test("Admin can access admin users list", async () => {
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "user@example.com",   // ✅ EXISTS
      password: "Test@1234"          // ✅ use the REAL password you set
    });

  const adminToken = loginRes.body.token;

  const res = await request(app)
    .get("/api/admin/users")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});

  test("User cannot access admin route", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });
});
