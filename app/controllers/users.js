
exports.getAll = function (res, req, next) {
    res.render('getAll');
};

exports.create = function (res, req, next) {
    res.render('create');
};

exports.getOne = function (res, req, next) {
    res.render('getOne');
};

exports.update = function (res, req, next) {
    res.render('update');
};

exports.delete = function (res, req, next) {
    res.render('delete');
};