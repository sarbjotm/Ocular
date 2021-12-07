const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 8080;

let app = express();

const pp_config = require('./passport');
const db = require('./db');
const useSessions = require('./users/sessions').useSessions;
const userRouter = require('./users/routes');
const courseRouter = require('./courses/routes');

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// for development only (view prototyping)
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

pp_config(passport, db);
useSessions(app, passport, db);

app.get('/', (req, res) => {
    res.send("Hi");
});

app.use('/users', userRouter);

app.use('/courses', courseRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
