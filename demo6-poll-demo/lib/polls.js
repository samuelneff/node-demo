var polls = [];
var pollsLookup = {};
var pollId = 0;


function createPoll(pollTitle, pollQuestion) {
	
	if (pollsLookup[pollTitle] != null) {
		return;
	}

	var newPoll = {};
	newPoll.pollTitle = pollTitle;
	newPoll.pollQuestion = pollQuestion;

	polls.push(newPoll);
	pollsLookup[pollTitle] = newPoll;
}

function getPoll(pollTitle) {

	if (pollsLookup[pollTitle]) {

		return pollsLookup[pollTitle];

	} else {

		return null;
	}

}

exports.create = createPoll;
exports.getPoll = getPoll;