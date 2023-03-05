const { compare } = require("../../helpers/bcryptjs");
const { createToken } = require("../../helpers/jwt");
const {
  Admin,
  Customer,
  CustomerDetail,
  CustomerDetailTemplate,
  Order,
  Receipt,
  Template,
} = require("../../models");

class ControllerAdmin {
  static async createTemplate(req, res, next) {
    try {
      let { name, image, isPremium } = req.body;
      if (!name) throw { status: 400, msg: 'Please insert template name'}
      if (!image) throw { status: 400, msg: 'Please insert template image'}
      if (isPremium === null) throw { status: 400, msg: 'Please insert template premium status'}
      let templateData = await Template.create({
        name, image, isPremium, AdminId: req.admin.id, status: 'Active'
      });
      res.status(201).json(templateData);
    } catch (error) {
      next(error);
    }
  }
  static async editTemplate(req, res, next) {
    try {
      const { name, image, isPremium, status } = req.body;
      if (!name) throw { status: 400, msg: 'Please insert template name'}
      if (!image) throw { status: 400, msg: 'Please insert template image'}
      if (isPremium === null) throw { status: 400, msg: 'Please insert template premium status'}
      let templateData = await Template.findOne(
        { where: { id: req.params.templateId } },
        { returning: true }
      );
      if (!templateData) throw { status: 404, msg: "Template not found" };
      await Template.update(
        {
          name,
          image,
          isPremium,
          status
        },
        {
          where: {
            id: req.params.templateId,
          },
        }
      );
      res.status(200).json({
        message: `Template with name ${templateData.name}, updated successfully.`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async patchTemplate(req, res, next) {
    let editedTemplate;
    try {
      let templateData = await Template.findOne(
        {
          where: {
            id: req.params.templateId,
          },
        },
        { returning: true }
      );
      if (!templateData) throw { status: 404, msg: "Template not found"}
      // if (templateData.status === req.body.status || (templateData.isPremium === req.body.isPremium)) throw {status: 400, msg: `Template status already ${req.body.status}`}
      editedTemplate = templateData.name;
      await Template.update({status: req.body.status, isPremium: req.body.isPremium},{ where: { id: req.params.templateId } });
      res.status(200).json({ message: `${editedTemplate}'s status succesfully updated` });
    } catch (error) {
      next(error);
    }
  }
}


module.exports = ControllerAdmin;
