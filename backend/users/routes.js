let router = require('express').Router();
const accessControl = require('./accessControl');
const users = require('./index');
const passport = require('passport');

router.get('/', users.userList);

router.get('/new', (req, res) => {
    res.render('newuser');
});

router.post('/new', users.createAccount);

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

router.get('/reset', (req, res) => {
    res.render('reset');
});

router.post('/reset', users.forgotPassword);

router.get('/pchange', (req, res) => {
    res.render('pchange');
});

router.post('/pchange', users.changePassword);

// Admin authentication
router.get('/admin', accessControl.requiresAdmin, users.adminValidate);
router.post('/admin/batch', accessControl.requiresAdmin, users.batchVal);

router.get('/logout', accessControl.requiresLogin, users.logout);

router.get('/profile', accessControl.requiresLogin, users.viewProfile);

module.exports = router;