// This file is loaded by default by the module resolver 
// unless overridden by package.json

// all middleware components take these function parameters
function logger(req, res, next) {
	console.log("%s %s", req.method, req.url);

	// next has to be called explicit otherwise you stall the whole stack
	next();
}

// if returning single function or variable
module.exports = logger;