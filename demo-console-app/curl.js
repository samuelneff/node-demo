var _ = require('underscore');
var fs = require('fs');
var http = require('http');
var request = require('request');
var urlValidator = require('valid-url');

// first argument is always node.exe
// second argument is always name of your script
// remove them since won't don't need them
var args = process.argv.slice(2);

function execute() {

	var url;

	if (args.length == 1)
	{
			url = args[0];

			if (!urlValidator.isUri(url)) {
				console.log("Url " + url + " is not valid");
				return;
			}

			request.get(url, function(error, response, body) {
				console.log(body);
			});
	}
	else if (args.length == 2)
	{
			var filePath = args[0];
			url = args[1];

			if (!urlValidator.isUri(url)) {
				console.log("Url " + url + " is not valid");
				return;
			}

			fs.exists(filePath, function(exists) {

				if (!exists) {
					console.log("File at path " + filePath + " not found.");
					return;
				}

				fs.createReadStream(filePath).pipe(request.post(url, function(error, response, body) {

					if (!error) {
						console.log(body);
					}

				}));

			});
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
