const { where } = require("sequelize");
const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey:
    "xnd_development_CRdqFF8HGkmWVKSErMAAIS6voYxkQgVfagoWycRs8RyB8gAS97YWFsewam",
});
const {
  Admin,
  Customer,
  CustomerDetail,
  CustomerDetailTemplate,
  CustomerTemplate,
  Order,
  Receipt,
  Template,
} = require("../../models");
const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);

class xenditController {
  static async createTransaction(req, res, next) {
    try {
      let data = await i.createInvoice({
        externalID: `${req.customer.id}`,
        payerEmail: `${req.customer.email}`,
        description: "Get Premium",
        amount: 15000,
        customer: {
          given_names: `${req.customer.username}`,
          surname: `${req.customer.username}`,
          email: `${req.customer.email}`,
          mobile_number: `${req.customer.phoneNumber}`,
        },
        shouldSendEmail: true,
        successRedirectURL: "http://localhost:5173/",
        failureRedirectURL: "http://localhost:5173/",
        currency: "IDR",
      });
      let order = await Order.create({
        name: data.id,
        statusPayment: false,
      });
      let totalReceipt = await Receipt.findAll({
        where: {
          CustomerId: req.customer.id,
        },
      });
      if (totalReceipt.length)
        throw { status: 400, msg: "You already have payment ongoing" };
      await Receipt.create({
        CustomerId: req.customer.id,
        OrderId: order.id,
      });
      res.status(201).json(data);
    } catch (error) {
      if (error.status === 400) {
        res.status(400).json(error);
      }
      next(error);
    }
  }

  static async readTransaction(req, res, next) {
    try {
      let receiptData = await Receipt.findOne({
        where: { CustomerId: req.customer.id, },
        include: Order,
      });
      if (!receiptData) throw { status: 400, msg: 'Receipt not found'}
      const Invoice = await i.getInvoice({
        invoiceID: receiptData.Order.name,
      });
      // let status = "";
      // if (Invoice.status === "PAID") status = true;
      // else status = false;
      await Order.update({ statusPayment: true,},{where: {
name: receiptData.Order.name,},});
      let receiptOrder = await Receipt.findOne({
        where: { CustomerId: req.customer.id },
        include: Order,
      });
      res.status(200).json(receiptOrder);
    } catch (error) {
      console.log(error)
      if (error.status === 404) {
        res.status(404).json(error);
      }
      next(error);
    }
  }
}

module.exports = xenditController;
