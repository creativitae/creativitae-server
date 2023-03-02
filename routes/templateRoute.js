const express = require('express')
const ControllerAdmin = require('../controllers/admin-only/controllerAdmin')
const ControllerCustomer = require('../controllers/login-first/controllerCustomer')
const ControllerPublic = require('../controllers/public/controllerPublic')
const { authenticationAdmin, authenticationCustomer } = require('../middlewares/auth') 
const templateRoute = express.Router()

templateRoute.get('/', ControllerPublic.getTemplate)
templateRoute.post('/', authenticationAdmin, ControllerAdmin.createTemplate)
templateRoute.get('/:templateId', authenticationCustomer, ControllerCustomer.getTemplateById)
templateRoute.put('/:templateId', authenticationAdmin, ControllerAdmin.editTemplate)
templateRoute.patch('/:templateId', authenticationAdmin, ControllerAdmin.patchTemplate)

module.exports = templateRoute


