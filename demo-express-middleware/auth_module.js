function denied(req, res, next) {
	// sends the response back, that we're letting the user go no further
	res.end("Denied!");
}

function accept(req, res, next) {

	// do work here call next to send request to next stage	
	next();
}

// define denied as property on the exports object
exports.denied = denied;
exports.accept = accept;
