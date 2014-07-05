var app = angular.module('voteApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/poll/:id', {
        controller: 'PollRenderController'
    });

    // required for proper routing with above pattern (e.g. /poll/:id)
    // http://stackoverflow.com/questions/20655877/angularjs-get-current-url-parameters-using-ngroute
    $locationProvider.html5Mode(true);

}]);