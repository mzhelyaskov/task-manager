
module.exports = function(req, res, next) {
    req.user = res.locals.user = {
        fullName: 'Mykhailo Zheliaskov'
    };
    next();
};