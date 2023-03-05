const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer, Template, Admin } = require("../../models");
const { createToken } = require("../../helpers/jwt");

// dont forget disable
console.log = () => {};
let admin
let customer
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
  await Template.create({
    name: "template-1",
    image: "https://images1.com",
    isPremium: false,
    AdminId: 1,
    status: "Active",
  });
  await Template.create({
    name: "template-1",
    image: "https://images1.com",
    isPremium: false,
    AdminId: 1,
    status: "Active",
  });
  await Template.create({
    name: "template-1",
    image: "https://images1.com",
    isPremium: true,
    AdminId: 1,
    status: "Active",
  });
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
});
describe("POST /public/mytemplates/1", () => {
  it("should return 404 status code when template is not found", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    const response = await request(app)
      .post("/public/mytemplates/39")
      .set("access_token", access_token);
    let expected = {
      message: "Template not found",
    };
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 401 status code when customer not login", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    const response = await request(app)
      .post("/public/mytemplates")
    let expected = {
      message: "Please login first",
    };
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 200 status code and display all template data", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    const response = await request(app)
      .post("/public/mytemplates/1")
      .set("access_token", access_token);
    let expected = {
      id: 1,
      CustomerId: 1,
      TemplateId: 1,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    };
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code when customer already add template", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    const response = await request(app)
      .post("/public/mytemplates/1")
      .set("access_token", access_token);
    let expected = {
      message: "Template already in your template list",
    };
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code when free tier customer want add more than 1 template", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    const response = await request(app)
      .post("/public/mytemplates/2")
      .set("access_token", access_token);
    let expected = {
      message:
        "Free user can only have one CV, create unlimited CV with premium perks",
    };
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 404 status code when free customer want premium template", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    const response = await request(app)
      .post("/public/mytemplates/3")
      .set("access_token", access_token);
    let expected = {
      message: "You need upgrade to premium to unlock this design",
    };
    expect(response.status).toBe(403);
    expect(response.body).toMatchObject(expected);
  });
});
