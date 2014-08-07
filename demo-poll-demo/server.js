var express = require('express');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var logger = require('./lib/logger');

var app = express();

app.use(logger);
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/poll/:id', function(req, res) {
	res.sendfile(__dirname + '/public/poll.html');
});


var server = app.listen(process.env.PORT || 3000, function() {
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
