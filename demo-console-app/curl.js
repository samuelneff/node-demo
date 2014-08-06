var _ = require('underscore');
var fs = require('fs');
var http = require('http');
var request = require('request');

// first argument is always node.exe
// second argument is always name of your script
// remove them since won't don't need them
var args = process.argv.slice(2);

function execute() {

	var url = args[0];

	if (args.length == 1)
	{
			request.get(url, function(error, response, body) {
				console.log(body);
			});
	}
	else if (args.length == 2)
	{
			var filePath = args[0];
			url = args[1];

			fs.createReadStream(filePath).pipe(request.post(url, function(error, response, body) {
				console.log(body);
			}));
	}
	else
	{
			printUsage();
	}

}

function printUsage() {
	console.log("node curl <url>	- makes a http GET request to the specified URL");
	console.log("node curl <path-to-json-file> <url>	- makes a http POST request");
}

execute();
