var http = require('http');
var fs = require('fs');
var path = require('path');

// detect mime types for files
//var mime = require('mime');

var server = http.createServer(function(req, res) {
	serveStatic(res, "index.html");
})

function serveStatic(response, absolutePath) {
	if (fs.exists(absolutePath, function(exists) {

		if (exists) {
			fs.readFile(absolutePath, function (err, data) {
				if (err) {
					send404(response);
				} else {

					// assume html, can make it more complicated by using mime types
					response.writeHead(200, {'Content-Type' : 'text/html'});
					response.end(data);

				}
			});
		} else {
			send404(response);
		}

	}));
}

function send404(response) {
	res.writeHead(404, {'Content-Type' : 'text/plain'});
	res.end('404 : not found');	
}

server.listen(8081);
console.log('server listening on 8081');
