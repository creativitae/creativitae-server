const { compare } = require("../../helpers/bcryptjs");
const { createToken } = require("../../helpers/jwt");
const sendEmail = require("../../helpers/nodemailer");
const randomString = require("../../helpers/randomString");
const {
  Admin,
  Customer,
  CustomerDetail,
  CustomerDetailTemplate,
  Order,
  Receipt,
  Template,
} = require("../../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "845864112364-eoemjmb6b361fcuepdv0pffk5dhrent9.apps.googleusercontent.com"
);
class ControllerPublic {
  static async getTemplate(req, res, next) {
    try {
      let templateData = await Template.findAll();
      if (!templateData.length)
        throw { status: 404, msg: "Template not found" };
      res.status(200).json(templateData);
    } catch (error) {
      next(error);
    }
  }
  static async customerRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const uniqueString = randomString();
      let customer = await Customer.create({
        username,
        email,
        password,
        isPremium: false,
        phoneNumber,
        address,
        isValid: false,
        uniqueString,
      });
      sendEmail(email, uniqueString);
      res.status(201).json({ customer });
    } catch (err) {
      next(err);
    }
  }
  static async verify(req, res) {
    try {
      const { uniqueString } = req.params;
      const user = await Customer.findOne({ where: { uniqueString } });
      if (!user) {
        throw {
          status: 401,
          msg: "Customer not found",
        };
      }
      user.isValid = true;
      await user.save();
      res.redirect(`http://localhost:5173/login`);
    } catch (error) {
      next(error);
    }
  }
  static async customerLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { status: 400, msg: "Please insert email" };
      if (!password) throw { status: 400, msg: "Please insert password" };

      let customer = await Customer.findOne({ where: { email } });
      if (!customer)
        throw {
          status: 400,
          msg: "Error invalid email or password",
        };
      let isValidPassword = compare(password, customer.password);
      if (!isValidPassword)
        throw {
          status: 400,
          msg: "Error invalid email or password",
        };
      if (customer.isValid === false) {
        throw {
          status: 400,
          msg: "Not Verify",
        };
      }

      let access_token = createToken({
        id: customer.id,
        email: customer.email,
      });

      res
        .status(200)
        .json({
          access_token,
          id: customer.id,
          username: customer.username,
          email: customer.email,
          isPremium: customer.isPremium,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
        });
    } catch (err) {
      next(err);
    }
  }

  static async adminRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      let admin = await Admin.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({ admin });
    } catch (err) {
      next(err);
    }
  }
  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { status: 400, msg: "Please insert email" };
      if (!password) throw { status: 400, msg: "Please insert password" };

      let admin = await Admin.findOne({ where: { email } });
      if (!admin)
        throw {
          status: 400,
          msg: "Error invalid email or password",
        };

      let isValidPassword = compare(password, admin.password);
      if (!isValidPassword)
        throw {
          status: 400,
          msg: "Error invalid email or password",
        };
      let access_token = createToken({ id: admin.id, email: admin.email });
      res
        .status(200)
        .json({ access_token, id: admin.id, username: admin.username });
    } catch (err) {
      next(err);
    }
  }
  static async postGoogleLogin(req, res, next) {
    try {
      if (!req.body.googleToken)
        throw { status: 404, msg: "Customer not found" };
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      const [user, created] = await Customer.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "bihunkari",
          phoneNumber: "012345",
          address: "jakarta",
        },
        hooks: false,
      });
      let access_token = createToken({ id: user.id, email: user.email });
      res
        .status(200)
        .json({
          access_token,
          id: user.id,
          username: user.username,
          email: user.email,
          isPremium: false,
        });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerPublic;
