var polls = [];
var pollId = 0;

// curl -H "Content-Type: application/json" -d "{\"poll\" : {\"title\":\"poll title\",\"question\":\"poll question\"} }" http://localhost:3000/api/poll
function createPoll(req, res, next) {
	
	var data = req.body.poll;
	
	var newPoll = {};
	newPoll.pollId = polls.length;
	newPoll.pollTitle = data.title;
	newPoll.pollQuestion = data.question;

	polls.push(newPoll);
	res.json(newPoll);
}

// curl http://localhost:3000/api/poll/id
function getPoll(req, res, next) {

	if (polls[req.params.id]) {
		return res.json(polls[req.params.id]);
	} else {
		next(new Error("Poll with id " + req.params.id + " does not exist"));
	}
	
}

// curl http://localhost:3000/api/polls
// should paginate this call
function listPolls(req, res, next) {
	return res.json(polls);
}

exports.create = createPoll;
exports.listPolls = listPolls;
exports.getPoll = getPoll;