const db = require('../db');

// SQL queries
const allUserCourses = 'SELECT * FROM grades WHERE user_id=$1;';
const allCourseNames = 'SELECT course_id FROM courses ORDER BY course_id;';
const existingAccountQuery = 'SELECT username FROM users WHERE username=$1;';
const existingCourseQuery = 'SELECT course_id FROM courses WHERE course_id=$1;';
const prereqQuery = 'SELECT prerequisite FROM courses WHERE course_id=$1;';
const enrollCourse = 'INSERT INTO grades (user_id, course_id, year, semester) VALUES ($1, $2, $3,$4)'

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
    let userName = req.user.username;
    let userID = req.user.id;
    let courseID = req.body.course_id;

    // Validating username
    let accountExists = await db.query(existingAccountQuery, [userName]);
    if (accountExists.rows.length == 0) {
        return res.render("error.ejs",  {
            message: "Error, user does not exist in the user database.",
            logged_in: true
        });
    }

    // Validating course
    let prereqCheck = await db.query(existingCourseQuery, [courseID]);
    if (prereqCheck.rows.length == 0) {
        return res.render("error.ejs", {
            message: "Error, course does not exist in the course list.",
            logged_in: true,
        });
    }

    // Getting and Parsing the required courses
    let prereqCourses = await db.query(prereqQuery, [courseID]);
    let coursesNeeded = prereqCourses.rows[0]["prerequisite"].split(", ");

    // Getting and Parsing the taken courses
    let prevUserCourses = await db.query(allUserCourses, [userID]);
    let coursesTaken = [];
    if (prevUserCourses.rows.length != 0 ){
        for ( let i = 0 ; i < prevUserCourses.rows.length ; i++){
            coursesTaken.push(prevUserCourses.rows[i]["course_id"])
        }
    }

    if ( prereqCourses.rows[0]["prerequisite"] == ''){
        await db.query(enrollCourse, [userID, courseID, 2021, 3]);
        return res.send("No prerequisite courses needed. You have been enrolled");
    }
    
    for ( let i = 0 ; i < coursesNeeded.length ; i++){
        if ( coursesTaken.includes(coursesNeeded[i]) == false ){
            return res.render("error.ejs", {
                message: "You are missing some prerequisite courses that are needed.",
                logged_in: true,
            });
        }
    }
    await db.query(enrollCourse, [userID, courseID, 2021, 3]);
    return res.send("You have the prerequisite courses needed. You have been enrolled");
}

module.exports = {
    courseList,
    enrollRegister,
    enrollCheck
}