var ProjectType = require('../models').ProjectType;

module.exports = function(req, res, next) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('key', 'Key is required').notEmpty();
    req.checkBody('key', 'Key must be at least %1 characters long').len(3);
    req.checkBody('key', 'Should contains only uppercase character').matches(/^[A-Z]+$/, "i");
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('lead', 'Lead is required').notEmpty();
    req.checkBody('typeId', 'Type is required').notEmpty();

    req.getValidationResult().then(function(validationResult) {
        if (validationResult.isEmpty()) {
            next();
            return;
        }
        var templateParams = {
            title: 'Create New Project',
            errors: {},
            types: [],
            fields: req.body
        };
        validationResult.useFirstErrorOnly();
        templateParams.errors = validationResult.mapped();
        ProjectType.findAll().then(function(types) {
            templateParams.types = types.map(function (type) {
                return {
                    id: type.id,
                    name: type.name,
                    icon: type.icon
                }
            });
            res.render('projects/new-project-form', templateParams);
        });
    });
};