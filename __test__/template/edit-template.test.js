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
describe("PUT /templates/:templateId", () => {
  it("should return 200 status code", async () => {
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
    .put("/templates/1")
    .set("access_token", access_token)
    .send(body)
    let expected = {
        message: "Template with name template-1, updated successfully."
    }
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expected);
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
    .put("/templates/1")
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
    .put("/templates/1")
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
    .put("/templates/1")
    .set("access_token", access_token)
    .send(body)
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expected)
  });
  it("should return 404 status code when template not found", async () => {
    let body = {
        name: "template",
        image: "image",
        isPremium: true
    }
    let access_token = createToken({
        id: admin.id,
        email: admin.email,
      });
    let expected = {
        message: "Template not found"
    }
    const response = await request(app)
    .put("/templates/100")
    .set("access_token", access_token)
    .send(body)
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject(expected)
  });
  it("should return 401 status code when customer not login", async () => {
    let body = {
      name: "template",
      image: "image",
      isPremium: true
  }
    const response = await request(app)
    .put("/templates/1")
    .send(body)
    let expected = {
      message: "Please login first",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
});
