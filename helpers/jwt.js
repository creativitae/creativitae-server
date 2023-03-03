const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    createToken: (payload) => jwt.sign(payload, process.env.SECRET_JWT),
    decodeToken: (payload) => jwt.verify(payload, process.env.SECRET_JWT)
}