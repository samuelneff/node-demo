
var express = require('express');

var app = express();

// request -> middleware (as many as you want) -> node server response
app.use(logger);

// stop requests at the point where it's added in middleware stack
app.use(denied);


app.get('/', function(req, res) {
	res.send('Hello World!');
})

var server = app.listen(3000, function() {
	console.log("Listening on port %d", server.address().port);
})

function logger(req, res, next) {
	console.log("%s %s", req.method, req.url);
	next();
}

function denied(req, res, next) {	
	res.end("Denied!");
}