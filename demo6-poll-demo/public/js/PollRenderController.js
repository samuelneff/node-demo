app.controller('PollRenderController', ['PollsService', '$rootScope', '$scope', '$routeParams', '$route', function(PollsService, $rootScope, $scope, $routeParams, $route) {
    
    $scope.poll;

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