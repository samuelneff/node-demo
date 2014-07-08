var _ = require('underscore');



// use dependency injection to inject socket
var exports = module.exports = function(passedInIo) {

	var polls = [];
	var pollId = 0;
	var io = passedInIo;

	return {

		// curl -H "Content-Type: application/json" -d "{\"poll\" : {\"title\":\"poll title\",\"question\":\"poll question\"} }" http://localhost:3000/api/poll
		createPoll: function createPoll(req, res, next) {			
			var data = req.body.poll;
				
			var newPoll = {};
			newPoll.pollId = polls.length;
			newPoll.pollTitle = data.title;
			newPoll.pollQuestion = data.question;
			
			_.map(data.answers, function(answer) {
				answer.voteCount = 0;
			});

			newPoll.answers = data.answers;

			polls.push(newPoll);

			io.sockets.emit('poll created', polls);

			res.json(newPoll);
		},

		// curl http://localhost:3000/api/poll/id
		getPoll: function getPoll(req, res, next) {

			if (polls[req.params.id]) {
				return res.json(polls[req.params.id]);
			} else {
				next(new Error("Poll with id " + req.params.id + " does not exist"));
			}
			
		},

		// curl http://localhost:3000/api/polls
		// should paginate this call
		listPolls: function listPolls(req, res, next) {
			return res.json(polls);
		}

	};

}






