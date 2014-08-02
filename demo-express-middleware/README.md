# Node modules

* JavaScript does not specify a way to create modules for isolation of code.
* Node uses require, module, and exports for module dependency and isolation.
* Node modules can be a single file or a folder. If it's a folder then index.js is the default file it loads, can be overwritten by package.json.
* Absolute modules are specified with no path, they are found in `node_modules`.
<pre>
var fs = require('fs');
</pre>
* Relative modules require a JavaScript file with a path to where it resides.
<pre>
var auth = require('/lib/auth');
</pre>

# Express (Middleware)



# Tasks

In this exercise we want to build up middleware components.

1. Write a simple middle component that logs information for each request.
2. Put the middleware component in a separate module and reference it.
3. Write a simple authentication middleware component that authenticates by username/password (can be plain text & hard-cored).
