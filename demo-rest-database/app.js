var express = require('express');
var http = require('http');

//needs initialization
var sqlite3 = require('sqlite3').verbose();
var users = require('./users');

var app = express();
var db = new sqlite3.Database('db/courses.dat');

app.set('actions', []);

users(app, db);

//app.configure(function(){
//    app.set('port', process.env.PORT || 3000);
//    app.set('views', __dirname + '/views');
//    app.use(express.favicon());
//    app.use(express.logger('dev'));
//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//    app.use(app.router);
//    app.use(express.static(path.join(__dirname, 'public')));
//});


app.set('port', process.env.PORT || 3000);
app.set('actions', []);
app.set('view engine', 'ejs');

app.get('/', function displayHome(req, res)
{
    //res.type('html');
    res.render('index');
});



http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " - visit http://localhost:3000/");
});