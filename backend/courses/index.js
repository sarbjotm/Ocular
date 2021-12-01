const db = require('../db');

const coursesQuery = 'SELECT * FROM courses;';

async function courseList(req, res) {
    let coursesQueryResult = await db.query(coursesQuery);
    res.render("courseList.ejs", { courseList: coursesQueryResult.rows });
    return;
}

module.exports = {
    courseList,
}
