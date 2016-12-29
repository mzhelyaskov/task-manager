var express = require('express');
var router = express.Router();
var registrationFormValidator = require('./../validators/registrationFormValidator');
var auth = require('./../controllers/auth');

router.get('/login', auth.login);
router.post('/login', auth.authorize);
router.get('/logout', auth.logout);
router.get('/register', auth.register);
router.post('/register', registrationFormValidator, auth.createAccount);

module.exports = router;