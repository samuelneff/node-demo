var _ = require('underscore');
var fs = require('fs');
var http = require('http');
var request = require('request');

// first argument is always node.ee
// second argument is always name of your script
// remove them since won't don't need them
var args = process.argv.slice(2);

console.log(args);

var command = _.first(args);

execute(command);

function execute(command) {

	switch(command) {

		case "get":

			console.log("http get execute");

			var url = args[1];

			request.get(url, function(error, response, body) {
				console.log(body);
			});
			break;

		case "post":

			console.log("http post execute");

			var filePath = args[1];
			var url = args[2];

			fs.createReadStream(filePath).pipe(request.post(url, function(error, response, body) {
				console.log(body);
			}));

			break;

		default:
			console.log("Invalid command " + command);

	}

}