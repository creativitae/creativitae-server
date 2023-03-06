const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer, Template, Admin, CustomerTemplate } = require("../../models");
const { createToken } = require("../../helpers/jwt");

// dont forget disable
console.log = () => {};
let admin
let customer
let mytemplate
let template1
beforeAll(async () => {
  customer = await Customer.create({
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
  template1 = await Template.create({
    name: "template-1",
    image: "https://images1.com",
    isPremium: false,
    AdminId: 1,
    status: "Active",
  });
  mytemplate = await CustomerTemplate.create({
    CustomerId: customer.id,
    TemplateId: template1.id
  })
});
afterAll(async () => {
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Template.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Admin.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await CustomerTemplate.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
describe("GET /public/mytemplates", () => {
  it("should return 200 status code", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    const response = await request(app)
      .get("/public/mytemplates")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array))
    expect(response.body[0].CustomerId).toEqual(customer.id);
    expect(response.body[0].TemplateId).toEqual(template1.id);
  });
  it("should return 401 status code when customer not login", async () => {
    const response = await request(app)
      .get("/public/mytemplates")
    let expected = {
      message: "Please login first",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object))
    expect(response.body).toMatchObject(expected);
  });
  it("should return 401 status code when access token invalid", async () => {
    const response = await request(app)
      .get("/public/mytemplates")
      .set("access_token", '12345')
    let expected = {
      message: "Invalid access token",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
});
