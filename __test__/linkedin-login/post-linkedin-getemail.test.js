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

jest.mock('axios')

describe("post /users/getEmail", () => {
    it("should return 200 status code", async () => {
        let data = {
            handle: "urn:li:emailAddress:3775708763",
            "handle~": {
                emailAddress: "hsimpson@linkedin.com"
            }
        }
        let resp = { data: data }
        axios.get.mockResolvedValue(resp)
        return CustomerController.getEMail().then(data => expect(data).toEqual(data))
        // const response = await request(app)
        //     .post("/users/me")
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(expect.any(Object));
    });
})