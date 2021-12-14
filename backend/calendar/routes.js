let router = require('express').Router();
const calendar = require('./index');
const accessControl = require('../users/accessControl');

router.use(accessControl.requiresLogin);

router.get('/', calendar.calendarList); // testing route for checking json is successfully loaded to database tab


module.exports = router;
