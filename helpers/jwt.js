const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    createToken: (payload) => jwt.sign(payload,'creativitae'),
    decodeToken: (payload) => jwt.verify(payload,'creativitae')
}