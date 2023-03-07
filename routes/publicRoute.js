const express = require('express')
const ControllerCustomer = require('../controllers/login-first/controllerCustomer')
const ControllerPublic = require('../controllers/public/controllerPublic')
const { authenticationCustomer } = require('../middlewares/auth')
const publicRoute = express.Router()

// Auth
publicRoute.post('/register', ControllerPublic.customerRegister)
publicRoute.post('/login', ControllerPublic.customerLogin)
publicRoute.get('/verify/:uniqueString', ControllerPublic.verify)

// Create and fetch MyTemplates
publicRoute.use(authenticationCustomer)
publicRoute.post('/mytemplates/:templateId', ControllerCustomer.createMyTemplate)
publicRoute.get('/mytemplates/:templateId', ControllerCustomer.getTemplateById)
publicRoute.get('/mytemplates', ControllerCustomer.getMyTemplate)

// Create, fetch, edit CustomerDetail
publicRoute.post('/mydetail', ControllerCustomer.createCustomerDetail)
publicRoute.get('/mydetail', ControllerCustomer.getCustomerDetail)
publicRoute.put('/mydetail', ControllerCustomer.editCustomerDetail)
// publicRoute.patch('/mydetail', ControllerCustomer.patchPremiumUser)


module.exports = publicRoute


