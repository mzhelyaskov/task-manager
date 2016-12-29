var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
    res.redirect('/projects');
});
router.use('/', require('./auth'));
router.use('/projects', require('./projects'));

module.exports = router;

// issues routes
// router.get('/issues', );
// router.post('/issues', );
// router.delete('/issues', );
// router.get('/issues/:id', );
// router.put('/issues/:id', );

// comments routes
// router.get('/issues/:issue_id/comments', );
// router.post('/issues/:issue_id/comments', );
// router.put('/issues/:issue_id/comments/:comment_id', );
// router.delete('/issues/:issue_id/comments/:comment_id', );
