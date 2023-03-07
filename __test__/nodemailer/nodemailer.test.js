const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer } = require("../../models");



beforeAll(async () => {
    await Customer.create({
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
  });

describe("GET /public/verify/:uniqueString",() => {
    it("400 - Failed Login - Verify your Account", async () => {
        let input = {
            email: "johndoe@mail.com", 
            password: "12345",
            uniqueString: '9318721219'
        }
        // console.log(input);
        const response = await request(app)
        .post('/public/register')
        .send(input)
        // console.log(response);
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('msg','Not Verify')
        
    })
})