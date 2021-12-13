const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 8080;

let app = express();

const pp_config = require('./passport');
const db = require('./db');
const useSessions = require('./users/sessions').useSessions;
const sessionToMetadata = require('./users/sessions').sessionToMetadata;
const userRouter = require('./users/routes');
const courseRouter = require('./courses/routes');
const calendarRouter = require('./calendar/routes');
const enrollmentRouter = require('./enrollment/routes');


app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// for development only (view prototyping)
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

pp_config(passport, db);
useSessions(app, passport, db);

app.use('/users', userRouter);

app.use('/courses', courseRouter);

app.use('/calendar', calendarRouter);

app.use('/enrollment', enrollmentRouter);

// usage: make a request with connect.sid=<session cookie> in the Cookie header 
app.get('/session', sessionToMetadata);

app.get('/', (req, res) => { res.redirect('/users/login'); });

app.use((req, res, next) => { res.status(404).send("Page does not exist.") });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
