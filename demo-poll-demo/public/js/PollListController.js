app.controller('PollListController', ['$scope', 'PollsService', 'SocketIoService', function($scope, PollsService, SocketIoService) {

	function fetch() {
		PollsService.async().then(function(data) {
			$scope.polls = data;
		});
	}

	SocketIoService.on('poll created', function(polls) {
	    $scope.polls = polls;
	});

    // fetch once when controller is loaded
	fetch();

}]);
