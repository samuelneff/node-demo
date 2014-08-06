var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var _ = require('underscore');

var disAllowedPaths = ['node_modules'];

var server = http.createServer(function(req, res) {

	if (req.url == "/") {

		listDir(res, ".", "");

	} else {

		var absolutePath = __dirname + req.url;
		fs.stat(absolutePath, function(err, stat) {

			if (stat.isDirectory()) {
					listDir(res, absolutePath, req.url);
			} else {
					serveStatic(res, absolutePath);
			}

		});

		console.log(req.url);
		serveStatic(res, __dirname + req.url);
	}

});

function listDir(res, dirPath, relativePath) {

	fs.readdir(dirPath, function(err, data) {
		if (err) {
			send404(res);
			return;
		}

		var filteredData = _.filter(data, function(item) {
				return disAllowedPaths.indexOf(item) < 0;
		});

		var links = _.reduce(filteredData, function(allLinks, item) {
			return allLinks + "<a href='" + relativePath + "/" + item + "'>" + item +"</a><br />";
		}, "");

		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.write("<html><body>");
		res.write(links);
		res.write("</body></html>");
		res.end();

	});

}


function serveStatic(response, absolutePath)
{

	if (!path) {
		send404(response);
		return;
	}

	fs.exists(absolutePath, function(exists)
	{
		if (!exists)
		{
			send404(response);
			return;
		}

		fs.readFile(absolutePath, function (err, data)
		{
			if (err)
			{
				send404(response);
				return;
			}

			var mimeType = mime.lookup(path.basename(absolutePath));
			response.writeHead(200, {'Content-Type' : mimeType});
			response.end(data);
		});
	});
}

function send404(response)
{
	response.writeHead(404, {'Content-Type' : 'text/plain'});
	response.end('404 : not found');
}

server.listen(3000);
console.log('server listening on 8081');
