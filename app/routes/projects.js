var express = require('express');
var router = express.Router();
var newProjectFormValidation = require('./../validators/newProjectFormValidation');
var projects = require('./../controllers/projects');

router.use(require('./../middleware/checkAuth'));

router.get('/', projects.getAll);
router.get('/projects-for-page', projects.getProjectsForPage);
router.get('/new-project-form', projects.getNewProjectForm);

router.post('/', newProjectFormValidation, projects.create);
router.delete('/', projects.delete);

router.route('/:id')
    .delete(projects.delete)
    .get(projects.getOne)
    .put(projects.update);

module.exports = router;