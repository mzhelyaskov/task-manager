var User = require('../models').User;

module.exports = function(req, res, next) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('username', 'Username must be at least %1 characters long').len(3);

    req.checkBody('email', 'E-mail is required').notEmpty();
    req.checkBody('email', 'E-mail must be a valid email address').isEmail();

    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();

    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be at least %1 characters long').len(8);
    req.checkBody('password2', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password must be at least %1 characters long').len(8);

    req.getValidationResult().then(function(result) {
        var validationRes = {
            message: '',
            errors: {},
            fields: req.body
        };
        if (!result.isEmpty()) {
            result.useFirstErrorOnly();
            validationRes.errors = result.mapped();
            res.render('register', validationRes);
            return;
        }
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var password2 = req.body.password2;

        if (password !== password2) {
            validationRes.message = 'Passwords do not match';
            res.render('register', validationRes);
            return;
        }
        User.findOne({where: {$or: [{username: username}, {email: email}]}}).then(function(user) {
            if (user) {
                var field = user.username === username ? 'username' : 'email';
                var value = user.username === username ? username : email;
                validationRes.message = 'User with ' + field + ': "' + value + '" is already exists.';
                res.render('register', validationRes);
            } else {
                next();
            }
        });
    });
};