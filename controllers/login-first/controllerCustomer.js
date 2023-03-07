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
const querystring = require('querystring');
const axios = require('axios');
const BASE_URL = 'http://localhost:5173'
const fs = require('fs')
const upload = require('../../helpers/multer')
const cloudinary = require('../../helpers/cloudinary')

class ControllerCustomer {
  static async getMyTemplate(req, res, next) {
    try {
      let myTemplateData = await CustomerTemplate.findAll({
        where: {
          CustomerId: req.customer.id
        },
        include: Template
      })
      if (!myTemplateData.length) throw {status: 404, msg: 'Your template is empty'}
      res.status(200).json(myTemplateData)
    } catch (error) {
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
      if (templateData?.isPremium && !(findCustomer?.isPremium)) throw { status: 403, msg: "You need upgrade to premium to unlock this design" }
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
          throw { status: 400, msg: "Free user can only have one CV, create unlimited CV with premium perks" }
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
  // static async patchPremiumUser(req, res, next) {
    
  // }
  static async getCustomerDetail(req, res, next) {
    try {
      let custDetail = await CustomerDetail.findOne({
        where: {
          CustomerId: req.customer.id
        },
        include: Customer
      })
      if (!custDetail) throw {status: 404, msg: 'Customer not found'}
      res.status(200).json(custDetail)
    } catch (error) {
      next(error)
    }
  }
  static async createCustomerDetail(req, res, next) {
    try {
      let findCustomerDetail = await CustomerDetail.findOne({ where: { CustomerId: req.customer.id } })
      if (findCustomerDetail) {
        throw { status: 403, msg: "You already have your detail, you can edit it instead" }
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
  static async LinkedinLogin(req, res, next) {
    try {
      let client_id = "86o3pfdquzum55";
      let redirect_uri = `${BASE_URL}/callbacks`;
      let state = (Math.random() + 1).toString(36).substring(7);
      let scope = 'r_emailaddress r_liteprofile';
      res.status(200).json({
        url: 'https://www.linkedin.com/oauth/v2/authorization?' +
          querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
          })
      });
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async getAuthToken(req, res, next) {
    try {
      console.log(req.body, 'ini req body');
      let code = req.body.code
      let redirect_uri = `${BASE_URL}/callbacks`;
      let client_id = "86o3pfdquzum55"
      let client_secret = "m0mOlmIFPVGwZLud"
      let { data } = await axios({
        method: 'post',
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        headers: {
          Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
          code,
          redirect_uri,
          grant_type: 'authorization_code',
          client_secret
        },
      })
      res.status(200).json({ data })
      // console.log(data, 'ini data');
    } catch (err) {
      console.log(err, 'this');
    }
  }

  static async getMe(req, res, next) {
    try {
      let token = req.body.code
      // console.log(token, 'ini token di getme');
      let { data } = await axios({
        method: 'get',
        url: `https://api.linkedin.com/v2/me`,
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json'
        },
      })
      // console.log(data, 'userdata');
      res.status(200).json({ username: `${data.localizedFirstName} ${data.localizedLastName}` })
    } catch (err) {
      console.log(err.response.data, 'ERR');
    }
  }

  static async getEMail(req, res, next) {
    try {
      let token = req.body.code
      // console.log(token, 'ini token');
      let { data } = await axios({
        method: 'get',
        url: `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`,
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json'
        },
      })
      let dataEmail = data.elements[0]
      let emailLinkedin = dataEmail['handle~'].emailAddress
      // console.log({ email: emailLinkedin });

      // console.log(data2['handle~'].emailAddress , 'userdata');
      res.status(200).json({ email: emailLinkedin })
    } catch (err) {
      console.log(err.response.data, 'ERRs');
    }
  }

  static async linkedinFinalAuth(req, res, next) {
    try {
      // console.log('masukkk di register or login');
      let { payload } = req.body
      // console.log(payload, 'ini payload');
      let [created] = await Customer.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.username,
          email: payload.email,
          password: "customer-linkedin-login",
          isPremium: false,
          phoneNumber: '0902930293',
          address: 'jl. aaaaa no.23'
        },
        hooks: false,
      });

      let access_token = createToken({
        id: created.id,
        email: created.email,
      });
      // console.log({ access_token, id: created.id, username: created.username, email: created.email });
      res.status(200).json({ access_token, id: created.id, username: created.username, email: created.email, isPremium: created.isPremium });

    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const uploader = async (path) => await cloudinary.uploads(path, 'Images')
      if (req.method == 'POST') {
        const urls = []
        const files = req.files
        console.log(files);
        for (const file of files) {
          const { path } = file
          const newPath = await uploader(path)
          urls.push(newPath)
          fs.unlinkSync(path)
        }
        res.status(200).json({
          message: 'images uploaded succesfully',
          data: urls
        })
      } else {
        res.status(405).json({
          message: 'images not uploaded'
        })
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = ControllerCustomer;
