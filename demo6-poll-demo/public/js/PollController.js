app.controller('PollController', ['$scope', 'PollsService', function($scope, PollsService) {

	$scope.master = { 'title' : 'Default title', 'question' : 'Default question', 'answers' : [ { 'text' : 'Default answer'} ] };
	$scope.message = "Test";

	$scope.create = function(poll) {

		PollsService.create(poll).then(function(data) {
			console.log("created " + data);
			$scope.$apply(function() {$scope.updateMessage("Poll created");});			
		});

	}

	$scope.updateMessage = function(msg) {
		$scope.message = msg;
	}

	$scope.reset = function() {
		$scope.poll = angular.copy($scope.master);	
	}
	
	$scope.addAnswer = function() {
		$scope.poll.answers.push({'text' : 'Default answer'});
	}

	$scope.reset();

}]);