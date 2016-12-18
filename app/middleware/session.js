var session = require('express-session');
var SessionStore = require('connect-session-sequelize')(session.Store);
var hour = 1000 * 60 * 60;

function extendDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId
    }
}

module.exports = session({
    name: 'sid',
    secret: 'keyboard cat',
    cookie: {maxAge: hour},
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new SessionStore({
        db: require('../models').sequelize,
        table: 'Session',
        extendDefaultFields: extendDefaultFields
    })
});

