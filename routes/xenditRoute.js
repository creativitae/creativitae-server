const express = require('express')
const xenditController = require('../controllers/payment-xendit/xenditController')
const { authenticationCustomer } = require('../middlewares/auth')
const xenditRoute = express.Router()

xenditRoute.use(authenticationCustomer)
xenditRoute.post('/', xenditController.createTransaction)
xenditRoute.get('/', xenditController.readTransaction)

module.exports = xenditRoute