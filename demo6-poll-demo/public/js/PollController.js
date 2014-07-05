app.controller('PollController', ['$scope', 'PollsService', function($scope, PollsService) {

	$scope.master = { 'title' : 'Default title', 'question' : 'Default question', 'answers' : [ { 'text' : 'Default answer'} ] };
	$scope.message = "";

	$scope.create = function(poll) {

		PollsService.create(poll).then(function(data) {
			console.log("created " + data);
			$scope.message = "Poll created";

			// not exactly sure why $digest cycle does not pick up changes to
			// model in this promise
			$scope.$apply();
			$scope.reset();			
		});

	}

	$scope.reset = function() {
		$scope.poll = angular.copy($scope.master);	
	}
	
	$scope.addAnswer = function() {
		$scope.poll.answers.push({'text' : 'Default answer'});
	}

	$scope.reset();

}]);