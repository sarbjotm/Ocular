const db = require('../db');

// SQL queries
const allCourses = 'SELECT * FROM courses ORDER BY code::INTEGER ASC';
const allCourseNames = 'SELECT area, code FROM courses ORDER BY code::INTEGER ASC';
const allAreas = 'SELECT area FROM courses ORDER BY code::INTEGER ASC';
const allCodes = 'SELECT code FROM courses ORDER BY code::INTEGER ASC';

async function courseList(req, res) {
    let courseList = await db.query(allCourseNames);
    res.render("availableCourseList.ejs", { eList: courseList.rows });
    return;
}

async function enrollRegister(req, res) {
    let areaList = await db.query(allAreas);
    let codeList = await db.query(allCodes);

    res.render("enrollRegister.ejs", {
        alist: areaList.rows,
        clist: codeList.rows
    });
    return;
}

module.exports = {
    courseList,
    enrollRegister
}