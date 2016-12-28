var Project = require('../models').Project;
var User = require('../models').User;
var ProjectType = require('../models').ProjectType;
var projectsConfig = require('../../config').get('projects');

exports.getAll = function (req, res) {
    res.render('projects/project-page');
};

exports.getProjectsForPage = function(req, res) {
    var page = +req.param('page');
    var query = req.param('query');
    var limit = projectsConfig.countLimitOnPage;
    var offset = (page - 1) * limit;
    Project.findAndCountAll({
        where: {name: {$like: '%' + query + '%'}},
        offset: offset,
        limit: limit,
        include: [
            { model: User, as: 'lead' },
            { model: ProjectType, as: 'type' }
        ]
    }).then(function(result) {
        var projects = result.rows;
        res.render('projects/projects-list',
            {
                projects: projects.map(function(project) {
                    return {
                        name: project.name,
                        key: project.key,
                        type: project.type.name,
                        lead: project.lead
                    }
                })
            },
            function(err, projectsHtml) {
                if (err) {
                    next(err);
                    return;
                }
                res.json({
                    totalPages: Math.ceil(result.count / limit),
                    projectsHtml: projectsHtml
                });
            }
        );
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