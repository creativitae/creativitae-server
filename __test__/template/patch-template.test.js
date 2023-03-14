const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer, Template, Admin } = require("../../models");
const { createToken } = require("../../helpers/jwt");

// dont forget disable
console.log = () => {};
let admin
beforeAll(async () => {
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
})
afterAll(async () => {
  await Template.destroy({truncate: true, cascade: true, restartIdentity: true})
  await Admin.destroy({truncate: true, cascade: true, restartIdentity: true})
});
describe("patch /templates/:templateId", () => {
  it("should return 200 status code", async () => {
    let body = {
        status: "Inactive",
        isPremium: false
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    const response = await request(app)
    .patch("/templates/1")
    .set("access_token", access_token)
    .send(body)
    let expected = {
        message: "template-1's status succesfully updated"
    }
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 200 status code", async () => {
    let body = {
        status: "Inactive",
        isPremium: false
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    const response = await request(app)
    .patch("/templates/1")
    .set("access_token", access_token)
    .send(body)
    let expected = {
        message: "template-1's status succesfully updated"
    }
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 404 status code when template not found", async () => {
    let body = {
        status: "Inactive",
        isPremium: false
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    const response = await request(app)
    .patch("/templates/10")
    .set("access_token", access_token)
    .send(body)
    let expected = {
        message: "Template not found"
    }
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 401 status code when customer not login", async () => {
    const response = await request(app)
    .patch("/templates/1")
    let expected = {
      message: "Please login first",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 401 status code when access token invalid", async () => {
    const response = await request(app)
      .patch("/templates/1")
      .set("access_token", '12345')
    let expected = {
      message: "Invalid access token",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
});
