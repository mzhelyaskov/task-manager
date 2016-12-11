var express = require('express');
var router = express.Router();

var auth = require('./controllers/auth');
var users = require('./controllers/users');
var projects = require('./controllers/projects');

router.get('/', function (req, res) {
    res.redirect('/projects');
});
router.get('/login', auth.login);
router.post('/login', auth.authorize);
router.get('/logout', auth.logout);
router.get('/register', auth.register);

// users routes
router.get('/users', users.getAll);
router.post('/users', users.create);
router.get('/users/:id', users.getOne);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

// projects routes
router.get('/projects', projects.getAll);
router.post('/projects', projects.create);
router.delete('/projects', projects.delete);
router.get('/projects/:id', projects.getOne);
router.put('/projects/:id', projects.update);
router.delete('/projects/:id', projects.delete);

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
