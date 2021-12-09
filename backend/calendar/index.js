const db = require('../db');
const coursesQuery = 'SELECT * FROM courses WHERE code::INTEGER BETWEEN 100 AND 121';


async function calendarList(req, res) {
    let coursesQueryResult = await db.query(coursesQuery);
    res.render("calendarTime.ejs", { calendarList: coursesQueryResult.rows});
    return;
}



module.exports = {
    calendarList
}
