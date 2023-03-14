const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer } = require("../../models");

beforeAll(async () => {
  await Customer.create({
    username: "johndoe",
    email: "johndoe@mail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jakarta",
    uniqueString: "123",
  });
});
afterAll(async () => {
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
describe("get /public/verify/:uniqueString", () => {
  it("401 - Failed - not found", async () => {
    const response = await request(app).get("/public/verify/1");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("401 - Failed - not found", async () => {
    const response = await request(app).get("/public/verify/123");
    expect(response.body).toMatchObject({})
  });
});
