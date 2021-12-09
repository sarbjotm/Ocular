const db = require('../db');
const coursesQuery = 'SELECT * FROM courses WHERE code::INTEGER BETWEEN 100 AND 121';
const courseTimes = []

async function calendarList(req, res) {
    let coursesQueryResult = await db.query(coursesQuery);
    for (let i = 0; i < calendarList.length; i++){
      courseTimes.push("11:00 - 12:00")
    }

    res.render("calendarTime.ejs", { calendarList: coursesQueryResult.rows, courseTimes: courseTimes });
    return;
}



module.exports = {
    calendarList
}
