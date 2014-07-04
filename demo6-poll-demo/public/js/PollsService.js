app.factory('PollsService', function($http) {

	var pollsService = {

		async: function() {
			var promise = $http.get('/api/polls').then(function(res) {
				console.log(res);
				return res.data;
			});

			return promise;
		},

		create: function(newPoll) {

			var toCreate = { "poll" : newPoll };
			var promise = $http.post('/api/poll', toCreate).then(function(res) {
				console.log(res);
				return res.data;
			});

			return promise;
		}

	};

	return pollsService;
});