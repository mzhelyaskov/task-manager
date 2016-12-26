var userUtils = require('../utils/userUtils');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(
        'User', 
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [3],
                    is: /^[a-z0-9]+$/i
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                    min: 6
                }
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'first_name'
            },
            lastName : {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'last_name'
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hashedPassword: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'hashed_password'
            },
            password: {
                type: DataTypes.VIRTUAL,
                set: function (password) {
                    this.setDataValue('password', password);
                    this.setDataValue('salt', userUtils.makeSalt());
                    this.setDataValue('hashedPassword', userUtils.encryptPassword(password, this.salt));
                },
                validate: {
                    isLongEnough: function (password) {
                        if (password.length < 8) {
                            throw new Error("Password is too short")
                        }
                    }
                }
            }
        }, 
        {
            freezeTableName: true,
            underscored: true,
            getterMethods: {
                fullName: function() {
                    if (this.firstName && this.lastName) {
                        return this.firstName + ' ' + this.lastName;
                    }
                    return this.username;
                }
            },
            instanceMethods: {
                checkPassword: function (password) {
                    return userUtils.encryptPassword(password, this.salt) === this.hashedPassword;
                }
            },
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Project, {
                        foreignKey: 'project_lead',
                        as: 'lead'
                    });
                },
                authorize: function(username, password, callback) {
                    User.findOne({where: {username: username}}).then(function(user) {
                        if (user && user.checkPassword(password)) {
                            callback(null, user);
                        } else {
                            callback('User not found');
                        }
                    });
                }
            }
        }
    );

    return User;
};