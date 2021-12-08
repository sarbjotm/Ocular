const db = require('../db');

const coursesQuery = 'SELECT * FROM courses;';
const prerequisiteQuery = 'SELECT prerequisite FROM courses WHERE area=$1 AND code=$2;';

async function courseList(req, res) {
    let coursesQueryResult = await db.query(coursesQuery);
    res.render("courseList.ejs", { courseList: coursesQueryResult.rows });
    return;
}

async function getCoursePrerequisite(req, res) {
    let area = req.params.area;
    let code = req.params.code;

    let prerequisiteQueryResult = await db.query(prerequisiteQuery, [area, code]);
    if (!prerequisiteQueryResult.rows.length) {
        res.status(404).send("Course cannot be found in system.");
        return;
    }

    res.json(prerequisiteQueryResult.rows[0]);
    return
}

module.exports = {
    courseList,
    getCoursePrerequisite
}
