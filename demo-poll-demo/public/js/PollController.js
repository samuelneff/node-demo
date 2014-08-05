app.controller('PollController', ['$scope', 'PollsService', function($scope, PollsService) {

	$scope.master = { 'title' : 'Default title', 'question' : 'Default question', 'answers' : [ { 'text' : 'Default answer'} ] };
	$scope.message = "";

	$scope.create = function(poll) {

		PollsService.createPoll(poll).then(function(data) {
			console.log("created " + data);
			$scope.message = "Poll created";

			// make sure changes are applied
			if (!$scope.$$phase) {
				$scope.$apply();
			}

			$scope.reset();
		});

	};

	$scope.reset = function() {
		$scope.poll = angular.copy($scope.master);
	};

	$scope.addAnswer = function() {
		$scope.poll.answers.push({'text' : 'Default answer'});
	};

	$scope.reset();

}]);
