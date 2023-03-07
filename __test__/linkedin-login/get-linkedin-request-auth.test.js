const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const {
    Customer
} = require("../../models");
const { createToken } = require("../../helpers/jwt");

let customer

describe("get /users/linkedin-request-auth", () => {
    it("should return 200 status code", async () => {
      let code = 'AQSYAwtm8lLk_g7elDObhn-flpFGlphgQ_jB9TOsczDZj5a0MfMR39a0WNgsB3-c5JzDEbzGoDMkdg0dMOdxp3xrqPFYyKje-zHvuMs7RWXBuAS7wM2LFJ-a1NhLHVB5mkVvhIxZso7c4jh18inTuZD1g-9-AgJcKCWAlG2qnXFPdBw4VbzMQagat8Q18EU6Et2SHRZe9UPQfEYY6SI'
      const response = await request(app)
        .get("/users/linkedin-request-auth")
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.url).toEqual(expect.any(String))
    });
    it("should return 404 status code", async () => {
      let code = 'AQSYAwtm8lLk_g7elDObhn-flpFGlphgQ_jB9TOsczDZj5a0MfMR39a0WNgsB3-c5JzDEbzGoDMkdg0dMOdxp3xrqPFYyKje-zHvuMs7RWXBuAS7wM2LFJ-a1NhLHVB5mkVvhIxZso7c4jh18inTuZD1g-9-AgJcKCWAlG2qnXFPdBw4VbzMQagat8Q18EU6Et2SHRZe9UPQfEYY6SI'
      const response = await request(app)
        .post("/users/linkedin-request-auth")
      console.log(response.body);
      expect(response.status).toBe(404);
    });
    
})