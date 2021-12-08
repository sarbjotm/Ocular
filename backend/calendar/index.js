const db = require('../db');


async function calendarList(req, res) {
    res.render("calendarTime.ejs");
    return;
}

module.exports = {
    calendarList
}
