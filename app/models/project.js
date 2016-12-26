'use strict';
module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT
    }, {
        underscored: true,
        classMethods: {
            associate: function (models) {
                Project.belongsTo(models.User, {
                    foreignKey: 'project_lead',
                    as: 'lead'
                });
                Project.belongsTo(models.ProjectType, {
                    foreignKey: 'project_type',
                    as: 'type'
                });
            }
        }
    });
    return Project;
};