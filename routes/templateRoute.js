const express = require('express')
const ControllerAdmin = require('../controllers/admin-only/controllerAdmin')
const ControllerCustomer = require('../controllers/login-first/controllerCustomer')
const ControllerPublic = require('../controllers/public/controllerPublic')
const upload = require('../helpers/multer')
const { authenticationAdmin, authenticationCustomer } = require('../middlewares/auth') 
const templateRoute = express.Router()

templateRoute.get('/', ControllerPublic.getTemplate)
templateRoute.post('/', authenticationAdmin, ControllerAdmin.createTemplate)
templateRoute.use('/upload-images', upload.array('image'), ControllerCustomer.uploadImage) // buat upload image ke cloudinary, nanti tambahin authen ya di y=taronya sebelum upload.array, ini buat coba jalan doang
templateRoute.get('/:templateId', authenticationCustomer, ControllerCustomer.getTemplateById)
templateRoute.put('/:templateId', authenticationAdmin, ControllerAdmin.editTemplate) 
templateRoute.patch('/:templateId', authenticationAdmin, ControllerAdmin.patchTemplate)
module.exports = templateRoute


