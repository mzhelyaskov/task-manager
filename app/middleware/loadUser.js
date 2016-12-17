var User = require('../models').User;

module.exports = function(req, res, next) {
    User.findById(req.session.userId).then(function(user) {
        req.user = res.locals.user = user;
        res.locals.authenticated = req.session.authenticated;
        next();
    });
};