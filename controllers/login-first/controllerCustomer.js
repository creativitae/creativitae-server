const { compare } = require("../../helpers/bcryptjs");
const { createToken } = require("../../helpers/jwt");
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

class ControllerCustomer {
  static async getMyTemplate(req, res, next) {
    try {
      let myTemplateData = await CustomerTemplate.findAll({
        where: {
          CustomerId: req.customer.id
        },
        include: Template
      })
      res.status(200).json(myTemplateData)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async getTemplateById(req, res, next) {
    try {
      let templateData = await Template.findOne({
        where: {
          id: req.params.templateId,
        },
        include: Admin
      });
      if (!templateData) throw ({ status: 404, msg: "Template not found" });
      req.template = templateData
      res.status(200).json(templateData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async createMyTemplate(req, res, next) {
    try {
      let templateData = await Template.findOne({
        where: { id: req.params.templateId },
      });
      let findCustomer = await Customer.findOne({
        where: { id: req.customer.id }
      })
      if (templateData?.isPremium && !(findCustomer?.isPremium)) throw { status: 403, msg: "You need upgrade to premium to unlock this design"}
      if (!templateData) throw { status: 404, msg: "Template not found" };
      let findMyTemplate = await CustomerTemplate.findAll({
        where: {
          CustomerId: req.customer.id,
          TemplateId: req.params.templateId,
        },
        include: Customer
      });
      if (findMyTemplate.length > 0) {
        throw { status: 400, msg: "Template already in your template list" };
      }
      let findTotalTemplate = await CustomerTemplate.findAll({
        where: {
          CustomerId: req.customer.id
        },
        include: Customer
      })
      if (findTotalTemplate.length) {
        if (!(findTotalTemplate[0]?.Customer?.isPremium)) {
          throw { status: 400, msg: "Free user can only have one CV, create unlimited CV with premium perks"}
        }
      }
      let myTemplateData = await CustomerTemplate.create({
        CustomerId: req.customer.id,
        TemplateId: req.params.templateId,
      });
      res.status(201).json(myTemplateData);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async patchPremiumUser(req, res, next) {
    try {
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async getCustomerDetail(req, res, next) {
    try {
      let custDetail = await CustomerDetail.findOne({
        where: {
          CustomerId: req.customer.id
        },
        include: Customer
      })
      res.status(200).json(custDetail)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async createCustomerDetail(req, res, next) {
    try {
      let findCustomerDetail = await CustomerDetail.findOne({where: {CustomerId: req.customer.id}})
      if (findCustomerDetail) {
          throw {status: 403, msg: "You already have your detail, you can edit it instead"}
      }
      let { fullName, summary, educations, workExperiences, languages, skills, certifications } = req.body;
      if (!fullName) fullName = ''
      if (!summary) summary = ''
      if (!educations) educations = '[{}]'
      else educations = JSON.stringify(educations)
      if (!workExperiences) workExperiences = '[{}]'
      else workExperiences = JSON.stringify(workExperiences)
      if (!languages) languages = '[{}]'
      else languages = JSON.stringify(languages)
      if (!skills) skills = '[{}]'
      else skills = JSON.stringify(skills)
      if (!certifications) certifications = '[{}]'
      else certifications = JSON.stringify(certifications)

      let custData = await CustomerDetail.create({
        fullName, summary, educations, workExperiences, languages, skills, certifications, CustomerId: req.customer.id
      });
      res.status(201).json(custData);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async editCustomerDetail(req, res, next) {
    try {
      let { fullName, summary, educations, workExperiences, languages, skills, certifications } = req.body;
      if (!fullName) fullName = ''
      if (!summary) summary = ''
      if (!educations) educations = '[{}]'
      else educations = JSON.stringify(educations)
      if (!workExperiences) workExperiences = '[{}]'
      else workExperiences = JSON.stringify(workExperiences)
      if (!languages) languages = '[{}]'
      else languages = JSON.stringify(languages)
      if (!skills) skills = '[{}]'
      else skills = JSON.stringify(skills)
      if (!certifications) certifications = '[{}]'
      else certifications = JSON.stringify(certifications)

      let customerDetailData = await CustomerDetail.findOne(
        { where: { CustomerId: req.customer.id } },
        { returning: true }
      );
      if (!customerDetailData) throw { status: 404, msg: "You don't have detail yet, please create one" };
      await CustomerDetail.update(
        {
          fullName, summary, educations, workExperiences, languages, skills, certifications
        },
        {
          where: {
            CustomerId: req.customer.id,
          },
        }
      );
      res.status(200).json({
        message: `Your detail updated successfully.`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

module.exports = ControllerCustomer;
