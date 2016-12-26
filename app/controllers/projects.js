var Project = require('../models').Project;
var User = require('../models').User;
var ProjectType = require('../models').ProjectType;

exports.getAll = function (req, res, next) {
    Project.findAll({
        include: [
            { model: User, as: 'lead' },
            { model: ProjectType, as: 'type' }
        ]
    }).then(function(projects) {
        res.render('projects', {
            projects: projects.map(function(project) {
                return {
                    name: project.name,
                    key: project.key,
                    type: project.type.name,
                    lead: project.lead
                }
            })
        });
    });
};

exports.create = function (req, res, next) {
    console.log(req.body.name);
    console.log(req.body.description);
    //TODO validate data for new project
    //TODO Correct project creation code
    Project.create({
        name: req.body.name,
        key: 'SERVICE',
        description: req.body.description,
        project_lead: req.user.id,
        project_type: 1
    }).then(function(new_project) {
        console.log(new_project);
        res.redirect('/projects');
    });
};

exports.getOne = function (req, res, next) {
    res.end('getOne');
};

exports.update = function (req, res, next) {
    res.end('update');
};

exports.delete = function (req, res, next) {
    res.end('delete');
};