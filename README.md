Node Demo
=========

# Agenda

1. Setting up
2. Console Application
3. Node Web Basics
4. Making a Web Server
5. Modules in Node
6. Restful API in Node
7. Socket.IO

# Setting up

1. Clone the repository

	<pre>
	git clone https://github.com/blinemedical/node-demo.git
	</pre>

2. Open demo directory.
3. Run `npm install`
4. Run `bower install`

# Console Application

Demonstrate how to write a simple console application using Node.

# Node Web Basics

## Difference between node in terms of threading

## Code Example

```javascript
	var http = require('http'); 

	var server = http.createServer(function(req, res) {
		//server code
	})

	server.listen(8081);
	console.log('server listening on 8081');
```
	

# Making a Web Server

```javascript
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
```

# Modules in Node

* Demonstrate how to create modules
* Show how to use modules in different parts of application
* Each file is its own scope, pass data through exports

# Restful API with Database in Node

* Show how to write a Restful API
* Demonstrate how to connect to a SQLite database 

# Socket.IO

* Cover code sample and how everything is hooked up
* Show off Socket.IO

# Workshop

* Build from existing demos or scratch.
* Demos at the end of the workshop.