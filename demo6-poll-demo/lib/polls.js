var polls = [];
var pollsLookup = {};
var pollId = 0;

// curl -H "Content-Type: application/json" -d "{\"poll\" : {\"title\":\"poll title\",\"question\":\"poll question\"} }" http://localhost:3000/api/poll
function createPoll(req, res, next) {
	
	var data = req.body.poll;
	
	var newPoll = {};
	newPoll.pollId = polls.length;
	newPoll.pollTitle = data.title;
	newPoll.pollQuestion = data.question;

	polls.push(newPoll);

	res.redirect('/api/poll/:' + pollId);
}

// curl http://localhost:3000/api/poll/id
function getPoll(req, res, next) {

	if (polls[req.params.id]) {
		return res.json(polls[req.params.id]);
	} else {
		next(new Error("Poll with id " + req.params.id + " does not exist"));
	}
	
}

exports.create = createPoll;
exports.getPoll = getPoll;