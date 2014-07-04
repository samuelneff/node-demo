app.controller('PollListController', ['$scope', 'PollsService', function($scope, PollsService) {

	PollsService.async().then(function(data) {
		$scope.polls = data;
	});

	$scope.getData = function() {
		console.log($scope.polls);
	};

}]);