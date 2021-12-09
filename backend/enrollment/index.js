const db = require('../db');

// SQL queries
const allCourses = 'SELECT * FROM courses ORDER BY code::INTEGER ASC';
const allCourseNames = 'SELECT area, code FROM courses ORDER BY code::INTEGER ASC';

async function courseList(req, res) {
    db.query(allCourseNames, (error, results) => {
        if (error) {
            console.error(error);
        }
        res.render("availableCourseList.ejs", { eList: results.rows })
    })
}

module.exports = {
    courseList
}