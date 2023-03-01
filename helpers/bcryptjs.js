var bcrypt = require('bcryptjs');

module.exports = {
    hash: (password) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash
    },
    compare: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword); 
    }
}