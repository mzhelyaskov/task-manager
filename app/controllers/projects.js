var Project = require('../models').Project;
var User = require('../models').User;
var ProjectType = require('../models').ProjectType;

exports.getAll = function (req, res) {
    Project.findAll({
        include: [
            { model: User, as: 'lead' },
            { model: ProjectType, as: 'type' }
        ]
    }).then(function(projects) {
        res.render('projects/project-list', {
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

exports.create = function (req, res) {
    //TODO доделать получение project_lead из формы
    Project.create({
        name: req.body.name,
        key: req.body.key,
        description: req.body.description,
        project_lead: req.user.id, 
        project_type: req.body.typeId
    }).then(function() {
        res.end();
    });
};

exports.getOne = function (req, res) {
    res.end('getOne');
};

exports.update = function (req, res) {
    res.end('update');
};

exports.delete = function (req, res) {
    res.end('delete');
};

exports.getNewProjectForm = function(req, res) {
    ProjectType.findAll().then(function(types) {
        res.render('projects/new-project-form', {
            title: 'Create New Project',
            types: types.map(function(type) {
                return {
                    id: type.id,
                    name: type.name,
                    icon: type.icon
                }
            }),
            errors: {},
            fields: {}
        });
    });
};