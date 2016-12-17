var express = require('express');
var router = express.Router();
var registrationFormValidator = require('./validators/registrationFormValidator');
var checkAuth = require('./middleware/checkAuth');
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
router.post('/register', registrationFormValidator, auth.createAccount);

// users routes
router.get('/users', checkAuth, users.getAll);
router.post('/users', checkAuth, users.create);
router.get('/users/:id', checkAuth, users.getOne);
router.put('/users/:id', checkAuth, users.update);
router.delete('/users/:id', checkAuth, users.delete);

// projects routes
router.get('/projects', checkAuth, projects.getAll);
router.post('/projects', checkAuth, projects.create);
router.delete('/projects', checkAuth, projects.delete);
router.get('/projects/:id', checkAuth, projects.getOne);
router.put('/projects/:id', checkAuth, projects.update);
router.delete('/projects/:id', checkAuth, projects.delete);

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
