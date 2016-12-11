
exports.login = function (req, res, next) {
    res.render('login');
};

exports.authorize = function (req, res, next) {
    console.log(req.body);
    res.end('authorize');
};

exports.logout = function (req, res, next) {
    res.end('logout');
};

exports.register = function (req, res, next) {
    res.render('register');
};