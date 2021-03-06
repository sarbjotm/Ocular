const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const loginQuery = 'SELECT u.id, u.email, u.password, u.type, u.is_approved FROM users u WHERE u.username=$1;';
// Contains all fields which are put into req.user
const deserializeQuery = 'SELECT id, username, email, type FROM users WHERE id=$1;';

module.exports = (passport, database) => {
    passport.use(new LocalStrategy(async (username, password, callback) => {
       try {
           const result = await database.query(loginQuery, [username])
           if (result.rows.length < 1) {
               // Username not found in the system or not approved
               return callback(null, false, { message: 'Incorrect username or password.' });
           }
           const resRow = result.rows[0]
           bcrypt.compare(password, resRow.password, (err, result) => {
               if (result) {
                   if (resRow.is_approved) {
                        return callback(null, { 
                            id: resRow.id,
                            username: username,
                            email: resRow.email,
                            type: resRow.type
                        });
                   } else {
                       return callback(null, false, { message: 'Your account is not approved. Please contact an administrator for assistance.' });
                   }                    
               } else {
                    // Password does not match hashed value
                    return callback(null, false, { message: 'Incorrect username or password.' });
               }
           })
       } catch(err) {
           console.log(err.stack)
           // Internal Server Error
           callback(null, false);
       } 
    }));

    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser(async (id, callback) => {
        try {
            const result = await database.query(deserializeQuery, [parseInt(id, 10)]);
            callback(null, result.rows[0]);
        } catch (err) {
            callback(err);
        }
    });
}