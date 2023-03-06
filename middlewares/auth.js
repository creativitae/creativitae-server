const { decodeToken } = require("../helpers/jwt");
const { Admin, Customer, CustomerDetail, CustomerDetailTemplate, Order, Receipt, Template } = require("../models");

const authenticationCustomer = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { status: 401, msg: "Please login first" };

    const dataToken = decodeToken(access_token);

    const customer = await Customer.findByPk(dataToken.id);

    if (!customer) throw { status: 401, msg: "Invalid access token" };
    req.customer = customer;

    next();
  } catch (error) {
    next(error);
  }
};
const authenticationAdmin = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { status: 401, msg: "Please login first" };

    const dataToken = decodeToken(access_token);

    const admin = await Admin.findByPk(dataToken.id);

    if (!admin) throw { status: 401, msg: "Invalid access token" };
    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};
const authorization = async (req, res, next) => {
  // try {
  //   const foodData = await Food.findByPk(+req.params.id);
  //   if (!foodData) throw { status: 404, msg: "Food not found" };
  //   if (+req.user.id !== foodData.authorId && req.user.role !== "admin") {
  //     throw { status: 403, msg: "You are forbidden to perform this" };
  //   }
  //   next();
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = { authenticationAdmin, authenticationCustomer };
