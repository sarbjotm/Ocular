let router = require('express').Router();
const enrollment = require('./index');
const accessControl = require('../users/accessControl');

router.use(accessControl.requiresLogin);

router.get('/', (req, res) => {
    res.render('enrollLanding');
});

router.get('/list', enrollment.courseList);

router.get('/enroll', enrollment.enrollRegister);

router.post('/enroll', enrollment.enrollCheck);

module.exports = router;