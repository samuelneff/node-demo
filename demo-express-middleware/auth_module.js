function denied(req, res, next) {	
	res.end("Denied!");
}

// define denied as properly on the exports object
exports.denied = denied;