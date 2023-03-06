const jwt = require('jsonwebtoken')
// require('dotenv').config()
const JWT_SECRET_KEY = 'barium'

module.exports = {
    createToken: (payload) => jwt.sign(payload,'creativitae'),
    decodeToken: (payload) => jwt.verify(payload,'creativitae')
}