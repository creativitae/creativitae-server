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
  await CustomerDetail.create({
    fullName: "John Doe",
    summary: "A game enthusiast with a passion for programming, especially in web development and mobile applications. Began my programming journey by finishing Hacktiv8 bootcamp as a full-stack web developer, having decided to leave my previous career in the banking industry to pursue what has been a lifelong passion, technology.",
    educations: "[{\"schoolName\":\"School University\",\"degree\":\"Bachelor of Science\",\"startingYear\":2016,\"yearOfGraduates\":2020},{\"schoolName\":\"School University 2\",\"degree\":\"Master of Science\",\"startingYear\":2020,\"yearOfGraduates\":2023}]",
    workExperiences: "[{\"workPlaceName\":\"Bank Dunia\",\"position\":\"Teller\",\"startingDate\":\"March 2015\",\"endingDate\":\"April 2016\"}]",
    languages: "[{\"language\":\"English\",\"proficiency\":\"IELTS 7\"}]",
    skills: "[{\"name\":\"Backend\",\"techs\":[{\"name\":\"Express\"},{\"name\":\"Sequelize\"}]},{\"name\":\"DepanSelesai\",\"techs\":[{\"name\":\"React.js\"},{\"name\":\"Vue.js\"}]}]",
    certifications: "[{\"provider\":\"Udemy\",\"title\":\"JavaScript algorithms and data structures\",\"issuedOn\":\"Date\",\"expirationDate\":\"Date\",\"certificateLink\":\"https://google.com\"}]",
    CustomerId: 1,
})
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
describe("put /public/mydetail", () => {
  it("should return 200 status code", async () => {
    let access_token = createToken({
      id: customer.id,
      email: customer.email,
    });
    let myDetail = {
      fullName: "John Doe",
      summary:
        "A game enthusiast with a passion for programming, especially in web development and mobile applications. Began my programming journey by finishing Hacktiv8 bootcamp as a full-stack web developer, having decided to leave my previous career in the banking industry to pursue what has been a lifelong passion, technology.",
      educations:
        '[{"schoolName":"School University","degree":"Bachelor of Science","startingYear":2016,"yearOfGraduates":2020},{"schoolName":"School University 2","degree":"Master of Science","startingYear":2020,"yearOfGraduates":2023}]',
      workExperiences:
        '[{"workPlaceName":"Bank Dunia","position":"Teller","startingDate":"March 2015","endingDate":"April 2016"}]',
      languages: '[{"language":"English","proficiency":"IELTS 7"}]',
      skills:
        '[{"name":"Backend","techs":[{"name":"Express"},{"name":"Sequelize"}]},{"name":"DepanSelesai","techs":[{"name":"React.js"},{"name":"Vue.js"}]}]',
      certifications:
        '[{"provider":"Udemy","title":"JavaScript algorithms and data structures","issuedOn":"Date","expirationDate":"Date","certificateLink":"https://google.com"}]',
      CustomerId: 1,
    };
    const response = await request(app)
      .put("/public/mydetail")
      .set("access_token", access_token)
      .send(myDetail);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject({message: 'Your detail updated successfully.'})
  });
  it("should return 401 status code when customer not login", async () => {
    const response = await request(app).put("/public/mydetail");
    let expected = {
      message: "Please login first",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
  it("should return 401 status code when access token invalid", async () => {
    const response = await request(app)
      .put("/public/mydetail")
      .set("access_token", '12345')
    let expected = {
      message: "Invalid access token",
    };
    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toMatchObject(expected);
  });
});
