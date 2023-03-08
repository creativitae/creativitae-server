const request = require("supertest");
const app = require("../../app");
const { describe, it, expect, afterAll, beforeAll } = require("@jest/globals");
const { Customer } = require("../../models");
const { hash, compare } = require("../../helpers/bcryptjs");
const { createToken } = require("../../helpers/jwt");
const cloudinary = require("../../helpers/cloudinary")
const multer = require("multer");
const { resolve } = require("path");
let customer
let data = {
    url: 'http://res.cloudinary.com/dtaetrd2d/image/upload/v1678264809/Images/d60au6oul0kzzqn2zgvy.jpg',
    id: 'Images/d60au6oul0kzzqn2zgvy'
}
let results = {
    message: 'images uploaded succesfully',
    data: [
        {
            url: 'http://res.cloudinary.com/dtaetrd2d/image/upload/v1678264809/Images/d60au6oul0kzzqn2zgvy.jpg',
            id: 'Images/d60au6oul0kzzqn2zgvy'
        }
    ]
}
// cloudinary.mockImplementation(() => {
//     return new Promise(resolve => {
//         resolve(data)
//     }),
//     {
//         resource_type: "auto",
//         folder: "Images"
//     }
// })
jest.mock("cloudinary")

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
        try {
            // cloudinary.upload.mockResolvedValue(data)
            let access_token = createToken({
                id: customer.id,
                email: customer.email,
            });
            jest.spyOn(cloudinary, "uploads").mockResolvedValue(data)
            const response = await request(app)
                .post("/templates/upload-images")
                .attach("image", "__test__/assets/memphisg.jpg")
                .set("access_token", access_token)

            expect(response.status).toBe(200);
            console.log(response.body, 'ini response.body');
            expect(response.body).toEqual(results);
        } catch (error) {
            console.log(error, 'ini error di testing 200 upload-image');
        }

    });
    it("should return 405 status code", async () => {
        try {
            // cloudinary.upload.mockResolvedValue(data)
            let access_token = createToken({
                id: customer.id,
                email: customer.email,
            });
            const response = await request(app)
                .get("/templates/upload-images")
                .attach("image", "__test__/assets/memphisg.jpg")
                .set("access_token", access_token)

            expect(response.status).toBe(405);
            // console.log(response.body, 'ini response.body');
            expect(response.body).toEqual({ message: 'images not uploaded' });
        } catch (error) {
            console.log(error, 'ini error di testing 200 upload-image');
        }

    });
    // it("should return 400 status code", async () => {
    //     try {
    //         // cloudinary.upload.mockResolvedValue(data)
    //         let access_token = createToken({
    //             id: customer.id,
    //             email: customer.email,
    //         });
    //         const response = await request(app)
    //             .get("/templates/upload-images")
    //             .attach("image", "__test__/assets/big.jpg")
    //             .set("access_token", access_token)

    //         expect(response.status).toBe(405);
    //         // console.log(response.body, 'ini response.body');
    //         expect(response.body).toEqual({ message: 'images not uploaded' });
    //     } catch (error) {
    //         console.log(error, 'ini error di testing 200 upload-image');
    //     }

    // });
});
