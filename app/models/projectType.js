'use strict';
module.exports = function (sequelize, DataTypes) {
    var ProjectType = sequelize.define('ProjectType', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: DataTypes.STRING
    }, {
        underscored: true,
        classMethods: {
            associate: function (models) {
                ProjectType.hasMany(models.Project, {
                    foreignKey: 'project_type'
                });
            }
        }
    });
    return ProjectType;
};