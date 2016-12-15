var User = require('../models').User;
var util = require('util');

exports.login = function (req, res, next) {
    res.render('login', {message: ''});
};

exports.authorize = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.authorize(username, password, function (err, user) {
        if (err) {
            if (typeof err === 'string') {
                res.render('login', {message: err});
            } else {
                next(err);
            }
            return;
        }
        res.redirect('/');
    });
};

exports.logout = function (req, res, next) {
    res.end('logout');
};

exports.register = function (req, res, next) {
    res.render('register', {
        message: '',
        errors: {},
        fields: {}
    });
};

exports.createAccount = function(req, res, next) {
    console.log('Создаем нового пользователя в баще данных');
};