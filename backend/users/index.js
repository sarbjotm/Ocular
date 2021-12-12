const db = require('../db');

const bcrypt = require('bcrypt');
let saltRounds = 10;

const newAccountQuery = 'INSERT INTO users (username, password, email, type) VALUES ($1, $2, $3, $4);';
const existingAccountQuery = 'SELECT username FROM users WHERE username=$1;';
const listAccounts = 'SELECT username FROM users ORDER BY id ASC';
const unapprovedAccounts = 'SELECT * FROM users WHERE is_approved = 0';
const updateApproval = 'UPDATE users SET is_approved = 1 WHERE is_approved = 0';
const getGradesQuery = `SELECT 
    g.course_id, g.gpa, g.year, g.semester
    FROM users u, grades g
    WHERE u.id=$1 AND g.user_id = u.id;`;

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

async function createAccount(req, res) {
    // Validate email
    // This is general, can replace with a specific-domain email or other policy
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(req.body.email)) {
        return res.send("Email is not valid.");
    }
    // Validate username
    // Validate password (special characters/length requirements)

    // Check that no existing account matches email/username
    let accountAlreadyExists = await db.query(existingAccountQuery, [req.body.username]);
    if (accountAlreadyExists.rows.length > 0) {
        return res.send("Username already exists in system.");
    }

    // Generate salt and insert into database
    bcrypt.hash(req.body.password, saltRounds, (hashErr, hash) => {
        if (hashErr) return res.send("Failed to hash");
        db.query(newAccountQuery, [req.body.username, hash, req.body.email, 1], (err, dbRes) => {
            if (err) {
                console.error(err);
                return res.send("Something broke");
            }
            return res.send("Created new user");
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
        // do something with result
    });
}


async function viewProfile(req, res) {
    // req.user.id exists
    // query based on ID
    // grab:
    // email
    // type converted to name
    // all courses where user_id = ID in grades
    let userGrades = await db.query(getGradesQuery, [req.user.id]);
    return res.render('landing', { courses: userGrades.rows });
}

module.exports = {
    createAccount,
    logout,
    viewProfile,
    userList,
    adminValidate,
    batchVal
}