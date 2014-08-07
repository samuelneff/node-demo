app.controller('PollRenderController', ['PollsService', '$rootScope', '$scope', '$routeParams', '$route', 'SocketIoService', function(PollsService, $rootScope, $scope, $routeParams, $route, SocketIoService) {

    $scope.answerSelection = { answerIndex: -1 };

    SocketIoService.on('server ready', function(data) {
        console.log(data);
    });

    SocketIoService.on('poll created', function() {
        console.log("another poll created");
    });

    SocketIoService.on('poll updated', function(poll) {
        console.log("updated " + poll);

        if (poll.pollId == $scope.pollId) {
            $scope.poll = poll;
        }
    });

  SocketIoService.on('cheater', function(warning) {
    $('.warnings').append($('<div/>').text(warning));
  });

    $rootScope.$on('$routeChangeSuccess', function() {
        console.log("1: " + $routeParams.id);
        $scope.pollId = $routeParams.id;

        console.log($scope.pollId);

        PollsService.getPoll($scope.pollId).then(function(data) {
            console.log(data);
            $scope.poll = data;
        });


    });

    $scope.submitVote = function() {

        console.log($scope.answerSelection.answerIndex);

        if ($scope.answerSelection.answerIndex < 0) {
            console.log('no answer selected');
            return;
        }

        PollsService.submitVote($scope.poll.pollId, $scope.answerSelection.answerIndex).then(function(data) {
            console.log(data);
            $scope.poll = data;
        });

    };

}]);
