const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer } = require("../../models");
const { hash, compare } = require("../../helpers/bcryptjs");
const { createToken } = require("../../helpers/jwt");
let customer
beforeAll(async () => {
    customer = await Customer.create({
        username: "johndoe",
        email: "johndoe@mail.com",
        password: "12345",
        phoneNumber: "08123456789",
        address: "Jakarta",
    });
});

afterAll(async () => {
    await Customer.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
})

describe("use /templates/upload-images", () => {
    it("should return 401 status code when customer not login", async () => {
        const response = await request(app)
            .post("/templates/upload-images")
        let expected = {
            message: "Please login first",
        };
        expect(response.status).toBe(401);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toMatchObject(expected);
    });
    it("should return 401 status code when access token invalid", async () => {
        const response = await request(app)
            .post("/templates/upload-images")
            .set("access_token", '12345')
        let expected = {
            message: "Invalid access token",
        };
        expect(response.status).toBe(401);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toMatchObject(expected);
    });
    it("should return 200 status code", async () => {
        let access_token = createToken({
            id: customer.id,
            email: customer.email,
        });
        const response = await request(app)
            .post("/templates/upload-images")
            .set("access_token", access_token)
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
    });
});
