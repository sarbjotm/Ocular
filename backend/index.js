const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

let app = express();

const pp_config = require('./passport');
const db = require('./db');
const useSessions = require('./users/sessions').useSessions;
const accessControl = require('./users/accessControl');
const users = require('./users');

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
pp_config(passport, db);
useSessions(app, passport, db);

app.get('/', (req, res) => {
    res.send("Hi");
});

app.post('/new', users.createAccount);

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send("Logged in");
});

app.get('/restricted', accessControl.requiresLogin, (req, res) => {
    res.send("This is a protected resource!");
});

app.get('/logout', accessControl.requiresLogin, users.logout);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));