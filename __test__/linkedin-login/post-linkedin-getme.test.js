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

describe("post /users/me", () => {
    it("should return 200 status code", async () => {
        let data = {
            localizedFirstName: 'Rayhan',
            localizedLastName: 'Athallah'
        }
        let resp = { data: data }
        axios.get.mockResolvedValue(resp)
        const response = await request(app).post("/users/me")
            .set("Authorization", "Basic 86o3pfdquzum55:m0mOlmIFPVGwZLud")
            .set("Content-Type", 'application/x-www-form-urlencoded')
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('username')
            expect(response.body.username).toEqual(`${data.localizedFirstName} ${data.localizedLastName}`)
            console.log(response.body, 'ini res.body');
        // const response = await request(app)
        //     .post("/users/me")
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(expect.any(Object));
    });
})