var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();

//app.configure(function(){
//    app.set('port', process.env.PORT || 3000);
//    app.set('views', __dirname + '/views');
//    app.set('view engine', 'ejs');
//    app.use(express.favicon());
//    app.use(express.logger('dev'));
//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//    app.use(app.router);
//    app.use(express.static(path.join(__dirname, 'public')));
//});


app.set('port', process.env.PORT || 3000);


app.get('/', function displayHome(req, res)
{
    res.type('html');
    res.sendfile('index.html');
});



http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " - visit http://localhost:3000/");
});