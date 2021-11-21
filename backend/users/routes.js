let router = require('express').Router();
const accessControl = require('./accessControl');
const users = require('./index');
const passport = require('passport');

router.get('/new', (req, res) => {
    res.render('newuser');
});

router.post('/new', users.createAccount);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send("Logged in");
});

router.get('/restricted', accessControl.requiresLogin, (req, res) => {
    res.send("This is a protected resource!");
});

router.get('/logout', accessControl.requiresLogin, users.logout);

router.get('/profile', accessControl.requiresLogin, users.viewProfile);

module.exports = router;
