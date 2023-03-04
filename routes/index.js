const publicRoute = require("./publicRoute")
const templateRoute = require("./templateRoute")
const xenditRoute = require('./xenditRoute')
const express = require('express')
const ControllerPublic = require("../controllers/public/controllerPublic")
const router = express.Router()

router.post('/register', ControllerPublic.adminRegister)
router.post('/login', ControllerPublic.adminLogin)
router.use('/public', publicRoute)
router.use('/templates', templateRoute)
router.use('/payment', xenditRoute)
module.exports = router