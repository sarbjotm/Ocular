const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

function useSessions(app, passport, database) {
    app.use(session({
        store: new pgSession({
            pool: database.pool,
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

    // for messages on the login page
    // based on https://github.com/passport/express-4.x-local-example
    app.use((req, res, next) => {
        let msgs = req.session.messages || [];
        res.locals.messages = msgs;
        res.locals.hasMessages = !! msgs.length;
        req.session.messages = [];
        next();
    });

    app.use(passport.initialize());
    app.use(passport.authenticate('session'));
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