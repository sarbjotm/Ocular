let router = require('express').Router();
const courses = require('./index');

router.get('/', courses.courseList); // testing route for checking json is successfully loaded to database table

router.get('/info/:area/:code', courses.getCoursePrerequisite);

module.exports = router;
