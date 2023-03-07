const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const {
    Customer
} = require("../../models");
const { createToken } = require("../../helpers/jwt");
const BASE_URL = 'http://localhost:5173'
const axios = require('axios')
const CustomerController = require('../../controllers/login-first/controllerCustomer')
let payload
let customer
describe("POST /users/loginOrRegister", () => {
    it("should return 200 status code if request body is valid", async () => {
        payload = {
            payload: {
                username: 'Mess Opposite',
                email: 'wahyunanandika@gmail.com'
            }
        }
        customer = {
            username: payload.username,
            email: payload.email,
            password: "12345",
            phoneNumber: "08123456789",
            address: "Jakarta"
        };
        const response = await request(app).post("/users/loginOrRegister").send(payload);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty("access_token", expect.any(String));
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("username", payload.payload.username);
        expect(response.body).toHaveProperty("email", payload.payload.email);
        expect(response.body).toHaveProperty("isPremium", expect.any(Boolean))
    });
})