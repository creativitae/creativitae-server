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
            elements: [
                {
                    handle: "urn:li:emailAddress:3775708763",
                    "handle~": {
                        emailAddress: "hsimpson@linkedin.com"
                    }
                }
            ]
        }
        let resp = { data: data }
        axios.get.mockResolvedValue(resp)
        const response = await request(app).post("/users/getemail")
            .set("Authorization", "Bearer AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k")
            .set("Content-Type", 'application/json')
        console.log(response.data);
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('email')
        expect(response.body.email).toEqual((data.elements[0])['handle~'].emailAddress)
    });
    it("should return 403 status code", async () => {
        axios.get.mockRejectedValue(new Error('Request failed with status code 403'))
        const response = await request(app).post("/users/getemail")
            .set("Authorization", "Bearer AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k")
            .set("Content-Type", 'application/json')
        console.log(response.data);
        expect(response.status).toBe(403)
        expect(response.body).toEqual({message: "Not enough permissions from linkedin"})
        // expect(response.body.email).toEqual((data.elements[0])['handle~'].emailAddress)
    });
})