const db = require('../db');

const bcrypt = require('bcrypt');
let saltRounds = 10;

let newAccountQuery = 'INSERT INTO users (username, password, email, type) VALUES ($1, $2, $3, $4);';

function createAccount(req, res) {
    // Validate email
    // Validate username
    // Validate password (special characters/length requirements)

    // Check that no existing account matches email/username
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
        res.send("Logged out");
        // do something with result
    });
}

module.exports = {
    createAccount,
    logout
}