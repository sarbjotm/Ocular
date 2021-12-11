const db = require('../db');

// SQL queries
const allCourses = 'SELECT * FROM courses ORDER BY code::INTEGER ASC';
const allCourseNames = 'SELECT area, code FROM courses ORDER BY code::INTEGER ASC';
const allAreas = 'SELECT area FROM courses ORDER BY code::INTEGER ASC';
const allCodes = 'SELECT code FROM courses ORDER BY code::INTEGER ASC';
const existingAccountQuery = 'SELECT username FROM users WHERE username=$1;';
const existingCourseQuery = 'SELECT area, code FROM courses WHERE area=$1, code=$2';

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

async function enrollCheck(req, res) {

    // // Validating username
    // let accountExists = await db.query(existingAccountQuery, [req.body.username]);
    // if (accountExists.rows.length == 0) {
    //     return res.send("Error, user does not exist in the user database.");
    // }

    // // Validating course
    // let prereqCheck = await db.query(existingCourseQuery, [req.body.area, req.body.code]);
    // if (prereqCheck.rows.length == 0) {
    //     return res.send("Error, course does not exist in the course list.");
    // }
    return res.send("POST works.")
}

module.exports = {
    courseList,
    enrollRegister,
    enrollCheck
}