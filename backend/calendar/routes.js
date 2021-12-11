let router = require('express').Router();
const calendar = require('./index');

router.get('/', calendar.calendarList); // testing route for checking json is successfully loaded to database tab


module.exports = router;
