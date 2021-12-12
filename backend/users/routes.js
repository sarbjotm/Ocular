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

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/users/profile');
});

/*
router.get('/restricted', accessControl.requiresLogin, (req, res) => {
    res.send("This is a protected resource!");
});
*/

// Admin authentication
router.get('/admin', accessControl.requiresAdmin, users.adminValidate);
router.post('/admin/batch', accessControl.requiresAdmin, users.batchVal);

router.get('/logout', accessControl.requiresLogin, users.logout);

router.get('/profile', accessControl.requiresLogin, users.viewProfile);

module.exports = router;