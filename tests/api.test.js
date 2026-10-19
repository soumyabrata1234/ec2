const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../index");

describe("GET /health", () => {
  it("returns 200 and status ok", async () => {
    const res = await request(app).get("/health");
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.body, { status: "ok" });
  });
});

describe("GET /", () => {
  it("returns API information", async () => {
    const res = await request(app).get("/");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.message, "API is runninggggg");
    assert.ok(Array.isArray(res.body.endpoints));
    assert.ok(res.body.endpoints.includes("/users"));
    assert.ok(res.body.endpoints.includes("/products"));
  });
});

describe("GET /users", () => {
  it("returns an array of users", async () => {
    const res = await request(app).get("/users");
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length > 0);
  });
});

describe("GET /products", () => {
  it("returns an array of products", async () => {
    const res = await request(app).get("/products");
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length > 0);
  });
});

describe("GET /users/999999", () => {
  it("returns 404 with error response", async () => {
    const res = await request(app).get("/users/999999");
    assert.strictEqual(res.status, 404);
    assert.deepStrictEqual(res.body, { error: "User not found" });
  });
});
