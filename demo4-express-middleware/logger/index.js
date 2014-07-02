// This file is loaded by default by the module resolver 
// unless overridden by package.json

function logger(req, res, next) {
	console.log("%s %s", req.method, req.url);
	next();
}

// if returning single function or variable
module.exports = logger;