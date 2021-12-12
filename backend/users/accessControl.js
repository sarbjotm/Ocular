// Middleware/"decorators" for routes that require access control

function requiresLogin(req, res, callback) {
    if (req.user) return callback();
    return res.redirect('/users/login');
}

function requiresAdmin (req, res, callback) {
    // currently, admin has type ID = 1 (first entry)
    if (req.user && req.user.type == 1) return callback();
    // do something for not-admin users
}

module.exports = {
    requiresLogin,
    requiresAdmin
}