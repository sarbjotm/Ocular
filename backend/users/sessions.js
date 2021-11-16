const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

function useSessions(app, passport, database) {
    app.use(session({
        store: new pgSession({
            pool: database.pool,
            createTableIfMissing: true
        }),
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            // 1 hour
            maxAge: 3600 * 1000
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = {
    useSessions
}