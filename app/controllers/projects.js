
exports.getAll = function (req, res, next) {
    res.render('projects', {
        projects: [
            {
                title: 'Service',
                key: 'SERVICE',
                type: 'Software',
                lead: 'Krawczyk bartosz'
            },
            {
                title: 'Service',
                key: 'SERVICE',
                type: 'Software',
                lead: 'Krawczyk bartosz'
            },
            {
                title: 'Service',
                key: 'SERVICE',
                type: 'Software',
                lead: 'Krawczyk bartosz'
            },
            {
                title: 'Service',
                key: 'SERVICE',
                type: 'Software',
                lead: 'Krawczyk bartosz'
            }
        ]
    });
};

exports.create = function (req, res, next) {
    res.end('create');
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