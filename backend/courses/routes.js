let router = require('express').Router();
const courses = require('./index');

router.get('/', courses.courseList); // testing route for checking json is successfully loaded to database table

module.exports = router;
