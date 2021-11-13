const express = require('express');
const passport = require('passport');

const PORT = process.env.PORT || 8080;

let app = express();

const pp_config = require('./passport');
const db = require('./db');

pp_config(passport, db);

app.get('/', (req, res) => {
    res.send("Hi");
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));