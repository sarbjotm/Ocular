const db = require('../db');

const bcrypt = require('bcrypt');
let saltRounds = 10;

const newAccountQuery = 'INSERT INTO users (username, password, email, type) VALUES ($1, $2, $3, $4);';
const updateAccountQuery = 'UPDATE users SET password = $2 WHERE username=$1 AND email=$3;';
const updatePasswordQuery = 'UPDATE users SET password = $2 WHERE username=$1;';
const existingAccountQuery = 'SELECT username FROM users WHERE username=$1;';
const existingEmailQuery = 'SELECT email FROM users WHERE email=$1;';
const listAccounts = 'SELECT username FROM users ORDER BY id ASC';
const unapprovedAccounts = 'SELECT * FROM users WHERE is_approved = false';
const updateApproval = 'UPDATE users SET is_approved = true WHERE is_approved = false';
const getGradesQuery = `SELECT 
    g.course_id AS cid, g.gpa AS gpa, g.year AS year, g.semester AS sem
    FROM users u, grades g
    WHERE u.id=$1 AND g.user_id = u.id
    ORDER BY g.year DESC, g.semester DESC;`;

async function userList(req, res) {
    db.query(listAccounts, (error, results) => {
        if (error) {
            console.error(error);
        }
        res.render("userList.ejs", { accList: results.rows })
    })
}

async function adminValidate(req, res) {
    db.query(unapprovedAccounts, (error, results) => {
        if (error) {
            console.error(error);
        }
        res.render("adminHome.ejs", { unapprovedList: results.rows })
    })
}

async function batchVal(req, res) {
    db.query(updateApproval, (error, results) => {
        if (error) {
            console.error(error);
        }
        res.render("batchApprove.ejs")
    })
}

const studentCode = 3;
async function createAccount(req, res) {
    // Validate email
    // This is general, can replace with a specific-domain email or other policy
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(req.body.email)) {
        return res.render("error.ejs", {
            message: "Email is not valid.",
            logged_in: false,
        });
    }
    // Validate username
    // Validate password (special characters/length requirements)

    // Check that no existing account matches email/username
    let accountAlreadyExists = await db.query(existingAccountQuery, [req.body.username]);
    if (accountAlreadyExists.rows.length > 0) {
        return res.render("error.ejs", {
            message: "Username already exists in system.",
            logged_in: false
        });
    }

    // Generate salt and insert into database
    bcrypt.hash(req.body.password, saltRounds, (hashErr, hash) => {
        if (hashErr) return res.render("error.ejs", {
            message: "Could not create new account (please contact an admin for assistance).",
            logged_in: false
        });
        db.query(newAccountQuery, [req.body.username, hash, req.body.email, studentCode], (err, dbRes) => {
            if (err) {
                console.error(err);
                return res.render("error.ejs", {
                    message: "Could not create new account (please contact an admin for assistance).",
                    logged_in: false
                });
            }
            return res.render("success.ejs", {
                message: `New user ${req.body.username} created.`,
                location: "/",
                link_description: "Back to the login screen."
            });
        });
    });
}

function logout(req, res, callback) {
    req.session.destroy((err) => {
        if (err) {
            return callback(err);
        }
        req.logout();
        res.redirect("/users/login");
    });
}

async function forgotPassword(req, res) {
    // Validate email
    // This is general, can replace with a specific-domain email or other policy
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(req.body.email)) {
        return res.render("error.ejs", {
            message: "Email is not valid.",
            logged_in: false,
        });
    }
    // Validate username
    // Validate password (special characters/length requirements)

    //if (incorrect email/username entered)

    // Check that existing account does match username
    let accountAlreadyExists = await db.query(existingAccountQuery, [req.body.username]);
    if (accountAlreadyExists.rows.length == 0) {
        return res.render("error.ejs", {
            message: "Username does not exist in system.",
            logged_in: false
        });
    }
    // Check that existing account does match email
    let emailAlreadyExists = await db.query(existingEmailQuery, [req.body.email]);
    if (emailAlreadyExists.rows.length == 0) {
        return res.render("error.ejs", {
            message: "Please provide all details (username, email) correctly.",
            logged_in: false
        });
    }
    // Generate salt and insert into database (for new password)
    bcrypt.hash(req.body.password, saltRounds, (hashErr, hash) => {
        if (hashErr) return res.render("error.ejs", {
            message: "Password reset was unsuccessful (please contact an admin for assistance).",
            logged_in: false
        });
        db.query(updateAccountQuery, [req.body.username, hash, req.body.email], (err, dbRes) => {
            if (err) {
                console.error(err);
                return res.render("error.ejs", {
                    message: "Password reset was unsuccessful (please contact an admin for assistance).",
                    logged_in: false
                });
            } else {
                return res.render("success.ejs", {
                    message: "Password change successful.",
                    location: "/",
                    link_description: "Back to the main menu."
                });
            }
        });
    });
}

async function changePassword(req, res) {
    // Validate username
    // Validate password (special characters/length requirements)

    //if (incorrect email/username entered)

    // Check that existing account does match username
    let accountAlreadyExists = await db.query(existingAccountQuery, [req.user.username]);
    if (accountAlreadyExists.rows.length == 0) {
        return res.render("error.ejs", {
            message: "Username does not exist in system.",
            logged_in: false
        });
    }
    // Generate salt and insert into database (for new password)
    bcrypt.hash(req.body.password, saltRounds, (hashErr, hash) => {
        if (hashErr) return res.render("error.ejs", {
            message: "Could not create new account (please contact an admin for assistance).",
            logged_in: false
        });
        db.query(updatePasswordQuery, [req.user.username, hash], (err, dbRes) => {
            if (err) {
                console.error(err);
                return res.render("error.ejs", {
                    message: "Password change was unsuccessful (please contact an admin for assistance).",
                    logged_in: false
                });
            } else {
                return res.render("success.ejs", {
                    message: "Password successfully changed.",
                    location: "/",
                    link_description: "Back to the login page."
                });;
            }
        });
    });
}

function groupYearSemester(accumulator, current) {
    if (!accumulator.hasOwnProperty(current.year)) {
        accumulator[current.year] = {};
    }
    if (!accumulator[current.year].hasOwnProperty(current.sem)) {
        accumulator[current.year][current.sem] = [];
    }
    let record = {
        id: current.cid,
        gpa: current.gpa
    };
    console.log(record);
    accumulator[current.year][current.sem].push(record);
    return accumulator;
}

async function viewProfile(req, res) {
    let userGrades = await db.query(getGradesQuery, [req.user.id]);
    //console.log(userGrades.rows);
    let courses = userGrades.rows.reduce(groupYearSemester, {});
    //console.log(courses);
    //console.log(courses['2012']['1'][0].id);
    return res.render('landing', {
        username: req.user.username,
        type: req.user.type,
        courses: courses
    });
}

module.exports = {
    createAccount,
    logout,
    viewProfile,
    userList,
    adminValidate,
    batchVal,
    forgotPassword,
    changePassword
}