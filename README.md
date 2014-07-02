Node Demo
=========

# Agenda

1. Setting up
1. Console Application
1. Node Web Basics
2. Making a Web Server
3. Modules in Node
4. Restful API in Node
5. Chat Client?

# Setting up

1. Create directory ‘mkdir NodeSample’, cd ‘NodeSample’
2. Type ‘npm init’
3. Edit created ‘package.json’
4. Type ‘npm install’
5. Create ‘app.js’ server file
6. Create webserver, and listen on port 8081

# Console Application



# Node Web Basics

## Difference between node in terms of threading



## Code Example
	var http = require('http'); 

	var server = http.createServer(function(req, res) {
		//server code
	})

	server.listen(8081);
	console.log('server listening on 8081');
	

# Making a Web Server

	function serveStatic(response, absolutePath)
	{
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

# Modules in Node

Each file is its own scope, pass data through exports

# Restful API with Database in Node

Involves SQLite database
Not Sequelize ORM

# Chat Client?

Show off Socket.IO