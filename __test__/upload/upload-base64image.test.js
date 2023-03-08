const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const {
    Customer
} = require("../../models");
const { createToken } = require("../../helpers/jwt");
const BASE_URL = 'http://localhost:5173'
const cloudinary = require('cloudinary')
const CustomerController = require('../../controllers/login-first/controllerCustomer')
let customer
let data = {
    asset_id: 'd43b60dd541ff9ebe8a2af8d2a2cc34b',
    public_id: 'CustCvDump/uip6meqisgl6lxddez5i',
    version: 1678255502,
    version_id: '338aa19a416558fadee6a94acf533466',
    signature: '430b44e6f9bcaab012f85ed394959f50cb15648f',
    width: 2480,
    height: 3508,
    format: 'png',
    resource_type: 'image',
    created_at: '2023-03-08T06:05:02Z',
    tags: [],
    bytes: 196110,
    type: 'upload',
    etag: '9c3a597555d6063cf83f07b8b15c394e',
    placeholder: false,
    url: 'http://res.cloudinary.com/dtaetrd2d/image/upload/v1678255502/CustCvDump/uip6meqisgl6lxddez5i.png',
    secure_url: 'https://res.cloudinary.com/dtaetrd2d/image/upload/v1678255502/CustCvDump/uip6meqisgl6lxddez5i.png',
    folder: 'CustCvDump',
    api_key: '532554622789298'
}
jest.mock('cloudinary')
// cloudinary.mockImplementation(() => {
//     return {
//         v2:{
//             uploader: {
//                 upload: () => {
//                     return new Promise(resolve => {
//                         resolve(data)
//                     })
//                 }
//             }
//         }
//     }
// })
// cloudinary.v2.uploader.upload.mockResolvedValue(data)
console.log(cloudinary.v2.uploader.upload, "<----")
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


describe("post /templates/uploadCV", () => {
    it("should return 200 status code", async () => {
        try {
            let body = {
                image: 'data64:/png/askj'
            }
            let resp = { data: data }

            let access_token = createToken({
                id: customer.id,
                email: customer.email,
            });
            cloudinary.v2.uploader.upload.mockResolvedValue(data)
            const response = await request(app)
                .post("/templates/uploadCV")
                .set("access_token", access_token)
                .send(body)
            console.log(response.body, "ini response");
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('url')
            expect(response.body.url).toEqual(expect.any(String))
        } catch (error) {
            console.log(error);
        }

    })
})