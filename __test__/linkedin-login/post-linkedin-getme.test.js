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
            .set("Authorization", "Bearer AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k")
            .set("Content-Type", 'application/json')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('username')
        expect(response.body.username).toEqual(`${data.localizedFirstName} ${data.localizedLastName}`)
        // console.log(response.body, 'ini res.body');
        // const response = await request(app)
        //     .post("/users/me")
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(expect.any(Object));
    });
    it("should return 401 status code", async () => {
        axios.get.mockRejectedValue(new Error('Request failed with status code 401'))
        const response = await request(app).post("/users/me")
            .set("Authorization", "Bearer AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k")
            .set("Content-Type", 'application/json')
        console.log(response.data);
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: "Invalid access token linkedin" })
        // expect(response.body.email).toEqual((data.elements[0])['handle~'].emailAddress)
    });
})