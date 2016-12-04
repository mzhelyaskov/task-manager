var express = require('express');
var router = express.Router();

/* GET projects page. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource projects');
});

module.exports = router;