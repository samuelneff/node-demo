//default Node modules
var http = require('http');

//Modules that need initialzation
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var users = require('./users');

//
var app = express();
var db = new sqlite3.Database('db/courses.dat');

users.init(app, db);

//Define actions
var actions = [];
actions.push(users.getActions());

//Configure the app
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.get('/', function displayHome(req, res)
{
    var appParams = {};
    appParams.actions = actions;
    res.render('index', appParams);
});



http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " - visit http://localhost:3000/");
});