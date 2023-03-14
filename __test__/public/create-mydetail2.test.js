const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const {
  Customer,
  Template,
  Admin,
  CustomerTemplate,
  CustomerDetail,
} = require("../../models");
const { createToken } = require("../../helpers/jwt");

// dont forget disable
console.log = () => {};
let admin
let customer
let mytemplate
let template1
let myDetail
beforeAll(async () => {
  customer = await Customer.create({
    username: "johndoe",
    email: "johndoe@mail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jakarta",
  });
  admin = await Admin.create({
    username: "johndoe",
    email: "johndoe@mail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jakarta",
  });
  template1 = await Template.create({
    name: "template-1",
    image: "https://images1.com",
    isPremium: false,
    AdminId: 1,
    status: "Active",
  });
  mytemplate = await CustomerTemplate.create({
    CustomerId: customer.id,
    TemplateId: template1.id,
  });
});
afterAll(async () => {
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Template.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Admin.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await CustomerTemplate.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await CustomerDetail.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
describe("post /public/mydetail", () => {
  it("should return 201 status code", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    let myDetail = {
      fullName: "",
      title: "",
      summary:"",
      educations:'',
      workExperiences: "",
      languages: '',
      skills: '',
      certifications: "",
      portfolios: "",
      socialMedias: "",
      CustomerId: 1,
    };
    const response = await request(app)
      .post("/public/mydetail")
      .set("access_token", access_token)
      .send(myDetail);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("fullName", expect.any(String));
    expect(response.body).toHaveProperty("summary", expect.any(String));
    expect(response.body).toHaveProperty("educations", expect.any(String));
    expect(response.body).toHaveProperty("workExperiences", expect.any(String));
    expect(response.body).toHaveProperty("languages", expect.any(String));
    expect(response.body).toHaveProperty("skills", expect.any(String));
    expect(response.body).toHaveProperty("certifications", expect.any(String));
    expect(response.body).toHaveProperty("CustomerId", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });
});
