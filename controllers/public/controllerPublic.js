const { compare } = require("../../helpers/bcryptjs");
const { createToken } = require("../../helpers/jwt");
const sendEmail = require("../../helpers/nodemailer");
const {
  Admin,
  Customer,
  CustomerDetail,
  CustomerDetailTemplate,
  Order,
  Receipt,
  Template,
} = require("../../models");
class ControllerPublic {
  static async getTemplate(req, res, next) {
    try {
      let templateData = await Template.findAll();
      res.status(200).json(templateData);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async customerRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      let customer = await Customer.create({
        username,
        email,
        password,
        isPremium: false,
        phoneNumber,
        address,
      });
      res.status(201).json({ customer });
    } catch (err) {
      next(err);
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

      let access_token = createToken({ id: customer.id, email: customer.email });
        sendEmail(email)
      res
        .status(200)
        .json({ access_token, id: customer.id, username: customer.username, email: customer.email, isPremium: customer.isPremium });
    } catch (err) {
      console.log(err);
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
      const { email, password } = req.body
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
      console.log(err)
      next(err);
    }
  }
}
module.exports = ControllerPublic;
