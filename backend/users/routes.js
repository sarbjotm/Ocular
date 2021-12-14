let router = require('express').Router();
const accessControl = require('./accessControl');
const users = require('./index');
const passport = require('passport');

router.get('/', users.userList);

router.get('/new', accessControl.requiresNotLoggedIn, (req, res) => {
    res.render('newuser');
});

router.post('/new', accessControl.requiresNotLoggedIn, users.createAccount);

router.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/users/profile');
    }
    return res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureMessage: true
}));

router.get('/reset', accessControl.requiresNotLoggedIn, (req, res) => {
    res.render('reset');
});

router.post('/reset', accessControl.requiresNotLoggedIn, users.forgotPassword);

router.get('/pchange', accessControl.requiresLogin, (req, res) => {
    res.render('pchange');
});

router.post('/pchange', accessControl.requiresLogin, users.changePassword);

// Admin authentication
router.get('/admin', accessControl.requiresAdmin, users.adminValidate);
router.post('/admin/batch', accessControl.requiresAdmin, users.batchVal);

router.get('/logout', accessControl.requiresLogin, users.logout);

router.get('/profile', accessControl.requiresLogin, users.viewProfile);

module.exports = router;