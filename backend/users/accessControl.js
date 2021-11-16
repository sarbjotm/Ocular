// Middleware/"decorators" for routes that require access control

function requiresLogin(req, res, callback) {
    if (req.user) return callback();
    res.send("Not logged in!");
    // do something for not-logged in users
}

function requiresAdmin (req, res, callback) {
    // rename roles as appropriate
    if (req.user && req.user.type == 'admin') return callback();
    // do something for not-admin users
}

module.exports = {
    requiresLogin,
    requiresAdmin
}