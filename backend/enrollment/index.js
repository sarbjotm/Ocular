const db = require('../db');

// SQL queries
const allCourses = 'SELECT * FROM courses ORDER BY course_id';
const allCourseNames = 'SELECT course_id FROM courses ORDER BY course_id';
const existingAccountQuery = 'SELECT username FROM users WHERE username=$1;';
const existingCourseQuery = 'SELECT course_id FROM courses WHERE course_id=$1';

async function courseList(req, res) {
    let courseList = await db.query(allCourseNames);
    res.render("availableCourseList.ejs", { eList: courseList.rows });
    return;
}

async function enrollRegister(req, res) {
    let courseList = await db.query(allCourseNames);

    res.render("enrollRegister.ejs", {
        alist: courseList.rows
    });
    return;
}

async function enrollCheck(req, res) {

    // // Validating username
    // let accountExists = await db.query(existingAccountQuery, [req.body.username]);
    // if (accountExists.rows.length == 0) {
    //     return res.send("Error, user does not exist in the user database.");
    // }

    // Validating course
    let prereqCheck = await db.query(existingCourseQuery, [req.body.course_id]);
    if (prereqCheck.rows.length == 0) {
        return res.send("Error, course does not exist in the course list.");
    }

    return res.send("POST works.")
}

module.exports = {
    courseList,
    enrollRegister,
    enrollCheck
}