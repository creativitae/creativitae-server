const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer } = require("../../models");
const { hash, compare } = require("../../helpers/bcryptjs");

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

describe("POST /google-login", () => {
  it("should return 200 status code if request body is valid", async () => {
    const response = await request(app)
      .post("/google-login")
      .send({
        googleToken: `eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1NWNjYTZlYzI4MTA2MDJkODBiZWM4OWU0NTZjNDQ5NWQ3NDE4YmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzgxOTc3ODAsImF1ZCI6IjY3OTY2NDgwNTQ1OC05c2FrcGwza3A3cTlvcTM4ZGo1djcwYXFuM2lrY2xwcS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNzIzODg4NDI0NDk4MzI5NDg3OSIsImVtYWlsIjoiZWR1YXJkdXNvbGRpOThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjY3OTY2NDgwNTQ1OC05c2FrcGwza3A3cTlvcTM4ZGo1djcwYXFuM2lrY2xwcS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJFZHVhcmR1cyBPbGRpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGFXeUZja1pqVGp6djBEYmFSSWhtSWpDMERNWk9sNGtxQjNyTXpXRmc9czk2LWMiLCJnaXZlbl9uYW1lIjoiRWR1YXJkdXMiLCJmYW1pbHlfbmFtZSI6Ik9sZGkiLCJpYXQiOjE2NzgxOTgwODAsImV4cCI6MTY3ODIwMTY4MCwianRpIjoiNzRiMWNiZjg0NmEzMTc2YWMxOTg4NzcwOWU2NzRmNGFiMGEyYTU4ZCJ9.aSay4G8Ernk8N-5s7P6fUqljMP0dFrk6aOyyog1gJXNgpap4ODlhRN__vQnMI8LGdosQBmfuKE1PCUg9Lz6eM6ZxEa2VUqQVKYUEZz7n_ussZELDNqImZpOewVLaAP0XxobVs7rqKV0KVMy_1AOwfAWz5pgBtGf3oi2YcFn3QTQW69vI0KCe_mJ3WdTkXSNZsvqHfduaAqXPR2ReduLC-_Ja50wj41HQrhHRl95lhNlDQsn435egEh96MOrzd0b-KH4FES-ZMWj408Zkuj5GwskWRw6xb26EtTjUeEAOJzXJx6MDGX8Tzxn6INIM6VQKbMI7oLV-Mb3itQQvJsMkHQ`,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
  it("should return 200 status code if request body is valid", async () => {
    const response = await request(app)
      .post("/google-login")
      .send({
        googleToken:null,
      });
    expect(response.status).toBe(404);
  });
});
