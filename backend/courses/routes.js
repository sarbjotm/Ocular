let router = require('express').Router();
const courses = require('./index');

router.get('/', courses.courseList); // testing route for checking json is successfully loaded to database table

router.get('/info', courses.getCoursePrerequisite);

module.exports = router;
