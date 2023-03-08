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
describe("get /public/verify/:uniqueString",() => {
    // it("400 - Failed Login - Verify your Account", async () => {
    //     let input = {
    //         email: "johndoe@mail.com", 
    //         password: "12345",
    //     }
    //     const response = await request(app)
    //     .post('/public/login')
    //     .send(input)
    
    //     expect(response.status).toBe(400)
    //     expect(response.body).toBeInstanceOf(Object)
    //     expect(response.status).toHaveProperty('msg','Not Verfify')
        
    // })
    it("401 - Failed - not found", async () => {
      let input = {
          email: "johndoe@mail.com", 
          password: "12345",
          uniqueString : '5431234321'
      }
      const response = await request(app)
      .post('/public/verify/1')
      .send(input)
  
      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      
  })
    

})