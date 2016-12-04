
exports.login = function (res, req, next) {
    req.render('login');
};

exports.logout = function (res, req, next) {
    req.end('logout');
};

exports.register = function (res, req, next) {
    req.end('register');
};