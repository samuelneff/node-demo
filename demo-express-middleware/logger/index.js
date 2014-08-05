// This file is loaded by default by the module resolver
// unless overridden by package.json

// all middleware components take these function parameters
function logger(req, res, next) {
	console.log("%s %s", req.method, req.url);

	// call next to continue to the next middleware component registered in the control flow
	next();
}

// if returning single function or variable
module.exports = logger;
