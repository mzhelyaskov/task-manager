const crypto = require('crypto');

module.exports = {
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function (password, salt) {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    }
};