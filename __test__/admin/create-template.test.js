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
});
afterAll(async () => {
  await Admin.destroy({truncate: true, cascade: true, restartIdentity: true})
});
describe("POST /templates", () => {
  it("should return 201 status code and display created template", async () => {
    let body = {
        name: "template-1",
        image: "https://images1.com",
        isPremium: false
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    const response = await request(app)
    .post("/templates")
    .set("access_token", access_token)
    .send(body)
    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual(body.name);
    expect(response.body.image).toEqual(body.image);
    expect(response.body.isPremium).toEqual(body.isPremium);
    expect(response.body.status).toEqual('Active');
    expect(response.body.updatedAt).toEqual(expect.any(String));
    expect(response.body.createdAt).toEqual(expect.any(String));
  });
  it("should return 400 status code when (name: null, image: null, isPremium: null)", async () => {
    let body = {
        name: "",
        image: "",
        isPremium: null
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    let expected = {
        message: "Please insert template name"
    }
    const response = await request(app)
    .post("/templates")
    .set("access_token", access_token)
    .send(body)
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expected)
  });
  it("should return 400 status code when (name: filled, image: null, isPremium: null)", async () => {
    let body = {
        name: "template",
        image: "",
        isPremium: null
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    let expected = {
        message: "Please insert template image"
    }
    const response = await request(app)
    .post("/templates")
    .set("access_token", access_token)
    .send(body)
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expected)
  });
  it("should return 400 status code when (name: filled, image: filled, isPremium: null)", async () => {
    let body = {
        name: "template",
        image: "image",
        isPremium: null
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    let expected = {
        message: "Please insert template premium status"
    }
    const response = await request(app)
    .post("/templates")
    .set("access_token", access_token)
    .send(body)
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected)
  });
  it("should return 401 status code when admin not login", async () => {
    const response = await request(app)
      .post("/templates")
    let expected = {
      message: "Please login first",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  
});
