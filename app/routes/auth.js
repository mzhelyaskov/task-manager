var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
    res.end('logout');
});

/* GET register page. */
router.get('/register', function(req, res, next) {
    res.end('register');
});

module.exports = router;