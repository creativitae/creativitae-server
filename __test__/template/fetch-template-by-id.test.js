const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer, Template, Admin } = require("../../models");
const { createToken } = require("../../helpers/jwt");

// dont forget disable
console.log = () => {};
let admin
beforeAll(async () => {
  await Customer.create({
    username: "johndoe",
    email: "johndoe@mail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jakarta",
  });
  admin = await Admin.create({
    username: "johndoe",
    email: "johndoe@mail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jakarta",
  });
  await Template.create({
    name: "template-1",
    image: "https://images1.com",
    isPremium: false,
    AdminId: 1,
    status: 'Active'
  });
  await Template.create({
    name: "template-2",
    image: "https://images2.com",
    isPremium: false,
    AdminId: 1,
    status: 'Active'
});
})
afterAll(async () => {
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Template.destroy({truncate: true, cascade: true, restartIdentity: true})
  await Admin.destroy({truncate: true, cascade: true, restartIdentity: true})
});
describe("GET /templates/:templateId", () => {
  it("should return 200 status code and display all template data", async () => {
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    const response = await request(app).get("/templates/1").set("access_token", access_token)
    let expected =
        {
            id: 1,
            name: "template-1",
            image: "https://images1.com",
            isPremium: false,
            status: "Active",
            AdminId: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        }
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 200 status code and display all template data", async () => {
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    const response = await request(app).get("/templates/122").set("access_token", access_token)
    let expected =
        {
            message: 'Template not found'
        }
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 401 status code when customer not login", async () => {
    const response = await request(app)
    .get("/templates/1")
    let expected = {
      message: "Please login first",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 401 status code when access token invalid", async () => {
    const response = await request(app)
      .get("/templates/1")
      .set("access_token", '12345')
    let expected = {
      message: "Invalid access token",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
});
