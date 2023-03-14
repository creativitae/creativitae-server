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
let customer

jest.mock('axios')

describe("post /users/linkedin-request-auth", () => {
    it("should return 200 status code", async () => {
        let data = {
            code: "AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k"
        }
        let resp = { data: data }
        let redirect_uri = `${BASE_URL}/callbacks`;
        let client_id = "86o3pfdquzum55"
        let client_secret = "m0mOlmIFPVGwZLud"
        let headers = {
            Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
            "Content-Type": 'application/x-www-form-urlencoded'
        }
        axios.post.mockResolvedValue(resp)
        const response = await request(app).post("/users/linkedin-user-auth")
            .set("Authorization", "Basic 86o3pfdquzum55:m0mOlmIFPVGwZLud")
            .set("Content-Type", 'application/x-www-form-urlencoded')
            .send(data)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toEqual(data)
            console.log(response.body, 'ini res.body');
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(expect.any(Object));
    });
    it("should return 401 status code", async () => {
        axios.post.mockRejectedValue(new Error('Request failed with status code 400'))
        const response = await request(app).post("/users/linkedin-user-auth")
            .set("Authorization", "Basic 86o3pfdquzum55:m0mOlmIFPVGwZLud")
            .set("Content-Type", 'application/json')
            .send()
        console.log(response.data);
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "linkedin parameter is missing" })
        // expect(response.body.email).toEqual((data.elements[0])['handle~'].emailAddress)
    });
})