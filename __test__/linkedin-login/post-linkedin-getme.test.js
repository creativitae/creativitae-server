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
            access_token: "AQVKshL9Jq6YqUxPzpW64QhnU-fYF3dRydcMGJMSAVSctaYkN8QuNoGRgOMekfP6vlcpad4x0JV5_k2puvs1xbQfgpC04HweoDbixk1lzqGRcIMioZo_baYU3VrJCnw36IrsejA_Dr7Xf6UX9xu__uQ791mPO404GuCfdGl9yY7o6jT1b9oySghoJlTNLvqJ-BTCU4gT8U7ye-lqfElH3vYz8syMVAkOHV0LpuZMct7x2g_CpWvImQfV1_pTPv1nWG3ABCg7FeeCWCH4RgRFl5qiWjk267tNE32aBX9dbXcy3J1KpVdky6OxZjdt4sj_4g9AH72x14ajIfiT2m4_vMJcSlH0mw",
            expires_in: 5183999,
            scope: "r_emailaddress,r_liteprofile"
        }
        let resp = { data: data }
        axios.post.mockResolvedValue(resp)
        return CustomerController.getMe().then(data => expect(data).toEqual(data))
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(expect.any(Object));
    });
})