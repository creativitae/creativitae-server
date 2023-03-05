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
  await Template.create({
    name: "template-3",
    image: "https://images3.com",
    isPremium: true,
    AdminId: 1,
    status: 'Active'
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
    let expected = [
        {
            id: 1,
            name: "template-1",
            image: "https://images1.com",
            isPremium: false,
            status: "Active",
            AdminId: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        },
        {
            id: 2,
            name: "template-2",
            image: "https://images2.com",
            isPremium: false,
            status: "Active",
            AdminId: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        },
        {
            id: 3,
            name: "template-3",
            image: "https://images3.com",
            isPremium: true,
            status: "Active",
            AdminId: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        },
    ]
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toMatchObject(expected);
  });
});
