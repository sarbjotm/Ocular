// Middleware/"decorators" for routes that require access control

function requiresLogin(req, res, callback) {
    if (req.user) return callback();
    return res.redirect('/users/login');
}

function requiresAdmin (req, res, callback) {
    // currently, admin has type ID = 1 (first entry)
    if (req.user && req.user.type == 1) return callback();
    return res.render("error.ejs", {
        message: "Not an admin!",
        logged_in: false
    });
}

function requiresNotLoggedIn(req, res, callback) {
    if (req.user) return res.render("error.ejs", {
        message: "Please log out before performing this operation (ie. creating a new user).",
        logged_in: true
    });
    return callback();
}

module.exports = {
    requiresLogin,
    requiresAdmin,
    requiresNotLoggedIn
}