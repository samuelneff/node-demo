app.controller('PollRenderController', ['PollsService', '$rootScope', '$scope', '$routeParams', '$route', 'SocketIoService', function(PollsService, $rootScope, $scope, $routeParams, $route, SocketIoService) {
    
    $scope.poll;

    SocketIoService.on('server ready', function(data) {
        console.log(data);        
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
    
}]);