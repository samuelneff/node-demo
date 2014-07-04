var express = require('express');
var socketio = require('socket.io');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var pollsApi = require('./lib/polls');

var app = express();

app.use(logger);
app.use(bodyParser.json());


app.use(serveStatic('public', {
	'index' : false,
	'setHeaders' : setHeaders
}))

function setHeaders(res, path) {
	//res.attachment(path);
}


app.post('/api/poll', pollsApi.create);
app.get('/api/polls', pollsApi.listPolls);
app.get('/api/poll/:id', pollsApi.getPoll);


var server = app.listen(3000, function() {
	console.log ("Server started at %d", server.address().port);
});

function logger(req, res, next) {
	console.log("%s %s", req.method, req.url);
	next();
}