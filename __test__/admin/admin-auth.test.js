const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Admin } = require("../../models");
const { hash, compare } = require("../../helpers/bcryptjs");

// dont forget disable
console.log = () => {};

beforeAll(async () => {
  await Admin.create({
    username: "johndoe",
    email: "johndoe@mail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jakarta",
  });
});
afterAll(async () => {
  await Admin.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

let customer
describe("POST /register", () => {
  it("should return 201 status code if request body is valid", async () => {
    customer = {
        username: "customer",
        email: "customer@mail.com",
        password: "12345",
        phoneNumber: "08123456789",
        address: "Jakarta"
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.admin).toHaveProperty("id", expect.any(Number));
    expect(response.body.admin).toHaveProperty("email", customer.email);
    expect(
      compare(customer.password, response.body.admin.password)
    ).toBeTruthy();
  });
  it("should return 400 status code if request body is invalid (name: null, email: null, password: null, phone number: null, address: null)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Admin name is required"},
        { message: "Admin email is required"},
        { message: "Admin password is required"},
        { message: "Admin phone number is required"},
        { message: "Admin address is required"},
      ],
    };
    customer = {};
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code if request body is invalid (name: filled, email: null, password: null, phone number: null, address: null)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Admin email is required"},
        { message: "Admin password is required"},
        { message: "Admin phone number is required"},
        { message: "Admin address is required"},
      ],
    };
    customer = {
      username: 'john'
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code if request body is invalid (name: filled, email: filled, password: null, phone number: null, address: null)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Admin password is required"},
        { message: "Password be at least 5 characters long"},
        { message: "Admin phone number is required"},
        { message: "Admin address is required"},
      ],
    };
    customer = {
      username: "customer",
      email: "customer@mail.com",
      password: "",
      phoneNumber: "",
      address: "",
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code if request body is invalid (name: filled, email: filled, password: filled (less than 5), phone number: null, address: null)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Password be at least 5 characters long"},
        { message: "Admin phone number is required"},
        { message: "Admin address is required"},
      ],
    };
    customer = {
      username: "customer",
      email: "customer@mail.com",
      password: "1",
      phoneNumber: "",
      address: "",
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code if request body is invalid (name: filled, email: filled, password: filled (more than 5), phone number: null, address: null)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Admin phone number is required"},
        { message: "Admin address is required"},
      ],
    };
    customer = {
      username: "customer",
      email: "customer@mail.com",
      password: "12345",
      phoneNumber: "",
      address: "",
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code if request body is invalid (name: filled, email: filled, password: filled (more than 5), phone number: filled, address: null)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Admin address is required"},
      ],
    };
    customer = {
      username: "customer",
      email: "customer@mail.com",
      password: "12345",
      phoneNumber: "12345",
      address: "",
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code if request body is invalid (name: filled, email: filled (not unique), password: filled (more than 5), phone number: filled, address: filled)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Please insert unique e-mail"},
      ],
    };
    customer = {
      username: "customer",
      email: "johndoe@mail.com",
      password: "12345",
      phoneNumber: "12345",
      address: "12345",
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 400 status code if request body is invalid (name: filled, email: filled (not email format), password: filled (more than 5), phone number: filled, address: filled)", async () => {
    let expected = {
      errorsMessages: [
        { message: "Please insert e-mail format"},
      ],
    };
    customer = {
      username: "customer",
      email: "customer",
      password: "12345",
      phoneNumber: "12345",
      address: "12345",
    };
    const response = await request(app).post("/register").send(customer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });

});

describe("POST /login", () => {
  it("should return 200 status code if request body is valid", async () => {
    let customer = {
      email: "johndoe@mail.com",
      password: "12345",
    };
    const response = await request(app).post("/login").send(customer);
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("access_token", expect.any(String));
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", expect.any(String));
  });
  // test('passing zero forces the default total of 1', () => {
  //   const bar = progressBar(0)
  //   expect(bar.total).toBe(1)
  // })
  it("should return 400 status code if request body is invalid (email: invalid)", async () => {
    let customer = {
      email: "john@mail.co",
      password: "12345",
    };
    let expected = {
        message: "Error invalid email or password"
    }
    const response = await request(app).post("/login").send(customer);
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected)
  });
  it("should return 400 status code if request body is invalid (password: invalid)", async () => {
    let customer = {
      email: "johndoe@mail.com",
      password: "54321",
    };
    let expected = {
        message: "Error invalid email or password"
    }
    const response = await request(app).post("/login").send(customer);
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected)
  });
  it("should return 400 status code if request body is invalid (email: null,password: null)", async () => {
    let customer = {
      email: "",
      password: "",
    };
    let expected = {
        message: "Please insert email"
    }
    const response = await request(app).post("/login").send(customer);
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected)
  });
  it("should return 400 status code if request body is invalid (email: filled,password: null)", async () => {
    let customer = {
      email: "johndoe@mail.com",
      password: "",
    };
    let expected = {
        message: "Please insert password"
    }
    const response = await request(app).post("/login").send(customer);
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected)
  });
  it("should return 400 status code if request body is invalid (email: null,password: filled)", async () => {
    let customer = {
      email: "",
      password: "54321",
    };
    let expected = {
        message: "Please insert email"
    }
    const response = await request(app).post("/login").send(customer);
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected)
  });
});
