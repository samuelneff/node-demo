var express = require('express');
var socketio = require('socket.io');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');


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
	res.sendfile(__dirname + '/public/poll.html');
});


var server = app.listen(3000, function() {
	console.log ("Server started at %d", server.address().port);
});


var io = socketio.listen(server);
io.on('connection', function(socket){

	console.log('client connected');	
	socket.broadcast.emit('server ready', { 'okay' : 'ready' });

});

var pollsApi = require('./lib/polls')(io);

// API
app.post('/api/poll', pollsApi.createPoll);
app.get('/api/polls', pollsApi.listPolls);
app.get('/api/poll/:id', pollsApi.getPoll);
app.put('/api/poll/:id', pollsApi.updatePoll);



function logger(req, res, next) {
	console.log("%s %s", req.method, req.url);
	next();
}