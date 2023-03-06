const publicRoute = require("./publicRoute")
const templateRoute = require("./templateRoute")
// const userRoute = require('./usersRoute')
const express = require('express')
const ControllerPublic = require("../controllers/public/controllerPublic")
const router = express.Router()

router.post('/register', ControllerPublic.adminRegister)
router.post('/login', ControllerPublic.adminLogin)
router.use('/public', publicRoute)
router.use('/templates', templateRoute)
// router.use('/users', userRoute)
module.exports = router