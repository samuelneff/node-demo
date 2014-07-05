var express = require('express');
var socketio = require('socket.io');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var pollsApi = require('./lib/polls');

var app = express();

app.use(logger);
app.use(bodyParser.json());


app.use(serveStatic('public', {
	'index' : ['index.html'],
	'setHeaders' : setHeaders
}));

function setHeaders(res, path) {
	// set any headers we need
}

app.get('/poll/:id', function(req, res) {
	// how the heck do we pass the request to the response?
	res.sendfile(__dirname + '/public/poll.html');
});
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