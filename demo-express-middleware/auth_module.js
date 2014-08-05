function denied(req, res, next) {
	// sends the response back, that we're letting the user go no further
	res.end("Denied!");
}

// define denied as property on the exports object
exports.denied = denied;
