const db = require('../db');
const coursesQuery = 'SELECT * FROM courses;';

async function calendarList(req, res) {
    let coursesQueryResult = await db.query(coursesQuery);
    res.render("calendarTime.ejs", { calendarList: coursesQueryResult.rows });
    return;
}

module.exports = {
    calendarList
}
