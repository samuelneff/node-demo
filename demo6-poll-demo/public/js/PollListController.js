app.controller('PollListController', ['$scope', 'PollsService', function($scope, PollsService) {

	function fetch() {
		PollsService.async().then(function(data) {
			$scope.polls = data;
		});
	}

	$scope.getData = fetch;

}]);