const db = require('../db');
const coursesQuery = 'SELECT course_id FROM grades where user_id = $1';
const timeQuery = 'SELECT times FROM courses where course_id = $1';


async function calendarList(req, res) {
    let id = req.user.id;
    let coursesQueryResult = await db.query(coursesQuery, [id]);
    let coursesTaken = [];
    if (coursesQueryResult.rows.length != 0 ){
        for ( let i = 0 ; i < coursesQueryResult.rows.length ; i++){
            coursesTaken.push(coursesQueryResult.rows[i]["course_id"])
        }
    }
    console.log("coursesTaken" , coursesTaken)

    let courseTimes = []

    for (var i = 0; i<coursesTaken.length ; i++) { //iterate through all enrolled courses
        let currCourse = coursesTaken[i];
        let timeQueryResult = await db.query(timeQuery, [currCourse]); 
        courseTimes.push({course_id:currCourse,times:timeQueryResult.rows[0]["times"]})
    }
    console.log("courseTimes" , courseTimes)

    res.render("calendarTime.ejs", { calendarList: courseTimes});
    return;
}

module.exports = {
    calendarList
}
