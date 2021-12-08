let router = require('express').Router();
const calendar = require('./index');

router.get('/', calendar.courseList); // testing route for checking json is successfully loaded to database table


module.exports = router;
