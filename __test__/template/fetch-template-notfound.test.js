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
});
afterAll(async () => {
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Template.destroy({truncate: true, cascade: true, restartIdentity: true})
  await Admin.destroy({truncate: true, cascade: true, restartIdentity: true})
});
describe("GET /templates", () => {
  it("should return 200 status code and display all template data", async () => {
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    const response = await request(app).get("/templates").set("access_token", access_token)
    let expected = {message: 'Template not found'}
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  
});
