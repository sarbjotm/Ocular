# About the authentication system

## Testing

Using Postman/curl, POST /new with a x-www-urlencoded body containing a username, password, and email field. Use that username and password to login at POST /login. Verify that the /restricted route can be accessed. GET /logout to logout and verify that /restricted now says you need to login.

## Components

- passport - authentication middleware (called at login)
- passport-local - username/password strategy (way of verifying identity)
- bcrypt - "slow" cryptographic hashing (prevents timing-based attacks)
- express-session/connect-pg-simple: Session middleware (For now, I've decided to use sessions as client authentication as any JWT/token-based approach where a token is generated on login and deleted at logout is essentially the same thing as sessions but more insecure without tinkering with token timeout. Since we're not exposing an API intended for non-browser clients yet, we don't need token-based authentication yet.)

## View engine

Using EJS for now (due to familiarity), may port to React later

## Others