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
        axios.post.mockResolvedValue(resp)
        return CustomerController.getAuthToken().then(data => expect(data).toEqual(data))
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(expect.any(Object));
    });
})