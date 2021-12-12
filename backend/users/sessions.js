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
        proxy: true,
        cookie: {
            // 1 hour
            maxAge: 3600 * 1000
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

async function sessionToMetadata(req, res) {
    if (req.session && req.session.passport) {
        return res.status(200).json({
            user_id: req.session.passport.user
        });
    }
    return res.status(404).json({});
}

module.exports = {
    useSessions,
    sessionToMetadata
}