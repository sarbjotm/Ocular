let router = require('express').Router();
const enrollment = require('./index');

router.get('/', (req, res) => {
    res.render('enrollLanding');
});

router.get('/list', enrollment.courseList);

module.exports = router;