const db = require('../db');

// SQL queries
const allCourses = 'SELECT * FROM courses ORDER BY code::INTEGER ASC';
const allCourseNames = 'SELECT area, code FROM courses ORDER BY code::INTEGER ASC';

async function courseList(req, res) {
    let courseList = await db.query(allCourseNames);
    res.render("availableCourseList.ejs", { eList: courseList.rows });
    return;
}

module.exports = {
    courseList
}